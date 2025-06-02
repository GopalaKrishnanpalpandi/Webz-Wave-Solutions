import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingShapesProps {
  count?: number;
  size?: number;
  colors?: string[];
  speed?: number;
  className?: string;
}

const FloatingShapes: React.FC<FloatingShapesProps> = ({
  count = 10,
  size = 30,
  colors = ['#6d28d9', '#0ea5e9', '#10b981', '#8b5cf6', '#ec4899'],
  speed = 0.5,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const shapesRef = useRef<HTMLDivElement[]>([]);
  const velocitiesRef = useRef<{ x: number; y: number; rotate: number }[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create shapes
    const shapes = [];
    const velocities = [];
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Clear any existing shapes
    container.innerHTML = '';
    shapesRef.current = [];

    for (let i = 0; i < count; i++) {
      // Randomly choose shape type
      const shapeType = Math.random() > 0.5 ? 'cube' : (Math.random() > 0.5 ? 'pyramid' : 'sphere');
      
      // Create shape element
      const shape = document.createElement('div');
      shape.className = `floating-shape ${shapeType}`;
      
      // Set random color
      const color = colors[Math.floor(Math.random() * colors.length)];
      shape.style.setProperty('--shape-color', color);
      
      // Set random size (variation)
      const randomSize = size * (0.5 + Math.random() * 0.8);
      shape.style.width = `${randomSize}px`;
      shape.style.height = `${randomSize}px`;
      
      // Set random position
      const x = Math.random() * (containerRect.width - randomSize);
      const y = Math.random() * (containerRect.height - randomSize);
      shape.style.left = `${x}px`;
      shape.style.top = `${y}px`;
      
      // Set random rotation
      const rotation = Math.random() * 360;
      shape.style.transform = `rotate(${rotation}deg) translateZ(0)`;
      
      // Set random opacity
      shape.style.opacity = (0.3 + Math.random() * 0.4).toString();
      
      // Set random velocity
      const velocity = {
        x: (Math.random() - 0.5) * speed,
        y: (Math.random() - 0.5) * speed,
        rotate: (Math.random() - 0.5) * speed * 0.5
      };
      
      container.appendChild(shape);
      shapes.push(shape);
      velocities.push(velocity);
    }
    
    shapesRef.current = shapes;
    velocitiesRef.current = velocities;
    
    // Animation loop
    const animate = () => {
      const containerRect = container.getBoundingClientRect();
      
      shapes.forEach((shape, index) => {
        const velocity = velocities[index];
        
        // Get current position
        let x = parseFloat(shape.style.left);
        let y = parseFloat(shape.style.top);
        let rotation = parseFloat(shape.style.transform.replace(/[^0-9.]/g, '')) || 0;
        
        // Update position
        x += velocity.x;
        y += velocity.y;
        rotation += velocity.rotate;
        
        // Boundary check
        const shapeWidth = parseFloat(shape.style.width);
        if (x <= 0 || x >= containerRect.width - shapeWidth) {
          velocity.x *= -1;
          x = Math.max(0, Math.min(x, containerRect.width - shapeWidth));
        }
        
        if (y <= 0 || y >= containerRect.height - shapeWidth) {
          velocity.y *= -1;
          y = Math.max(0, Math.min(y, containerRect.height - shapeWidth));
        }
        
        // Apply new position
        shape.style.left = `${x}px`;
        shape.style.top = `${y}px`;
        shape.style.transform = `rotate(${rotation}deg) translateZ(0)`;
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [count, size, colors, speed]);
  
  return (
    <div 
      ref={containerRef} 
      className={`floating-shapes-container ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
};

export default FloatingShapes;
