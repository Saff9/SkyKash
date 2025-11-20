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

  return (
    <div className="card p-8 text-center">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-kashmir-dark">{weatherData.name}</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Current Weather</p>
          <p className="text-lg text-kashmir-green capitalize">
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
        <div className="bg-kashmir-light/50 rounded-lg p-3">
          <p className="text-gray-600">Feels Like</p>
          <p className="font-semibold text-kashmir-dark">
            {formatTemperature(weatherData.main.feels_like)}°C
          </p>
        </div>
        <div className="bg-kashmir-light/50 rounded-lg p-3">
          <p className="text-gray-600">Humidity</p>
          <p className="font-semibold text-kashmir-dark">{weatherData.main.humidity}%</p>
        </div>
        <div className="bg-kashmir-light/50 rounded-lg p-3">
          <p className="text-gray-600">Pressure</p>
          <p className="font-semibold text-kashmir-dark">{weatherData.main.pressure} hPa</p>
        </div>
        <div className="bg-kashmir-light/50 rounded-lg p-3">
          <p className="text-gray-600">Wind</p>
          <p className="font-semibold text-kashmir-dark">{weatherData.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}
