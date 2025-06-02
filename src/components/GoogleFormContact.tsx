import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const GoogleFormContact = () => {
  const [showIframe, setShowIframe] = useState(true);
  const [loading, setLoading] = useState(true);

  // Google Form embed URL
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSe7YPcqqARfC4VyQ3q1fJ5U0xT70_diTEBMJx3o7l9Zd1XZAw/viewform?embedded=true";

  // Function to handle form loading state
  const handleIframeLoad = () => {
    setLoading(false);
  };

  // Function to reload the form (useful after submission)
  const reloadForm = () => {
    setLoading(true);
    setShowIframe(false);
    setTimeout(() => {
      setShowIframe(true);
    }, 100);
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {loading && (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading Google Form...</p>
          </div>
        )}

        {showIframe ? (
          <div className={`relative ${loading ? 'hidden' : 'block'}`}>
            <iframe
              src={googleFormUrl}
              width="100%"
              height="850"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              onLoad={handleIframeLoad}
              className="bg-transparent"
              title="Contact Form"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              referrerPolicy="origin"
            >
              Loading form...
            </iframe>
          </div>
        ) : null}

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">
                Powered by Google Forms
              </p>
              <p className="text-xs text-gray-500 italic">
                If the form is not visible, please try disabling any content blockers or ad blockers.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={reloadForm}
                className="text-xs"
              >
                Reload Form
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                asChild
              >
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe7YPcqqARfC4VyQ3q1fJ5U0xT70_diTEBMJx3o7l9Zd1XZAw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in New Tab
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
          💡 Alternative Contact Methods
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-400 mb-2">
          If the form above is blocked or not loading properly, you can{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe7YPcqqARfC4VyQ3q1fJ5U0xT70_diTEBMJx3o7l9Zd1XZAw/viewform"
            className="font-medium underline hover:text-blue-900 dark:hover:text-blue-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            access the form directly here
          </a>.
        </p>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          You can also reach us directly at{" "}
          <a
            href="mailto:webzwavesolutions@gmail.com"
            className="underline hover:text-blue-900 dark:hover:text-blue-200"
          >
            webzwavesolutions@gmail.com
          </a>{" "}
          or call us at{" "}
          <a
            href="tel:+919342336959"
            className="underline hover:text-blue-900 dark:hover:text-blue-200"
          >
            +91 9342336959
          </a>
        </p>
      </div>
    </div>
  );
};

export default GoogleFormContact;
