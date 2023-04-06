import React, { useState } from 'react';

const Nav = ({ handleSubmit }: any) => {
  const [storeInput, setStoreInput] = useState('');

  return (
    <div className="container mx-auto pl-10 flex-column sm:flex items-center  pt-5 relative">
      <h1 className="text-4xl">Weather App</h1>
      <form className="relative sm:w-96 sm:ml-10 mr-4 mt-10 sm:mt-2  flex sm:justify-center" onSubmit={handleSubmit}>
        <input
          value={storeInput}
          onChange={(e) => setStoreInput(e.target.value)}
          type="text"
          placeholder="Search a City..."
          className="px-3 py-2 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none rounded-lg"
        />
      </form>
    </div>
  );
};

export default Nav;
