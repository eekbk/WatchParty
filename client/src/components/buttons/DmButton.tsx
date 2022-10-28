// import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { VoiceContext } from '../../contexts/voiceContext';
import { StyledGlassButton } from './buttons.styles';

function DmButton({ socket, otherUserId, otherUserName, currentUserId }) {
  // const navigate = useNavigate();
  const { dmName } = useContext(VoiceContext);

  const openDm = () => {
    const config = {
      method: 'post',
      url: 'http://localhost:4040/api/user/dm',
      headers: {},
      data: {
        currentUserId,
        otherUserId,
      },
    };

    axios(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
