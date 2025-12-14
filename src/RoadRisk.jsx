import React, { useState } from "react";
import WeatherDetails from "./components/WeatherDetails"

export default function RoadRisk() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getAlertMessage = (score) => {
    if (score >= 90) return { text: "EXTREME ALERT! Avoid travel!", color: "bg-red-900", textColor: "text-white" };
    if (score >= 70) return { text: "HIGH ALERT! Drive carefully!", color: "bg-red-700", textColor: "text-white" };
    if (score >= 40) return { text: "MODERATE ALERT! Be cautious.", color: "bg-yellow-400", textColor: "text-black" };
    return { text: "SAFE: Roads are fine.", color: "bg-green-600", textColor: "text-white" };
  };

  const getRoadRisk = async () => {
    if (!city) return alert("Enter city name");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      console.log(data);

      if (data.cod !== 200) return alert("City not found");

      const temp = data.main.temp;
      const weather = data.weather[0].main;

      let risk = "", score = 0, image = "";

      if (weather === "Rain") { risk = "Slippery Roads"; score = 80; image = "rain.jpg";}
      else if (weather === "Snow") { risk = "Very High Risk"; score = 95; image = "/images/snowimg.jpg"; }
      else if (temp > 35) { risk = "Hot Weather"; score = 30; image = "";
; }
      else { risk = "Normal"; score = 55; image = "hotimg.jpg"; }

      setResult({ city: data.name, temp, weather, risk, score, image });
    } catch (error) {
      alert("Failed to fetch weather data");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 p-10 rounded-xl shadow-2xl border border-blue-500 bg-white font-sans text-center">
      {/* TITLE */}
      <h1 className="text-3xl font-extrabold mb-6">🚦 Road Risk Prediction System</h1>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full p-3 mb-6 rounded-lg border border-gray-300 text-lg outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* BUTTON */}
      <button
        onClick={getRoadRisk}
        className="w-full p-3 mb-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full transition-colors"
      >
        Check Road Risk
      </button>

      {/* RESULT */}
      {result && (
        <div className="mt-2 text-center">
          <p className="text-xl font-semibold"><b>City:</b> {result.city}</p>
          <p className="text-xl font-semibold">🌡️ <b>Temperature:</b> {result.temp}°C</p>
          <p className="text-xl font-semibold">🌥️ <b>Weather:</b> {result.weather}</p>
          <p className="text-xl font-semibold">⚠️ <b>Road Risk:</b> {result.risk}</p>

          {/* ALERT BOX */}
          <div className={`${getAlertMessage(result.score).color} ${getAlertMessage(result.score).textColor} mt-7 p-4 rounded-md font-bold text-xl`}>
            {getAlertMessage(result.score).text}
          </div>

          {/* IMAGE */}
          <img src={result.image} alt="Weather" className="mt-5 w-36 mx-auto" />
        </div>
      )}
    </div>
  );
}

