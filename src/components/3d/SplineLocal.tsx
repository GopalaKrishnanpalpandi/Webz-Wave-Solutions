import React, { useEffect, useRef, useState } from 'react';

interface SplineLocalProps {
  fileName: string;
  className?: string;
}

/**
 * Component to load local Spline files using the Spline runtime
 */
const SplineLocal: React.FC<SplineLocalProps> = ({
  fileName,
  className = "w-full h-full",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [splineApp, setSplineApp] = useState<unknown>(null);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const loadSplineFile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check if we can use eval (required for Spline runtime)
        try {
          // Test if eval is available
          eval('1+1');
        } catch (evalError) {
          throw new Error('Content Security Policy blocks JavaScript evaluation. Please update CSP to include \'unsafe-eval\' for Spline 3D content.');
        }

        // Load Spline runtime
        const { Application } = await import('@splinetool/runtime');
        
        if (canvasRef.current) {
          // Create Spline application
          const app = new Application(canvasRef.current);
          setSplineApp(app);
          
          // Load the local Spline file
          const fileUrl = `/${fileName}`;
          console.log('Loading Spline file from:', fileUrl);
          
          await app.load(fileUrl);
          
          console.log('Spline file loaded successfully');
          setIsLoaded(true);
          setIsLoading(false);
          
          cleanup = () => {
            if (app && typeof app.dispose === 'function') {
              app.dispose();
            }
          };
        }
      } catch (err) {
        console.error('Error loading Spline file:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        
        // Provide specific error messages for common CSP issues
        if (errorMessage.includes('unsafe-eval') || errorMessage.includes('Content Security Policy')) {
          setError(`CSP Error: Content Security Policy is blocking 3D content. The 'unsafe-eval' directive is required for Spline runtime.`);
        } else if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
          setError(`Network Error: Could not load 3D scene file. Please check if the file exists at /${fileName}`);
        } else {
          setError(`Failed to load 3D scene: ${errorMessage}`);
        }
        setIsLoading(false);
      }
    };

    loadSplineFile();

    return () => {
      if (cleanup) cleanup();
    };
  }, [fileName]);

  if (error) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center h-full bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div className="text-center p-6 max-w-md">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">3D Scene Error</h3>
            <p className="text-red-600 dark:text-red-300 text-sm mb-4">{error}</p>
            
            {error.includes('CSP') && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                <p className="text-yellow-800 dark:text-yellow-200 text-xs">
                  <strong>Fix:</strong> The Content Security Policy has been updated. Please refresh the page to load the 3D content.
                </p>
              </div>
            )}
            
            <button 
              onClick={() => window.location.reload()} 
              className="bg-brand-purple hover:bg-brand-purple/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading 3D Scene</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Loading local Spline file...</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Spline canvas */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full rounded-lg shadow-2xl transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ minHeight: '400px' }}
        />
        

      </div>
    </div>
  );
};

export default SplineLocal;
