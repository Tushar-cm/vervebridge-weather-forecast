import React, { useState } from 'react';
import './App.css';

const apiKey = 'da2fa6197aba8e61919c5e2a7829f291';

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const renderWeatherInfo = () => {
    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) {
      return null;
    }

    const { main, weather } = weatherData;

    
    let weatherConditionClass = '';
    if (weather[0].main.toLowerCase() === 'mist') {
      weatherConditionClass = 'weather-mist';
    } else if (weather[0].main.toLowerCase() === 'haze') {
      weatherConditionClass = 'weather-haze';
    } else if (weather[0].main.toLowerCase() === 'clear') {
      weatherConditionClass = 'weather-clear';
    } else if (weather[0].main.toLowerCase() === 'clouds') {
      weatherConditionClass = 'weather-clouds';
    } else if (weather[0].main.toLowerCase() === 'rain') {
      weatherConditionClass = 'weather-rain';
    }

    return (
      <div className={`weather-container ${weatherConditionClass}`}>
        <img src={getWeatherIconUrl(weather[0].icon)} alt="Weather Icon" className="weather-icon" />
        <div className="weather-info">
          <div className="temperature">{`${Math.round(main.temp - 273.15)}°C`}</div>
          <div className="description">{weather[0].description}</div>
          <div>Humidity: {main.humidity}%</div>
          <div>Wind Speed: {Math.round(weatherData.wind.speed * 3.6)} km/h</div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <h1>Weather Forecast</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={cityName}
        onChange={handleInputChange}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>

      {renderWeatherInfo()}
    </div>
  );
}

export default App;
