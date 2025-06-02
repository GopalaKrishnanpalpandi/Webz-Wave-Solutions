import { useEffect, useRef } from 'react';

interface ImageProtectionOptions {
  disableSave?: boolean;
  disableDrag?: boolean;
  addWatermark?: boolean;
  watermarkText?: string;
  blurOnRightClick?: boolean;
}

/**
 * Custom hook to protect images from being easily copied or saved
 * @param options - Configuration options for image protection
 */
const useImageProtection = (options: ImageProtectionOptions = {}) => {
  const {
    disableSave = true,
    disableDrag = true,
    addWatermark = false,
    watermarkText = '© WebZ Wave Solutions',
    blurOnRightClick = true,
  } = options;

  const imageRefs = useRef<HTMLImageElement[]>([]);

  // Function to add an image to the refs collection
  const addImageRef = (el: HTMLImageElement | null) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  useEffect(() => {
    const images = imageRefs.current;

    // Apply protection to each image
    images.forEach(img => {
      // Disable dragging
      if (disableDrag) {
        img.setAttribute('draggable', 'false');
        img.style.userSelect = 'none';
        img.style.webkitUserDrag = 'none';
      }

      // Add data attributes for tracking
      img.setAttribute('data-protected', 'true');
      img.setAttribute('data-owner', watermarkText);
    });

    // Global event handlers
    const handleContextMenu = (e: MouseEvent) => {
      if (e.target instanceof HTMLImageElement && disableSave) {
        e.preventDefault();
        
        // Apply blur effect on right-click if enabled
        if (blurOnRightClick) {
          const img = e.target as HTMLImageElement;
          const originalFilter = img.style.filter;
          
          // Add blur
          img.style.filter = `${originalFilter} blur(10px)`;
          
          // Remove blur after a short delay
          setTimeout(() => {
            img.style.filter = originalFilter;
          }, 1000);
        }
        
        return false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Ctrl+S, Ctrl+C on images
      if (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'c' || e.key === 'C')) {
        // Check if an image is selected or in focus
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLImageElement) {
          e.preventDefault();
          return false;
        }
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Add watermark if enabled
    if (addWatermark) {
      const style = document.createElement('style');
      style.innerHTML = `
        img[data-protected="true"]::after {
          content: "${watermarkText}";
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: white;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 5px;
          font-size: 12px;
          border-radius: 3px;
          pointer-events: none;
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup function
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [disableSave, disableDrag, addWatermark, watermarkText, blurOnRightClick]);

  return { addImageRef };
};

export default useImageProtection;
