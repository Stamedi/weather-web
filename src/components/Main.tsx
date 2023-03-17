import React from 'react';
import '../App.css';
import snow from '../assets/images/snow.mp4';
import rain from '../assets/images/rain.mp4';
import fog from '../assets/images/fog.mp4';
import clouds from '../assets/images/clouds.mp4';
import thunder from '../assets/images/thunder.mp4';
import clear from '../assets/images/clear.mp4';
import countries from 'country-list';

const Main = ({ weatherData = {}, error }: any) => {
  // const { main } = weatherData.weather[0];
  const { getName } = countries;
  return (
    <main className="container mx-auto content-center">
      {/* style={{ textShadow: '0 0 2px black' }} */}
      {!weatherData ? (
        <h1 className="text-center">{error}</h1>
      ) : (
        <div>
          <video
            loop
            muted
            autoPlay
            className="mx-auto absolute inset-x-0"
            src={
              weatherData.weather[0].main === 'Clouds'
                ? clouds
                : weatherData.weather[0].main === 'Thunderstorm'
                ? thunder
                : weatherData.weather[0].main === 'Rain'
                ? rain
                : weatherData.weather[0].main === 'Snow'
                ? snow
                : weatherData.weather[0].main === 'Fog'
                ? fog
                : weatherData.weather[0].main === 'Clear'
                ? clear
                : rain
            }
          ></video>
          <section className=" mx-auto my-auto content-center text-light text-center text-white text-shadow">
            <h2 className="text-4xl text-left pt-7 relative ">
              {weatherData.name}, {getName(weatherData.sys.country)}
            </h2>
            <h4 className="text-7xl font-semibold relative text-left pt-20 ">{Math.round(weatherData.main.temp)}°C</h4>
            <h4 className="text-lg relative">
              Feels like: <span>{Math.round(weatherData.main.feels_like)}°</span>
            </h4>
            <h4 className="text-lg relative">Weather Type: {weatherData.weather[0].main}</h4>
            <h4 className="text-lg relative">
              Wind Speed: <span className="text-base relative">{Math.round(weatherData.wind.speed * 3.6)} km/h</span>
            </h4>
          </section>
          {/* <h1 className=" font-bold underline">{error}</h1> */}
        </div>
      )}
    </main>
  );
};

export default Main;
