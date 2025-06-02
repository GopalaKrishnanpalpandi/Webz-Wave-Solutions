/**
 * Asset protection utilities for protecting website images and source code
 */

/**
 * Disables right-click context menu on the entire document
 */
export const disableRightClick = (): void => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });
};

/**
 * Disables keyboard shortcuts that could be used to access developer tools or save content
 */
export const disableKeyboardShortcuts = (): void => {
  document.addEventListener('keydown', (e) => {
    // Prevent F12 key (opens dev tools)
    if (e.key === 'F12') {
      e.preventDefault();
      return false;
    }

    // Prevent Ctrl+Shift+I (opens dev tools)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
      return false;
    }

    // Prevent Ctrl+Shift+J (opens dev tools console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
      return false;
    }

    // Prevent Ctrl+Shift+C (opens dev tools elements panel)
    if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      return false;
    }

    // Prevent Ctrl+U (view source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      return false;
    }

    // Prevent Ctrl+S (save page)
    if (e.ctrlKey && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      return false;
    }
  });
};

/**
 * Disables image dragging to prevent easy saving
 */
export const disableImageDragging = (): void => {
  document.addEventListener('dragstart', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.preventDefault();
      return false;
    }
  });
};

/**
 * Adds a watermark to images on hover
 */
export const addImageWatermark = (): void => {
  const style = document.createElement('style');
  style.innerHTML = `
    img {
      position: relative;
    }
    img::after {
      content: "© WebZ Wave Solutions";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 1.5rem;
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }
    img:hover::after {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
};

/**
 * Detects if DevTools is open and shows a warning
 */
export const detectDevTools = (): void => {
  const devToolsDetector = (): void => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      document.body.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center; padding: 20px;">
          <h1 style="color: #6d28d9; font-size: 2rem; margin-bottom: 20px;">Developer Tools Detected</h1>
          <p style="font-size: 1.2rem; max-width: 600px; margin-bottom: 20px;">
            For security reasons, this website cannot be viewed with developer tools open.
            Please close developer tools and refresh the page to continue.
          </p>
          <button onclick="location.reload()" style="background-color: #6d28d9; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      `;
    }
  };

  window.addEventListener('resize', devToolsDetector);
  setInterval(devToolsDetector, 1000);
};

/**
 * Applies CSS to make images harder to copy
 */
export const protectImages = (): void => {
  const style = document.createElement('style');
  style.innerHTML = `
    img {
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
};

/**
 * Adds invisible watermark to images
 */
export const addInvisibleWatermark = (): void => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Add data attribute to track original source
    img.setAttribute('data-protected', 'true');
    img.setAttribute('data-owner', 'WebZ Wave Solutions');
    
    // Add a timestamp to track when the image was viewed
    img.setAttribute('data-timestamp', Date.now().toString());
  });
};

/**
 * Obfuscates source code by adding comments and renaming variables
 * This is a client-side simulation - real obfuscation should be done during build
 */
export const simulateCodeObfuscation = (): void => {
  console.log('%c⚠️ Source code is protected and monitored', 'font-size: 20px; color: red; font-weight: bold;');
  console.log('%cAttempting to copy or steal code is prohibited and may result in legal action.', 'font-size: 16px; color: red;');
};

/**
 * Adds a warning message when someone tries to view source
 */
export const addSourceCodeWarning = (): void => {
  // Add a comment at the top of the HTML
  const comment = document.createComment(`
    ⚠️ WARNING: This source code is protected by copyright law.
    Unauthorized copying, distribution, or use is strictly prohibited.
    © ${new Date().getFullYear()} WebZ Wave Solutions. All rights reserved.
  `);
  document.documentElement.insertBefore(comment, document.documentElement.firstChild);
};

/**
 * Initializes all asset protection measures
 * @param options - Configuration options for protection
 */
export const initAssetProtection = (options: {
  disableRightClick?: boolean;
  disableKeyboardShortcuts?: boolean;
  disableImageDragging?: boolean;
  protectImages?: boolean;
  detectDevTools?: boolean;
  addSourceCodeWarning?: boolean;
} = {}): void => {
  const {
    disableRightClick: shouldDisableRightClick = true,
    disableKeyboardShortcuts: shouldDisableKeyboardShortcuts = true,
    disableImageDragging: shouldDisableImageDragging = true,
    protectImages: shouldProtectImages = true,
    detectDevTools: shouldDetectDevTools = false,
    addSourceCodeWarning: shouldAddSourceCodeWarning = true,
  } = options;

  if (shouldDisableRightClick) disableRightClick();
  if (shouldDisableKeyboardShortcuts) disableKeyboardShortcuts();
  if (shouldDisableImageDragging) disableImageDragging();
  if (shouldProtectImages) protectImages();
  if (shouldDetectDevTools) detectDevTools();
  if (shouldAddSourceCodeWarning) addSourceCodeWarning();
  
  // Always add these protections
  addInvisibleWatermark();
  simulateCodeObfuscation();
};
