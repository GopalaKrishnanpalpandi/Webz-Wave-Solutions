
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  sanitizeInput,
  isValidEmail,
  generateCSRFToken,
  RateLimiter,
  containsXSSPatterns
} from "@/utils/security";
import { secureSessionGet, secureSessionSet } from "@/utils/secureStorage";
import { securityMonitor, SecurityEventType } from "@/services/securityMonitor";
import { sendContactForm, isEmailServiceConfigured } from "@/services/emailService";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

// Create a rate limiter instance to prevent form spam
const formSubmissionLimiter = new RateLimiter(3, 60000); // 3 attempts per minute

const ContactForm = ({ className }: { className?: string }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [csrfToken, setCsrfToken] = useState<string>("");

  // Generate CSRF token on component mount
  useEffect(() => {
    // Try to get existing token from secure storage
    const existingToken = secureSessionGet('csrf_token', '');

    if (existingToken) {
      setCsrfToken(existingToken);
    } else {
      // Generate new token if none exists
      const newToken = generateCSRFToken();
      setCsrfToken(newToken);
      secureSessionSet('csrf_token', newToken, 60); // 1 hour expiration
    }

    // Log form view for security monitoring
    securityMonitor.logEvent({
      type: SecurityEventType.SUSPICIOUS_BEHAVIOR,
      details: { action: 'form_view', form: 'contact' },
      severity: 'low'
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validate name (sanitize and check length)
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.length > 100) {
      newErrors.name = "Name is too long";
      isValid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Validate phone (optional but validate format if provided)
    if (formData.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    // Validate message (sanitize and check length)
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message is too long (maximum 1000 characters)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for honeypot field (bot detection)
    const honeypotField = (document.getElementById('website') as HTMLInputElement)?.value;
    if (honeypotField) {
      // This is likely a bot - silently fail but log the attempt
      securityMonitor.logEvent({
        type: SecurityEventType.BOT_DETECTED,
        details: { form: 'contact', honeypot_value: honeypotField },
        severity: 'high'
      });

      // Pretend success but don't actually submit
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData(initialFormData);
      return;
    }

    // Check for rate limiting
    if (formSubmissionLimiter.shouldLimit('contact-form')) {
      securityMonitor.logEvent({
        type: SecurityEventType.RATE_LIMIT_EXCEEDED,
        details: { form: 'contact' },
        severity: 'medium'
      });

      toast.error("Too many attempts. Please try again later.");
      return;
    }

    // Check for XSS attempts in form data
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string' && containsXSSPatterns(value)) {
        securityMonitor.logEvent({
          type: SecurityEventType.XSS_ATTEMPT,
          details: { form: 'contact', field: key },
          severity: 'critical'
        });

        toast.error("Invalid input detected. Please remove special characters.");
        return;
      }
    }

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Verify CSRF token
    const storedToken = secureSessionGet('csrf_token', '');
    if (storedToken !== csrfToken) {
      securityMonitor.logEvent({
        type: SecurityEventType.CSRF_ATTEMPT,
        details: { form: 'contact' },
        severity: 'critical'
      });

      toast.error("Security validation failed. Please refresh the page and try again.");
      return;
    }

    setLoading(true);

    // Sanitize data before submission
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      service: formData.service,
      message: sanitizeInput(formData.message),
      _csrf: csrfToken // Include CSRF token
    };

    // Always try to send the email directly
    try {
      console.log("Sending email...");

      const response = await sendContactForm(sanitizedData);

      console.log("Email sent successfully:", response);

      // Log successful submission
      securityMonitor.logEvent({
        type: SecurityEventType.SUSPICIOUS_BEHAVIOR,
        details: { action: 'form_submit', form: 'contact', success: true },
        severity: 'low'
      });

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData(initialFormData);

      // Generate a new CSRF token for the next submission
      const newToken = generateCSRFToken();
      setCsrfToken(newToken);
      secureSessionSet('csrf_token', newToken, 60); // 1 hour expiration
    } catch (error: any) {
      console.error("Failed to send email:", error);

      securityMonitor.logEvent({
        type: SecurityEventType.ERROR,
        details: { action: 'form_submit', form: 'contact', error: error.message || 'Unknown error' },
        severity: 'medium'
      });

      // Show a more detailed error message if available
      let errorMessage = error.text || error.message || "Failed to send message. Please try again later or contact us directly.";

      // Add more helpful messages for common errors
      if (errorMessage.includes("Failed to fetch") || errorMessage.includes("NetworkError") || errorMessage.includes("Network Error")) {
        errorMessage = "Network error: Please check your internet connection and try again.";
      } else if (errorMessage.includes("timeout")) {
        errorMessage = "Request timed out: The server took too long to respond. Please try again later.";
      } else if (errorMessage.includes("Invalid ID") || errorMessage.includes("invalid service_id")) {
        errorMessage = "Configuration error: Please contact the website administrator.";
      } else if (errorMessage.includes("status: 400") || errorMessage.includes("status: 403")) {
        errorMessage = "Email service error: There was a problem with the email service. Please try again later.";
      } else if (errorMessage.includes("CORS")) {
        errorMessage = "Security error: Your browser blocked the request. Please try using a different browser.";
      }

      // Always store failed messages in localStorage for recovery
      try {
        const failedMessage = {
          timestamp: new Date().toISOString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          error: errorMessage
        };

        const storedMessages = JSON.parse(localStorage.getItem('failedContactMessages') || '[]');
        storedMessages.push(failedMessage);
        localStorage.setItem('failedContactMessages', JSON.stringify(storedMessages));
        console.log('Failed message stored in localStorage for recovery');
      } catch (storageError) {
        console.error('Failed to store message in localStorage:', storageError);
      }

      // Show error with a direct contact option
      toast.error(
        <div>
          {errorMessage}
          <div className="mt-2">
            <a
              href="mailto:webzwavesolutions@gmail.com"
              className="text-white underline"
            >
              Email us directly
            </a>
          </div>
        </div>
      );

      // Don't reset the form on error so the user can try again
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      {/* Hidden CSRF token field */}
      <input type="hidden" name="_csrf" value={csrfToken} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className={cn(
              "w-full px-3 sm:px-4 py-2 border rounded-md bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-purple",
              errors.name
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-700"
            )}
            placeholder="John Doe"
            maxLength={100}
            autoComplete="name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={cn(
              "w-full px-3 sm:px-4 py-2 border rounded-md bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-purple",
              errors.email
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-700"
            )}
            placeholder="johndoe@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={cn(
              "w-full px-3 sm:px-4 py-2 border rounded-md bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-purple",
              errors.phone
                ? "border-red-500 dark:border-red-500"
                : "border-gray-300 dark:border-gray-700"
            )}
            placeholder="+1 (123) 456-7890"
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="service" className="block text-sm font-medium">
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-purple"
          >
            <option value="">Select a service</option>
            <option value="web-development">Web Development</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="data-science">Data Science</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="crm">CRM Solutions</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          className={cn(
            "w-full px-3 sm:px-4 py-2 border rounded-md bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-purple resize-y min-h-[100px]",
            errors.message
              ? "border-red-500 dark:border-red-500"
              : "border-gray-300 dark:border-gray-700"
          )}
          placeholder="Tell us about your project or inquiry..."
          maxLength={1000}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
        <div className="text-right text-xs text-gray-500">
          {formData.message.length}/1000 characters
        </div>
      </div>

      {/* Honeypot field to catch bots - hidden from real users */}
      <div className="hidden">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-purple hover:bg-brand-purple/90 h-12 text-base font-medium"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          "Send Message"
        )}
      </Button>

      <p className="text-xs text-gray-500 mt-4 text-center sm:text-left">
        This form is protected by security measures to ensure your data remains safe.
      </p>
    </form>
  );
};

export default ContactForm;
