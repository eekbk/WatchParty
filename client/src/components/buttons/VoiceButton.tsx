import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Form } from 'react-bootstrap';
import { BsMic, BsMicMute } from 'react-icons/bs';
import { VoiceContext } from '../../contexts/voiceContext';
import {
  StyledActiveMicIcon,
  StyledDisabledMicIcon,
  StyledTranscript,
} from './buttons.styles';

function VoiceButton() {
  const navigate = useNavigate();
  const {
    transcript,
    isSwitchOn,
    resetTranscript,
    redirectUrl,
    handleVoiceToggle,
  } = useContext(VoiceContext);

  // maybe we have to put all the navigation stuff in here
  const pages = ['home', 'profile', 'create party', 'calendar'];
  const urls = {
    home: '/',
    profile: '/profile',
    'create party': '/createParty',
    calendar: '/calendar',
  };

  useEffect(() => {
    if (redirectUrl) {
      if (pages.includes(redirectUrl)) {
        navigate(urls[redirectUrl]);
      } else {
        alert('Page not recognized');
      }
    }
    resetTranscript();
  }, [redirectUrl]);

  return (
    <>
      {isSwitchOn ? <StyledTranscript>{transcript}</StyledTranscript> : []}
      {isSwitchOn ? (
        <StyledActiveMicIcon onClick={handleVoiceToggle}>
          <BsMic />
        </StyledActiveMicIcon>
      ) : (
        <StyledDisabledMicIcon onClick={handleVoiceToggle}>
          <BsMicMute />
        </StyledDisabledMicIcon>
      )}
    </>
  );
}
export default VoiceButton;
