import React from 'react';
import './RotatingCube.css';

interface RotatingCubeProps {
  size?: number;
  color?: string;
  className?: string;
  speed?: number;
}

const RotatingCube: React.FC<RotatingCubeProps> = ({
  size = 100,
  color = '#6d28d9',
  className = '',
  speed = 1,
}) => {
  const cubeStyle = {
    '--cube-size': `${size}px`,
    '--cube-color': color,
    '--cube-speed': `${20 / speed}s`,
  } as React.CSSProperties;

  return (
    <div className={`rotating-cube-container ${className}`}>
      <div className="rotating-cube" style={cubeStyle}>
        <div className="cube-face front"></div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
      </div>
    </div>
  );
};

export default RotatingCube;
