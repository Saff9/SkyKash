// hooks/useDynamicTheme.ts
'use client';

import { useEffect } from 'react';

export function useDynamicTheme(weatherCondition: string, temperature: number) {
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove(
      'theme-sunny', 'theme-rainy', 'theme-snowy', 'theme-cloudy',
      'theme-hot', 'theme-cold', 'theme-moderate'
    );

    // Apply theme based on weather condition
    if (weatherCondition.toLowerCase().includes('sunny') || weatherCondition.toLowerCase().includes('clear')) {
      root.classList.add('theme-sunny');
    } else if (weatherCondition.toLowerCase().includes('rain')) {
      root.classList.add('theme-rainy');
    } else if (weatherCondition.toLowerCase().includes('snow')) {
      root.classList.add('theme-snowy');
    } else if (weatherCondition.toLowerCase().includes('cloud')) {
      root.classList.add('theme-cloudy');
    }

    // Apply theme based on temperature
    if (temperature > 30) {
      root.classList.add('theme-hot');
    } else if (temperature < 10) {
      root.classList.add('theme-cold');
    } else {
      root.classList.add('theme-moderate');
    }
  }, [weatherCondition, temperature]);
}

// components/ThemeIndicator.tsx
'use client';

interface ThemeIndicatorProps {
  weatherCondition: string;
  temperature: number;
}

export default function ThemeIndicator({ weatherCondition, temperature }: ThemeIndicatorProps) {
  const getThemeInfo = () => {
    if (weatherCondition.toLowerCase().includes('sunny')) {
      return { emoji: '☀️', message: 'Bright & Sunny Theme Active' };
    } else if (weatherCondition.toLowerCase().includes('rain')) {
      return { emoji: '🌧️', message: 'Cool & Rainy Theme Active' };
    } else if (weatherCondition.toLowerCase().includes('snow')) {
      return { emoji: '❄️', message: 'Winter Wonderland Theme Active' };
    } else if (weatherCondition.toLowerCase().includes('cloud')) {
      return { emoji: '☁️', message: 'Soft & Cloudy Theme Active' };
    } else {
      return { emoji: '🌈', message: 'Dynamic Theme Active' };
    }
  };

  const themeInfo = getThemeInfo();

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{themeInfo.emoji}</span>
          <div>
            <p className="text-sm font-semibold text-kashmir-light-neutral-700 dark:text-kashmir-dark-neutral-300">
              Dynamic Theme
            </p>
            <p className="text-xs text-kashmir-light-neutral-500 dark:text-kashmir-dark-neutral-500">
              {themeInfo.message}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-kashmir-light-blue-600 dark:text-kashmir-dark-blue-400">
            Auto
          </p>
          <p className="text-xs text-kashmir-light-neutral-500 dark:text-kashmir-dark-neutral-500">
            AI Powered
          </p>
        </div>
      </div>
    </div>
  );
}
