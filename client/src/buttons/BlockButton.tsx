import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StyledGlassButton } from './buttons.styles';
import { UserContext } from '../context';
import { VoiceContext } from '../contexts/voiceContext';

function BlockButton({
  otherUserId,
  otherUserName,
  isBlocking,
  setIsBlocking,
}: any) {
  // console.log('FOLLOWS:', follows);
  const { user, setUser } = useContext(UserContext);
  const {
    blockName,
    resetTranscript,
    // setBlockName,
    // isSent,
  } = useContext(VoiceContext);
  // const [isFollowing, setIsFollowing] = useState(false);
  const [aToggle, setAToggle] = useState(false);

  // useEffect(() => {

  // });
  const updateBlockStatus = async () => {
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

  const handleClick = () => {
    updateBlockStatus();
    // try {
    //   await axios.post('/api/user/block', {
    //     // data: {
    //     blockerId: user.id,
    //     blockedId: otherUserId,
    //     // },
    //   });
    //   await setIsBlocking(true);
    // } catch (err) {
    //   console.error('Your error from follow, fool:\n', err);
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
    if (blockName.toUpperCase() === otherUserName.toUpperCase()) {
      updateBlockStatus();
      resetTranscript();
    }
  }, [blockName]);

  return (
    <StyledGlassButton size="sm" onClick={handleClick}>
      {isBlocking ? 'unblock' : ' block '}
    </StyledGlassButton>
  );
}

export default BlockButton;
