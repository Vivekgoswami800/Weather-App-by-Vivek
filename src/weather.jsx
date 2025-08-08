import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const API_KEY = 'b96ba53dd3eaeaac39b6224c6bbb4b5d';

export default function App() {
  const [city, setCity] = useState('Lucknow');
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
      setError(null);
    } catch (err) {
      setError('City not found. Try another.');
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) setCity(input.trim());
  };

  return (
    <div className="app-container">
      <div className="weather-card">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="🔍 Search city..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">🌤️ Check</button>
        </form>

        {weather && (
          <>
            <h2>📍 <strong>{weather.name}</strong></h2>

            <div style={{ fontSize: '48px', margin: '10px 0' }}>
              {weather.weather[0].main === 'Clear' && '☀️'}
              {weather.weather[0].main === 'Clouds' && '☁️'}
              {weather.weather[0].main === 'Rain' && '🌧️'}
              {weather.weather[0].main === 'Thunderstorm' && '⛈️'}
              {weather.weather[0].main === 'Drizzle' && '🌦️'}
              {weather.weather[0].main === 'Snow' && '❄️'}
              {weather.weather[0].main === 'Mist' && '🌫️'}
              {weather.weather[0].main === 'Haze' && '🌁'}
              {weather.weather[0].main === 'Smoke' && '🚬'}
            </div>

            <h1>{Math.round(weather.main.temp)}°C</h1>
            <p>{weather.weather[0].main} - {weather.weather[0].description}</p>
            <p>H: {weather.main.temp_max}° | F: {weather.main.feels_like}°</p>
            <p>🕒 Time Now: {time}</p>
          </>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <footer className="footer">
        <p>
          ☁️ <strong>Weather App</strong> by <strong>Vivek Kumar Goswami</strong> |
          Built with 💙 React + OpenWeatherMap API
        </p>
      </footer>
    </div>
  );
}

