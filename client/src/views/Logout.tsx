import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../context';
// const navigate = useNavigate();
// import { Navigate } from 'react-router-dom';

function Logout() {
  const { setUser } = useContext(UserContext);

  // setUser(null);
  axios
    .get('/logout')
    .then((data) => {
      setUser(null);
    })
  // .then(() => {
  //   navigate("/");
  // })
    .catch((err) => {
      console.error(err);
    });

  return null;
}
export default Logout;
