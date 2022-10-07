// File for React context
import { createContext, useState, useMemo } from 'react';

export const UserContext = createContext(null);
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const userVal = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  );
  return (
		<UserContext.Provider value={userVal}>{children}</UserContext.Provider>
  );
}
