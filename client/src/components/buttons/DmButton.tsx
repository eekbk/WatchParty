import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { VoiceContext } from '../../contexts/voiceContext';
import { StyledGlassButton } from './buttons.styles';

function DmButton({ otherUserId, otherUserName, currentUserId }) {
  const navigate = useNavigate();
  const { dmName } = useContext(VoiceContext);

  const openDm = async () => {
    try {
      await axios.post('/api/user/dm', {
        currentUserId,
        otherUserId,
      });
      navigate('/dm');
    } catch (err) {
      console.error(err);
      navigate('/dm');
    }
  };

  const clickHandler = () => {
    openDm();
  };

  useEffect(() => {
    if (otherUserName === dmName) {
      openDm();
    }
  }, [dmName]);

  return (
    <StyledGlassButton size="sm" onClick={clickHandler}>
      DM
    </StyledGlassButton>
  );
}

export default DmButton;
