import React, { useEffect, useRef, useState } from 'react';

interface SplineAlternativeProps {
  url: string;
  className?: string;
}

/**
 * Alternative approach using direct DOM manipulation
 */
const SplineAlternative: React.FC<SplineAlternativeProps> = ({
  url,
  className = "w-full h-full",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [method, setMethod] = useState<string>('');

  useEffect(() => {
    const tryDifferentMethods = async () => {
      if (!containerRef.current) return;

      // Method 1: Direct iframe injection
      const tryIframe = () => {
        return new Promise<void>((resolve, reject) => {
          const iframe = document.createElement('iframe');
          iframe.src = url;
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = 'none';
          iframe.style.borderRadius = '0.5rem';
          iframe.frameBorder = '0';
          
          const timeout = setTimeout(() => {
            reject(new Error('Iframe timeout'));
          }, 10000);
          
          iframe.onload = () => {
            clearTimeout(timeout);
            setMethod('Direct Iframe');
            setStatus('loaded');
            resolve();
          };
          
          iframe.onerror = () => {
            clearTimeout(timeout);
            reject(new Error('Iframe failed'));
          };
          
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(iframe);
          }
        });
      };

      // Method 2: Object embed
      const tryObject = () => {
        return new Promise<void>((resolve, reject) => {
          const obj = document.createElement('object');
          obj.data = url;
          obj.type = 'text/html';
          obj.style.width = '100%';
          obj.style.height = '100%';
          obj.style.borderRadius = '0.5rem';
          
          const timeout = setTimeout(() => {
            reject(new Error('Object timeout'));
          }, 10000);
          
          obj.onload = () => {
            clearTimeout(timeout);
            setMethod('Object Embed');
            setStatus('loaded');
            resolve();
          };
          
          obj.onerror = () => {
            clearTimeout(timeout);
            reject(new Error('Object failed'));
          };
          
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(obj);
          }
        });
      };

      // Method 3: Fetch and inject
      const tryFetch = async () => {
        try {
          const response = await fetch(url, { mode: 'no-cors' });
          if (response.ok) {
            setMethod('Fetch Success');
            setStatus('loaded');
            // Create a simple iframe as fallback
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.borderRadius = '0.5rem';
            
            if (containerRef.current) {
              containerRef.current.innerHTML = '';
              containerRef.current.appendChild(iframe);
            }
          } else {
            throw new Error('Fetch failed');
          }
        } catch (error) {
          throw new Error('Fetch method failed');
        }
      };

      // Try methods in sequence
      try {
        console.log('Trying iframe method...');
        await tryIframe();
      } catch (error) {
        console.log('Iframe failed, trying object method...', error);
        try {
          await tryObject();
        } catch (error2) {
          console.log('Object failed, trying fetch method...', error2);
          try {
            await tryFetch();
          } catch (error3) {
            console.log('All methods failed:', error3);
            setStatus('error');
            setMethod('All methods failed');
          }
        }
      }
    };

    tryDifferentMethods();
  }, [url]);

  return (
    <div className={className}>
      <div className="relative w-full h-full">
        {/* Loading indicator */}
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg z-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
              <p className="text-gray-600 dark:text-gray-300">Trying different loading methods...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20 rounded-lg z-10">
            <div className="text-center p-6">
              <div className="text-red-500 mb-3">❌</div>
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">3D Content Blocked</h3>
              <p className="text-red-600 dark:text-red-300 text-sm mb-4">
                All loading methods failed. This may be due to:
              </p>
              <ul className="text-left text-sm text-red-600 dark:text-red-300 space-y-1">
                <li>• Browser security policies</li>
                <li>• Network restrictions</li>
                <li>• CORS issues</li>
                <li>• Ad blockers</li>
              </ul>
            </div>
          </div>
        )}

        {/* Content container */}
        <div
          ref={containerRef}
          className={`w-full h-full rounded-lg transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ minHeight: '400px' }}
        />

        {/* Success indicator */}
        {status === 'loaded' && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {method} ✓
          </div>
        )}

        {/* Debug info */}
        {status !== 'loading' && (
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-xs">
            Method: {method}
          </div>
        )}
      </div>
    </div>
  );
};

export default SplineAlternative;
