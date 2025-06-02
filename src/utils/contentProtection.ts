/**
 * Content Protection Utility
 * 
 * This utility provides functions to protect website content from unauthorized copying,
 * including images, text, and other assets.
 */

/**
 * Initialize content protection measures
 * This should be called when the application starts
 */
export const initContentProtection = (): void => {
  if (typeof window !== 'undefined') {
    // Disable right-click context menu
    disableRightClick();
    
    // Disable text selection
    disableTextSelection();
    
    // Disable drag and drop for images
    disableImageDragging();
    
    // Add invisible watermarks to images
    addWatermarkToImages();
    
    // Disable keyboard shortcuts for copying
    disableCopyShortcuts();
    
    // Add copy event listeners
    addCopyEventListeners();
    
    // Disable developer tools (basic protection)
    disableDeveloperTools();
    
    // Add page visibility change detection
    addPageVisibilityDetection();
  }
};

/**
 * Disable right-click context menu
 */
const disableRightClick = (): void => {
  document.addEventListener('contextmenu', (e) => {
    // Allow right-click on form inputs and textareas for usability
    const target = e.target as HTMLElement;
    const isFormElement = 
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.tagName === 'SELECT' ||
      target.isContentEditable;
    
    if (!isFormElement) {
      e.preventDefault();
      showCopyrightNotice();
    }
  });
};

/**
 * Disable text selection
 */
const disableTextSelection = (): void => {
  // Add CSS to disable selection
  const style = document.createElement('style');
  style.innerHTML = `
    .no-select {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `;
  document.head.appendChild(style);
  
  // Add the no-select class to body
  document.body.classList.add('no-select');
  
  // Allow selection on specific elements that need it
  const allowSelectionElements = document.querySelectorAll('input, textarea, [contenteditable="true"]');
  allowSelectionElements.forEach(el => {
    el.classList.remove('no-select');
  });
};

/**
 * Disable image dragging
 */
const disableImageDragging = (): void => {
  // Prevent dragging of images
  document.addEventListener('dragstart', (e) => {
    if (e.target instanceof HTMLImageElement) {
      e.preventDefault();
    }
  });
  
  // Add draggable="false" attribute to all images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('draggable', 'false');
    
    // Add additional protection
    img.style.webkitUserDrag = 'none';
    img.style.webkitTouchCallout = 'none';
    
    // Add overlay to prevent right-click save
    const parent = img.parentElement;
    if (parent && !parent.classList.contains('img-protected')) {
      parent.classList.add('img-protected');
      parent.style.position = 'relative';
      
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.zIndex = '10';
      overlay.style.background = 'transparent';
      
      parent.appendChild(overlay);
    }
  });
};

/**
 * Add invisible watermarks to images
 */
const addWatermarkToImages = (): void => {
  // This is a simplified version - in production, you would use a canvas to add actual watermarks
  const images = document.querySelectorAll('img:not([data-watermarked])');
  
  images.forEach(img => {
    // Mark as watermarked to avoid processing twice
    img.setAttribute('data-watermarked', 'true');
    
    // Add custom attribute with copyright info
    img.setAttribute('data-copyright', 'WebZ Wave Solutions - All Rights Reserved');
    
    // Add onload event to apply canvas watermark for important images
    if (img.src.includes('logo') || img.src.includes('hero') || img.src.includes('product')) {
      img.onload = function() {
        applyCanvasWatermark(img);
      };
      
      // If already loaded, apply immediately
      if (img.complete) {
        applyCanvasWatermark(img);
      }
    }
  });
};

/**
 * Apply canvas watermark to an image
 * @param img - Image element to watermark
 */
const applyCanvasWatermark = (img: HTMLImageElement): void => {
  // In a production environment, you would implement a more sophisticated
  // watermarking technique here using canvas
  console.log('Applied watermark to', img.src);
};

/**
 * Disable keyboard shortcuts for copying
 */
const disableCopyShortcuts = (): void => {
  document.addEventListener('keydown', (e) => {
    // Allow copying in form elements
    const target = e.target as HTMLElement;
    const isFormElement = 
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.tagName === 'SELECT' ||
      target.isContentEditable;
    
    if (isFormElement) return;
    
    // Ctrl+C, Ctrl+X, Ctrl+V, Ctrl+A
    if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a')) {
      e.preventDefault();
      showCopyrightNotice();
    }
    
    // Disable print screen
    if (e.key === 'PrintScreen') {
      e.preventDefault();
      showCopyrightNotice();
    }
    
    // Disable F12 (developer tools)
    if (e.key === 'F12') {
      e.preventDefault();
    }
  });
};

/**
 * Add copy event listeners
 */
const addCopyEventListeners = (): void => {
  document.addEventListener('copy', (e) => {
    // Allow copying in form elements
    const target = e.target as HTMLElement;
    const isFormElement = 
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.tagName === 'SELECT' ||
      target.isContentEditable;
    
    if (isFormElement) return;
    
    // Modify copied content to include attribution
    const selection = window.getSelection();
    if (selection && selection.toString().length > 50) {
      e.clipboardData?.setData('text/plain', 
        selection.toString() + '\n\n© WebZ Wave Solutions - All Rights Reserved\nSource: ' + window.location.href
      );
      e.preventDefault();
    }
  });
};

/**
 * Show copyright notice
 */
const showCopyrightNotice = (): void => {
  // Check if notice already exists
  if (document.getElementById('copyright-notice')) return;
  
  const notice = document.createElement('div');
  notice.id = 'copyright-notice';
  notice.style.position = 'fixed';
  notice.style.bottom = '20px';
  notice.style.right = '20px';
  notice.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  notice.style.color = 'white';
  notice.style.padding = '15px 20px';
  notice.style.borderRadius = '5px';
  notice.style.zIndex = '9999';
  notice.style.maxWidth = '300px';
  notice.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  notice.style.transition = 'opacity 0.3s ease-in-out';
  
  notice.innerHTML = `
    <strong>Content Protected</strong>
    <p style="margin: 5px 0;">All content on this website is protected by copyright law and may not be reproduced without permission.</p>
    <p style="margin: 5px 0; font-size: 12px;">© ${new Date().getFullYear()} WebZ Wave Solutions</p>
  `;
  
  document.body.appendChild(notice);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notice.style.opacity = '0';
    setTimeout(() => {
      if (notice.parentNode) {
        notice.parentNode.removeChild(notice);
      }
    }, 300);
  }, 5000);
};

/**
 * Basic protection against developer tools
 */
const disableDeveloperTools = (): void => {
  // This is a basic deterrent - determined users can bypass this
  setInterval(() => {
    const devtoolsOpen = 
      window.outerWidth - window.innerWidth > 160 || 
      window.outerHeight - window.innerHeight > 160;
    
    if (devtoolsOpen) {
      console.clear();
      console.warn('Developer tools detected. All content on this website is protected by copyright law.');
    }
  }, 1000);
};

/**
 * Detect page visibility changes (tab switching)
 */
const addPageVisibilityDetection = (): void => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      // User switched tabs - could be taking screenshots
      console.log('Page visibility changed to hidden');
    }
  });
};
