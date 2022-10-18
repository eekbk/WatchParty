import { useState, useEffect, useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../context';
import FollowButton from '../../buttons/FollowButton';
import BlockButton from '../../buttons/BlockButton';

// ModCard stands for Modular Card. Hopefully we can reuse it
function ModCard({ obj, kind, handleCardClick }) {
  // console.log('here are the props...\nobj:', obj, '\nkind:', kind);
  const { user } = useContext(UserContext);
  const [cardTitle, setCardTitle] = useState('');
  const [cardText, setCardText] = useState('');
  const [follows, setFollows] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);

  useEffect(() => {
    // if the card is a user
    if (kind === 'user') {
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
      // set the card title to the username
      // setCardTitle(obj.user_name);
      // // set the card Text to the number of follows
      // setCardText(follows);
    }
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
    <Card
      style={{
        width: '18rem',
        height: '20rem',
      }}
      onClick={() => handleCardClick(obj, kind)}
    >
      <Card.Img
        style={{
          height: '10rem',
        }}
        variant="top"
        src={obj.profile}
      />
      <Card.Body>
        <Col>
          <Row>
            <Card.Title>{cardTitle}</Card.Title>
          </Row>
          <Row>
            <Row>
              <Card.Text>{cardText}</Card.Text>
            </Row>
            <Card.Text>{isFollowing ? 'following ✅' : '  '}</Card.Text>
          </Row>
        </Col>
      </Card.Body>
      <Card.Footer>
        <Row
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Col>
            <FollowButton
              otherUserId={obj.id}
              setFollows={setFollows}
              follows={follows}
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
            />
          </Col>
          <Col>
            <BlockButton
              otherUserId={obj.id}
              isBlocking={isBlocking}
              setIsBlocking={setIsBlocking}
            />
          </Col>
          <Col>{/* <Button size="sm">DM</Button> */}</Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default ModCard;
