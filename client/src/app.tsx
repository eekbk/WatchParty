import {useLocation, useNavigate, Outlet} from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap';
const App = () :JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleClick = (e) => {
    if (location !== e.target.id) {
      console.log(e.target.id);
      navigate(e.target.id);
    }
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand id='/home' onClick={handleClick}>WatchParty!</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link id='/watchParty' onClick={handleClick}>WatchParty !"TEMP"!</Nav.Link>
        </Nav>
      </Navbar>
      <Outlet />
    </>
  )
}
export default App;
