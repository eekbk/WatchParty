import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function Message({ message, user, socket }) {
  const [user_name, setUserName] = useState(null);
  useEffect(() => {
    socket.emit('GetUser', { room: message.party_id, userId: message.user_id });
    socket.on('GetUser', (userName) => {
      setUserName(userName);
    });
    return () => {
      socket.off('GetUser');
    };
  }, []);
  return (
    <Container
      style={{ wordWrap: 'break-word', maxWidth: '20vw', height: '5vh' }}
    >
      {user_name}
      :
      <Container
        style={{
				  backgroundColor: user.user
				    ? user.user.id !== message.user_id
				      ? '#6929a9'
				      : '#8e298e'
				    : '#6929a9',
				  maxWidth: '10vw',
				  borderRadius: '10px',
				  display: 'inline-block',
        }}
      >
        {message.message}
      </Container>
    </Container>
  );
}

export default Message;
