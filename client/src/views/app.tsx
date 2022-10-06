import {
  useLocation, useNavigate, Outlet, Link,
} from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';

function App(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleClick = (e: any) => {
    if (location !== e.target.id) {
      navigate(e.target.id);
    }
  };

  return (
    <Container fluid style={{ backgroundColor: 'black' }}>
      <Navbar bg="dark" variant="dark" expand="xs" style={{ height: '10vh' }}>
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
    </Container>
  );
}
export default App;
