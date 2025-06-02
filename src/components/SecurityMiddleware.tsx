import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  isBot,
  detectSuspiciousBehavior,
  RateLimiter,
  generateSecureToken,
  containsXSSPatterns
} from '@/utils/security';
import { securityMonitor, SecurityEventType } from '@/services/securityMonitor';
import { secureSessionGet, secureSessionSet } from '@/utils/secureStorage';

// Create a global rate limiter for page navigation
const navigationRateLimiter = new RateLimiter(30, 60000); // 30 navigations per minute
const suspiciousIPs = new Set<string>();
const securityTokenKey = 'security_token';

interface SecurityMiddlewareProps {
  children: React.ReactNode;
}

const SecurityMiddleware: React.FC<SecurityMiddlewareProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSecurityCheckPassed, setIsSecurityCheckPassed] = useState(false);

  // Security checks on initial load and route changes
  useEffect(() => {
    const performSecurityChecks = () => {
      // Check for security token in localStorage
      const storedToken = secureSessionGet(securityTokenKey, '');
      if (!storedToken) {
        // First visit, generate and store token
        const newToken = generateSecureToken();
        secureSessionSet(securityTokenKey, newToken, 60); // 1 hour expiration
      }

      // Check for rate limiting
      const isLimited = navigationRateLimiter.shouldLimit('navigation');
      if (isLimited) {
        securityMonitor.logEvent({
          type: SecurityEventType.RATE_LIMIT_EXCEEDED,
          details: { action: 'navigation', path: location.pathname },
          severity: 'medium'
        });

        toast.error("Too many page requests. Please slow down.");
        navigate('/');
        return false;
      }

      // Check for suspicious behavior
      const userAgent = navigator.userAgent;
      const referrer = document.referrer;

      const suspiciousCheck = detectSuspiciousBehavior({
        userAgent,
        referrer
      });

      if (suspiciousCheck.isSuspicious) {
        securityMonitor.logEvent({
          type: SecurityEventType.SUSPICIOUS_BEHAVIOR,
          details: {
            reasons: suspiciousCheck.reasons,
            userAgent,
            referrer,
            path: location.pathname
          },
          severity: suspiciousCheck.reasons.length > 2 ? 'high' : 'medium'
        });

        // For highly suspicious behavior, block access
        if (suspiciousCheck.reasons.length > 2) {
          toast.error("Security check failed. Access denied.");
          navigate('/');
          return false;
        }
      }

      // Check URL parameters for XSS attempts
      const urlParams = new URLSearchParams(location.search);
      let hasXSSAttempt = false;
      const xssParams: string[] = [];

      urlParams.forEach((value, key) => {
        if (containsXSSPatterns(value)) {
          hasXSSAttempt = true;
          xssParams.push(key);
        }
      });

      if (hasXSSAttempt) {
        securityMonitor.logEvent({
          type: SecurityEventType.XSS_ATTEMPT,
          details: {
            url: window.location.href,
            params: xssParams
          },
          severity: 'critical'
        });

        toast.error("Security violation detected. Access denied.");
        navigate('/');
        return false;
      }

      // Check for CSRF token on form submissions
      if (location.pathname.includes('/contact')) {
        const csrfToken = secureSessionGet('csrf_token', '');
        if (!csrfToken) {
          const newToken = generateSecureToken();
          secureSessionSet('csrf_token', newToken, 60); // 1 hour expiration
        }
      }

      return true;
    };

    const checkResult = performSecurityChecks();
    setIsSecurityCheckPassed(checkResult);

    // Add security-related event listeners
    const handleVisibilityChange = () => {
      // Refresh security token when tab becomes visible again
      if (document.visibilityState === 'visible') {
        const newToken = generateSecureToken();
        localStorage.setItem(securityTokenKey, newToken);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location, navigate]);

  // Add security headers via meta tags
  useEffect(() => {
    // Generate a nonce for inline scripts
    const nonce = generateSecureToken(16);

    // Set CSP via meta tag (as a backup to server headers) - Updated for Spline 3D support
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = `
      default-src 'self';
      script-src 'self' https://cdn.gpteng.co https://www.google.com https://maps.googleapis.com 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval';
      style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: blob: https://images.unsplash.com https://lovable.dev https://*.googleapis.com https://*.gstatic.com;
      connect-src 'self' blob: data:;
      frame-src 'self' https://www.google.com https://maps.google.com https://*.googleapis.com;
      worker-src 'self' blob: data:;
      child-src 'self' blob: data:;
      object-src 'self' blob: data:;
      frame-ancestors 'none';
      form-action 'self';
    `.replace(/\s+/g, ' ').trim();

    // Add other security headers
    const headers = [
      { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
      { httpEquiv: 'X-Frame-Options', content: 'DENY' },
      { httpEquiv: 'X-XSS-Protection', content: '1; mode=block' },
      { httpEquiv: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
      { httpEquiv: 'Permissions-Policy', content: 'geolocation=(), microphone=(), camera=()' }
    ];

    // Add meta tags to head
    const head = document.head;
    head.appendChild(cspMeta);

    headers.forEach(header => {
      const meta = document.createElement('meta');
      meta.httpEquiv = header.httpEquiv;
      meta.content = header.content;
      head.appendChild(meta);
    });

    // Cleanup function
    return () => {
      head.removeChild(cspMeta);
      headers.forEach((_, index) => {
        const meta = head.querySelector(`meta[http-equiv="${headers[index].httpEquiv}"]`);
        if (meta) head.removeChild(meta);
      });
    };
  }, []);

  // If security check fails, render nothing or a fallback
  if (!isSecurityCheckPassed) {
    return <div className="security-check">Performing security checks...</div>;
  }

  return <>{children}</>;
};

export default SecurityMiddleware;
