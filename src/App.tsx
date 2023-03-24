import React, { useState, useEffect } from 'react';
import Navbar from './components/Nav';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import snow from './assets/images/snow.mp4';
import rain from './assets/images/rain.mp4';
import fog from './assets/images/fog.mp4';
import clouds from './assets/images/clouds.mp4';
import thunder from './assets/images/thunder.mp4';
import clear from './assets/images/clear.mp4';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [currentLocationData, setCurrentLocationData] = useState(null);
  const [currentLocationWeekWeather, setCurrentLocationWeekWeather] = useState(null);
  const [error, setError] = useState('');
  const [resError, setResError] = useState<string | null>(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: null | number; lon: null | number }>({ lat: null, lon: null });

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
          setUserCoords({ lat: coords.latitude, lon: coords.longitude });
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
          const { name, lat, lon } = dataGeo[0];
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?&units=${units}&lat=${lat}&lon=${lon}&appid=${key}`
          );
          const data = await response.json();
          setError('');
          setWeatherData(data);
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
        className=" absolute inset-x-0  z-1 h-xl
  w-xl"
      >
        <video className="h-screen w-full rounded-lg object-cover" loop muted autoPlay src={fog}></video>
      </div>
      <Navbar handleSubmit={handleSubmit} />
      {currentLocationData !== null && <Sidebar currentLocationData={currentLocationData} />}
      {weatherData ? (
        <Main weatherData={weatherData} />
      ) : (
        <h1 className="text-center mx-auto text-4xl relative">{error}</h1>
      )}
    </div>
  );
}

export default App;
