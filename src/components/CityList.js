import React, { useState } from 'react';
import searchIcon from '../components/search.png';

const CityList = ({ cities, onSelectCity, onRemoveCity }) => {
  const [newCity, setNewCity] = useState('');
  const [search, setSearch] = useState('');

  const handleAddCity = () => {
    if (newCity && !cities.includes(newCity)) {
      onSelectCity(newCity);
      setNewCity('');
    }
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="city-list">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Add a city"
          className="border-b-2 border-white bg-transparent text-white px-2 py-1 w-full focus:outline-none"
        />
        <img
          src={searchIcon}
          alt="Add city"
          onClick={handleAddCity}
          className="cursor-pointer w-6 h-6"
        />
      </div>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cities"
          className="border-b-2 border-white bg-transparent text-white px-2 py-1 w-full focus:outline-none"
        />
      </div>
      <ul>
        {filteredCities.map((city) => (
          <li key={city} className="flex justify-between items-center mb-2">
            <span onClick={() => onSelectCity(city)} className="cursor-pointer text-white">
              {city}
            </span>
            <button
              onClick={() => onRemoveCity(city)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CityList;
