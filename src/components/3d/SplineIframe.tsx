import React, { useState } from 'react';

interface SplineIframeProps {
  url: string;
  className?: string;
}

/**
 * Simple iframe-based Spline embed as a fallback option
 */
const SplineIframe: React.FC<SplineIframeProps> = ({
  url,
  className = "w-full h-full",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={className}>
      <div className="relative w-full h-full">
        {/* Loading indicator */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg z-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700"></div>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-purple border-t-transparent absolute top-0 left-0"></div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Loading 3D Scene...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg z-10">
            <div className="text-center p-6">
              <div className="text-red-500 mb-3">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">3D Scene Unavailable</h3>
              <p className="text-red-600 dark:text-red-300 text-sm">The 3D scene could not be loaded</p>
            </div>
          </div>
        )}

        {/* Spline iframe - minimal configuration for testing */}
        <iframe
          src={url}
          frameBorder="0"
          width="100%"
          height="100%"
          className={`rounded-lg shadow-2xl transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            minHeight: '400px',
            border: 'none'
          }}
          onLoad={handleLoad}
          onError={handleError}
          title="Interactive 3D Scene"
        />

        {/* 3D indicator badge */}
        {isLoaded && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-brand-purple to-brand-blue text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>3D Active</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplineIframe;
