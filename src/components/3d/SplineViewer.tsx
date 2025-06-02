import React, { useEffect, useRef, useState } from 'react';

// Declare Spline types for TypeScript
declare global {
  interface Window {
    Spline?: any;
  }
}

interface SplineViewerProps {
  src: string;
  className?: string;
  fallbackImage?: string;
  fallbackAlt?: string;
  loading?: boolean;
  useFallback?: boolean;
}

/**
 * SplineViewer component for embedding Spline 3D scenes
 * Provides fallback image support and loading states
 */
const SplineViewer: React.FC<SplineViewerProps> = ({
  src,
  className = "w-full h-full",
  fallbackImage = "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  fallbackAlt = "3D Digital Solutions",
  loading = true,
  useFallback = false,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showFallback, setShowFallback] = useState(useFallback);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const [useRuntime, setUseRuntime] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Set a timeout to show fallback if Spline takes too long to load
    const fallbackTimer = setTimeout(() => {
      if (!isLoaded && !showFallback) {
        setLoadingTimeout(true);
        // Try runtime approach first before showing fallback
        setUseRuntime(true);
      }
    }, 5000); // Try runtime after 5 seconds

    // Final fallback timer
    const finalFallbackTimer = setTimeout(() => {
      if (!isLoaded) {
        setShowFallback(true);
      }
    }, 10000); // Show fallback after 10 seconds total

    return () => {
      clearTimeout(fallbackTimer);
      clearTimeout(finalFallbackTimer);
    };
  }, [isLoaded, showFallback]);

  // Load Spline runtime
  useEffect(() => {
    if (useRuntime && canvasRef.current && !isLoaded) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.0.35/build/spline-viewer.js';
      script.onload = () => {
        // Initialize Spline viewer
        if (canvasRef.current) {
          const viewer = document.createElement('spline-viewer');
          viewer.setAttribute('url', src);
          viewer.style.width = '100%';
          viewer.style.height = '100%';
          viewer.style.borderRadius = '0.5rem';

          viewer.addEventListener('load', () => {
            setIsLoaded(true);
            setHasError(false);
            setShowFallback(false);
          });

          viewer.addEventListener('error', () => {
            setHasError(true);
            setShowFallback(true);
          });

          canvasRef.current.parentNode?.replaceChild(viewer, canvasRef.current);
        }
      };
      script.onerror = () => {
        setHasError(true);
        setShowFallback(true);
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [useRuntime, src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    setShowFallback(false);
  };

  const handleError = () => {
    setHasError(true);
    setShowFallback(true);
  };

  const retrySpline = () => {
    setShowFallback(false);
    setHasError(false);
    setIsLoaded(false);
    setLoadingTimeout(false);
    setUseRuntime(false);

    // Force iframe reload
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  // If there's an error or we should show fallback, render the fallback image
  if (hasError || showFallback) {
    return (
      <div className={className}>
        <div className="relative w-full h-full">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple via-brand-blue to-brand-teal rounded-lg blur-lg opacity-50 animate-pulse-slow"></div>
          <img
            src={fallbackImage}
            alt={fallbackAlt}
            className="relative rounded-lg shadow-2xl w-full h-full object-cover"
            style={{ minHeight: '400px' }}
          />
          {loadingTimeout && (
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              3D Timeout
            </div>
          )}
          {hasError && (
            <div className="absolute top-4 right-4 bg-red-500/80 text-white px-3 py-1 rounded-full text-sm">
              3D Error
            </div>
          )}
          {(hasError || loadingTimeout) && (
            <div className="absolute bottom-4 right-4">
              <button
                onClick={retrySpline}
                className="bg-brand-purple hover:bg-brand-purple/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Try 3D Again
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="relative w-full h-full">
        {/* Loading indicator */}
        {loading && !isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg z-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
              <p className="text-gray-600 dark:text-gray-300">
                {useRuntime ? 'Loading 3D Runtime...' : 'Loading 3D Experience...'}
              </p>
            </div>
          </div>
        )}

        {/* Spline iframe - hide when using runtime */}
        {!useRuntime && (
          <iframe
            ref={iframeRef}
            src={src}
            frameBorder="0"
            width="100%"
            height="100%"
            className={`rounded-lg shadow-2xl transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ minHeight: '400px', border: 'none' }}
            onLoad={handleLoad}
            onError={handleError}
            title="3D Interactive Scene"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-top-navigation-by-user-activation"
            allowFullScreen
            loading="lazy"
          />
        )}

        {/* Canvas for Spline runtime */}
        {useRuntime && (
          <canvas
            ref={canvasRef}
            className={`rounded-lg shadow-2xl transition-opacity duration-500 w-full h-full ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ minHeight: '400px' }}
          />
        )}

        {/* 3D indicator badge */}
        {isLoaded && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-brand-purple to-brand-blue text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            Interactive 3D
          </div>
        )}
      </div>
    </div>
  );
};

export default SplineViewer;
