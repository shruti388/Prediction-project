import React from "react";

export default function WeatherDetails({ result }) {
  if (!result) return null; 

  return (
    <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-up">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="mr-3 animate-bounce"></span>
        Weather Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-sm transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌡️</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Temperature</p>
              <p className="text-2xl font-bold text-gray-800">{result.temp}°C</p>
            </div>
          </div>
        </div>
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-md transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🤗</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Feels Like</p>
              <p className="text-2xl font-bold text-gray-800">{result.feels_like ? `${result.feels_like}°C` : 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-sm transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💧</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Humidity</p>
              <p className="text-2xl font-bold text-gray-800">{result.humidity ? `${result.humidity}%` : 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-sm transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌬️</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Wind Speed</p>
              <p className="text-2xl font-bold text-gray-800">{result.wind_speed} m/s</p>
            </div>
          </div>
        </div>
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-sm transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌥️</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Condition</p>
              <p className="text-2xl font-bold text-gray-800">{result.weather}</p>
            </div>
          </div>
        </div>
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🕒</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Last Updated</p>
              <p className="text-lg font-bold text-gray-800">{result.time}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

