import axios from 'axios';
import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../context';

function BlockButton({ otherUserId, isBlocking, setIsBlocking }: any) {
  // console.log('FOLLOWS:', follows);
  const { user, setUser } = useContext(UserContext);
  // const [isFollowing, setIsFollowing] = useState(false);
  const [aToggle, setAToggle] = useState(false);

  // useEffect(() => {

  // });

  const handleClick = async () => {
    try {
      await axios.post('/api/user/block', {
        // data: {
        blockerId: user.id,
        blockedId: otherUserId,
        // },
      });
      await setIsBlocking(true);
    } catch (err) {
      console.error('Your error from follow, fool:\n', err);
    }

    axios
      .get('/api/user')
      .then((data) => {
        setUser(data.data);
      })
      .then(() => {
        setAToggle(!aToggle);
      })
      .catch((err) => {
        console.error('The error from trying to update the user data:', err);
      });
    await setAToggle(!aToggle);
  };

  return (
    <Button onClick={handleClick}>{isBlocking ? 'unblock' : 'block'}</Button>
  );
}

export default BlockButton;
//   const { user, setUser } = useContext(UserContext);
//   const [isBlocked, setIsBlocked] = useState(false);
//   const [aToggle, setAToggle] = useState(false);

//   useEffect(() => {
//     if (user.blocking.includes(otherUserId)) {
//       setIsBlocked(true);
//     } else {
//       setIsBlocked(false);
//     }
//   }, []);

//   /// We're also gonna wanna erase any follows between them

//   const handleClick = async () => {
//     if (isBlocked) {
//       try {
//         await axios.delete('/api/user/block', {
//           data: { blockerId: user.id, blockedId: otherUserId },
//         });
//         await setIsBlocked(false);
//       } catch (err) {
//         console.error('Your error from unblock, fool:\n', err);
//       }
//     } else {
//       try {
//         await axios.post('/api/user/block', {
//           blockerId: user.id,
//           blockedId: otherUserId,
//         });
//         await setIsBlocked(true);
//       } catch (err) {
//         console.error('Your error from block, fool:\n', err);
//       }
//     }
//     axios
//       .get('/api/user')
//       .then((data) => {
//         setUser(data.data);
//       })
//       .then(() => {
//         setAToggle(!aToggle);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//     await setAToggle(!aToggle);
//   };

//   return (
//     <Button onClick={handleClick}>{isBlocked ? 'unblock' : 'block'}</Button>
//   );
// }
