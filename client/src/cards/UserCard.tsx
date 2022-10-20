import { useState, useEffect, useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../context';
import FollowButton from '../buttons/FollowButton';
import BlockButton from '../buttons/BlockButton';
import {
  StyledUserCard,
  StyledUserCardImg,
  StyledCardBody,
} from '../views/search/search.styles';

// ModCard stands for Modular Card. Hopefully we can reuse it
function UserCard({ obj }) {
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
  }, [follows, user.following, obj]); // maybe add user here

  useEffect(() => {
    if (user.following.includes(obj.id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [user.following, obj]);

  // console.log('hello there');
  return (
    <StyledUserCard>
      <Row>
        <Col sm={4}>
          <StyledUserCardImg roundedCircle src={obj.profile} />
        </Col>
        <Col lg={8}>
          <StyledCardBody>
            <Row>
              <Card.Title>{cardTitle}</Card.Title>
            </Row>
            <Row>
              <Card.Text>{cardText}</Card.Text>
            </Row>
            <Row>
              <Card.Text>{isFollowing ? 'following ✅' : '  '}</Card.Text>
            </Row>
          </StyledCardBody>
        </Col>
      </Row>
      <Card.Footer>
        <Row>
          <Col md={4}>
            <FollowButton
              otherUserId={obj.id}
              setFollows={setFollows}
              follows={follows}
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
            />
          </Col>
          <Col md={4}>
            <BlockButton
              otherUserId={obj.id}
              isBlocking={isBlocking}
              setIsBlocking={setIsBlocking}
            />
          </Col>
        </Row>
      </Card.Footer>
    </StyledUserCard>
  );
}

export default UserCard;
