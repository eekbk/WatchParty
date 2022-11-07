// File for React context
import { createContext, useState, useMemo } from 'react';

export const UserContext = createContext(null);
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [verified, setVerified] = useState(false);
  const userVal = useMemo(
    () => ({
      user,
      setUser,
      verified,
      setVerified,
    }),
    [user, setUser, verified, setVerified]
  );
  return (
    <UserContext.Provider value={userVal}>{children}</UserContext.Provider>
  );
}
