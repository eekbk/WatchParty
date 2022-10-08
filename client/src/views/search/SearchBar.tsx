// import { CloudFormation } from 'aws-sdk';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { IoSearch } from 'react-icons/io5';
import { SearchContext } from '../../contexts/searchContext';

function SearchBar() {
  const [textVal, setTextVal] = useState('');
  const { setUsersMatch, setPartiesMatch, setVideosMatch } =		useContext(SearchContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setTextVal(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('button clicked!');
    e.preventDefault();
    const q = textVal.replaceAll(' ', '&');
    axios
      .get(`/api/search/${q}`)
      .then(({ data }) => {
        setVideosMatch(data.videos);
        setUsersMatch(data.users);
        setPartiesMatch(data.parties);
      })
      .then(() => {
        setTextVal('');
      })
      .then(() => {
        navigate('/search');
      })
      .catch((err) => {
        console.error('The Error from handleSubmit:', err);
      });
  };

  return (
    <InputGroup className="mb-2">
      <Form.Control
        type="text"
        value={textVal}
        onChange={handleChange}
        placeholder="Search for Parties, Users, Videos..."
      />
      <Button
        variant="outline-secondary"
        id="search-submit"
        value="Submit"
        onClick={handleSubmit}
      >
        <IoSearch />
      </Button>
    </InputGroup>
  );
}
export default SearchBar;
