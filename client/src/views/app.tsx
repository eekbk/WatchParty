import {
   Outlet, Link,
} from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';

function App(): JSX.Element {
  // const navigate = useNavigate();
  // const location = useLocation().pathname;

  // const handleClick = (e: any) => {
  //   if (location !== e.target.id) {
  //     navigate(e.target.id);
  //   }
  // };

  return (
    <Container fluid style={{ backgroundColor: 'black' }}>
      <Navbar expand="lg" style={{ height: '10vh' }} bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand to="/home" as={Link}>
            WatchParty
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/watchParty" as={Link}>
                Party View
              </Nav.Link>
              <Nav.Link to="/createParty" as={Link}>
                Create Party
              </Nav.Link>
              <Nav.Link to="/profile" as={Link}>
                Profile
              </Nav.Link>
              <Nav.Link to="/dashboard" as={Link}>
                Dashboard
              </Nav.Link>
              <Nav.Link href="/auth/google">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </Container>
  );
}
export default App;
