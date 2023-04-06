import React from 'react';
import fog from '../assets/images/fog.mp4';

const Background = ({ weatherData }: any) => {
  return (
    <div>
      <div className="w-screen object-fill min-h-screen bg-gradient-to-b from-grey to-beige "></div>
      {/* <video className="w-screen object-fill min-h-screen" loop muted autoPlay src={fog}></video> */}
    </div>
  );
};

export default Background;
