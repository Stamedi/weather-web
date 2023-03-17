import React from 'react';
import countries from 'country-list';
const Sidebar = ({ currentLocationData }: any) => {
  const { getName } = countries;

  return (
    <div className="absolute">
      <section className="current-location-weather">
        <h2 className="text-2xl beige">Current Location Weather</h2>
        <h3 className="text-lg">Location Name: {currentLocationData.name}</h3>
        <h3 className="text-lg">Location Country: {getName(currentLocationData.sys.country)}</h3>
        <h4 className="text-lg">Current Temperature: {Math.round(currentLocationData.main.temp)}</h4>
        <h4 className="text-lg">
          Feels like: <span>{Math.round(currentLocationData.main.feels_like)}</span>
        </h4>
        <h4 className="text-lg">Weather Type: {currentLocationData.weather[0].main}</h4>
        <h4 className="text-lg">
          Wind Speed: <span className="text-base">{currentLocationData.wind.speed * 3.6} km/h</span>
        </h4>
      </section>
    </div>
  );
};

export default Sidebar;
