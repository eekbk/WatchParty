import { Container } from 'react-bootstrap';

function Message({ message, user }) {
  return (
    <Container
      style={{ wordWrap: 'break-word', maxWidth: '20vw', height: '5vh' }}
    >
      {user.user ? `${user.user.user_name} ` : 'null'}
      :
      <Container
        style={{
				  backgroundColor: '#6929a9',
				  maxWidth: '10vw',
				  borderRadius: '10px',
				  display: 'inline-block',
        }}
      >
        {message.message || message}
      </Container>
    </Container>
  );
}

export default Message;
