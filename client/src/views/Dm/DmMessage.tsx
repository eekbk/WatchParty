import { Container } from 'react-bootstrap';

function DmMessage({ message, user }) {
  return (
    <Container
      style={{
        wordWrap: 'break-word',
        maxWidth: '80%',
        width: 'fit-content',
        marginTop: '5px',
        marginBottom: '5px',
        padding: '8px',
        margin: '0',
        textAlign: 'left',
      }}
    >
      {`${message.user_name} `}
      <Container
        style={{
          backgroundColor: user
            ? user.id !== message.user.id
              ? '#6929a9'
              : '#8e298e'
            : '#6929a9',
          maxWidth: '85%',
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

export default DmMessage;
