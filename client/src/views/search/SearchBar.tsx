// import { CloudFormation } from 'aws-sdk';
import axios from 'axios';
import React, { useState, useContext } from 'react';

import { SearchContext } from '../../contexts/searchContext';
// import React, { useState, useEffect } from 'react';
// import Typeahead from 'react-bootstrap-typeahead';

function SearchBar() {
  const [textVal, setTextVal] = useState('');
  // const [dataTest, setDataTest] = useState(null);
  const {
    // usersMatch,
    setUsersMatch,
    // partiesMatch,
    setPartiesMatch,
    // videosMatch,
    setVideosMatch,
  } = useContext(SearchContext);
  // const [usersMatch, setUsersMatch] = useState([]);
  // const [partiesMatch, setPartiesMatch] = useState([]);
  // const [videosMatch, setVideosMatch] = useState([]);

  // useEffect(() => {
  //   console.log('the usersMatch:\n', usersMatch);
  //   console.log('the partiesMatch:\n', partiesMatch);
  //   console.log(textVal);
  // }, [usersMatch, partiesMatch]);

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
      .get(`/api/search/${q}`)
      .then(({ data }) => {
        // console.log('The data from search results:\n', data);
        // setDataTest(data);
        setVideosMatch(data.videos);
        setUsersMatch(data.users);
        setPartiesMatch(data.parties);
        // console.log('The usersMatch:\n', usersMatch, '\nThe partiesMatch:\n', partiesMatch);
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
