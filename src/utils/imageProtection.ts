/**
 * Image Protection Utility
 * 
 * This utility provides functions to protect images from unauthorized copying,
 * including watermarking, canvas protection, and other techniques.
 */

/**
 * Initialize image protection
 * This should be called when the application starts
 */
export const initImageProtection = (): void => {
  if (typeof window !== 'undefined') {
    // Add MutationObserver to detect new images
    observeImageAddition();
    
    // Process existing images
    processExistingImages();
    
    // Add CSS for image protection
    addImageProtectionStyles();
  }
};

/**
 * Process existing images on the page
 */
const processExistingImages = (): void => {
  const images = document.querySelectorAll('img:not([data-protected])');
  images.forEach(protectImage);
};

/**
 * Observe DOM for new image additions
 */
const observeImageAddition = (): void => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          // Check if the added node is an image
          if (node instanceof HTMLImageElement) {
            protectImage(node);
          }
          
          // Check for images inside the added node
          if (node.nodeType === 1) {
            const images = (node as Element).querySelectorAll('img:not([data-protected])');
            images.forEach(protectImage);
          }
        });
      }
    });
  });
  
  // Start observing the document
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
};

/**
 * Protect an individual image
 * @param img - Image element to protect
 */
const protectImage = (img: Element): void => {
  if (!(img instanceof HTMLImageElement)) return;
  
  // Mark as protected to avoid processing twice
  img.setAttribute('data-protected', 'true');
  
  // Disable dragging
  img.setAttribute('draggable', 'false');
  
  // Add copyright info
  img.setAttribute('data-copyright', 'WebZ Wave Solutions');
  
  // Add CSS classes
  img.classList.add('protected-image');
  
  // For important images like logos, apply canvas protection
  if (
    img.src.includes('logo') || 
    img.src.includes('hero') || 
    img.alt.toLowerCase().includes('logo')
  ) {
    applyCanvasProtection(img);
  }
  
  // Add event listeners
  img.addEventListener('contextmenu', (e) => e.preventDefault());
  img.addEventListener('dragstart', (e) => e.preventDefault());
  
  // Create protective overlay
  createProtectiveOverlay(img);
};

/**
 * Apply canvas-based protection to an image
 * This replaces the original image with a canvas rendering
 * making it harder to extract the original image
 * 
 * @param img - Image element to protect with canvas
 */
const applyCanvasProtection = (img: HTMLImageElement): void => {
  // Wait for image to load
  if (!img.complete) {
    img.onload = () => applyCanvasProtectionToLoadedImage(img);
    return;
  }
  
  applyCanvasProtectionToLoadedImage(img);
};

/**
 * Apply canvas protection to a loaded image
 * @param img - Loaded image element
 */
const applyCanvasProtectionToLoadedImage = (img: HTMLImageElement): void => {
  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Set canvas dimensions
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  
  // Draw image on canvas
  ctx.drawImage(img, 0, 0);
  
  // Add subtle watermark
  addWatermark(ctx, canvas.width, canvas.height);
  
  // Replace image with canvas
  const parent = img.parentNode;
  if (!parent) return;
  
  // Copy attributes from img to canvas
  canvas.className = img.className;
  canvas.id = img.id;
  canvas.style.cssText = img.style.cssText;
  canvas.style.display = 'block';
  canvas.style.maxWidth = '100%';
  canvas.style.height = 'auto';
  
  // Add protection attributes
  canvas.setAttribute('data-protected', 'true');
  canvas.setAttribute('data-copyright', 'WebZ Wave Solutions');
  
  // Replace image with canvas
  parent.replaceChild(canvas, img);
  
  // Add event listeners to canvas
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
};

/**
 * Add watermark to canvas
 * @param ctx - Canvas context
 * @param width - Canvas width
 * @param height - Canvas height
 */
const addWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
  // Save context state
  ctx.save();
  
  // Configure watermark
  ctx.globalAlpha = 0.15; // Subtle transparency
  ctx.fillStyle = '#ffffff';
  ctx.font = `${Math.max(width / 30, 12)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Rotate canvas
  ctx.translate(width / 2, height / 2);
  ctx.rotate(-Math.PI / 6); // Rotate 30 degrees
  
  // Draw watermark text
  const text = '© WebZ Wave Solutions';
  ctx.fillText(text, 0, 0);
  
  // Restore context state
  ctx.restore();
};

/**
 * Create a protective overlay for an image
 * @param img - Image element to protect
 */
const createProtectiveOverlay = (img: HTMLImageElement): void => {
  // Get parent element
  const parent = img.parentElement;
  if (!parent) return;
  
  // Set parent position if not already set
  if (getComputedStyle(parent).position === 'static') {
    parent.style.position = 'relative';
  }
  
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'image-protective-overlay';
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = '10';
  overlay.style.background = 'transparent';
  overlay.style.cursor = 'default';
  
  // Add event listeners to overlay
  overlay.addEventListener('contextmenu', (e) => e.preventDefault());
  overlay.addEventListener('mousedown', (e) => e.preventDefault());
  
  // Add overlay to parent
  parent.appendChild(overlay);
};

/**
 * Add CSS styles for image protection
 */
const addImageProtectionStyles = (): void => {
  const style = document.createElement('style');
  style.innerHTML = `
    .protected-image {
      -webkit-user-drag: none;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    .image-protective-overlay {
      -webkit-user-drag: none;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    
    /* Disable image saving from context menu in Firefox */
    img::selection {
      background-color: transparent;
    }
    
    /* Disable image saving from context menu in WebKit browsers */
    img::-webkit-selection {
      background-color: transparent;
    }
  `;
  
  document.head.appendChild(style);
};
