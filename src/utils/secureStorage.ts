/**
 * Secure storage utility for encrypting and storing sensitive data
 */

// Simple encryption key (in production, use a more secure approach)
const ENCRYPTION_KEY = 'WebZWave_Secure_Storage_Key';

/**
 * Encrypt a string using AES-like algorithm
 * Note: This is a simplified version for demonstration. In production,
 * use a proper encryption library like CryptoJS or the Web Crypto API.
 * 
 * @param text - Text to encrypt
 * @returns Encrypted text
 */
const encrypt = (text: string): string => {
  if (!text) return '';
  
  // Simple XOR encryption with the key
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
    result += String.fromCharCode(charCode);
  }
  
  // Convert to base64 for storage
  return btoa(result);
};

/**
 * Decrypt a string encrypted with the encrypt function
 * 
 * @param encryptedText - Encrypted text to decrypt
 * @returns Decrypted text
 */
const decrypt = (encryptedText: string): string => {
  if (!encryptedText) return '';
  
  try {
    // Convert from base64
    const base64Decoded = atob(encryptedText);
    
    // Reverse the XOR encryption
    let result = '';
    for (let i = 0; i < base64Decoded.length; i++) {
      const charCode = base64Decoded.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
      result += String.fromCharCode(charCode);
    }
    
    return result;
  } catch (error) {
    console.error('Error decrypting data:', error);
    return '';
  }
};

/**
 * Securely store a value in localStorage with encryption
 * 
 * @param key - Storage key
 * @param value - Value to store
 */
export const secureSet = (key: string, value: any): void => {
  try {
    // Convert value to string if it's not already
    const valueStr = typeof value === 'string' ? value : JSON.stringify(value);
    
    // Encrypt the value
    const encryptedValue = encrypt(valueStr);
    
    // Store with a prefix to identify secure items
    localStorage.setItem(`secure_${key}`, encryptedValue);
  } catch (error) {
    console.error('Error storing secure data:', error);
  }
};

/**
 * Retrieve and decrypt a value from localStorage
 * 
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Decrypted value or defaultValue if not found
 */
export const secureGet = <T>(key: string, defaultValue: T): T => {
  try {
    // Get the encrypted value
    const encryptedValue = localStorage.getItem(`secure_${key}`);
    
    if (!encryptedValue) {
      return defaultValue;
    }
    
    // Decrypt the value
    const decryptedValue = decrypt(encryptedValue);
    
    // Parse JSON if the original value was an object
    try {
      return JSON.parse(decryptedValue) as T;
    } catch {
      // If not valid JSON, return as is
      return decryptedValue as unknown as T;
    }
  } catch (error) {
    console.error('Error retrieving secure data:', error);
    return defaultValue;
  }
};

/**
 * Remove a secure item from localStorage
 * 
 * @param key - Storage key to remove
 */
export const secureRemove = (key: string): void => {
  localStorage.removeItem(`secure_${key}`);
};

/**
 * Clear all secure items from localStorage
 */
export const secureClear = (): void => {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('secure_')) {
      localStorage.removeItem(key);
    }
  });
};

/**
 * Check if a secure storage key exists
 * 
 * @param key - Storage key to check
 * @returns Boolean indicating if the key exists
 */
export const secureExists = (key: string): boolean => {
  return localStorage.getItem(`secure_${key}`) !== null;
};

/**
 * Store session data securely with expiration
 * 
 * @param key - Storage key
 * @param value - Value to store
 * @param expirationMinutes - Minutes until expiration
 */
export const secureSessionSet = (key: string, value: any, expirationMinutes = 30): void => {
  const expirationMs = expirationMinutes * 60 * 1000;
  const expirationTime = new Date().getTime() + expirationMs;
  
  const sessionData = {
    value,
    expiration: expirationTime
  };
  
  secureSet(key, sessionData);
};

/**
 * Get session data if not expired
 * 
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist or is expired
 * @returns Session data or defaultValue if expired/not found
 */
export const secureSessionGet = <T>(key: string, defaultValue: T): T => {
  const sessionData = secureGet<{ value: T, expiration: number }>(key, { value: defaultValue, expiration: 0 });
  
  // Check if expired
  if (sessionData.expiration < new Date().getTime()) {
    secureRemove(key);
    return defaultValue;
  }
  
  return sessionData.value;
};
