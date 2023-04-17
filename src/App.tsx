import React, { useState, useEffect } from 'react';
import Navbar from './components/Nav';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Background from './components/Background';

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
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  const units = 'metric';
  const key = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
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
        setError('There was a difficulty with request, please try again');
        setWeatherData(null);
      } else if (responseGeo.ok) {
        if (dataGeo.length > 0) {
          const { lat, lon } = dataGeo[0];
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?&units=${units}&lat=${lat}&lon=${lon}&appid=${key}`
          );
          const data = await response.json();

          setError(null);
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
    <div className="bg-gradient-to-b from-grey to-beige bg-no-repeat text-dark-grey min-h-screen">
      {weatherData && <Background weatherData={weatherData} />}
      <div className=" container mx-auto">
        <Navbar handleSubmit={handleSubmit} />
        {currentLocationData ? <Sidebar currentLocationData={currentLocationData} /> : <h1>{geolocationError}</h1>}
        {weatherData ? (
          <Main weatherData={weatherData} />
        ) : (
          <h1 className="text-center mx-auto text-4xl relative">{error}</h1>
        )}
      </div>
    </div>
  );
}

export default App;
