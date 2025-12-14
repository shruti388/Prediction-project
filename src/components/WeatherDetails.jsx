import React from "react";

export default function WeatherDetails({ result }) {
  if (!result) return null; // safety check

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-md">
      <p>🌡️ <b>Temperature:</b> {result.temp}°C</p>
      <p>🤗 <b>Feels Like:</b> {result.feels_like}°C</p>
      <p>💧 <b>Humidity:</b> {result.humidity}%</p>
      <p>🌬️ <b>Wind Speed:</b> {result.wind_speed} m/s</p>
      <p>🌥️ <b>Weather:</b> {result.weather}</p>
      <p>🕒 <b>Last Updated:</b> {result.time}</p>
    </div>
  );
}

