import React, { useState, useEffect } from 'react';

function Search() {
  const [textVal, setTextVal] = useState('');

  useEffect(() => {
    // console.log('hello?');
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setTextVal(e.target.value);
    console.log(textVal);
  };

  const handleSubmit = (e) => {
    console.log('button clicked!');
    e.preventDefault();
    setTextVal('');
  };

  return (
    <form>
      <label htmlFor="search">
        <input
          type="text"
          value={textVal}
          onChange={handleChange}
          placeholder="Search for Parties, Users, Videos..."
        />
        <button type="submit" value="Submit" onSubmit={handleSubmit}>
          Search
        </button>
      </label>
    </form>
  );
}

export default Search;
