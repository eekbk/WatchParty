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
  StyledIsFollowing,
  StyledPartyTitle,
  StyledUserCardFooter,
  StyledUserCardFooterCol,
  StyledUserCardBody,
} from './cards.styles';

// ModCard stands for Modular Card. Hopefully we can reuse it
function UserCard({ obj, setUpdate }) {
  const { user } = useContext(UserContext);
  const [cardTitle, setCardTitle] = useState('');
  const [follows, setFollows] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // if the card is a user
    axios
      .get(`/api/user/explicit/followers/${obj.id}`)
      .then(({ data }) => setFollows(data))
      .then(() => setCardTitle(obj.user_name))
      .catch((err) => {
        console.error('WHAT THE?!? LOOK AT THIS:', err);
      });
    // run this again when follows changes
  }, []); // maybe add user here

  useEffect(() => {
    if (user) {
      if (user.following.includes(obj.id)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    }
  }, [/* user.following, */ obj]);

  return (
    <StyledUserCard>
      <Row>
        <Col>
          <StyledUserCardImg roundedCircle src={obj.profile} />
        </Col>
        <Col>
          <StyledUserCardBody>
            <Row>
              <StyledPartyTitle>{cardTitle}</StyledPartyTitle>
            </Row>
            {user && (
              <StyledIsFollowing>
                {/* <Row>{cardText}</Row> */}
                <Row>
                  followers:&nbsp;
                  {follows}
                </Row>
                <Row>{isFollowing ? 'following ✅' : '  '}</Row>
              </StyledIsFollowing>
            )}
          </StyledUserCardBody>
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
              setUpdate={setUpdate}
              otherUserId={obj.id}
              otherUserName={obj.user_name}
            />
          </StyledUserCardFooterCol>
          <StyledUserCardFooterCol sm={2}>
            <DmButton
              otherUserId={obj.id}
              otherUserName={obj.user_name}
              currentUserId={user.id}
            />
          </StyledUserCardFooterCol>
        </StyledUserCardFooter>
      )}
    </StyledUserCard>
  );
}

export default UserCard;
