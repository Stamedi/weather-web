import React, { useState } from 'react';

const Nav = ({ handleSubmit }: any) => {
  const [storeInput, setStoreInput] = useState('');

  return (
    <div className=" pl-10 flex items-center justify-start pt-5">
      <h1 className="text-4xl">Weather App</h1>
      <div className="flex justify-center">
        <form className="relative xl:w-96 ml-10 mr-4 mt-2" onSubmit={handleSubmit}>
          <input
            value={storeInput}
            onChange={(e) => setStoreInput(e.target.value)}
            type="text"
            placeholder="Search a City..."
            className="px-3 py-2 appearance-none bg-transparent border-none w-full text-gray-700 mr-3 leading-tight focus:outline-none rounded-lg"
          />
        </form>
      </div>
    </div>
  );
};

export default Nav;
