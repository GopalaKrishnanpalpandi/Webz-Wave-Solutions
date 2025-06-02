import React, { useState, useRef, ImgHTMLAttributes } from 'react';
import useImageProtection from '@/hooks/useImageProtection';

interface ProtectedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  watermarkText?: string;
  blurOnRightClick?: boolean;
  className?: string;
}

/**
 * A component that renders an image with copy protection
 */
const ProtectedImage: React.FC<ProtectedImageProps> = ({
  src,
  alt,
  watermarkText = '© WebZ Wave Solutions',
  blurOnRightClick = true,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addImageRef } = useImageProtection({
    disableSave: true,
    disableDrag: true,
    blurOnRightClick,
  });
  
  // Generate a unique ID for this image
  const imageId = useRef(`protected-img-${Math.random().toString(36).substring(2, 11)}`);
  
  // Add CSS to prevent selection and saving
  const baseStyles = {
    userSelect: 'none' as const,
    WebkitUserSelect: 'none' as const,
    MozUserSelect: 'none' as const,
    msUserSelect: 'none' as const,
    WebkitUserDrag: 'none' as const,
    KhtmlUserDrag: 'none' as const,
    MozUserDrag: 'none' as const,
    position: 'relative' as const,
    filter: isHovered ? 'none' : 'none',
  };

  // Handle mouse events
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  
  // Handle right-click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="relative" style={{ overflow: 'hidden' }}>
      <img
        id={imageId.current}
        ref={addImageRef}
        src={src}
        alt={alt}
        className={className}
        style={baseStyles}
        draggable="false"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
        {...props}
      />
      
      {/* Invisible watermark (not visible but present in the DOM) */}
      <div 
        style={{ 
          position: 'absolute', 
          bottom: 0, 
          right: 0, 
          opacity: 0, 
          fontSize: '1px', 
          color: 'transparent',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {watermarkText} - {new Date().toISOString()}
      </div>
      
      {/* Visible watermark on hover (optional) */}
      {isHovered && (
        <div 
          style={{ 
            position: 'absolute', 
            bottom: '10px', 
            right: '10px', 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            color: 'white', 
            padding: '4px 8px', 
            borderRadius: '4px', 
            fontSize: '12px',
            pointerEvents: 'none',
          }}
        >
          {watermarkText}
        </div>
      )}
    </div>
  );
};

export default ProtectedImage;
