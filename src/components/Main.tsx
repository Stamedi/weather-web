import React from 'react';
import { getName } from 'country-list';
import moment from 'moment';
import { WeatherData } from '../types';
const Main = ({ weatherData }: { weatherData: WeatherData }) => {
  const { dt, temp, feels_like, name, country, timezone, icon, weather_type, wind } = weatherData;
  const date = new Date(dt * 1000 + timezone * 1000);
  const formattedDate = moment(date).format('LL');

  return (
    <main className="container mx-auto relative mt-10 w-full px-10 ">
      <section className=" flex-column md:flex text-white text-shadow items-start ">
        <div className="max-w-md bg-white bg-opacity-40 p-5 rounded-xl shadow-lg">
          <h2 className="md:text-5xl md:pt-7 text-3xl text-left max-w-md ">
            {name}, {getName(country)}
          </h2>
          <h3 className="text-left pt-5 md:text-2xl text-xl">{formattedDate}</h3>
          <h4 className="md:text-8xl text-6xl font-semibold relative text-left md:pt-20 pt-5 ">{Math.round(temp)}°C</h4>
          <hr className="mt-2 w-40 shadow-sm" />
          <h4 className="text-xl  mt-2 text-left relative">Feels like: {Math.round(feels_like)}°C</h4>
        </div>
        <div className=" flex-col bg-white bg-opacity-40 p-3 rounded-xl mt-8 md:mt-0 shadow-lg max-w-md md:ml-10">
          <img
            className="w-32 object-contain self-center"
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="weather-icon"
          />
          <h4 className="text-xl ">Weather Type: {weather_type}</h4>
          <h4 className="text-xl pt-3">Wind Speed: {Math.round(wind * 3.6)} km/h</h4>
        </div>
      </section>
    </main>
  );
};

export default Main;
