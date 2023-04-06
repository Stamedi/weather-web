import React from 'react';
import countries from 'country-list';
const Sidebar = ({ currentLocationData }: any) => {
  const { getName } = countries;

  return (
    <section className="container mx-auto relative text-white text-shadow bg-white bg-opacity-40 p-4 rounded-xl shadow-lg m-10 max-w-fit">
      <h2 className="text-2xl">
        Current Location: {currentLocationData.name}, {getName(currentLocationData.sys.country)}
      </h2>
      <div className="flex-column">
        <h3 className="text-lg pt-5">
          {Math.round(currentLocationData.main.temp)}°C / Feels like: {Math.round(currentLocationData.main.feels_like)}
          °C
        </h3>
        <img
          className="object-contain w-16"
          src={`https://openweathermap.org/img/wn/${currentLocationData.weather[0].icon}@2x.png`}
          alt="weather-icon"
        />
        <h3 className="text-lg">
          Wind Speed: <span className="text-base">{currentLocationData.wind.speed * 3.6} km/h</span>
        </h3>
      </div>
    </section>

    // <div className="absolute">
    //       <section className="current-location-weather">
    //         <h2 className="text-2xl beige">Current Location Weather</h2>
    //         <h3 className="text-lg">
    //           {currentLocationData.name}, {getName(currentLocationData.sys.country)} |
    //         </h3>
    //         <h3 className="text-lg">Location Country: {getName(currentLocationData.sys.country)}</h3>
    //         <h4 className="text-lg">Current Temperature: {Math.round(currentLocationData.main.temp)}</h4>
    //         <h4 className="text-lg">
    //           Feels like: <span>{Math.round(currentLocationData.main.feels_like)}</span>
    //         </h4>
    //         <h4 className="text-lg">Weather Type: {currentLocationData.weather[0].main}</h4>
    //         <h4 className="text-lg">
    //           Wind Speed: <span className="text-base">{currentLocationData.wind.speed * 3.6} km/h</span>
    //         </h4>
    //       </section>
    //     </div>
  );
};

export default Sidebar;
