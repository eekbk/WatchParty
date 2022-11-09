import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { LikeButton, DislikeButton, LButton } from '../../styles';

function Likes({ user_id, party_id }) {
  const [like, setLike] = useState(() => 0);
  const [dislike, setDislike] = useState(() => 0);

  const sendLike = () => {
    axios
      .post('/api/party/like', { user_id, party_id, type: 'LIKE' })
      .then((res) => {
        getLikes();
      })
      .catch((err) => console.error(err));
  };

  const sendDislike = () => {
    axios
      .post('/api/party/like', { user_id, party_id, type: 'DISLIKE' })
      .then((res) => {
        getLikes();
      })
      .catch((err) => console.error(err));
  };

  const getLikes = () => {
    axios
      .post('/api/party/get/like', { party_id })
      .then((likes) => {
        let tLike = 0;
        let tDislike = 0;
        likes.data.forEach((l) => {
          if (l.type === 'LIKE') {
            tLike += 1;
          } else {
            tDislike += 1;
          }
        });
        setLike(tLike);
        setDislike(tDislike);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <Container
      style={{ textAlign: 'right', position: 'relative', bottom: '38px' }}
    >
      <LButton onClick={sendLike}>
        <LikeButton size="2em" /> 
        {' '}
        {like}
      </LButton>
      <LButton onClick={sendDislike}>
        <DislikeButton size="2em" />
        {dislike}
      </LButton>
    </Container>
  );
}

export default Likes;
