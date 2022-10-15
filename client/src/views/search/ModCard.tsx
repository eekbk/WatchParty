import { useState, useEffect, useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
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
  }, [follows, user.following]); // maybe add user here

  useEffect(() => {
    if (user.following.includes(obj.id)) {
      setIsFollowing(true);
    }
  }, [user.following]);

  // console.log('hello there');
  return (
    <Card
      style={{
			  maxWidth: '18rem',
      }}
      onClick={() => handleCardClick(obj, kind)}
    >
      <Card.Img variant="top" src={obj.profile} />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>{isFollowing ? 'following ✅' : ''}</Card.Text>
        <Card.Text>{cardText}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <FollowButton
          otherUserId={obj.id}
          setFollows={setFollows}
          follows={follows}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
        />
        <BlockButton
          otherUserId={obj.id}
          isBlocking={isBlocking}
          setIsBlocking={setIsBlocking}
        />
        <Button>DM</Button>
      </Card.Footer>
    </Card>
  );
}

export default ModCard;
