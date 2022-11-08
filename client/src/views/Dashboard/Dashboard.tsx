import { useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { UserContext } from '../../context';
import { LoggedIn } from './LoggedIn';
import { LoggedOut } from './LoggedOut';

export function Dashboard() {
  const { user, verified } = useContext(UserContext);

  return user && verified ? (
    <LoggedIn />
  ) : !user && verified ? (
    <LoggedOut />
  ) : (
    <Spinner
      animation="border"
      role="status"
      style={{
        color: '#A663CC',
        position: 'absolute',
        left: '50%',
        top: '50vh',
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
