
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface WaveAnimationProps {
  className?: string;
  color?: string;
  height?: number;
  width?: number;
  speed?: number;
  amplitude?: number;
  frequency?: number;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({
  className,
  color = "#6C3CE9", // Default to brand purple
  height = 60,
  width = 100,
  speed = 0.001, // Reduced from 0.01 to 0.001 for extremely slow, almost imperceptible wave movement
  amplitude = 20,
  frequency = 0.002, // Reduced from 0.005 to 0.002 for very gentle waves
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationStartTime: number;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas && ctx) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };

    // Initial setup
    setCanvasDimensions();

    // Handle resizing
    const resizeObserver = new ResizeObserver(() => {
      setCanvasDimensions();
    });
    
    if (canvas) {
      resizeObserver.observe(canvas);
    }

    // Drawing function
    const draw = (timestamp: number) => {
      if (!canvas || !ctx) return;

      if (animationStartTime === undefined) {
        animationStartTime = timestamp;
      }

      // Calculate elapsed time
      const elapsed = timestamp - animationStartTime;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the waves
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);

      for (let x = 0; x < canvas.width; x++) {
        // Create wave motion
        const y =
          Math.sin(x * frequency + elapsed * speed) * amplitude +
          canvas.height / 2;
        ctx.lineTo(x, y);
      }

      // Complete the wave path
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = color;
      ctx.fill();

      // Draw a second wave with slight offset
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      
      for (let x = 0; x < canvas.width; x++) {
        // Create wave motion with phase offset
        const y =
          Math.sin(x * frequency * 0.4 + elapsed * speed * 0.2) * amplitude * 0.7 + // Even slower second wave (0.4 → 0.2)
          canvas.height / 2 + 15;
        ctx.lineTo(x, y);
      }

      // Complete the second wave path
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      
      // Use a semi-transparent version of the color for the second wave
      const alpha = 0.5;
      const rgbValue = hexToRgb(color);
      ctx.fillStyle = `rgba(${rgbValue.r}, ${rgbValue.g}, ${rgbValue.b}, ${alpha})`;
      ctx.fill();
      
      requestRef.current = requestAnimationFrame(draw);
    };

    // Helper to convert hex color to RGB
    const hexToRgb = (hex: string) => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      const formattedHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    // Start animation
    requestRef.current = requestAnimationFrame(draw);

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [color, speed, amplitude, frequency]);

  return (
    <canvas 
      ref={canvasRef} 
      className={cn("w-full", className)}
      style={{ height: `${height}px`, width: `${width}%` }}
    />
  );
};

export default WaveAnimation;
