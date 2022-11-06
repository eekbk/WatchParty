import { BsQuestion } from 'react-icons/bs';
import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Row } from 'react-bootstrap';
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
      When the mic button is active (purple), you can use your voice to navigate
      around the site.
      <ul>
        <li>
          After saying a command, say &quot;enter&quot;, &quot;send&quot;,
          &quot;please&quot;, or &quot;thanks&quot; to finalize.
        </li>
        <li>
          Search: &quot;Search for&quot;, followed by the term you want to
          search, then &quot;send&quot;(or &quot;please&quot;, etc.).
        </li>
        <li>
          Navigate site: &quot;Go to&quot;, then the name of the path written in
          the navbar, or &quot;home&quot;.
        </li>
        <li>
          For multi-page search results: &quot;page (number)&quot;, &quot;next
          page&quot;, or &quot;previoud page&quot;
        </li>
        <li>
          Turn off microphone: &quot;turn off mic&quot;, &quot;stop
          listening&quot;, or &quot;privacy, please&quot;.
        </li>
        <li>Clear the transcript: &quot;clear&quot; or &quot;reset&quot;</li>
        <li>Open help box by saying &quot;help&quot; or &quot;info&quot;.</li>
      </ul>
    </p>
  );

  const pageSpecificText = () => {
    if (location.pathname === '/') {
      return (
        <p>
          Parties!
          <ul>
            <li>
              Join a party you wish to attend: &quot;join (party name)&quot;
            </li>
            <li>Remove yourself from party: &quot;leave (party name)&quot;</li>
            <li>
              Start a party you are hosting: &quot;open (party name)&quot;, or
              &quot;start the party called (party name)&quot;
            </li>
          </ul>
        </p>
      );
    }
    if (location.pathname === '/watchParty' || location.pathname === '/dm') {
      return (
        <p>
          Chat!
          <ul>
            <li>
              Write a message: &quot;write&quot; or &quot;compose message&quot;,
              then your message
            </li>
          </ul>
        </p>
      );
    }
    if (location.pathname.includes('search')) {
      return (
        <p>
          Tabs!
          <ul>
            <li>
              Switch tabs: &quot;switch to&quot; or &quot;show me&quot;, then
              either &quot;parties&quot;, &quot;users&quot;, or
              &quot;videos&quot;
            </li>
          </ul>
          Parties!
          <ul>
            <li>
              Join a party you wish to attend: &quot;join (party name)&quot;
            </li>
            <li>Remove yourself from party: &quot;leave (party name)&quot;</li>
            <li>
              Start a party you are hosting: &quot;open (party name)&quot;, or
              &quot;start the party called (party name)&quot;
            </li>
          </ul>
          Users!
          <ul>
            <li>
              Follow, unfollow, or block: &quot;follow&quot;,
              &quot;unfollow&quot;, or &quot;block&quot;, followed by the
              username
            </li>
            <li>
              DM a user: &quot;DM&quot; or &quot;message&quot;, followed by the
              username
            </li>
          </ul>
        </p>
      );
    }
  };

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
          {generalHelpText}
          {pageSpecificText()}
        </Modal.Body>
        <Modal.Footer>
          (Say &quot;exit, please&quot; to close this box)
        </Modal.Footer>
      </Modal>
      <StyledHelpButton onClick={handleOpenHelpModal}>
        <BsQuestion />
      </StyledHelpButton>
    </>
  );
}

export default HelpButton;
