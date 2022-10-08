// import { CloudFormation } from 'aws-sdk';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import React, { useState, useEffect } from 'react';
// import Typeahead from 'react-bootstrap-typeahead';

function SearchBar() {
  const [textVal, setTextVal] = useState('');
  const [dataTest, setDataTest] = useState(null);
  // const [usersMatch, setUsersMatch] = useState([]);
  // const [partiesMatch, setPartiesMatch] = useState([]);
  // const [videosMatch, setVideosMatch] = useState([]);

  useEffect(() => {
    console.log('hello?');
    console.log(dataTest);
    console.log(textVal);
  }, [dataTest, textVal]);

  const handleChange = (e) => {
    e.preventDefault();
    setTextVal(e.target.value);
    // console.log(textVal);
  };

  const handleSubmit = (e) => {
    console.log('button clicked!');
    e.preventDefault();
    // send an axios request to the backend with textVal as the body data
    const q = textVal.replaceAll(' ', '&');
    axios
      .get(`/search/${q}`)
      .then((data) => {
        console.log('The data from search results:\n', data);
        setDataTest(data);
      })
      .then(() => {
        console.log('dataTest:', dataTest);
      })
      .then(() => {
        setTextVal('');
      })
      .catch((err) => {
        console.error('The Error from handleSubmit:', err);
      });
    // set the appropriate states with the info
    // setTextVal('');
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
				<button type="button" value="Submit" onClick={handleSubmit}>
					Search
				</button>
			</label>
		</form>
  );
}
export default SearchBar;
