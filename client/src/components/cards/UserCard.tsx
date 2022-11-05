import { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../context';
import FollowButton from '../buttons/FollowButton';
import BlockButton from '../buttons/BlockButton';
import DmButton from '../buttons/DmButton';
import {
  StyledUserCard,
  StyledUserCardImg,
  StyledCardBody,
  StyledIsFollowing,
  StyledPartyTitle,
  StyledUserCardFooter,
  StyledUserCardFooterCol,
} from './cards.styles';

// ModCard stands for Modular Card. Hopefully we can reuse it
function UserCard({ obj, socket }) {
  // console.log('here are the props...\nobj:', obj, '\nkind:', kind);
  const { user } = useContext(UserContext);
  const [cardTitle, setCardTitle] = useState('');
  const [cardText, setCardText] = useState('');
  const [follows, setFollows] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);

  useEffect(() => {
    // if the card is a user
    axios
      .get(`/api/user/explicit/followers/${obj.id}`)
      .then(({ data }) => {
        setFollows(data);
      })
      .then(() => {
        setCardTitle(obj.user_name);
      })
      .then(() => {
        setCardText(`followers: ${follows}`);
      })
      .catch((err) => {
        console.error('WHAT THE?!? LOOK AT THIS:', err);
      });
    // run this again when follows changes
  }, [follows, /* user.following, */ obj]); // maybe add user here

  useEffect(() => {
    if (user) {
      if (user.following.includes(obj.id)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    }
  }, [/* user.following, */ obj]);

  // console.log('hello there');
  return (
    <StyledUserCard>
      <Row>
        <Col>
          <StyledUserCardImg roundedCircle src={obj.profile} />
        </Col>
        <Col>
          <StyledCardBody>
            <Row>
              <StyledPartyTitle>{cardTitle}</StyledPartyTitle>
            </Row>
            {user && (
              <StyledIsFollowing>
                <Row>{cardText}</Row>
                <Row>{isFollowing ? 'following ✅' : '  '}</Row>
              </StyledIsFollowing>
            )}
          </StyledCardBody>
        </Col>
      </Row>
      {user && (
        <StyledUserCardFooter>
          <StyledUserCardFooterCol
            sm={2}
            style={{
              marginRight: '23px',
            }}
          >
            <FollowButton
              otherUserId={obj.id}
              setFollows={setFollows}
              follows={follows}
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
              otherUserName={obj.user_name}
            />
          </StyledUserCardFooterCol>
          <StyledUserCardFooterCol sm={2}>
            <BlockButton
              otherUserId={obj.id}
              isBlocking={isBlocking}
              setIsBlocking={setIsBlocking}
              otherUserName={obj.user_name}
            />
          </StyledUserCardFooterCol>
          <StyledUserCardFooterCol sm={2}>
            <DmButton
              otherUserId={obj.id}
              otherUserName={obj.user_name}
              currentUserId={user.id}
              socket={socket}
            />
          </StyledUserCardFooterCol>
        </StyledUserCardFooter>
      )}
    </StyledUserCard>
  );
}

export default UserCard;
