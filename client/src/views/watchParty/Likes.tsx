import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { LikeButton, DislikeButton, LButton } from '../../styles';

function Likes({ user }) {
  const [like, setLike] = useState(() => 0);
  const [dislike, setDislike] = useState(() => 0);
  useEffect(() => {
    console.log('startup');
  }, []);

  return (
    <Container
      style={{ textAlign: 'right', position: 'relative', bottom: '38px' }}
    >
      <LButton onClick={() => setLike(() => like + 1)}>
        <LikeButton size="2em" /> 
        {' '}
        {like}
      </LButton>
      <LButton onClick={() => setDislike(() => dislike + 1)}>
        <DislikeButton size="2em" />
        {dislike}
      </LButton>
    </Container>
  );
}

export default Likes;
