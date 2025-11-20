// components/Menu.tsx
'use client';

import { useState, useEffect } from 'react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  useEffect(() => {
    // Load settings from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedUnits = localStorage.getItem('units') as 'metric' | 'imperial' || 'metric';
    
    setDarkMode(savedDarkMode);
    setUnits(savedUnits);
  }, []);

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleUnitsChange = (newUnits: 'metric' | 'imperial') => {
    setUnits(newUnits);
    localStorage.setItem('units', newUnits);
    // Reload to apply unit changes
    window.location.reload();
  };

  const handleInstall = () => {
    // This will be handled by the InstallPrompt component
    const installEvent = new Event('showInstallPrompt');
    window.dispatchEvent(installEvent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-kashmir-dark">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 space-y-2">
            <div className="menu-item">
              <span className="text-sm text-gray-500">Version</span>
              <p className="font-semibold">1.0.0</p>
            </div>

            <div className="menu-item">
              <span className="text-sm text-gray-500">About App</span>
              <p className="text-gray-700">Kashmir-inspired weather forecasts with beautiful UI</p>
            </div>

            <div className="menu-item">
              <span className="text-sm text-gray-500">About Developer</span>
              <p className="text-gray-700">Built with ❤️ for Kashmir</p>
            </div>

            <div className="menu-item">
              <span className="text-sm text-gray-500">Contact Us</span>
              <p className="text-gray-700">support@skykash.app</p>
            </div>

            {/* Settings */}
            <div className="menu-item">
              <span className="text-sm text-gray-500">Settings</span>
              <div className="space-y-4 mt-2">
                {/* Dark Mode Toggle */}
                <div className="flex justify-between items-center">
                  <span>Dark Mode</span>
                  <button
                    onClick={handleDarkModeToggle}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                      darkMode ? 'bg-kashmir-blue' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        darkMode ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Units Toggle */}
                <div className="flex justify-between items-center">
                  <span>Units</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUnitsChange('metric')}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        units === 'metric' 
                          ? 'bg-kashmir-blue text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      °C
                    </button>
                    <button
                      onClick={() => handleUnitsChange('imperial')}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        units === 'imperial' 
                          ? 'bg-kashmir-blue text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      °F
                    </button>
                  </div>
                </div>

                {/* Install App */}
                <button
                  onClick={handleInstall}
                  className="w-full btn-secondary text-sm py-2"
                >
                  Install App
                </button>
              </div>
            </div>

            <div className="menu-item">
              <a href="/disclaimer" className="text-kashmir-blue hover:underline">
                Disclaimer
              </a>
            </div>

            <div className="menu-item">
              <a href="/privacy" className="text-kashmir-blue hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              Made with ❄️ for Kashmir
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .menu-item {
          @apply p-4 rounded-lg hover:bg-gray-50 transition-colors border-b border-gray-100;
        }
      `}</style>
    </div>
  );
}
