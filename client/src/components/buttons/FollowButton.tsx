import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import { VoiceContext } from '../../contexts/voiceContext';
import { StyledGlassFollowButton } from './buttons.styles';

function FollowButton({
  otherUserId,
  otherUserName,
  follows,
  setFollows,
  isFollowing,
  setIsFollowing,
}) {
  const { user, setUser } = useContext(UserContext);
  const { followName, setFollowName, resetTranscript } =
    useContext(VoiceContext);
  const [aToggle, setAToggle] = useState(false);

  const updateFollowStatus = async () => {
    if (isFollowing) {
      try {
        setIsFollowing(false);
        setFollows(follows - 1);
        await axios.delete('/api/user/follow', {
          data: { followerId: user.id, followedId: otherUserId },
        });
      } catch (err) {
        console.error('Your error from unfollow, fool:\n', err);
      }
    } else {
      try {
        setIsFollowing(true);
        setFollows(follows + 1);
        await axios.post('/api/user/follow', {
          followerId: user.id,
          followedId: otherUserId,
        });
        await axios.post('/api/user/dm', {
          currentUserId: user.id,
          otherUserId,
        });
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

  const handleClick = () => {
    updateFollowStatus();
  };

  useEffect(() => {
    if (followName.toUpperCase() === otherUserName.toUpperCase()) {
      updateFollowStatus();
      resetTranscript();
    }
  }, [followName]);

  useEffect(() => {
    setFollowName('');
  }, [aToggle]);

  return (
    <StyledGlassFollowButton
      size="sm"
      onClick={handleClick}
      style={{ width: '73px' }}
    >
      {isFollowing ? 'unfollow' : 'follow'}
    </StyledGlassFollowButton>
  );
}

export default FollowButton;
