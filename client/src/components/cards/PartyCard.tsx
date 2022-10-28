import { Card } from 'react-bootstrap';
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
  StyledPartyCardFooterCol,
  StyledPartyCardFooter,
  StyledPartyTime,
  // StyledCardFooter,
} from './cards.styles';

function PartyCard({ party }) {
  const { id, description, thumbnail, name, date_time, users } = party;
  const { user } = useContext(UserContext);
  const {
    partyName,
    resetTranscript,
    // setPartyName,
    isSent,
  } = useContext(VoiceContext);
  const navigate = useNavigate();
  const [isAttending, setIsAttending] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const creator = users.filter((user) => user.role === 'CREATOR')[0];
  const creatorText =
    user && creator.id === user.id
      ? 'YOU are hosting!'
      : `hosted by ${creator.username}`;
  // const [isFollowing, setIsFollowing] = useState(false);

  // create a function to check if the user is involved in the party
  const checkRole = () => {
    for (let i = 0; i < user.parties.length; i += 1) {
      if (user.parties[i].id === id) {
        return user.parties[i].role;
      }
    }
    return null;
  };

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

  // for voiceControl
  useEffect(() => {
    if (partyName && partyName.toUpperCase() === party.name.toUpperCase()) {
      resetTranscript();
      goToParty();
    }
  }, [isSent]);

  const goToParty = () => {
    navigate('/watchParty', {
      state: { party },
    });
  };
  const handleCardClick = () => {
    goToParty();
  };

  const stringAbbreviator = (string, type) => {
    if (type === 'title') {
      if (string && string.length > 45) {
        // return dotDotDotConcat(53);
        return `${string.slice(0, 45)}...`;
      }
      return string;
    }
    if (type === 'description') {
      if (string && string.length > 70) {
        // return dotDotDotConcat(65);
        return `${string.slice(0, 70)}...`;
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
      if (isAm && dateTime[11] === 0) {
        return `${dateTime.slice(12, 16)}am`;
      }
      if (isAm) {
        return `${dateTime.slice(11, 16)}am`;
      }
      const pmHour = parseInt(dateTime.slice(11, 13), 10) - 12;
      return `${pmHour}${dateTime.slice(13, 16)} pm`;
      // isAm ? `${dateTime.slice(11, 13)  }am` : dateTime.slice()
    };
    return `Starts ${time()}, ${month} ${day}, ${year}`;
  };

  return (
    <StyledPartyCard>
      <Card.Img variant="top" src={thumbnail} />
      <StyledCardBody>
        <StyledPartyTitle onClick={handleCardClick}>
          {stringAbbreviator(name, 'title')}
        </StyledPartyTitle>
        <StyledPartyDesc>
          {stringAbbreviator(description, 'description')}
        </StyledPartyDesc>
        <StyledIsFollowing>
          {/* <Row> */}

          {creatorText}
          {/* <Card.Text>{isFollowing ? <i>following</i>: '  '}</Card.Text> */}
          {/* </Row> */}
        </StyledIsFollowing>
        <StyledPartyTime>
          <small>{dateTimeConversion(date_time)}</small>
        </StyledPartyTime>
      </StyledCardBody>
      <StyledPartyCardFooter>
        <StyledPartyCardFooterCol sm={2}>
          {!isCreator && !isAdmin ? (
            <AttendButton
              partyId={id}
              isAttending={isAttending}
              setIsAttending={setIsAttending}
            />
          ) : (
            []
          )}
        </StyledPartyCardFooterCol>
      </StyledPartyCardFooter>
    </StyledPartyCard>
  );
}

export default PartyCard;
