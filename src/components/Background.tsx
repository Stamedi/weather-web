import React from 'react';
import snow from '../assets/images/snow.mp4';
import rain from '../assets/images/rain.mp4';
import fog from '../assets/images/fog.mp4';
import clouds from '../assets/images/clouds.mp4';
import thunder from '../assets/images/thunder.mp4';
import clear from '../assets/images/clear.mp4';

const Background = ({ weatherData }: any) => {
  const { weather_type } = weatherData;
  return (
    <video
      className="w-full fixed object-cover h-screen"
      loop
      muted
      autoPlay
      src={
        weather_type === 'Clouds'
          ? clouds
          : weather_type === 'Thunderstorm'
          ? thunder
          : weather_type === 'Rain'
          ? rain
          : weather_type === 'Snow'
          ? snow
          : weather_type === 'Fog'
          ? fog
          : weather_type === 'Clear'
          ? clear
          : fog
      }
    ></video>
  );
};

export default Background;
