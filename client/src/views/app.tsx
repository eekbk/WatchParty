import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { StyledBackgroundContainer } from '../styles';
import { UserContext } from '../context';
import SearchBar from './search/SearchBar';
import VoiceControl from './voiceControl/VoiceControl';

function App() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      axios
        .get('/api/user')
        .then((data) => {
          setUser(data.data);
        })
        .catch((err) => {
          setUser(null);
          navigate('/');
          console.error(err);
        });
    }
  }, [user]);

  const handleLogout = () => {
    axios
      .post('/logout')
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <StyledBackgroundContainer fluid>
      <Navbar expand="lg" style={{ height: '10vh' }}>
        <Container>
          <Navbar.Brand to="/" as={Link} style={{ color: '#E5F4E3' }}>
            WatchParty
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                hidden={!user}
                to="/createParty"
                as={Link}
                style={{ color: '#E5F4E3' }}
              >
                Create Party
              </Nav.Link>
              <Nav.Link to="/profile" as={Link} style={{ color: '#E5F4E3' }}>
                Profile
              </Nav.Link>
              <Nav.Link to="/dm" as={Link} style={{ color: '#E5F4E3' }}>
                DMs
              </Nav.Link>
              <Nav.Link to="/archive" as={Link} style={{ color: '#E5F4E3' }}>
                Archives
              </Nav.Link>
              <Nav.Link
                hidden={user}
                as={Button}
                href="/auth/google"
                style={{ color: '#E5F4E3' }}
              >
                Login
              </Nav.Link>
              <Nav.Link
                hidden={!user}
                as={Button}
                onClick={handleLogout}
                style={{ color: '#E5F4E3' }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <SearchBar />
        </Container>
      </Navbar>
      <Outlet />
      <VoiceControl />
    </StyledBackgroundContainer>
  );
}
export default App;
