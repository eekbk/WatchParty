import { Card, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import { VoiceContext } from '../../contexts/voiceContext';
import AttendButton from '../buttons/AttendButton';
import {
  StyledPartyCard,
  StyledPartyTitle,
  StyledCardBody,
  StyledPartyDesc,
  StyledIsFollowing,
  StyledPartyTime,
  StyledPartyCardImgOverlay,
  StyledPartyCardImgOverlayText,
  PartyCardStatus,
  PartyCardHostOrAdminLabel,
  PartyCardHostOrAdminCol,
  PartyCardNormieCol,
} from './cards.styles';
import {
  StyledModal,
  StyledModalHeader,
  StyledATag,
} from '../buttons/buttons.styles';

function PartyCard({ party }) {
  const { id, description, thumbnail, name, start_date, users } = party;
  const { user } = useContext(UserContext);
  const {
    listening,
    partyName,
    setPartyName,
    resetTranscript,
    isSent,
    closeModalToggle,
  } = useContext(VoiceContext);
  const navigate = useNavigate();
  const [isAttending, setIsAttending] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNotYetModal, setShowNotYetModal] = useState(false);
  const [roomOpen, setRoomOpen] = useState(false);
  const creator = users.filter((user) => user.role === 'CREATOR')[0];
  const creatorText =
    user && creator.id === user.id
      ? 'YOU are hosting!'
      : `hosted by ${creator.username}`;

  // create a function to check if the user is involved in the party
  const checkRole = () => {
    for (let i = 0; i < user.parties.length; i += 1) {
      if (user.parties[i].id === id) {
        return user.parties[i].role;
      }
    }
    return null;
  };

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleCloseNotYetModal = () => setShowNotYetModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleShowNotYetModal = () => setShowNotYetModal(true);

  useEffect(() => {
    if (user) {
      if (checkRole() === 'CREATOR') {
        setIsCreator(true);
      } else if (checkRole() === 'ADMIN') {
        setIsAdmin(true);
      } else if (checkRole() === 'NORMIE') {
        setIsAttending(true);
      }
      /* USER THIS IF WANT TO INCLUDE WHETHER OR NOT YOU
       ARE FOLLOWING CREATOR */
      // if (user.following.includes(creator.id)) {
      //   setIsFollowing(true);
      // } else {
      //   setIsFollowing(false);
      // }
    }
  }, [user]);

  useEffect(() => {
    const now = new Date(Date.now());
    const nowAdj = now.setTime(
      now.getTime() - now.getTimezoneOffset() * 60 * 1000
    );
    const startDateString: any = new Date(start_date);
    const timeUntilParty = startDateString - nowAdj;
    const minutesUntilParty = Math.floor(timeUntilParty / 1000 / 60);
    if (minutesUntilParty <= 15) {
      setRoomOpen(true);
    }
  }, [start_date]);

  // for voiceControl go to party
  useEffect(() => {
    if (partyName && partyName.toUpperCase() === party.name.toUpperCase()) {
      resetTranscript();
      goToParty();
    }
  }, [isSent]);

  // for voiceControl close modal
  useEffect(() => {
    setPartyName('');
    if (showLoginModal) {
      handleCloseLoginModal();
    }
    if (showNotYetModal) {
      setShowNotYetModal(false);
    }
  }, [closeModalToggle]);

  const goToParty = () => {
    if (!user) {
      handleShowLoginModal();
    } else if (!roomOpen && !isCreator) {
      handleShowNotYetModal();
    } else {
      navigate('/watchParty', {
        state: { party },
      });
    }
  };

  const handleCardClick = () => {
    goToParty();
  };

  const stringAbbreviator = (string, type) => {
    if (type === 'title') {
      if (string && string.length > 35) {
        return `${string.slice(0, 35)}...`;
      }
      return string;
    }
    if (type === 'description') {
      if (string && string.length > 57) {
        return `${string.slice(0, 57)}...`;
      }
      return string;
    }
  };

  const dateTimeConversion = (dateTime) => {
    const year = dateTime.slice(0, 4);
    const monthObj = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      10: 'Oct',
      11: 'Nov',
      12: 'Dec',
    };
    const month = monthObj[dateTime.slice(5, 7)];
    const day = dateTime[8] === '0' ? dateTime[9] : dateTime.slice(8, 10);
    const isAm = dateTime.slice(11, 13) < '13';
    const time = () => {
      // if it takes place at 12am hour
      if (dateTime.slice(11, 13) === '00') {
        return `12${dateTime.slice(13, 16)}am`;
      }
      if (isAm && dateTime[11] === '0') {
        return `${dateTime.slice(12, 16)}am`;
      }
      if (isAm) {
        return `${dateTime.slice(11, 16)}am`;
      }
      const pmHour = parseInt(dateTime.slice(11, 13), 10) - 12;
      return `${pmHour}${dateTime.slice(13, 16)}pm`;
      // isAm ? `${dateTime.slice(11, 13)  }am` : dateTime.slice()
    };
    return `Starts ${time()}, ${month} ${day}, ${year}`;
  };

  // console.log('party:', party);

  return (
    <>
      <StyledPartyCard>
        <Card.Img variant="top" src={thumbnail} />
        {user && (
          <StyledPartyCardImgOverlay>
            <StyledPartyCardImgOverlayText>
              {isAdmin ? (
                <PartyCardHostOrAdminCol>
                  <PartyCardHostOrAdminLabel>ADMIN</PartyCardHostOrAdminLabel>
                </PartyCardHostOrAdminCol>
              ) : isCreator ? (
                <PartyCardHostOrAdminCol>
                  <PartyCardHostOrAdminLabel>HOST</PartyCardHostOrAdminLabel>
                </PartyCardHostOrAdminCol>
              ) : (
                <PartyCardNormieCol>
                  <AttendButton
                    name={name}
                    partyId={id}
                    isAttending={isAttending}
                    setIsAttending={setIsAttending}
                  />

                  <PartyCardStatus>
                    {isAttending ? 'GOING' : 'JOIN'}
                  </PartyCardStatus>
                </PartyCardNormieCol>
              )}
            </StyledPartyCardImgOverlayText>
          </StyledPartyCardImgOverlay>
        )}
        <StyledCardBody onClick={handleCardClick}>
          <StyledPartyTitle>
            {stringAbbreviator(name, 'title')}
          </StyledPartyTitle>
          <StyledPartyDesc>
            {stringAbbreviator(description, 'description')}
          </StyledPartyDesc>
          <StyledIsFollowing>{creatorText}</StyledIsFollowing>
          <StyledPartyTime>
            <small>{dateTimeConversion(start_date)}</small>
          </StyledPartyTime>
        </StyledCardBody>
      </StyledPartyCard>
      <StyledModal show={showLoginModal} onHide={handleCloseLoginModal}>
        <StyledModalHeader closeButton>
          <Modal.Title>
            You must&nbsp;
            <StyledATag href="/auth/google">
              <span>LOGIN</span>
            </StyledATag>
            &nbsp;to do that!
          </Modal.Title>
        </StyledModalHeader>
        {/* <Modal.Body>
            <Button href="/auth/google">Login</Button>
          </Modal.Body> */}
        {listening ? (
          <Modal.Footer>Say &quot;exit, send&quot; to close</Modal.Footer>
        ) : null}
      </StyledModal>
      <StyledModal show={showNotYetModal} onHide={handleCloseNotYetModal}>
        <StyledModalHeader closeButton>
          <Modal.Title>This party is not open yet!</Modal.Title>
          {/* <Modal.Body>
            <StyledGlassButton href="/auth/google">Login</StyledGlassButton>
          </Modal.Body> */}
        </StyledModalHeader>
        {listening ? (
          <Modal.Footer>Say &quot;exit, send&quot; to close</Modal.Footer>
        ) : null}
      </StyledModal>
    </>
  );
}

export default PartyCard;
