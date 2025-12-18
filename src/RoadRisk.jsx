import React, { useState } from "react"; 
import WeatherDetails from "./components/WeatherDetails";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function RoadRisk() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY?.trim() || "bfe596fa6f7613c874732abe912fe034";

   const getWeatherBackgroundClass = (weather) => {
    if (!weather) return 'bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 animate-gradient floating-shapes';
    
    const lowerWeather = weather.toLowerCase();
    if (lowerWeather.includes('clear') || lowerWeather.includes('sun')) {
      return 'weather-sunny sun floating-shapes-sunny';
    } else if (lowerWeather.includes('rain') || lowerWeather.includes('drizzle')) {
      return 'weather-rainy rain floating-shapes-rainy';
    } else if (lowerWeather.includes('snow')) {
      return 'weather-snowy snow floating-shapes-snowy';
    } else if (lowerWeather.includes('cloud')) {
      return 'weather-cloudy clouds floating-shapes';
    } else {
      return 'weather-clear floating-shapes';
    }
  };


  const getAlertMessage = (score) => {
    if (score >= 90) return { text: "EXTREME ALERT! Avoid travel!", color: "bg-red-900", textColor: "text-white" };
    if (score >= 70) return { text: "HIGH ALERT! Drive carefully!", color: "bg-red-700", textColor: "text-white" };
    if (score >= 40) return { text: "Risk Level: Moderate", color: "bg-yellow-400", textColor: "text-black" };
    return { text: "SAFE: Roads are fine.", color: "bg-green-600", textColor: "text-white" };
  };

  const getRoadRisk = async () => {
    if (!city) return alert("Enter city name");

    console.log('API_KEY:', API_KEY);
    if (!API_KEY) return alert("Weather API key not configured. Please add VITE_WEATHER_API_KEY to your .env file.");

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      console.log(data);

      if (data.cod !== 200) return alert("City not found");

      const temp = data.main.temp;
      const weather = data.weather[0].main.toLowerCase();

      let risk = "", score = 0, image = "";

      if (weather === "Rain") { risk = "Slippery Roads"; score = 80; image = "/rain.jpg";}
      else if (weather === "Snow") { risk = "Very High Risk"; score = 95; image = "/snowimg.jpg"; }
      else if (temp > 35) { risk = "Hot Weather"; score = 30; image = "/hotimg.jpg"; }
      else { risk = "Normal"; score = 55; image = "/normalimg.jpg"; }

      setResult({ 
        city: data.name, 
        temp, 
        weather, 
        risk, 
        score, 
        image,
        feels_like: data.main?.feels_like,
        humidity: data.main?.humidity,
        wind_speed: data.wind?.speed || 0,
        time: new Date().toLocaleTimeString()
      });
    } catch (error) {
      alert("Failed to fetch weather data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${getWeatherBackgroundClass(result?.weather)} relative overflow-hidden`}>
      {/* Animation background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full glassmorphism rounded-3xl shadow-sm overflow-hidden animate-slide-in-up">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-8 text-center relative">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-pulse-glow"> Road Risk Prediction System</h1>
              <p className="text-xl text-blue-100 mb-2">Road Safety Analysis Based on Weather Conditions</p>
              <p className="text-sm text-blue-200">Real-time weather assessment for safer journeys</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 bg-white bg-opacity-95 backdrop-blur-sm">
            {/* Input Section */}
            <div className="mb-8">
              <label htmlFor="city" className="text-gray-800 font-semibold text-lg mb-3 flex items-center">
                <span className="mr-2">🏙️</span>
                City Location
              </label>
              <div className="relative">
                <input
                  id="city"
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-5 pr-12 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-lg shadow-sm hover:shadow-xl"
                  disabled={loading}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={getRoadRisk}
              disabled={loading}
              className="w-full p-5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center mb-8 animate-pulse-glow"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Weather Data...
                </>
              ) : (
                <>
                  <span className="mr-3"></span>
                  Check Road Risk
                </>
              )}
            </button>

            {/* RESULT */}
            {result && (
              <div className="space-y-8 animate-slide-in-up">
                {/* Main Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Risk Assessment Card */}
                  <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200 shadow-sm transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                      <span className="mr-3"></span>
                      Risk Assessment
                    </h3>
                    <div className="text-center mb-4">
                      <div className={`inline-block px-6 py-3 rounded-full text-white font-bold text-lg ${getAlertMessage(result.score).color} animate-pulse-glow`}>
                        {getAlertMessage(result.score).text}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-800 mb-2">{result.score}/100</p>
                      <p className="text-gray-600">Risk Score</p>
                    </div>
                    <div className="mt-4 h-32">
                      <Doughnut
                        data={{
                          labels: ['Risk Level', 'Safe Level'],
                          datasets: [{
                            data: [result.score, 100 - result.score],
                            backgroundColor: [
                              result.score > 70 ? '#ef4444' : result.score > 40 ? '#f59e0b' : '#10b981',
                              '#e5e7eb'
                            ],
                            borderWidth: 0,
                          }],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false }
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Weather Overview Card */}
                  <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                      <span className="mr-3"></span>
                      Weather Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white bg-opacity-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-3xl mr-3">🏙️</span>
                          <div>
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-semibold text-lg">{result.city}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white bg-opacity-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-3xl mr-3">🌡️</span>
                          <div>
                            <p className="text-sm text-gray-600">Temperature</p>
                            <p className="font-semibold text-lg">{result.temp}°C</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white bg-opacity-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-3xl mr-3">🌥️</span>
                          <div>
                            <p className="text-sm text-gray-600">Condition</p>
                            <p className="font-semibold text-lg">{result.weather}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Weather */}
                <WeatherDetails result={result} />

                {/* Weather Image */}
                {result.image && (
                  <div className="text-center animate-float">
                    <div className="inline-block p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl shadow-lg">
                      <img src={result.image} alt="Weather condition" className="w-40 h-40 mx-auto rounded-xl shadow-md object-cover" />
                      <p className="mt-3 text-gray-700 font-medium">Weather Condition</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

