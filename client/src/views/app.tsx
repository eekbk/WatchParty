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
import VoiceControl from './voiceControl/VoiceControl';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  // special AND very important useEffect
  useEffect(() => {
    if (location.pathname === '/watchParty') {
      console.log(location.pathname);
      document.body.style.overflowY = 'hidden';
    } else {
      console.log(location.pathname, ' fail');
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

  return (
    <StyledBackgroundContainer fluid>
      <Header fluid>
        <Navbar expand="lg" style={{ height: '10vh' }}>
          <Container>
            <Navbar.Brand to="/" as={Link} style={{ color: '#E5F4E3' }}>
              WatchParty
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {/* TODO: REMOVE SEARCH FROM COLLAPSE */}
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
                <Nav.Link
                  hidden={!user}
                  to="/profile"
                  as={Link}
                  style={{ color: '#E5F4E3' }}
                >
                  Profile
                </Nav.Link>
                <Nav.Link
                  hidden={!user}
                  to="/calendar"
                  as={Link}
                  style={{ color: '#E5F4E3' }}
                >
                  Calendar
                </Nav.Link>
                <Nav.Link
                  hidden={!user}
                  to="/dm"
                  as={Link}
                  style={{ color: '#E5F4E3' }}
                >
                  DMs
                </Nav.Link>
                <Nav.Link
                  hidden={!user}
                  to="/archive"
                  as={Link}
                  style={{ color: '#E5F4E3' }}
                >
                  Archives
                </Nav.Link>
                <Nav.Link
                  hidden={user}
                  href="/auth/google"
                  style={{ color: '#E5F4E3' }}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  hidden={!user}
                  onClick={handleLogout}
                  style={{ color: '#E5F4E3' }}
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
      <Footer fluid>
        <VoiceControl />
      </Footer>
    </StyledBackgroundContainer>
  );
}
export default App;
