import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../context';

function FollowButton({ otherUserId, follows, setFollows }: any) {
  console.log('FOLLOWS:', follows);
  const { user, setUser } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const [aToggle, setAToggle] = useState(false);

  useEffect(() => {
    if (user.following.includes(otherUserId)) {
      console.log('otherUserId in useEffect:\n', otherUserId);
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, []);

  console.log('otherUserId in useEffect:\n', otherUserId);

  const handleClick = async () => {
    if (isFollowing) {
      try {
        await axios.delete('/api/user/follow', {
          data: { followerId: user.id, followedId: otherUserId },
        });
        await setIsFollowing(false);
        setFollows(follows - 1);
      } catch (err) {
        console.error('Your error from unfollow, fool:\n', err);
      }
    } else {
      try {
        await axios.post('/api/user/follow', {
          followerId: user.id,
          followedId: otherUserId,
        });
        await setIsFollowing(true);
        setFollows(follows + 1);
      } catch (err) {
        console.error('Your error from follow, fool:\n', err);
      }
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
        console.error(err);
      });
    await setAToggle(!aToggle);
  };

  return (
    <Button onClick={handleClick}>{isFollowing ? 'unfollow' : 'follow'}</Button>
  );
}

export default FollowButton;
