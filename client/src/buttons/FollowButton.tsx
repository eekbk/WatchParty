import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../context';
import { StyledGlassButton } from './buttons.styles';

function FollowButton({
  otherUserId,
  follows,
  setFollows,
  isFollowing,
  setIsFollowing,
}: any) {
  // console.log('FOLLOWS:', follows);
  const { user, setUser } = useContext(UserContext);
  // const [isFollowing, setIsFollowing] = useState(false);
  const [aToggle, setAToggle] = useState(false);

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
          // data: {
          followerId: user.id,
          followedId: otherUserId,
          // },
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
        console.error('The error from trying to update the user data:', err);
      });
    await setAToggle(!aToggle);
  };

  return (
    <StyledGlassButton size="sm" onClick={handleClick}>
      {isFollowing ? 'unfollow' : 'follow'}
    </StyledGlassButton>
  );
}

export default FollowButton;
