import React, { useEffect, useRef, useState } from 'react';

interface SplineEmbedProps {
  url: string;
  className?: string;
}

/**
 * Clean Spline 3D embed component using the official spline-viewer web component
 * No fallback images - focuses on getting the 3D scene to work properly
 */
const SplineEmbed: React.FC<SplineEmbedProps> = ({
  url,
  className = "w-full h-full",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  // Generate different URL formats to try
  const getUrlVariants = (originalUrl: string) => {
    const splineId = originalUrl.match(/([a-zA-Z0-9_-]+)(?:\/|$)/)?.[1] || '';
    return [
      originalUrl,
      `https://prod.spline.design/${splineId}/scene.splinecode`,
      `https://my.spline.design/celestialflowabstractdigitalform-${splineId}/`,
      `https://app.spline.design/${splineId}`,
    ].filter(Boolean);
  };

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const initializeSpline = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const urlVariants = getUrlVariants(url);
        const currentUrl = urlVariants[attemptCount] || url;

        // Check if spline-viewer is already loaded
        if (!customElements.get('spline-viewer')) {
          // Load the Spline viewer script
          const script = document.createElement('script');
          script.type = 'module';
          script.src = 'https://unpkg.com/@splinetool/viewer@1.9.0/build/spline-viewer.js';

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        if (containerRef.current) {
          // Clear any existing content
          containerRef.current.innerHTML = '';

          // Create spline-viewer element
          const viewer = document.createElement('spline-viewer') as any;
          viewer.url = currentUrl;

          console.log(`Attempting to load Spline with URL (attempt ${attemptCount + 1}):`, currentUrl);

          // Set styles
          Object.assign(viewer.style, {
            width: '100%',
            height: '100%',
            borderRadius: '0.5rem',
            minHeight: '400px',
            display: 'block'
          });

          // Add event listeners
          const handleLoad = () => {
            console.log('Spline scene loaded successfully');
            setIsLoaded(true);
            setIsLoading(false);
            setError(null);
          };

          const handleError = (e: any) => {
            console.error('Spline loading error:', e);
            console.error('URL attempted:', url);
            setError(`Failed to load 3D scene: ${e.message || 'Unknown error'}`);
            setIsLoading(false);
          };

          viewer.addEventListener('load', handleLoad);
          viewer.addEventListener('error', handleError);

          // Append to container
          containerRef.current.appendChild(viewer);

          cleanup = () => {
            viewer.removeEventListener('load', handleLoad);
            viewer.removeEventListener('error', handleError);
          };
        }
      } catch (err) {
        console.error('Error initializing Spline:', err);
        setError('Failed to initialize 3D viewer');
        setIsLoading(false);
      }
    };

    initializeSpline();

    return () => {
      if (cleanup) cleanup();
    };
  }, [url]);

  return (
    <div className={className}>
      <div className="relative w-full h-full">
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg z-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-brand-purple border-t-transparent absolute top-0 left-0"></div>
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading 3D Experience</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please wait while we prepare the interactive scene...</p>
              </div>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg z-10">
            <div className="text-center p-8">
              <div className="text-red-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">3D Scene Error</h3>
              <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        )}

        {/* Spline viewer container */}
        <div
          ref={containerRef}
          className={`rounded-lg shadow-2xl transition-all duration-700 w-full h-full ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ minHeight: '400px' }}
        />

        {/* 3D indicator badge */}
        {isLoaded && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm bg-opacity-90 animate-fade-in">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Interactive 3D</span>
            </div>
          </div>
        )}

        {/* Performance indicator */}
        {isLoaded && (
          <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs opacity-70">
            WebGL Enabled
          </div>
        )}
      </div>
    </div>
  );
};

export default SplineEmbed;
