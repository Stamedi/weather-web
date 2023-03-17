import React, { useState, useEffect } from 'react';
import Navbar from './components/Nav';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import raining from './assets/images/raining.gif';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [currentLocationData, setCurrentLocationData] = useState(null);
  const [currentLocationWeekWeather, setCurrentLocationWeekWeather] = useState(null);
  const [error, setError] = useState('');
  const [userCoords, setUserCoords] = useState<{ lat: null | number; lon: null | number }>({ lat: null, lon: null });

  const units = 'metric';
  const key = '6cb2850d4a00966ba4cb83beed931ccc';

  const getUserCoordinates = () => {
    const geolocationAPI = navigator.geolocation;
    if (!geolocationAPI) {
      setError('Geolocation API is not available in your browser!');
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position;
          fetchCurrentLocationWeather(coords.latitude, coords.longitude);
          setUserCoords({ lat: coords.latitude, lon: coords.longitude });
        },
        (error) => {
          setError('Something went wrong getting your position!');
        }
      );
    }
  };

  const fetchCurrentLocationWeather = async (lat: number, lon: number) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?&units=${units}&lat=${lat}&lon=${lon}&appid=${key}`
    );
    const data = await response.json();
    setCurrentLocationData(data);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const cityName = event.target[0].value;
    const fetchWeatherData = async () => {
      const units = 'metric';
      const responseGeo = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`);
      const dataGeo = await responseGeo.json();
      if (!responseGeo.ok) {
        setError("Sorry, but you didn't get any data, try again!");
        setWeatherData(null);
      } else if (responseGeo.ok) {
        const { name, lat, lon } = dataGeo[0];
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=${units}&lat=${lat}&lon=${lon}&appid=${key}`
        );
        const data = await response.json();
        setError('');
        setWeatherData(data);
      }
      // const data = await response.json();
      // setWeatherData(data);
    };
    fetchWeatherData();
  };

  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     const key = '6cb2850d4a00966ba4cb83beed931ccc';
  //     const lang = 'en';
  //     const units = 'metric';
  //     // const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${key}`;
  //     // const response = await fetch(url);
  //     // const url2 = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${1}&appid=${key}`;
  //     const responseGeo = await fetch(
  //       `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${1}&appid=${key}`
  //     );
  //     const dataGeo = await responseGeo.json();
  //     if (!responseGeo.ok) {
  //       setError("Sorry, but you didn't get any data, try again!");
  //       setWeatherData(null);
  //     } else if (responseGeo.ok) {
  //       setError('');
  //       // console.log(dataGeo)
  //       const response = await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?q=${dataGeo[0].name}&units=${units}&lat=${dataGeo[0].lat}&lon=${dataGeo[0].lon}&appid=${key}`
  //       );
  //       const data = await response.json();
  //       setWeatherData(data);
  //     }
  //     // const data = await response.json();
  //     // setWeatherData(data);
  //   };
  //   fetchWeatherData();
  // }, [cityName]);

  useEffect(() => {
    getUserCoordinates();
  }, []);

  return (
    <div className="container mx-auto my-auto content-center">
      <Navbar handleSubmit={handleSubmit} />
      {currentLocationData !== null && <Sidebar currentLocationData={currentLocationData} />}
      {weatherData ? <Main weatherData={weatherData} error={error} /> : null}
    </div>
  );
}

export default App;
