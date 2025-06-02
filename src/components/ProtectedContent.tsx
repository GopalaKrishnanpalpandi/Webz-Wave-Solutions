import React, { useEffect, useRef } from 'react';

interface ProtectedContentProps {
  children: React.ReactNode;
  className?: string;
  allowSelection?: boolean;
  showCopyrightOnCopy?: boolean;
  watermarkText?: string;
  priority?: 'high' | 'medium' | 'low';
}

/**
 * ProtectedContent Component
 * 
 * A component that wraps content and applies various protection measures
 * to prevent unauthorized copying of text and other content.
 */
const ProtectedContent: React.FC<ProtectedContentProps> = ({
  children,
  className = '',
  allowSelection = false,
  showCopyrightOnCopy = true,
  watermarkText = '© WebZ Wave Solutions',
  priority = 'medium'
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;
    
    // Apply protection based on priority
    if (priority === 'high') {
      applyHighProtection(contentElement);
    } else if (priority === 'medium') {
      applyMediumProtection(contentElement);
    } else {
      applyLowProtection(contentElement);
    }
    
    // Add copy event listener
    if (showCopyrightOnCopy) {
      const handleCopy = (e: ClipboardEvent) => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return;
        
        // Get selected text
        const selectedText = selection.toString();
        
        // Only modify if a substantial amount of text is copied
        if (selectedText.length > 30) {
          // Add copyright notice to copied text
          e.clipboardData?.setData(
            'text/plain',
            `${selectedText}\n\n${watermarkText}\nSource: ${window.location.href}`
          );
          e.preventDefault();
        }
      };
      
      contentElement.addEventListener('copy', handleCopy);
      
      return () => {
        contentElement.removeEventListener('copy', handleCopy);
      };
    }
  }, [priority, showCopyrightOnCopy, watermarkText]);
  
  /**
   * Apply high-level protection to content
   * @param element - Element to protect
   */
  const applyHighProtection = (element: HTMLElement): void => {
    // Disable selection
    if (!allowSelection) {
      element.style.userSelect = 'none';
      element.style.webkitUserSelect = 'none';
      element.style.msUserSelect = 'none';
      element.style.mozUserSelect = 'none';
    }
    
    // Disable context menu
    element.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
    
    // Add invisible spans between words to break scraping
    if (element.innerHTML && !element.getAttribute('data-protected')) {
      element.innerHTML = element.innerHTML.replace(
        /(\S+)(\s+)/g, 
        '$1<span style="display:none">.</span>$2'
      );
      element.setAttribute('data-protected', 'true');
    }
    
    // Add invisible watermark
    addInvisibleWatermark(element);
  };
  
  /**
   * Apply medium-level protection to content
   * @param element - Element to protect
   */
  const applyMediumProtection = (element: HTMLElement): void => {
    // Disable selection if not allowed
    if (!allowSelection) {
      element.style.userSelect = 'none';
      element.style.webkitUserSelect = 'none';
      element.style.msUserSelect = 'none';
      element.style.mozUserSelect = 'none';
    }
    
    // Disable context menu
    element.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  };
  
  /**
   * Apply low-level protection to content
   * @param element - Element to protect
   */
  const applyLowProtection = (element: HTMLElement): void => {
    // Only add copy event listener (already handled in useEffect)
  };
  
  /**
   * Add invisible watermark to content
   * @param element - Element to watermark
   */
  const addInvisibleWatermark = (element: HTMLElement): void => {
    // Add data attribute with copyright info
    element.setAttribute('data-copyright', watermarkText);
    
    // Add hidden span with copyright info
    const watermarkSpan = document.createElement('span');
    watermarkSpan.style.position = 'absolute';
    watermarkSpan.style.left = '-9999px';
    watermarkSpan.style.opacity = '0';
    watermarkSpan.innerText = watermarkText;
    element.appendChild(watermarkSpan);
  };
  
  return (
    <div 
      ref={contentRef}
      className={`protected-content ${className}`}
      data-protection-level={priority}
    >
      {children}
    </div>
  );
};

export default ProtectedContent;
