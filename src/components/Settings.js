import React, { useState } from 'react';

const Settings = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setLocalSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = () => {
    onUpdateSettings(localSettings);
  };

  return (
    <div className="settings">
      <h2 className="text-2xl font-bold mb-2">Settings</h2>
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="showHumidity"
          checked={localSettings.showHumidity}
          onChange={handleChange}
          className="mr-2"
        />
        Humidity
      </label>
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="showFeelsLike"
          checked={localSettings.showFeelsLike}
          onChange={handleChange}
          className="mr-2"
        />
        Feels Like Temperature
      </label>
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="showSunrise"
          checked={localSettings.showSunrise}
          onChange={handleChange}
          className="mr-2"
        />
        Sunrise Time
      </label>
      <label className="flex items-center mb-2">
        <input
          type="checkbox"
          name="showSunset"
          checked={localSettings.showSunset}
          onChange={handleChange}
          className="mr-2"
        />
        Sunset Time
      </label>
      <button
        onClick={handleSubmit}
        className="p-2 bg-blue-500 text-white rounded w-full"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
