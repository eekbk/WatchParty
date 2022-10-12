import { Container } from 'react-bootstrap';

function DmMessage({ message, user }) {
  return (
    <Container
      style={{
			  wordWrap: 'break-word',
			  maxWidth: '20vw',
			  marginTop: '5px',
			  marginBottom: '5px',
      }}
    >
      {message.username}
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

export default DmMessage;
