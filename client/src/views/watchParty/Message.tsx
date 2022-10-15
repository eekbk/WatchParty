import { Container } from 'react-bootstrap';

function Message({ message, user, socket }) {
  console.log(message);
  return (
    <Container
      style={{
			  wordWrap: 'break-word',
			  maxWidth: '20vw',
			  marginTop: '5px',
			  marginBottom: '5px',
      }}
    >
      {message.user.user_name}
      :
      <Container
        style={{
				  backgroundColor: user.user
				    ? user.user.id !== message.user.id
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
