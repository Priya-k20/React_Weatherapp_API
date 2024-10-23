import React, { useState } from 'react';
import './Weather.css';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = 'c638c3c5cf70914f7855960b42030dfa';

  const getWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("There was an error fetching the weather data!", error);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Prediction</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <div className="weather-details">
          <h2>{weather.name}</h2>
          <p><b>Temperature:</b> {weather.main.temp}°C</p>
          <p><b>Condition:</b> {weather.weather[0].description}</p>
          <p><b>Humidity:</b> {weather.main.humidity}%</p>
          <p><b>Wind Speed:</b>{weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
