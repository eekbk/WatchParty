// import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
// import { SearchContext } from '../../contexts/searchContext';
import { VoiceContext } from '../../contexts/voiceContext';
import {
  SearchForm,
  SearchInputContainer,
  SearchButton,
  SearchIcon,
  SearchBarContainer,
} from './search.styles';

function SearchBar() {
  const [textVal, setTextVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { setUsersMatch, setPartiesMatch, setVideosMatch } =
  //   useContext(SearchContext);
  const { resetTranscript, searchBarVal, setSearchBarVal, isSent } =
    useContext(VoiceContext);
  const navigate = useNavigate();

  // what if we put a useEffect to watch for changes in the searchValue
  const searchRequest = (text) => {
    // make sure there is text
    if (text.length) {
      const q = text.trim().replaceAll(' ', '&').replaceAll(' and ', '&');
      // route to the search page with q as the param
      navigate(`/search/${q}`);
      // axios
      //   .get(`/api/search/${q}`)
      //   .then(({ data }) => {
      //     setVideosMatch(data.videos);
      //     setUsersMatch(data.users);
      //     setPartiesMatch(data.parties);
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
    }
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

  // set a useEffect to listen for search-specific commands
  useEffect(() => {
    setTextVal(searchBarVal);
  }, [searchBarVal]);

  useEffect(() => {
    if (searchBarVal) {
      searchRequest(searchBarVal);
    }
    setTextVal('');
    resetTranscript();
    setSearchBarVal('');
  }, [isSent]);

  return (
    <form onSubmit={!isLoading ? handleSubmit : null}>
      <SearchBarContainer>
        <SearchInputContainer>
          <SearchForm
            type="text"
            value={textVal}
            onChange={handleChange}
            placeholder="Parties, Users, Videos..."
          />
          <SearchButton
            type="submit"
            id="search-submit"
            value="Submit"
            disabled={isLoading}
          >
            <SearchIcon>
              <IoSearch />
            </SearchIcon>
          </SearchButton>
        </SearchInputContainer>
      </SearchBarContainer>
    </form>
  );
}
export default SearchBar;
