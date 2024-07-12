import React, { useState, useEffect } from 'react';
import axios from 'axios';
import feelsLikeIcon from '../components/feels_like.png';
import humidityIcon from '../components/humidity.png';
import sunriseIcon from '../components/sunrise.png';
import sunsetIcon from '../components/sunset.png';

const Weather = ({ city, settings }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=958f9600f91059184592403d31d7469e&units=metric`);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) return <div>Loading...</div>;

  return (
    <div className="weather mb-4">
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <p className="text-3xl">{Math.round(weather.main.temp)}°C</p>
      {settings.showFeelsLike && (
        <div className="flex items-center mt-2">
          <img src={feelsLikeIcon} alt="Feels like" className="w-6 h-6 mr-2" />
          <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
        </div>
      )}
      {settings.showHumidity && (
        <div className="flex items-center mt-2">
          <img src={humidityIcon} alt="Humidity" className="w-6 h-6 mr-2" />
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
      {settings.showSunrise && (
        <div className="flex items-center mt-2">
          <img src={sunriseIcon} alt="Sunrise" className="w-6 h-6 mr-2" />
          <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
        </div>
      )}
      {settings.showSunset && (
        <div className="flex items-center mt-2">
          <img src={sunsetIcon} alt="Sunset" className="w-6 h-6 mr-2" />
          <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
