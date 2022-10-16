// File for React context
import { createContext, useState, useMemo } from 'react';

export const SearchContext = createContext(null);
export function SearchContextProvider({ children }) {
  const [usersMatch, setUsersMatch] = useState([]);
  const [partiesMatch, setPartiesMatch] = useState([]);
  const [videosMatch, setVideosMatch] = useState([]);
  const searchVal = useMemo(
    () => ({
      usersMatch,
      setUsersMatch,
      partiesMatch,
      setPartiesMatch,
      videosMatch,
      setVideosMatch,
    }),
    [usersMatch, partiesMatch, videosMatch]
  );
  return (
    <SearchContext.Provider value={searchVal}>
      {children}
    </SearchContext.Provider>
  );
}
