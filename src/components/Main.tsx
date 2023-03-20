import React from 'react';
import '../App.css';
import snow from '../assets/images/snow.mp4';
import rain from '../assets/images/rain.mp4';
import fog from '../assets/images/fog.mp4';
import clouds from '../assets/images/clouds.mp4';
import thunder from '../assets/images/thunder.mp4';
import clear from '../assets/images/clear.mp4';
import countries from 'country-list';
import moment from 'moment';

const Main = ({ weatherData = {} }: any) => {
  const { name, sys, wind } = weatherData;
  const { main, icon } = weatherData.weather[0];
  const { temp, feels_like } = weatherData.main;
  const { getName } = countries;
  console.log(weatherData);

  const date = new Date(weatherData.dt * 1000 + weatherData.timezone * 1000);
  const formattedDate = moment(date).format('LL');

  return (
    <main className=" center relative container mt-10 mx-auto content-center h-screen">
      {/* style={{ textShadow: '0 0 2px black' }} */}
      <video
        loop
        muted
        autoPlay
        className="mx-auto absolute inset-x-0 md:h-full h-1/2 w-full"
        src={
          main === 'Clouds'
            ? clouds
            : main === 'Thunderstorm'
            ? thunder
            : main === 'Rain'
            ? rain
            : main === 'Snow'
            ? snow
            : main === 'Fog'
            ? fog
            : main === 'Clear'
            ? clear
            : fog
        }
      ></video>
      <section className=" h-full p-10 mx-auto my-auto content-center text-white text-shadow relative">
        <div className=" mx-auto max-w-md flex-col content-start ">
          <div className=" max-w-xs bg-white bg-opacity-40 p-5 rounded-xl">
            <h2 className="md:text-5xl md:pt-7 text-3xl text-left max-w-md ">
              {name}, {getName(sys.country)}
            </h2>
            <h3 className="text-left pt-5 md:text-2xl text-xl">{formattedDate}</h3>
            <h4 className="md:text-8xl text-6xl font-semibold relative text-left md:pt-20 pt-5 ">
              {Math.round(temp)}°C
            </h4>
            <hr className="mt-2 w-40 shadow-sm" />
            <h4 className="text-xl  mt-2 text-left relative">Feels like: {Math.round(feels_like)}°C</h4>
          </div>
          <div className="flex-col justify-center justify-items-center items-center bg-white bg-opacity-40 p-5 rounded-xl mt-10">
            <img
              className="w-32 object-contain self-center"
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather-icon"
            />
            <h4 className="text-lg ">Weather Type: {main}</h4>
            <h4 className="text-lg relative">
              Wind Speed: <span className="text-base relative">{Math.round(wind.speed * 3.6)} km/h</span>
            </h4>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
