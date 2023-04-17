import React from 'react';
import countries from 'country-list';
import { CurrentLocationWeatherData } from '../types';

const Sidebar = ({ currentLocationData }: { currentLocationData: CurrentLocationWeatherData }) => {
  const { getName } = countries;
  const { temp, feels_like, name, country, icon, wind } = currentLocationData;
  return (
    <section className="container mx-auto relative text-white text-shadow bg-white bg-opacity-40 p-4 rounded-xl shadow-lg m-10 max-w-fit">
      <h2 className="text-2xl">
        Current Location: {name}, {getName(country)}
      </h2>
      <div className="flex-column">
        <h3 className="text-lg pt-5">
          {Math.round(temp)}°C / Feels like: {Math.round(feels_like)}
          °C
        </h3>
        <img
          className="object-contain w-16"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather-icon"
        />
        <h3 className="text-lg">
          Wind Speed: <span className="text-base">{Math.round(wind * 3.6)} km/h</span>
        </h3>
      </div>
    </section>
  );
};

export default Sidebar;
