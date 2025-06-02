import React, { useEffect } from 'react';
import { initContentProtection } from '@/utils/contentProtection';
import { initImageProtection } from '@/utils/imageProtection';

interface ContentProtectionProviderProps {
  children: React.ReactNode;
  disableRightClick?: boolean;
  disableSelection?: boolean;
  disableCopy?: boolean;
  disableDeveloperTools?: boolean;
  protectImages?: boolean;
  watermarkText?: string;
}

/**
 * ContentProtectionProvider Component
 * 
 * A provider component that wraps the entire application and applies
 * various content protection measures.
 */
const ContentProtectionProvider: React.FC<ContentProtectionProviderProps> = ({
  children,
  disableRightClick = true,
  disableSelection = false,
  disableCopy = false,
  disableDeveloperTools = true,
  protectImages = true,
  watermarkText = '© WebZ Wave Solutions'
}) => {
  useEffect(() => {
    // Initialize content protection
    initContentProtection();
    
    // Initialize image protection if enabled
    if (protectImages) {
      initImageProtection();
    }
    
    // Apply additional protection measures based on props
    if (disableRightClick) {
      applyRightClickProtection();
    }
    
    if (disableSelection) {
      applySelectionProtection();
    }
    
    if (disableCopy) {
      applyCopyProtection();
    }
    
    if (disableDeveloperTools) {
      applyDevToolsProtection();
    }
    
    // Add custom CSS for protection
    addProtectionStyles();
    
    // Add copyright metadata
    addCopyrightMetadata(watermarkText);
    
    // Add warning in console
    addConsoleWarning(watermarkText);
    
  }, [disableRightClick, disableSelection, disableCopy, disableDeveloperTools, protectImages, watermarkText]);
  
  /**
   * Apply right-click protection
   */
  const applyRightClickProtection = (): void => {
    document.addEventListener('contextmenu', (e) => {
      // Allow right-click on form elements
      const target = e.target as HTMLElement;
      const isFormElement = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.isContentEditable;
      
      if (!isFormElement) {
        e.preventDefault();
        showCopyrightNotice(watermarkText);
      }
    });
  };
  
  /**
   * Apply text selection protection
   */
  const applySelectionProtection = (): void => {
    // Add CSS to disable selection
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      input, textarea, [contenteditable="true"] {
        -webkit-user-select: auto;
        -moz-user-select: auto;
        -ms-user-select: auto;
        user-select: auto;
      }
    `;
    document.head.appendChild(style);
  };
  
  /**
   * Apply copy protection
   */
  const applyCopyProtection = (): void => {
    document.addEventListener('copy', (e) => {
      // Allow copying in form elements
      const target = e.target as HTMLElement;
      const isFormElement = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.isContentEditable;
      
      if (!isFormElement) {
        e.preventDefault();
        showCopyrightNotice(watermarkText);
      }
    });
    
    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Allow in form elements
      const target = e.target as HTMLElement;
      const isFormElement = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.isContentEditable;
      
      if (isFormElement) return;
      
      // Ctrl+C, Ctrl+X, Ctrl+A
      if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a')) {
        e.preventDefault();
        showCopyrightNotice(watermarkText);
      }
    });
  };
  
  /**
   * Apply developer tools protection
   */
  const applyDevToolsProtection = (): void => {
    // Basic protection - determined users can bypass this
    setInterval(() => {
      const devtoolsOpen = 
        window.outerWidth - window.innerWidth > 160 || 
        window.outerHeight - window.innerHeight > 160;
      
      if (devtoolsOpen) {
        console.clear();
        console.warn(`
          ⚠️ WARNING ⚠️
          
          All content on this website is protected by copyright law.
          Unauthorized copying or distribution is prohibited.
          
          ${watermarkText}
        `);
      }
    }, 1000);
  };
  
  /**
   * Add protection styles
   */
  const addProtectionStyles = (): void => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Copyright notice */
      #copyright-notice {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
        max-width: 300px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transition: opacity 0.3s ease-in-out;
      }
      
      /* Image protection */
      img {
        -webkit-user-drag: none;
        -webkit-touch-callout: none;
      }
      
      /* Disable print */
      @media print {
        body {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  };
  
  /**
   * Add copyright metadata
   * @param copyright - Copyright text
   */
  const addCopyrightMetadata = (copyright: string): void => {
    // Add meta tags for copyright
    const metaTags = [
      { name: 'copyright', content: copyright },
      { name: 'author', content: 'WebZ Wave Solutions' },
      { name: 'robots', content: 'noarchive, noimageindex' }
    ];
    
    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.name = tag.name;
      meta.content = tag.content;
      document.head.appendChild(meta);
    });
  };
  
  /**
   * Add warning in console
   * @param copyright - Copyright text
   */
  const addConsoleWarning = (copyright: string): void => {
    console.log(`
      %c ⚠️ CONTENT PROTECTED ⚠️
      
      %cAll content on this website is protected by copyright law.
      Unauthorized copying or distribution is prohibited.
      
      ${copyright}
    `, 
    'color: red; font-size: 20px; font-weight: bold;', 
    'color: black; font-size: 14px;');
  };
  
  return <>{children}</>;
};

/**
 * Show copyright notice
 * @param copyright - Copyright text
 */
const showCopyrightNotice = (copyright: string): void => {
  // Check if notice already exists
  if (document.getElementById('copyright-notice')) return;
  
  const notice = document.createElement('div');
  notice.id = 'copyright-notice';
  
  notice.innerHTML = `
    <strong>Content Protected</strong>
    <p style="margin: 5px 0;">All content on this website is protected by copyright law and may not be reproduced without permission.</p>
    <p style="margin: 5px 0; font-size: 12px;">${copyright}</p>
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

export default ContentProtectionProvider;
