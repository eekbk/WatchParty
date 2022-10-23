import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { VoiceContext } from '../contexts/voiceContext';
import { StyledGlassButton } from './buttons.styles';

function DmButton({ socket, otherUserId, otherUserName, currentUserId }) {
  const navigate = useNavigate();
  const { dmName, setDmName } = useContext(VoiceContext);

  const openDm = () => {
    socket.emit('createConnection', [otherUserId, currentUserId]);
    navigate('/dm');
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
