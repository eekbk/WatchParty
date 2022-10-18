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

  // what if we put a useEffect to watch for changes in the searchValue
  const searchRequest = (text) => {
    const q = text.replaceAll(' ', '&').replaceAll(' and ', '&');
    axios
      .get(`/api/search/${q}`)
      .then(({ data }) => {
        setVideosMatch(data.videos);
        setUsersMatch(data.users);
        setPartiesMatch(data.parties);
      })
      // .then(() => {
      //   setTextVal('');
      // })
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

  const handleChange = (e) => {
    e.preventDefault();
    setTextVal(e.target.value);
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    searchRequest(textVal);
    setTextVal('');

    // const q = textVal.replaceAll(' ', '&');
    // axios
    //   .get(`/api/search/${q}`)
    //   .then(({ data }) => {
    //     setVideosMatch(data.videos);
    //     setUsersMatch(data.users);
    //     setPartiesMatch(data.parties);
    //   })
    //   .then(() => {
    //     setTextVal('');
    //   })
    //   .then(() => {
    //     navigate('/search');
    //   })
    //   .then(() => {
    //     setIsLoading(true);
    //   })
    //   .catch((err) => {
    //     console.error('The Error from handleSubmit:', err);
    //   });
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

  return (
    <form onSubmit={!isLoading ? handleSubmit : null}>
      <InputGroup className="mb-2" style={{ maxWidth: '20vw' }}>
        <Form.Control
          type="text"
          value={textVal}
          onChange={handleChange}
          placeholder="Search for Parties, Users, Videos..."
        />
        <Button
          variant="outline-secondary"
          type="submit"
          id="search-submit"
          value="Submit"
          disabled={isLoading}
          // onChange={!isLoading ? handleSubmit : null}
          // onKeyDown={!isLoading ? handleSubmit : null}
        >
          {isLoading ? <CgSearchLoading /> : <IoSearch />}
        </Button>
      </InputGroup>
    </form>
  );
}
export default SearchBar;
