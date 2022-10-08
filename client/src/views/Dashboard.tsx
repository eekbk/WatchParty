// import axios from 'axios';
// import { useState, useEffect } from 'react';
import { useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../context';
// useState, useContext useState,
function Dashboard() {
  // get user data from nodejs and return in react jsl functional component using hooks
  // use axios to get user data from prisma DB and
  // get user data from express.js return to react functional component using hooks?

  const { user, setUser }: { user: any; setUser: any } =		useContext(UserContext);
  // const [ data1, setData1 ] = useState([]);

  useEffect(() => {
    axios
      .post('http://localhost:4040/test')
      .then((data) => {
        setUser(data.data);
        console.log(data.data, '2nd data....');
      })
      .then(() => {
        // console.log(user)
      })

      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
		<Container>
			dashboard
			{user ? user.user_name : 'not logged in'}
		</Container>
  );
}

export default Dashboard;

// let base_url = `https://tinyfac.es/api/data?limit=50&quality=0`;

// function Storyslider() {
//   const [Containers, setContainers] = useState([]);
//   useEffect(() => {
//     axios
//       .get(base_url)
//       .then((a) => {
//         console.log(a.data);
//         setContainers(a.data);
//       })
//       .catch((b) => {
//         console.log(Error);
//       });
//   }, []);
//   return (
//     <div>
//       {Containers &&
//         Containers.map((Contain, index) => (
//           <img
//             src={Contain?.url}
//             alt={Contain?.gender}
//             key={index}
//           />
//         ))}
//     </div>
//   );
// }

// export default Storyslider

// {Containers && <img src={Containers[0].url} alt={Containers[0].gender} />}
