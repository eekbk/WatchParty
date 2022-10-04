import {useLocation, useNavigate, Outlet} from 'react-router-dom'

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
    <div>
      <ul>
        <li id='/home' onClick={handleClick}>Home</li>
      </ul>
      <Outlet />
    </div>
  )
}
export default App;
