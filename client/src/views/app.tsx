import {
  useLocation, useNavigate, Outlet, Link,
} from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';

function App(): JSX.Element {
  return (
    <Container fluid style={{ backgroundColor: 'black' }}>
      <Navbar bg="dark" variant="dark" expand="xs" style={{ height: '10vh' }}>
        <Navbar.Brand id="/home" to="/home" as={Link}>
          WatchParty!
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link to="/watchParty" as={Link}>
            WatchParty !&quot;TEMP&quot;!
          </Nav.Link>
          <Nav.Link to="/createParty" as={Link}>
            Create Watch Party
          </Nav.Link>
          <Nav.Link to="/profile" as={Link}>
            Profile
          </Nav.Link>
          <Nav.Link to="/dashboard" as={Link}>
            Dashboard
          </Nav.Link>
          <a href="/auth/google">LOGIN!</a>
        </Nav>
      </Navbar>

      <Outlet />
    </Container>
  );
}
export default App;
