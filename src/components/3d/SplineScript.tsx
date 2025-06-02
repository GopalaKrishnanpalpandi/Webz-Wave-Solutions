import React, { useEffect, useRef, useState } from 'react';

interface SplineScriptProps {
  sceneId: string;
  className?: string;
}

/**
 * Alternative Spline implementation using script tag approach
 */
const SplineScript: React.FC<SplineScriptProps> = ({
  sceneId,
  className = "w-full h-full",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSplineScript = async () => {
      try {
        // Create script element
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.0/build/spline-viewer.js';
        
        script.onload = () => {
          if (containerRef.current) {
            // Clear container
            containerRef.current.innerHTML = '';
            
            // Create spline-viewer element
            const splineViewer = document.createElement('spline-viewer');
            splineViewer.setAttribute('url', `https://prod.spline.design/${sceneId}/scene.splinecode`);
            splineViewer.style.width = '100%';
            splineViewer.style.height = '100%';
            splineViewer.style.borderRadius = '0.5rem';
            
            // Add event listeners
            splineViewer.addEventListener('load', () => {
              console.log('Spline loaded via script method');
              setIsLoaded(true);
              setError(null);
            });
            
            splineViewer.addEventListener('error', (e) => {
              console.error('Spline script error:', e);
              setError('Failed to load 3D scene via script method');
            });
            
            containerRef.current.appendChild(splineViewer);
          }
        };
        
        script.onerror = () => {
          setError('Failed to load Spline script');
        };
        
        document.head.appendChild(script);
        
        return () => {
          if (document.head.contains(script)) {
            document.head.removeChild(script);
          }
        };
      } catch (err) {
        console.error('Error loading Spline script:', err);
        setError('Script loading error');
      }
    };

    loadSplineScript();
  }, [sceneId]);

  if (error) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center h-full bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-center p-6">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="relative w-full h-full">
        {/* Loading indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg z-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading 3D Script...</p>
            </div>
          </div>
        )}
        
        {/* Spline container */}
        <div
          ref={containerRef}
          className={`w-full h-full rounded-lg transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ minHeight: '400px' }}
        />
        
        {/* Success indicator */}
        {isLoaded && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Script Method ✓
          </div>
        )}
      </div>
    </div>
  );
};

export default SplineScript;
