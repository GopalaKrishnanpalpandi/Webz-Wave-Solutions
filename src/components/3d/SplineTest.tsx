import React from 'react';

/**
 * Minimal test component for Spline 3D embed
 * Uses the exact embed code provided by Spline
 */
const SplineTest: React.FC = () => {
  return (
    <div className="w-full h-96 relative">
      <iframe
        src='https://my.spline.design/celestialflowabstractdigitalform-ySiLbRvR1pLZIEeGlIPxe5xB/'
        frameBorder='0'
        width='100%'
        height='100%'
        className="rounded-lg"
        title="Spline 3D Scene"
        allow="accelerometer *; autoplay *; camera *; clipboard-write *; encrypted-media *; fullscreen *; geolocation *; gyroscope *; magnetometer *; microphone *; midi *; payment *; picture-in-picture *; publickey-credentials-get *; screen-wake-lock *; sync-xhr *; usb *; web-share *; xr-spatial-tracking *"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-pointer-lock allow-orientation-lock allow-modals"
        allowFullScreen
      />
      
      {/* Simple indicator */}
      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
        3D Test
      </div>
    </div>
  );
};

export default SplineTest;
