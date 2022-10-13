import { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import FollowButton from '../../buttons/FollowButton';

// ModCard stands for Modular Card. Hopefully we can reuse it
function ModCard({ obj, kind, handleCardClick }) {
  // console.log('here are the props...\nobj:', obj, '\nkind:', kind);
  const [cardTitle, setCardTitle] = useState('');
  const [cardText, setCardText] = useState('');
  const [follows, setFollows] = useState(obj.follows || 0);

  useEffect(() => {
    if (kind === 'user') {
      setCardTitle(obj.user_name);
      setCardText(follows);
    }
  }, [follows]);

  // console.log('hello there');
  return (
    <Card
      style={{
			  maxWidth: '18rem',
      }}
      onClick={() => handleCardClick(obj, kind)}
    >
      <Card.Img
        variant="top"
        src="https://i.ytimg.com/vi/CtpdMkKvB6U/mqdefault.jpg"
      />
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>ModCard bABY</Card.Text>
        <Card.Text>{cardText}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <FollowButton
          otherUserId={obj.id}
          setFollows={setFollows}
          follows={follows}
        />
        <Button>DM</Button>
      </Card.Footer>
    </Card>
  );
}

export default ModCard;
