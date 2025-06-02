// EmailJS credentials
const SERVICE_ID = 'service_onb0lxb';
const TEMPLATE_ID = 'template_4hhv14v';
const PUBLIC_KEY = 'L9KE3BbDYCcdEYYB2';

// Simple function to directly send an email using the EmailJS API
const sendEmailDirectly = async (params: any): Promise<any> => {
  const url = 'https://api.emailjs.com/api/v1.0/email/send';

  const data = {
    service_id: SERVICE_ID,
    template_id: TEMPLATE_ID,
    user_id: PUBLIC_KEY,
    template_params: params
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`EmailJS API error: ${response.status} ${errorText}`);
  }

  return {
    status: response.status,
    text: await response.text()
  };
};

/**
 * Interface for contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  [key: string]: any; // Allow additional fields
}

/**
 * Send contact form data via EmailJS
 * @param formData - The contact form data to send
 * @returns Promise that resolves when email is sent
 */
export const sendContactForm = async (formData: ContactFormData): Promise<any> => {
  try {
    console.log('Sending email with EmailJS direct API...');

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      service_requested: formData.service || 'Not specified',
      message: formData.message,
      reply_to: formData.email,
    };

    console.log('Template parameters:', templateParams);

    // Send the email using the direct API approach
    const response = await sendEmailDirectly(templateParams);

    console.log('Email sent successfully!', response);
    return response;
  } catch (error: any) {
    console.error('Error sending email:', error);

    // More detailed error logging
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      name: error.name
    });

    // Store the failed message in localStorage for potential recovery
    try {
      const failedMessage = {
        timestamp: new Date().toISOString(),
        formData: formData,
        error: error.message
      };

      const storedMessages = JSON.parse(localStorage.getItem('failedContactMessages') || '[]');
      storedMessages.push(failedMessage);
      localStorage.setItem('failedContactMessages', JSON.stringify(storedMessages));
      console.log('Failed message stored in localStorage');
    } catch (storageError) {
      console.error('Failed to store message in localStorage:', storageError);
    }

    throw error;
  }
};

/**
 * Check if EmailJS is properly configured
 * @returns Boolean indicating if all required credentials are set
 */
export const isEmailServiceConfigured = (): boolean => {
  return !!SERVICE_ID && !!TEMPLATE_ID && !!PUBLIC_KEY;
};

/**
 * Test the EmailJS connection
 * @returns Promise that resolves if the connection is successful
 */
export const testEmailConnection = async (): Promise<boolean> => {
  try {
    // Send a test ping to the EmailJS API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.ok;
  } catch (error) {
    console.error('EmailJS connection test failed:', error);
    return false;
  }
};

export default {
  sendContactForm,
  isEmailServiceConfigured,
  testEmailConnection
};
