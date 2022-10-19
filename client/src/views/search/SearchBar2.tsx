import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { SearchContext } from '../../contexts/searchContext';
import {
  SearchForm,
  SearchInputContainer,
  SearchButton,
  SearchIcon,
  SearchBarContainer,
} from './search.styles';

function SearchBar2() {
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
      <SearchBarContainer>
        <SearchInputContainer>
          {/* <InputGroup className="mb-2" style={{ maxWidth: '20vw' }}> */}
          <SearchForm
            type="text"
            value={textVal}
            onChange={handleChange}
            placeholder="Parties, Users, Videos..."
          />
          <SearchButton
            // variant="outline-secondary"
            type="submit"
            id="search-submit"
            value="Submit"
            disabled={isLoading}
          >
            {/* {isLoading ? <CgSearchLoading /> : <IoSearch />} */}
            <SearchIcon>
              <IoSearch />
            </SearchIcon>
          </SearchButton>
          {/* </InputGroup> */}
        </SearchInputContainer>
      </SearchBarContainer>
    </form>
  );
}
export default SearchBar2;
