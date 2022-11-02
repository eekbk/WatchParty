import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { VoiceContext } from '../contexts/voiceContext';

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
    <Form>
      <Form.Check
        type="switch"
        id="vc-switch"
        label={isSwitchOn ? 'Voice Control ON' : 'Voice Control OFF'}
        onChange={handleVoiceToggle}
        checked={isSwitchOn}
      />
      {isSwitchOn ? <p>{transcript}</p> : []}
    </Form>
  );
}
export default VoiceButton;
