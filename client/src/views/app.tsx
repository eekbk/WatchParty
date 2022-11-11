import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container, Spinner } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  StyledBackgroundContainer,
  Header,
  Footer,
  MainContent,
} from '../styles';
import { UserContext } from '../context';
import SearchBar from './search/SearchBar';
// import VoiceControl from './voiceControl/VoiceControl';
import VoiceButton from '../components/buttons/VoiceButton';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const { user, setUser } = useContext(UserContext);

  // special AND very important useEffect
  useEffect(() => {
    if (location.pathname === '/watchParty') {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [location]);

  useEffect(() => {
    if (!user) {
      setVerified(false);
      axios
        .get('/api/user')
        .then((data) => {
          if (data.data) {
            setVerified(true);
            setUser(data.data);
          } else {
            setUser(null);
            setVerified(true);
            navigate('/');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  const handleLogout = () => {
    setVerified(false);
    axios
      .post('/logout')
      .then(() => {
        setVerified(true);
        setUser(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <StyledBackgroundContainer fluid>
      <Header>
        <Navbar variant="dark" expand="lg">
          <Container>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ marginBottom: '15px', marginTop: '15px' }}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Navbar.Brand to="/" as={Link} style={{ color: 'white' }}>
                WatchParty
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link
                  hidden={!user}
                  to="/createParty"
                  as={Link}
                  style={{ color: 'white' }}
                >
                  Create Party
                </Nav.Link>
                {/* <Nav.Link
                  hidden={!user}
                  to="/profile"
                  as={Link}
                  style={{ color: 'white' }}
                >
                  Profile
                </Nav.Link> */}
                <Nav.Link
                  hidden={!user}
                  to="/dm"
                  as={Link}
                  style={{ color: 'white' }}
                >
                  DMs
                </Nav.Link>
                <Nav.Link
                  hidden={!user}
                  to="/archive"
                  as={Link}
                  style={{ color: 'white' }}
                >
                  Archives
                </Nav.Link>
                <Nav.Link
                  hidden={user}
                  href="/auth/google"
                  style={{ color: 'white' }}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  hidden={!user}
                  onClick={handleLogout}
                  style={{ color: 'white' }}
                >
                  Logout
                </Nav.Link>
              </Nav>
              {user ? <SearchBar /> : null}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Header>
      <MainContent>
        {verified ? (
          <Outlet />
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
        )}
      </MainContent>
      <Footer>
        <VoiceButton />
      </Footer>
    </StyledBackgroundContainer>
  );
}
export default App;
