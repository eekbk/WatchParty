import { Container } from 'react-bootstrap';

function Message({ message, user, socket }) {
  return (
    <Container
      style={{
        wordWrap: 'break-word',
        maxWidth: '100%',
        width: 'fit-content',
        marginTop: '5px',
        marginBottom: '5px',
        padding: '8px',
        margin: '0',
        textAlign: 'left',
      }}
    >
      {`${message.user.user_name} `}
      <br />
      <Container
        style={{
          backgroundColor: user
            ? user.id !== message.user.id
              ? '#6929a9'
              : '#8e298e'
            : '#6929a9',
          maxWidth: '100%',
          borderRadius: '10px',
          width: 'fit-content',
          display: 'inline-block',
          padding: '4px',
        }}
      >
        {message.message}
      </Container>
    </Container>
  );
}

export default Message;
