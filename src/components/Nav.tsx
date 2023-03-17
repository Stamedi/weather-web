import React, { useState } from 'react';

const Nav = ({ handleSubmit }: any) => {
  const [storeInput, setStoreInput] = useState('');

  return (
    <div className="navbar flex items-center justify-center">
      <h1 className="text-4xl">Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={storeInput}
          onChange={(e) => setStoreInput(e.target.value)}
          type="text"
          placeholder="Search..."
          className="ml-8 mr-4 mt-2"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Nav;
