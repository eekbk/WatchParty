import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import { VoiceContext } from '../../contexts/voiceContext';
import { StyledGlassButton } from './buttons.styles';

function FollowButton({
  otherUserId,
  otherUserName,
  follows,
  setFollows,
  isFollowing,
  setIsFollowing,
}: any) {
  // console.log('FOLLOWS:', follows);
  const { user, setUser } = useContext(UserContext);
  const { followName, setFollowName, resetTranscript } =
    useContext(VoiceContext);
  // const [isFollowing, setIsFollowing] = useState(false);
  const [aToggle, setAToggle] = useState(false);

  const updateFollowStatus = async () => {
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

  const handleClick = /* async */ () => {
    updateFollowStatus();
    // if (isFollowing) {
    //   try {
    //     await axios.delete('/api/user/follow', {
    //       data: { followerId: user.id, followedId: otherUserId },
    //     });
    //     await setIsFollowing(false);
    //     setFollows(follows - 1);
    //   } catch (err) {
    //     console.error('Your error from unfollow, fool:\n', err);
    //   }
    // } else {
    //   try {
    //     await axios.post('/api/user/follow', {
    //       // data: {
    //       followerId: user.id,
    //       followedId: otherUserId,
    //       // },
    //     });
    //     await setIsFollowing(true);
    //     setFollows(follows + 1);
    //   } catch (err) {
    //     console.error('Your error from follow, fool:\n', err);
    //   }
    // }
    // axios
    //   .get('/api/user')
    //   .then((data) => {
    //     setUser(data.data);
    //   })
    //   .then(() => {
    //     setAToggle(!aToggle);
    //   })
    //   .catch((err) => {
    //     console.error('The error from trying to update the user data:', err);
    //   });
    // await setAToggle(!aToggle);
  };

  useEffect(() => {
    // console.log(`Are you listening?? ${otherUserName} or are you ${followName}`)
    if (followName.toUpperCase() === otherUserName.toUpperCase()) {
      updateFollowStatus();
      resetTranscript();
    }
  }, [followName]);

  useEffect(() => {
    setFollowName('');
  }, [aToggle]);

  return (
    <StyledGlassButton
      size="sm"
      onClick={handleClick}
      style={{ width: '73px' }}
    >
      {isFollowing ? 'unfollow' : 'follow'}
    </StyledGlassButton>
  );
}

export default FollowButton;
