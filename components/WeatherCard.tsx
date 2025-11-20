// components/WeatherCard.tsx
'use client';

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

interface WeatherCardProps {
  weatherData: WeatherData;
}

export default function WeatherCard({ weatherData }: WeatherCardProps) {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatTemperature = (temp: number) => {
    return Math.round(temp);
  };

  const getWeatherMessage = (temp: number) => {
    if (temp < 0) return 'Bundle up! ❄️ Freezing temperatures';
    if (temp < 10) return 'Chilly weather 🧥 Perfect for warm drinks';
    if (temp < 20) return 'Pleasant day 🌤️ Great for outdoor activities';
    if (temp < 30) return 'Warm weather ☀️ Stay hydrated';
    return 'Hot day! 🔥 Stay cool and hydrated';
  };

  return (
    <div className="card p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-kashmir-blue">{weatherData.name}</h2>
          <p className="text-kashmir-green mt-1">{getWeatherMessage(weatherData.main.temp)}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-kashmir-mountain">Current Weather</p>
          <p className="text-lg text-kashmir-green capitalize font-medium">
            {weatherData.weather[0].description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-8 mb-6">
        <div className="text-6xl font-bold text-kashmir-blue">
          {formatTemperature(weatherData.main.temp)}°C
        </div>
        <div>
          <img 
            src={getWeatherIcon(weatherData.weather[0].icon)} 
            alt={weatherData.weather[0].description}
            className="w-24 h-24"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-kashmir-snow-light rounded-lg p-3 border border-kashmir-snow-dark/20">
          <p className="text-kashmir-mountain">Feels Like</p>
          <p className="font-semibold text-kashmir-blue-dark text-lg">
            {formatTemperature(weatherData.main.feels_like)}°C
          </p>
        </div>
        <div className="bg-kashmir-snow-light rounded-lg p-3 border border-kashmir-snow-dark/20">
          <p className="text-kashmir-mountain">Humidity</p>
          <p className="font-semibold text-kashmir-blue-dark text-lg">{weatherData.main.humidity}%</p>
        </div>
        <div className="bg-kashmir-snow-light rounded-lg p-3 border border-kashmir-snow-dark/20">
          <p className="text-kashmir-mountain">Pressure</p>
          <p className="font-semibold text-kashmir-blue-dark text-lg">{weatherData.main.pressure} hPa</p>
        </div>
        <div className="bg-kashmir-snow-light rounded-lg p-3 border border-kashmir-snow-dark/20">
          <p className="text-kashmir-mountain">Wind</p>
          <p className="font-semibold text-kashmir-blue-dark text-lg">{weatherData.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}
