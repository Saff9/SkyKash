// components/InstallPrompt.tsx
'use client';

import { useState, useEffect } from 'react';

declare global {
  interface Window {
    deferredPrompt: any;
  }
}

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Show prompt after 6 seconds
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 6000);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      window.deferredPrompt = e;
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Listen for custom show install prompt event from menu
    const handleShowInstallPrompt = () => {
      setShowPrompt(true);
    };

    window.addEventListener('showInstallPrompt', handleShowInstallPrompt);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('showInstallPrompt', handleShowInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      const { outcome } = await window.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setShowPrompt(false);
      }
      
      window.deferredPrompt = null;
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again in this session
    sessionStorage.setItem('installPromptDismissed', 'true');
  };

  if (isInstalled || !showPrompt || sessionStorage.getItem('installPromptDismissed')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40">
      <div className="card p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-kashmir-blue rounded-xl flex items-center justify-center">
              <span className="text-2xl">❄️</span>
            </div>
            <div>
              <h3 className="font-bold text-kashmir-dark">Install SkyKash</h3>
              <p className="text-sm text-gray-600">Get the best weather experience</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleInstall}
              className="btn-primary text-sm px-4 py-2"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Dismiss"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
