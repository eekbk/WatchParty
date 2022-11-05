import { BsQuestionCircle, BsQuestion } from 'react-icons/bs';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { StyledHelpButton } from './buttons.styles';

function HelpButton() {
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleCloseHelpModal = () => setShowHelpModal(false);
  const handleOpenHelpModal = () => setShowHelpModal(true);

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
        <Modal.Body>
          So in here I guess we can give some ideas. Maybe also we can
          conditionally render based on where we are on site
        </Modal.Body>
      </Modal>
      <StyledHelpButton onClick={handleOpenHelpModal}>
        <BsQuestion />
      </StyledHelpButton>
    </>
  );
}

export default HelpButton;
