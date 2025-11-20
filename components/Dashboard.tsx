// components/Dashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import Menu from './Menu';
import WeatherCard from './WeatherCard';
import InstallPrompt from './InstallPrompt';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }

    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      // Default to Srinagar, Kashmir
      const response = await fetch(`/api/weather?city=Srinagar`);
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData(data);
      } else {
        console.error('Weather data fetch failed:', data.message);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-kashmir-gradient snow-animation">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-white/50 transition-colors"
              >
                <svg className="w-6 h-6 text-kashmir-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-kashmir-dark">❄️ SkyKash</h1>
            </div>
            <div className="text-right">
              <p className="text-kashmir-green font-semibold">{getGreeting()}, {userName}!</p>
              <p className="text-sm text-gray-600">Kashmir Weather</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="card p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kashmir-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading weather data...</p>
          </div>
        ) : weatherData ? (
          <WeatherCard weatherData={weatherData} />
        ) : (
          <div className="card p-8 text-center">
            <p className="text-red-500">Failed to load weather data</p>
            <button 
              onClick={fetchWeatherData}
              className="btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Additional Weather Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2">🌡️</div>
            <h3 className="font-semibold text-kashmir-dark">Feels Like</h3>
            <p className="text-2xl font-bold text-kashmir-blue">
              {weatherData ? Math.round(weatherData.main.feels_like) + '°C' : '--'}
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2">💨</div>
            <h3 className="font-semibold text-kashmir-dark">Wind Speed</h3>
            <p className="text-2xl font-bold text-kashmir-blue">
              {weatherData ? weatherData.wind.speed + ' m/s' : '--'}
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-3xl mb-2">💧</div>
            <h3 className="font-semibold text-kashmir-dark">Humidity</h3>
            <p className="text-2xl font-bold text-kashmir-blue">
              {weatherData ? weatherData.main.humidity + '%' : '--'}
            </p>
          </div>
        </div>
      </main>

      {/* Menu */}
      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  );
}
