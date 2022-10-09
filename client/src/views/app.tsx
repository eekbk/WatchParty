import { Outlet, Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useContext } from 'react';
import { StyledBackgroundContainer } from '../styles';
import { UserContext } from '../context';
import SearchBar from './search/SearchBar';

function App(): JSX.Element {
  const { user } = useContext(UserContext);

  return (
    <StyledBackgroundContainer fluid>
      <Navbar expand="lg" style={{ height: '10vh' }}>
        <Container>
          <Navbar.Brand to="/home" as={Link}>
            WatchParty
          </Navbar.Brand>
          <Nav>
            <SearchBar />
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/watchParty" as={Link}>
                Party View
              </Nav.Link>
              <Nav.Link hidden={!user} to="/createParty" as={Link}>
                Create Party
              </Nav.Link>
              <Nav.Link to="/profile" as={Link}>
                Profile
              </Nav.Link>
              <Nav.Link to="/dashboard" as={Link}>
                Dashboard
              </Nav.Link>
              <Nav.Link to="/home" as={Link}>
                Home
              </Nav.Link>
              <Nav.Link hidden={user} href="/auth/google">
                Login
              </Nav.Link>
              <Nav.Link hidden={!user} href="/logout">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <SearchBar />
        </Container>
      </Navbar>
      <Outlet />
    </StyledBackgroundContainer>
  );
}
export default App;
