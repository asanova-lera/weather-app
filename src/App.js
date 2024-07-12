import React, { useState, useEffect } from 'react';
import Weather from './components/Weather';
import CityList from './components/CityList';
import Settings from './components/Settings';
import axios from 'axios';
import './index.css';

import clearSky from './components/clear_sky.jpg';
import fewClouds from './components/few_clouds.jpg';
import scatteredClouds from './components/scattered_clouds.jpg';
import brokenClouds from './components/broken_clouds.jpg';
import showerRain from './components/shower_rain.jpg';
import rain from './components/rain.jpg';
import thunderstorm from './components/thunderstorm.jpg';
import snow from './components/snow.jpg';
import mist from './components/mist.jpg';
import gearIcon from './components/gear.png';

const App = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [settings, setSettings] = useState({
    showHumidity: true,
    showFeelsLike: true,
    showSunrise: true,
    showSunset: true,
  });

  useEffect(() => {
    const savedCities = localStorage.getItem('cities');
    const savedSettings = localStorage.getItem('settings');
    if (savedCities) {
      setCities(JSON.parse(savedCities));
    }
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=958f9600f91059184592403d31d7469e&units=metric`
      );
      setCurrentWeather(response.data);
      const city = response.data.name;
      setSelectedCity(city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleSelectCity = async (city) => {
    if (!cities.includes(city)) {
      setCities(prevCities => {
        const newCities = [...prevCities, city];
        localStorage.setItem('cities', JSON.stringify(newCities));
        return newCities;
      });
    }
    setSelectedCity(city);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=958f9600f91059184592403d31d7469e&units=metric`
      );
      setCurrentWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleRemoveCity = (city) => {
    setCities(prevCities => {
      const newCities = prevCities.filter(c => c !== city);
      localStorage.setItem('cities', JSON.stringify(newCities));
      return newCities;
    });
    if (selectedCity === city) {
      setSelectedCity(null);
    }
  };

  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  const getCurrentDayAndDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const day = days[now.getDay()];
    const date = now.toLocaleDateString();
    return { day, date };
  };

  const { day, date } = getCurrentDayAndDate();

  const getBackgroundImage = (weather) => {
    if (!weather) return null;
    const main = weather.weather[0].main.toLowerCase();
    switch (main) {
      case 'clear':
        return clearSky;
      case 'clouds':
        return fewClouds;
      case 'rain':
        return rain;
      case 'drizzle':
        return showerRain;
      case 'thunderstorm':
        return thunderstorm;
      case 'snow':
        return snow;
      case 'mist':
      case 'fog':
        return mist;
      case 'haze':
        return mist;
      default:
        return scatteredClouds;
    }
  };

  const backgroundImage = getBackgroundImage(currentWeather);

  return (
    <div className="min-h-screen flex items-center justify-between relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="absolute top-0 left-0 p-6 text-white text-4xl font-bold z-10">The Weather</div>
      <div className="absolute bottom-0 left-0 p-10 flex items-center text-white space-x-6 z-10">
        {currentWeather ? (
          <>
            <h1 className="text-8xl font-bold">{Math.round(currentWeather.main.temp)}°C</h1>
            <div className="flex flex-col items-start">
              <h2 className="text-5xl">{currentWeather.name}</h2>
              <p className="text-2xl">{day}, {date}</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                alt={currentWeather.weather[0].description}
                className="w-24 h-24"
              />
              <p className="text-2xl">{currentWeather.weather[0].description}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="w-1/3 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 h-screen overflow-y-auto absolute right-0 z-10">
        <CityList
          cities={cities}
          onSelectCity={handleSelectCity}
          onRemoveCity={handleRemoveCity}
        />
        {selectedCity && (
          <Weather city={selectedCity} settings={settings} />
        )}
        <Settings settings={settings} onUpdateSettings={handleUpdateSettings} />
      </div>
    </div>
  );
};

export default App;
