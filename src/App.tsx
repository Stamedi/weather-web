import React, { useState, useEffect } from 'react';
import Navbar from './components/Nav';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Background from './components/Background';
import snow from './assets/images/snow.mp4';
import rain from './assets/images/rain.mp4';
import fog from './assets/images/fog.mp4';
import clouds from './assets/images/clouds.mp4';
import thunder from './assets/images/thunder.mp4';
import clear from './assets/images/clear.mp4';
import './App.css';

interface WeatherData {
  dt: number;
  temp: number;
  feels_like: number;
  name: string;
  country: string;
  timezone: number;
  icon: string;
  weather_type: string;
  wind: number;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [currentLocationData, setCurrentLocationData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [resError, setResError] = useState<string | null>(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  // const [userCoords, setUserCoords] = useState<{ lat: null | number; lon: null | number }>({ lat: null, lon: null });

  const units = 'metric';
  const key = '6cb2850d4a00966ba4cb83beed931ccc';
  const getUserCoordinates = () => {
    const geolocationAPI = navigator.geolocation;
    if (!geolocationAPI) {
      setGeolocationError('Geolocation API is not available in your browser!');
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position;
          fetchCurrentLocationWeather(coords.latitude, coords.longitude);
        },
        (error) => {
          setGeolocationError('Something went wrong getting your position!');
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
        setResError('There was a difficulty with request, please try again');
        setWeatherData(null);
      } else if (responseGeo.ok) {
        if (dataGeo.length > 0) {
          const { lat, lon } = dataGeo[0];
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?&units=${units}&lat=${lat}&lon=${lon}&appid=${key}`
          );
          const data = await response.json();

          setError(null);
          console.log(data);
          setWeatherData(data);
          setWeatherData({
            dt: data.dt,
            temp: data.main.temp,
            feels_like: data.main.feels_like,
            name: data.name,
            country: data.sys.country,
            timezone: data.timezone,
            icon: data.weather[0].icon,
            weather_type: data.weather[0].main,
            wind: data.wind.speed,
          });
        } else if (dataGeo.length === 0) {
          setError('Invalid city name provided, try again!');
          setWeatherData(null);
        }
      }
    };
    fetchWeatherData();
  };

  useEffect(() => {
    getUserCoordinates();
  }, []);

  return (
    <div className={weatherData ? ' h-full text-dark-grey' : 'container mx-auto h-screen text-dark-grey'}>
      <div
        className=" absolute inset-x-0 
  w-xl"
      >
        {weatherData ? (
          <Background weatherData={weatherData} />
        ) : (
          <div className="w-screen object-fill min-h-screen bg-gradient-to-b from-grey to-beige "></div>
        )}
      </div>
      <Navbar handleSubmit={handleSubmit} />
      {currentLocationData ? <Sidebar currentLocationData={currentLocationData} /> : <h1>{geolocationError}</h1>}
      {weatherData ? (
        <Main weatherData={weatherData} />
      ) : (
        <h1 className="text-center mx-auto text-4xl relative">{error}</h1>
      )}
    </div>
  );
}

export default App;
