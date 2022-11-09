import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsMic, BsMicMute } from 'react-icons/bs';
import { VoiceContext } from '../../contexts/voiceContext';
import HelpButton from './HelpButton';
import {
  StyledActiveMicIcon,
  StyledDisabledMicIcon,
  StyledTranscript,
  StyledModal,
  StyledModalHeader,
} from './buttons.styles';

function VoiceButton() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {
    transcript,
    isSwitchOn,
    resetTranscript,
    redirectUrl,
    handleVoiceToggle,
    closeModalToggle,
  } = useContext(VoiceContext);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // maybe we have to put all the navigation stuff in here
  const pages = ['home', 'profile', 'create party', 'calendar', 'login', 'DMs'];
  const urls = {
    home: '/',
    profile: '/profile',
    'create party': '/createParty',
    calendar: '/calendar',
    login: '/auth/google',
    DMs: '/dm',
  };

  useEffect(() => {
    if (redirectUrl) {
      if (pages.includes(redirectUrl)) {
        navigate(urls[redirectUrl]);
      } else {
        handleShowModal();
      }
    }
    resetTranscript();
  }, [redirectUrl]);

  useEffect(() => {
    if (showModal) {
      handleCloseModal();
    }
  }, [closeModalToggle]);

  return (
    <>
      <StyledModal show={showModal} onHide={handleCloseModal}>
        <StyledModalHeader closeButton>
          <Modal.Title>
            Page &quot;
            {redirectUrl}
            &quot; not recognized
          </Modal.Title>
        </StyledModalHeader>
        {/* <Modal.Body>
            <Button href="/auth/google">Login</Button>
          </Modal.Body> */}
        <Modal.Footer>Say &quot;exit, send&quot; to close</Modal.Footer>
      </StyledModal>
      {isSwitchOn ? (
        <StyledActiveMicIcon onClick={handleVoiceToggle}>
          <BsMic />
        </StyledActiveMicIcon>
      ) : (
        <StyledDisabledMicIcon onClick={handleVoiceToggle}>
          <BsMicMute />
        </StyledDisabledMicIcon>
      )}
      <HelpButton />
      {isSwitchOn ? <StyledTranscript>{transcript}</StyledTranscript> : []}
    </>
  );
}
export default VoiceButton;
