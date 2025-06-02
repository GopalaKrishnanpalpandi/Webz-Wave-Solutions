import React, { useState, useRef, useEffect } from 'react';
import './FloatingCard.css';

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  maxTilt?: number;
  glareOpacity?: number;
  perspective?: number;
  transitionSpeed?: number;
}

const FloatingCard: React.FC<FloatingCardProps> = ({
  children,
  className = '',
  depth = 20,
  maxTilt = 10,
  glareOpacity = 0.1,
  perspective = 1000,
  transitionSpeed = 300,
}) => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const percentX = (mouseX - centerX) / (rect.width / 2);
    const percentY = (mouseY - centerY) / (rect.height / 2);
    
    const tiltX = -percentY * maxTilt;
    const tiltY = percentX * maxTilt;
    
    setStyle({
      transform: `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${depth}px)`,
      transition: isHovering ? `transform ${transitionSpeed}ms ease-out` : '',
    });
    
    // Update glare position
    const glareX = 50 + (percentX * 50);
    const glareY = 50 + (percentY * 50);
    
    setGlareStyle({
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareOpacity}), transparent)`,
    });
  };
  
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`,
      transition: `transform ${transitionSpeed}ms ease-out`,
    });
  };
  
  // Add subtle animation when not hovering
  useEffect(() => {
    if (!isHovering && cardRef.current) {
      const interval = setInterval(() => {
        const randomX = (Math.random() - 0.5) * 2;
        const randomY = (Math.random() - 0.5) * 2;
        
        setStyle({
          transform: `perspective(${perspective}px) rotateX(${randomX}deg) rotateY(${randomY}deg) translateZ(5px)`,
          transition: 'transform 5s ease-in-out',
        });
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isHovering, perspective]);
  
  return (
    <div 
      ref={cardRef}
      className={`floating-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <div className="floating-card-content">{children}</div>
      <div className="floating-card-glare" style={glareStyle}></div>
    </div>
  );
};

export default FloatingCard;
