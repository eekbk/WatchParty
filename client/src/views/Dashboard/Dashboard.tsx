import { useContext } from 'react';
import { UserContext } from '../../context';
import { LoggedIn } from './LoggedIn';
import { LoggedOut } from './LoggedOut';

export function Dashboard() {
  const { user } = useContext(UserContext);

  return user ? <LoggedIn /> : <LoggedOut />;
}
