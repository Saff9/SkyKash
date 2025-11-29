// components/WeatherCard.tsx
import React from "react";

interface WeatherCardProps {
  location: string;
  temperature: number; // Celsius
  condition: string;
  iconUrl: string;
  high: number;
  low: number;
  updatedAt: string; // e.g. "2 mins ago"
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  location,
  temperature,
  condition,
  iconUrl,
  high,
  low,
  updatedAt,
}) => {
  return (
    <div
      className="max-w-sm mx-auto p-6 rounded-xl backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-20
        shadow-lg shadow-indigo-500/20 text-white"
      style={{
        background:
          'linear-gradient(135deg, #87CEEB 0%, #2E8B57 100%)', // Kashmir blue-green gradient
      }}
    >
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold drop-shadow-lg">{location}</h2>
        <time className="text-sm opacity-70" dateTime={updatedAt}>
          {updatedAt}
        </time>
      </header>
      <div className="flex items-center space-x-4">
        <img
          src={iconUrl}
          alt={condition}
          className="w-20 h-20"
          loading="lazy"
          decoding="async"
        />
        <div>
          <p className="text-6xl font-extrabold drop-shadow-lg">{temperature}°</p>
          <p className="text-lg font-semibold capitalize">{condition}</p>
          <p className="opacity-80 mt-1">
            High: {high}° | Low: {low}°
          </p>
        </div>
      </div>
      <footer className="mt-6 text-center text-sm opacity-70">
        Powered by SkyKash &mdash; Crafted for Kashmir
      </footer>
    </div>
  );
};

export default WeatherCard;
