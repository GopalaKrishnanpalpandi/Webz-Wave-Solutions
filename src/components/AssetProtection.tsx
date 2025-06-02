import { useEffect } from 'react';
import { initAssetProtection } from '@/utils/assetProtection';

interface AssetProtectionProps {
  disableRightClick?: boolean;
  disableKeyboardShortcuts?: boolean;
  disableImageDragging?: boolean;
  protectImages?: boolean;
  detectDevTools?: boolean;
  addSourceCodeWarning?: boolean;
}

/**
 * Component that applies asset protection measures to the website
 * This component doesn't render anything visible but adds protection features
 */
const AssetProtection: React.FC<AssetProtectionProps> = ({
  disableRightClick = true,
  disableKeyboardShortcuts = true,
  disableImageDragging = true,
  protectImages = true,
  detectDevTools = false,
  addSourceCodeWarning = true,
}) => {
  useEffect(() => {
    // Initialize asset protection with the provided options
    initAssetProtection({
      disableRightClick,
      disableKeyboardShortcuts,
      disableImageDragging,
      protectImages,
      detectDevTools,
      addSourceCodeWarning,
    });

    // Add a warning message to the console
    console.log(
      '%c⚠️ Security Notice',
      'color: red; font-size: 24px; font-weight: bold;'
    );
    console.log(
      '%cThis website is protected against unauthorized copying and inspection.',
      'color: red; font-size: 16px;'
    );
    console.log(
      '%cAll actions are being monitored and logged.',
      'color: red; font-size: 16px;'
    );

    // Return cleanup function
    return () => {
      // No cleanup needed as these are permanent changes
    };
  }, [
    disableRightClick,
    disableKeyboardShortcuts,
    disableImageDragging,
    protectImages,
    detectDevTools,
    addSourceCodeWarning,
  ]);

  // This component doesn't render anything visible
  return null;
};

export default AssetProtection;
