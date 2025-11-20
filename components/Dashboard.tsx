// components/Dashboard.tsx - Fix the imports section
'use client';

import { useState, useEffect } from 'react';
import Menu from './Menu';
import WeatherCard from './WeatherCard';
import InstallPrompt from './InstallPrompt';
import { useLocation } from '../hooks/useLocation';
import { useDynamicTheme } from '../hooks/useDynamicTheme';

// Import the 7 new features
import TourismSpotlight from './TourismSpotlight';
import AirQuality from './AirQuality';
import PrayerTimes from './PrayerTimes';
import WeatherTrends from './WeatherTrends';
import ActivityRecommendations from './ActivityRecommendations';
import WorldWeather from './WorldWeather';
import ThemeIndicator from './ThemeIndicator';

// ... rest of the Dashboard component remains the same
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
  uv?: {
    value: number;
    risk: string;
    protection: string;
  };
}

export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);
  const [activeFeature, setActiveFeature] = useState('weather');
  
  const { location, loading: locationLoading, error: locationError } = useLocation();

  useEffect(() => {
    const name = localStorage.getItem('userName');
    const autoLocation = localStorage.getItem('autoLocation') !== 'false';
    
    if (name) {
      setUserName(name);
    }

    if (autoLocation && location && !weatherData) {
      fetchWeatherByCoords(location.latitude, location.longitude);
      setUsingCurrentLocation(true);
    } else if (!weatherData) {
      fetchWeatherData('Srinagar');
    }
  }, [location]);

  // Apply dynamic theme
  useDynamicTheme(
    weatherData?.weather[0]?.description || '', 
    weatherData?.main?.temp || 0
  );

  const fetchWeatherData = async (city: string) => {
    try {
      setIsLoading(true);
      setError('');
      setActiveFeature('weather');
      
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setUsingCurrentLocation(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Unable to load weather data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setIsLoading(true);
      setError('');
      setActiveFeature('location');
      
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setUsingCurrentLocation(true);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Unable to load weather data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeatherData(searchCity.trim());
      setSearchCity('');
      setActiveFeature('search');
    }
  };

  const handleUseCurrentLocation = () => {
    if (location) {
      fetchWeatherByCoords(location.latitude, location.longitude);
      setActiveFeature('location');
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const getActiveFeatureBadge = () => {
    const badges = {
      weather: { emoji: '🌤️', text: 'Weather Data' },
      location: { emoji: '📍', text: 'Auto Location' },
      search: { emoji: '🔍', text: 'City Search' },
      tourism: { emoji: '🏔️', text: 'Tourism' },
      aqi: { emoji: '💨', text: 'Air Quality' },
      prayer: { emoji: '🕌', text: 'Prayer Times' }
    };
    
    return badges[activeFeature as keyof typeof badges] || badges.weather;
  };

  const featureBadge = getActiveFeatureBadge();

  return (
    <div className="min-h-screen bg-kashmir-light-neutral-50 dark:bg-kashmir-dark-neutral-50 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/90 dark:bg-kashmir-dark-neutral-100/90 backdrop-blur-sm border-b border-kashmir-light-neutral-200 dark:border-kashmir-dark-neutral-300 transition-colors duration-300 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-kashmir-light-neutral-100 dark:hover:bg-kashmir-dark-neutral-200 transition-colors text-kashmir-light-neutral-700 dark:text-kashmir-dark-neutral-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-kashmir-light-blue-600 dark:text-kashmir-dark-blue-400">❄️ SkyKash</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs bg-kashmir-light-green-100 dark:bg-kashmir-dark-green-900 text-kashmir-light-green-700 dark:text-kashmir-dark-green-300 px-2 py-1 rounded-full">
                    {featureBadge.emoji} {featureBadge.text}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-kashmir-light-green-600 dark:text-kashmir-dark-green-400 font-semibold">
                {getGreeting()}, {userName}!
              </p>
              <p className="text-sm text-kashmir-light-neutral-600 dark:text-kashmir-dark-neutral-400">
                {usingCurrentLocation && location ? `📍 ${location.city}` : 'Kashmir Weather'}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex space-x-2">
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search for a city..."
              className="flex-1 px-4 py-2 border border-kashmir-light-neutral-300 dark:border-kashmir-dark-neutral-400 rounded-lg focus:ring-2 focus:ring-kashmir-light-blue-500 dark:focus:ring-kashmir-dark-blue-500 focus:border-transparent bg-white/50 dark:bg-kashmir-dark-neutral-100/50 text-kashmir-light-neutral-900 dark:text-kashmir-dark-neutral-100 transition-colors duration-300"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-kashmir-light-blue-500 hover:bg-kashmir-light-blue-600 dark:bg-kashmir-dark-blue-500 dark:hover:bg-kashmir-dark-blue-600 text-white rounded-lg transition-colors duration-300"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={locationLoading || !location}
              className="px-4 py-2 bg-kashmir-light-green-500 hover:bg-kashmir-light-green-600 dark:bg-kashmir-dark-green-500 dark:hover:bg-kashmir-dark-green-600 text-white rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📍 Current
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {usingCurrentLocation && location && (
            <div className="p-3 bg-kashmir-light-green-50 dark:bg-kashmir-dark-green-900 border border-kashmir-light-green-200 dark:border-kashmir-dark-green-300 rounded-lg">
              <p className="text-kashmir-light-green-700 dark:text-kashmir-dark-green-400 text-sm">
                🌍 Auto-detected: <strong>{location.city}, {location.country}</strong>
              </p>
            </div>
          )}
          
          {locationError && (
            <div className="p-3 bg-kashmir-light-neutral-100 dark:bg-kashmir-dark-neutral-200 border border-kashmir-light-neutral-300 dark:border-kashmir-dark-neutral-400 rounded-lg">
              <p className="text-kashmir-light-neutral-700 dark:text-kashmir-dark-neutral-300 text-sm">
                ℹ️ {locationError} Using default location: Srinagar
              </p>
            </div>
          )}
        </div>

        {/* Error State */}
        {error ? (
          <div className="card p-8 text-center">
            <div className="text-kashmir-light-neutral-600 dark:text-kashmir-dark-neutral-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-kashmir-light-neutral-700 dark:text-kashmir-dark-neutral-300 mb-4">{error}</p>
            <button 
              onClick={() => fetchWeatherData('Srinagar')}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          <div className="card p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kashmir-light-blue-500 dark:border-kashmir-dark-blue-500 mx-auto"></div>
            <p className="mt-4 text-kashmir-light-neutral-600 dark:text-kashmir-dark-neutral-400">
              {locationLoading ? 'Detecting your location...' : 'Loading weather data...'}
            </p>
          </div>
        ) : weatherData ? (
          <>
            {/* Main Weather Card */}
            <WeatherCard weatherData={weatherData} timeOfDay={getTimeOfDay()} />

            {/* Theme Indicator */}
            <div className="mt-6">
              <ThemeIndicator 
                weatherCondition={weatherData.weather[0]?.description || ''}
                temperature={weatherData.main.temp}
              />
            </div>

            {/* 7 New Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
              {/* Feature 1: Tourism Spotlight */}
              <div onClick={() => setActiveFeature('tourism')}>
                <TourismSpotlight />
              </div>

              {/* Feature 2: Air Quality */}
              <div onClick={() => setActiveFeature('aqi')}>
                <AirQuality city={weatherData.name} />
              </div>

              {/* Feature 3: Prayer Times */}
              <div onClick={() => setActiveFeature('prayer')}>
                <PrayerTimes />
              </div>

              {/* Feature 4: Weather Trends */}
              <div onClick={() => setActiveFeature('weather')}>
                <WeatherTrends currentTemp={weatherData.main.temp} />
              </div>

              {/* Feature 5: Activity Recommendations */}
              <div onClick={() => setActiveFeature('tourism')}>
                <ActivityRecommendations 
                  weather={weatherData.weather[0]?.description || ''}
                  temperature={weatherData.main.temp}
                  timeOfDay={getTimeOfDay()}
                />
              </div>

              {/* Feature 6: World Weather */}
              <div onClick={() => setActiveFeature('weather')}>
                <WorldWeather />
              </div>
            </div>

            {/* Feature 7: Dynamic Theme is already applied above */}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="card p-4 text-center">
                <div className="text-2xl mb-2">🌡️</div>
                <p className="text-sm text-kashmir-light-neutral-600 dark:text-kashmir-dark-neutral-400">Feels Like</p>
                <p className="text-lg font-bold text-kashmir-light-blue-600 dark:text-kashmir-dark-blue-400">
                  {Math.round(weatherData.main.feels_like)}°C
                </p>
              </div>
              
              <div className="card p-4 text-center">
                <div className="text-2xl mb-2">💨</div>
                <p className="text-sm text-kashmir-light-neutral-600 dark:text-kashmir-dark-neutral-400">Wind</p>
                <p className="text-lg font-bold text-kashmir-light-blue-600 dark:text-kashmir-dark-blue-400">
                  {weatherData.wind.speed} m/s
                </p>
              </div>
              
              <div className="card p-4 text-center">
                <div className="text-2xl mb-2">💧</div>
                <p className="text-sm text-kashmir-light-neutral-600 dark:text-kashmir-dark-neutral-400">Humidity</p>
                <p className="text-lg font-bold text-kashmir-light-blue-600 dark:text-kashmir-dark-blue-400">
                  {weatherData.main.humidity}%
                </p>
              </div>
              
              <div className="card p-4 text-center">
                <div className="text-2xl mb-2">🔍</div>
                <p className="text-sm text-kashmir-light-neutral-600 dark:text-kashmir-dark-neutral-400">Features</p>
                <p className="text-lg font-bold text-kashmir-light-green-600 dark:text-kashmir-dark-green-400">
                  7 Active
                </p>
              </div>
            </div>
          </>
        ) : null}

        {/* Contact Section */}
        <div className="card p-6 mt-8 text-center">
          <h3 className="text-lg font-semibold text-kashmir-light-neutral-800 dark:text-kashmir-dark-neutral-200 mb-4">
            📱 Connect With Developer
          </h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://instagram.com/saffan.akbar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-kashmir-light-neutral-600 dark:text-kashmir-dark-neutral-400 hover:text-kashmir-light-blue-500 dark:hover:text-kashmir-dark-blue-400 transition-colors p-3 rounded-lg hover:bg-kashmir-light-neutral-100 dark:hover:bg-kashmir-dark-neutral-200"
            >
              <span className="text-2xl">📷</span>
              <div className="text-left">
                <p className="font-semibold">Instagram</p>
                <p className="text-sm">@saffan.akbar</p>
              </div>
            </a>
            <a 
              href="https://github.com/Saff9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-kashmir-light-neutral-600 dark:text-kashmir-dark-neutral-400 hover:text-kashmir-light-blue-500 dark:hover:text-kashmir-dark-blue-400 transition-colors p-3 rounded-lg hover:bg-kashmir-light-neutral-100 dark:hover:bg-kashmir-dark-neutral-200"
            >
              <span className="text-2xl">💻</span>
              <div className="text-left">
                <p className="font-semibold">GitHub</p>
                <p className="text-sm">Saff9</p>
              </div>
            </a>
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
