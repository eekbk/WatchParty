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
