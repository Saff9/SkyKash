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
  const [error, setError] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }

    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch(`/api/weather?city=Srinagar`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Unable to load weather data. Please try again later.');
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
    <div className="min-h-screen snow-animation">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-kashmir-snow-dark/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-kashmir-snow-light transition-colors text-kashmir-mountain-dark"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-kashmir-blue">❄️ SkyKash</h1>
            </div>
            <div className="text-right">
              <p className="text-kashmir-green font-semibold">{getGreeting()}, {userName}!</p>
              <p className="text-sm text-kashmir-mountain">Kashmir Weather</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error ? (
          <div className="card p-8 text-center">
            <div className="text-kashmir-mountain-dark mb-4">
              <svg className="w-12 h-12 mx-auto text-kashmir-mountain" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-kashmir-mountain-dark mb-4">{error}</p>
            <button 
              onClick={fetchWeatherData}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div className="card p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kashmir-blue mx-auto"></div>
            <p className="mt-4 text-kashmir-mountain">Loading weather data...</p>
          </div>
        ) : weatherData ? (
          <WeatherCard weatherData={weatherData} />
        ) : null}

        {/* Additional Weather Info */}
        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="card p-6 text-center">
              <div className="text-3xl mb-2 text-kashmir-blue">🌡️</div>
              <h3 className="font-semibold text-kashmir-mountain-dark">Feels Like</h3>
              <p className="text-2xl font-bold text-kashmir-blue">
                {Math.round(weatherData.main.feels_like)}°C
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="text-3xl mb-2 text-kashmir-blue">💨</div>
              <h3 className="font-semibold text-kashmir-mountain-dark">Wind Speed</h3>
              <p className="text-2xl font-bold text-kashmir-blue">
                {weatherData.wind.speed} m/s
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="text-3xl mb-2 text-kashmir-blue">💧</div>
              <h3 className="font-semibold text-kashmir-mountain-dark">Humidity</h3>
              <p className="text-2xl font-bold text-kashmir-blue">
                {weatherData.main.humidity}%
              </p>
            </div>
          </div>
        )}

        {/* Weather Tips */}
        <div className="card p-6 mt-8">
          <h3 className="text-lg font-semibold text-kashmir-mountain-dark mb-4">🌤️ Weather Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start space-x-3">
              <span className="text-kashmir-green">☀️</span>
              <p className="text-kashmir-mountain">Perfect day to explore Kashmir's beautiful landscapes!</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-kashmir-blue">💧</span>
              <p className="text-kashmir-mountain">Stay hydrated and enjoy the pleasant weather.</p>
            </div>
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
