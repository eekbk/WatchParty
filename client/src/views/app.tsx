import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
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

  // TODO: fix style look, do style goodly
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
                  to="/calendar"
                  as={Link}
                  style={{ color: 'white' }}
                >
                  Calendar
                </Nav.Link>
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
              <SearchBar />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Header>
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer>
        <VoiceButton />
      </Footer>
    </StyledBackgroundContainer>
  );
}
export default App;
