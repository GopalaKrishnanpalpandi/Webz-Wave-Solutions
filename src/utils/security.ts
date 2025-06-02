/**
 * Security utility functions for protecting against common web vulnerabilities
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input - The user input to sanitize
 * @returns Sanitized string safe for rendering
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Advanced HTML sanitizer that removes all potentially dangerous HTML
 * @param html - HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = (html: string): string => {
  if (!html) return '';

  // Remove script tags and their contents
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // Remove on* attributes (onclick, onload, etc.)
  sanitized = sanitized.replace(/\s+on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, '');

  // Remove javascript: URLs
  sanitized = sanitized.replace(/javascript:[^\s>]*/gi, '');

  // Remove data: URLs
  sanitized = sanitized.replace(/data:[^\s>]*/gi, '');

  // Remove iframe tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // Remove object tags
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');

  // Remove embed tags
  sanitized = sanitized.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');

  // Remove base tags
  sanitized = sanitized.replace(/<base\b[^<]*(?:(?!<\/base>)<[^<]*)*<\/base>/gi, '');

  return sanitized;
};

/**
 * Validates email format
 * @param email - The email to validate
 * @returns Boolean indicating if email format is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Checks password strength
 * @param password - The password to check
 * @returns Object with score and feedback
 */
export const checkPasswordStrength = (password: string): {
  score: number;
  feedback: string;
} => {
  let score = 0;
  const feedback = [];

  if (!password) {
    return { score: 0, feedback: 'Password is required' };
  }

  // Length check
  if (password.length < 8) {
    feedback.push('Password should be at least 8 characters');
  } else {
    score += 1;
  }

  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score < 3) {
    feedback.push('Add uppercase letters, numbers, and special characters');
  }

  return {
    score,
    feedback: feedback.join('. ')
  };
};

/**
 * Generates a CSRF token for form protection
 * @returns CSRF token string
 */
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
};

/**
 * Validates file upload by checking file type and size
 * @param file - The file to validate
 * @param allowedTypes - Array of allowed MIME types
 * @param maxSizeInMB - Maximum file size in MB
 * @returns Object with isValid flag and error message
 */
export const validateFileUpload = (
  file: File,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  maxSizeInMB: number = 5
): { isValid: boolean; error?: string } => {
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  // Check file size
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    return {
      isValid: false,
      error: `File size exceeds the limit of ${maxSizeInMB}MB`
    };
  }

  return { isValid: true };
};

/**
 * Rate limiting utility to prevent brute force attacks
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; timestamp: number }> = new Map();
  private maxAttempts: number;
  private timeWindowMs: number;
  private blacklist: Set<string> = new Set();
  private blacklistDurationMs: number;

  constructor(maxAttempts = 5, timeWindowMs = 60000, blacklistDurationMs = 3600000) {
    this.maxAttempts = maxAttempts;
    this.timeWindowMs = timeWindowMs;
    this.blacklistDurationMs = blacklistDurationMs; // Default: 1 hour blacklist
  }

  /**
   * Check if an action should be rate limited
   * @param key - Unique identifier (e.g., IP address, user ID)
   * @returns Boolean indicating if action should be limited
   */
  shouldLimit(key: string): boolean {
    // Check if key is blacklisted
    if (this.blacklist.has(key)) {
      return true;
    }

    const now = Date.now();
    const record = this.attempts.get(key);

    // Clean up old records
    this.cleanup();

    if (!record) {
      this.attempts.set(key, { count: 1, timestamp: now });
      return false;
    }

    // Check if within time window
    if (now - record.timestamp > this.timeWindowMs) {
      this.attempts.set(key, { count: 1, timestamp: now });
      return false;
    }

    // Increment attempt count
    record.count += 1;
    this.attempts.set(key, record);

    // Check if over limit
    const isOverLimit = record.count > this.maxAttempts;

    // If significantly over limit, add to blacklist
    if (record.count >= this.maxAttempts * 2) {
      this.addToBlacklist(key);
    }

    return isOverLimit;
  }

  /**
   * Add a key to the blacklist
   * @param key - Unique identifier to blacklist
   */
  addToBlacklist(key: string): void {
    this.blacklist.add(key);

    // Set timeout to remove from blacklist after duration
    setTimeout(() => {
      this.blacklist.delete(key);
    }, this.blacklistDurationMs);
  }

  /**
   * Check if a key is blacklisted
   * @param key - Unique identifier to check
   * @returns Boolean indicating if key is blacklisted
   */
  isBlacklisted(key: string): boolean {
    return this.blacklist.has(key);
  }

  /**
   * Reset attempts for a key
   * @param key - Unique identifier to reset
   * @param removeFromBlacklist - Whether to also remove from blacklist
   */
  reset(key: string, removeFromBlacklist = false): void {
    this.attempts.delete(key);
    if (removeFromBlacklist) {
      this.blacklist.delete(key);
    }
  }

  /**
   * Clean up old records
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.attempts.entries()) {
      if (now - record.timestamp > this.timeWindowMs) {
        this.attempts.delete(key);
      }
    }
  }
}

/**
 * Encode a URL parameter to prevent injection attacks
 * @param param - Parameter to encode
 * @returns Encoded parameter
 */
export const encodeURLParam = (param: string): string => {
  return encodeURIComponent(param);
};

/**
 * Create a nonce for script tags (useful for CSP)
 * @returns Random nonce string
 */
export const generateNonce = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

/**
 * Detect common bot patterns in user agent
 * @param userAgent - User agent string to check
 * @returns Boolean indicating if user agent appears to be a bot
 */
export const isBot = (userAgent: string): boolean => {
  if (!userAgent) return false;

  const botPatterns = [
    'bot', 'spider', 'crawler', 'scraper', 'http', 'java', 'python', 'perl',
    'headless', 'phantom', 'selenium', 'automation', 'scan', 'wget', 'curl',
    'request', 'axios', 'fetch', 'http-client'
  ];

  const lowerUA = userAgent.toLowerCase();
  return botPatterns.some(pattern => lowerUA.includes(pattern));
};

/**
 * Detect suspicious behavior that might indicate an attack
 * @param params - Parameters to check
 * @returns Object with detection results
 */
export const detectSuspiciousBehavior = (params: {
  userAgent?: string;
  referrer?: string;
  ipAddress?: string;
  requestCount?: number;
  timeWindow?: number;
}): {
  isSuspicious: boolean;
  reasons: string[];
} => {
  const { userAgent, referrer, ipAddress, requestCount, timeWindow } = params;
  const reasons: string[] = [];

  // Check for bot patterns in user agent
  if (userAgent && isBot(userAgent)) {
    reasons.push('Bot-like user agent detected');
  }

  // Check for missing user agent
  if (!userAgent) {
    reasons.push('Missing user agent');
  }

  // Check for missing referrer on non-direct traffic
  if (!referrer && userAgent) {
    reasons.push('Missing referrer');
  }

  // Check for high request rate
  if (requestCount && timeWindow && (requestCount / timeWindow > 10)) {
    reasons.push('High request rate');
  }

  return {
    isSuspicious: reasons.length > 0,
    reasons
  };
};

/**
 * Generate a secure random token
 * @param length - Length of the token
 * @returns Secure random token
 */
export const generateSecureToken = (length = 32): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = new Uint32Array(length);

  // Use crypto.getRandomValues if available (browser environment)
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(randomValues);
  } else {
    // Fallback for non-browser environments
    for (let i = 0; i < length; i++) {
      randomValues[i] = Math.floor(Math.random() * characters.length);
    }
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomValues[i] % characters.length);
  }

  return result;
};

/**
 * Detect common XSS patterns in input
 * @param input - String to check for XSS patterns
 * @returns Boolean indicating if input contains potential XSS
 */
export const containsXSSPatterns = (input: string): boolean => {
  if (!input) return false;

  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /<iframe/i,
    /<embed/i,
    /<object/i,
    /<img[^>]+src\s*=\s*["']?[^"']+["']?[^>]*onerror/i
  ];

  return xssPatterns.some(pattern => pattern.test(input));
};
