import { BsQuestion } from 'react-icons/bs';
import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { StyledHelpButton } from './buttons.styles';
import { VoiceContext } from '../../contexts/voiceContext';

function HelpButton() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const location = useLocation();
  const { openModalToggle, closeModalToggle, listening } =
    useContext(VoiceContext);

  useEffect(() => {
    if (listening) {
      setShowHelpModal(true);
    }
  }, [openModalToggle]);

  useEffect(() => {
    setShowHelpModal(false);
  }, [closeModalToggle]);

  const handleCloseHelpModal = () => setShowHelpModal(false);
  const handleOpenHelpModal = () => setShowHelpModal(true);

  const generalHelpText = (
    <p>
      To search, say &quot;search for (party, username, or topic)&quot;, then
      &quot;send&quot;.
      <br />
      To turn off microphone, say &quot;Stop listening&quot; or &quot;turn off
      mic&quot;.
      <br />
      To clear the transcript, say &quot;clear&quot; or &quot;reset&quot;.
    </p>
  );

  return (
    <>
      <Modal
        size="lg"
        centered
        show={showHelpModal}
        onHide={handleCloseHelpModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Voice Control Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>{generalHelpText}</Modal.Body>
        <Modal.Footer>(Say &quot;exit&quot; to close this box)</Modal.Footer>
      </Modal>
      <StyledHelpButton onClick={handleOpenHelpModal}>
        <BsQuestion />
      </StyledHelpButton>
    </>
  );
}

export default HelpButton;
