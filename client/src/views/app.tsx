import { Outlet, Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';

function App(): JSX.Element {
  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand to="/home" as={Link}>
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
        </Nav>
      </Navbar>
      <Outlet />
    </Container>
  );
}
export default App;
