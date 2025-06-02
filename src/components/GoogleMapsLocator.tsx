import React, { useEffect, useRef } from 'react';

interface GoogleMapsLocatorProps {
  apiKey?: string;
  className?: string;
}

const GoogleMapsLocator: React.FC<GoogleMapsLocatorProps> = ({ 
  apiKey = "YOUR_API_KEY_HERE", 
  className = "h-64 md:h-96 rounded-lg overflow-hidden shadow-lg" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef<boolean>(false);

  useEffect(() => {
    // Only load scripts once
    if (scriptLoaded.current) return;
    
    // Create and load the Google Maps API script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js';
      script.async = true;
      document.body.appendChild(script);
      
      // Create API loader element
      const apiLoader = document.createElement('gmpx-api-loader');
      apiLoader.setAttribute('key', apiKey);
      apiLoader.setAttribute('solution-channel', 'GMP_QB_locatorplus_v11_c');
      document.body.appendChild(apiLoader);
      
      scriptLoaded.current = true;
    };

    loadGoogleMapsScript();
    
    // Configure the store locator when DOM is loaded
    const configureLocator = async () => {
      if (!containerRef.current) return;
      
      // Wait for custom elements to be defined
      if (customElements.get('gmpx-store-locator')) {
        const locator = document.createElement('gmpx-store-locator');
        locator.setAttribute('map-id', 'DEMO_MAP_ID');
        
        // Clear container and append the locator
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
          containerRef.current.appendChild(locator);
        }
        
        // Configure the locator with our settings
        const CONFIGURATION = {
          "locations": [
            {
              "title": "Webz Wave Solutions",
              "address1": "395 , Sarojini Naidu Street , Avarampalayam Road",
              "address2": "Coimbatore, Tamil Nadu, India",
              "coords": {"lat": 11.023636, "lng": 76.978019},
              "placeId": "ChIJRRZBtfEJoQsRUB_fcIVBtDM"
            }
          ],
          "mapOptions": {
            "center": {"lat": 11.023636, "lng": 76.978019},
            "fullscreenControl": true,
            "mapTypeControl": false,
            "streetViewControl": true,
            "zoom": 15,
            "zoomControl": true,
            "maxZoom": 20,
            "mapId": ""
          },
          "mapsApiKey": apiKey,
          "capabilities": {
            "input": false,
            "autocomplete": false,
            "directions": true,
            "distanceMatrix": false,
            "details": true,
            "actions": false
          }
        };
        
        // @ts-ignore - configureFromQuickBuilder is a method added by the Google Maps library
        locator.configureFromQuickBuilder(CONFIGURATION);
      } else {
        // If the custom element isn't defined yet, wait and try again
        setTimeout(configureLocator, 100);
      }
    };
    
    // Run configuration after scripts are loaded
    const handleScriptLoad = () => {
      configureLocator();
    };
    
    // Set up event listener for when DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleScriptLoad);
    } else {
      handleScriptLoad();
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('DOMContentLoaded', handleScriptLoad);
    };
  }, [apiKey]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ 
        minHeight: '400px',
        width: '100%',
        // CSS variables to customize the appearance
        '--gmpx-color-surface': '#fff',
        '--gmpx-color-on-surface': '#212121',
        '--gmpx-color-on-surface-variant': '#757575',
        '--gmpx-color-primary': '#6d28d9', // Brand purple
        '--gmpx-color-outline': '#e0e0e0',
        '--gmpx-fixed-panel-width-row-layout': '28.5em',
        '--gmpx-fixed-panel-height-column-layout': '65%',
        '--gmpx-font-family-base': '"Roboto", sans-serif',
        '--gmpx-font-family-headings': '"Roboto", sans-serif',
        '--gmpx-font-size-base': '0.875rem',
        '--gmpx-hours-color-open': '#188038',
        '--gmpx-hours-color-closed': '#d50000',
        '--gmpx-rating-color': '#ffb300',
        '--gmpx-rating-color-empty': '#e0e0e0',
      } as React.CSSProperties}
    >
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading map...</p>
      </div>
    </div>
  );
};

export default GoogleMapsLocator;
