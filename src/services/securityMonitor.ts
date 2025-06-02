/**
 * Security monitoring service to detect and log security events
 */
import { secureSessionSet, secureSessionGet } from '@/utils/secureStorage';
import { containsXSSPatterns, isBot } from '@/utils/security';

// Security event types
export enum SecurityEventType {
  XSS_ATTEMPT = 'xss_attempt',
  CSRF_ATTEMPT = 'csrf_attempt',
  INJECTION_ATTEMPT = 'injection_attempt',
  SUSPICIOUS_BEHAVIOR = 'suspicious_behavior',
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  AUTHENTICATION_FAILURE = 'authentication_failure',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  BOT_DETECTED = 'bot_detected',
  SECURITY_HEADER_MISSING = 'security_header_missing'
}

// Security event interface
export interface SecurityEvent {
  type: SecurityEventType;
  timestamp: number;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  url: string;
  userAgent?: string;
}

// Security monitor class
class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private readonly MAX_EVENTS = 100;
  private readonly STORAGE_KEY = 'security_events';
  
  constructor() {
    // Load events from storage
    this.events = secureSessionGet<SecurityEvent[]>(this.STORAGE_KEY, []);
    
    // Set up monitoring
    this.setupMonitoring();
  }
  
  /**
   * Log a security event
   * @param event - Security event to log
   */
  public logEvent(event: Omit<SecurityEvent, 'timestamp' | 'url'>): void {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    // Add to events array
    this.events.unshift(fullEvent);
    
    // Trim events array if it gets too large
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(0, this.MAX_EVENTS);
    }
    
    // Save to storage
    secureSessionSet(this.STORAGE_KEY, this.events);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('Security event detected:', fullEvent);
    }
    
    // For critical events, consider additional actions
    if (fullEvent.severity === 'critical') {
      this.handleCriticalEvent(fullEvent);
    }
  }
  
  /**
   * Get all logged security events
   * @returns Array of security events
   */
  public getEvents(): SecurityEvent[] {
    return [...this.events];
  }
  
  /**
   * Clear all logged events
   */
  public clearEvents(): void {
    this.events = [];
    secureSessionSet(this.STORAGE_KEY, this.events);
  }
  
  /**
   * Set up monitoring for common security issues
   */
  private setupMonitoring(): void {
    // Monitor for XSS attempts in URL
    this.monitorUrlForXss();
    
    // Monitor for suspicious behavior
    this.monitorSuspiciousBehavior();
    
    // Check security headers
    this.checkSecurityHeaders();
  }
  
  /**
   * Monitor URL for XSS attempts
   */
  private monitorUrlForXss(): void {
    // Check current URL
    this.checkUrlForXss();
    
    // Set up history change listener
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      this.checkUrlForXss();
    };
    
    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      this.checkUrlForXss();
    };
    
    // Listen for popstate events
    window.addEventListener('popstate', () => {
      this.checkUrlForXss();
    });
  }
  
  /**
   * Check current URL for XSS patterns
   */
  private checkUrlForXss(): void {
    const url = window.location.href;
    const hasXss = containsXSSPatterns(url);
    
    if (hasXss) {
      this.logEvent({
        type: SecurityEventType.XSS_ATTEMPT,
        details: { url },
        severity: 'high'
      });
    }
  }
  
  /**
   * Monitor for suspicious behavior
   */
  private monitorSuspiciousBehavior(): void {
    // Check if user agent is a bot
    const userAgent = navigator.userAgent;
    if (isBot(userAgent)) {
      this.logEvent({
        type: SecurityEventType.BOT_DETECTED,
        details: { userAgent },
        severity: 'medium'
      });
    }
    
    // Monitor rapid clicks
    let clickCount = 0;
    const clickThreshold = 20;
    const clickTimeWindow = 5000; // 5 seconds
    
    window.addEventListener('click', () => {
      clickCount++;
      
      setTimeout(() => {
        clickCount--;
      }, clickTimeWindow);
      
      if (clickCount > clickThreshold) {
        this.logEvent({
          type: SecurityEventType.SUSPICIOUS_BEHAVIOR,
          details: { behavior: 'rapid_clicking', count: clickCount },
          severity: 'low'
        });
      }
    });
  }
  
  /**
   * Check for required security headers
   */
  private checkSecurityHeaders(): void {
    // This is a client-side check, so we can only check meta tags
    setTimeout(() => {
      const requiredMetaTags = [
        'Content-Security-Policy',
        'X-Content-Type-Options',
        'X-Frame-Options',
        'Referrer-Policy'
      ];
      
      const missingTags: string[] = [];
      
      requiredMetaTags.forEach(tag => {
        const metaTag = document.querySelector(`meta[http-equiv="${tag}"]`);
        if (!metaTag) {
          missingTags.push(tag);
        }
      });
      
      if (missingTags.length > 0) {
        this.logEvent({
          type: SecurityEventType.SECURITY_HEADER_MISSING,
          details: { missingHeaders: missingTags },
          severity: missingTags.length > 2 ? 'high' : 'medium'
        });
      }
    }, 1000); // Check after page load
  }
  
  /**
   * Handle critical security events
   * @param event - Critical security event
   */
  private handleCriticalEvent(event: SecurityEvent): void {
    // In a real app, you might want to:
    // 1. Send an alert to a security monitoring service
    // 2. Log the user out
    // 3. Clear sensitive data
    // 4. Redirect to a safe page
    
    console.error('CRITICAL SECURITY EVENT:', event);
    
    // For demonstration purposes, we'll just log it
    // In a real app, you would implement appropriate actions
  }
}

// Create and export a singleton instance
export const securityMonitor = new SecurityMonitor();

// Export a hook for React components
export const useSecurityMonitor = () => {
  return {
    logEvent: securityMonitor.logEvent.bind(securityMonitor),
    getEvents: securityMonitor.getEvents.bind(securityMonitor),
    clearEvents: securityMonitor.clearEvents.bind(securityMonitor)
  };
};
