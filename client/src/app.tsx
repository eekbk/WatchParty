import {
  useLocation, useNavigate, Outlet, Link,
} from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

function App(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleClick = (e: any) => {
    if (location !== e.target.id) {
      navigate(e.target.id);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand id="/home" onClick={handleClick} type="a">
          WatchParty!
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/watchParty" as={Link} onClick={handleClick}>
            WatchParty !&quot;TEMP&quot;!
          </Nav.Link>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  );
}
export default App;
