// import { CloudFormation } from 'aws-sdk';
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { IoSearch } from 'react-icons/io5';
import { CgSearchLoading } from 'react-icons/cg';
import { SearchContext } from '../../contexts/searchContext';

function SearchBar() {
  const [textVal, setTextVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUsersMatch, setPartiesMatch, setVideosMatch } =
    useContext(SearchContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setTextVal(e.target.value);
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
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
      .then(() => {
        setIsLoading(true);
      })
      .catch((err) => {
        console.error('The Error from handleSubmit:', err);
      });
  };

  const simulateNetworkRequest = async () => {
    await setTimeout(() => {
      console.log('');
    }, 2000);
  };

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setIsLoading(false);
      });
    }
  }, [isLoading]);
  // useEffect(async () => {
  //   const keyDownHandler = (event) => {
  //     console.log('User pressed: ', event.key);
  //     if (event.key === 'Enter') {
  //       event.preventDefault();
  //       await handleSubmit(event);
  //     }
  //   };
  //   document.addEventListener('keydown', keyDownHandler);

  //   return () => {
  //     document.removeEventListener('keydown', keyDownHandler);
  //   };
  // }, []);

  return (
    <InputGroup className="mb-2" style={{ maxWidth: '20vw' }}>
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
        disabled={isLoading}
        onClick={!isLoading ? handleSubmit : null}
        onKeyDown={!isLoading ? handleSubmit : null}
      >
        {isLoading ? <CgSearchLoading /> : <IoSearch />}
      </Button>
    </InputGroup>
  );
}
export default SearchBar;
