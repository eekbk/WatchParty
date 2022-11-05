import { Container } from 'react-bootstrap';

function DmMessage({ message, user }) {
  return (
    <Container
      style={{
        wordWrap: 'break-word',
        maxWidth: '95%',
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
          maxWidth: '95%',
          borderRadius: '10px',
          width: 'fit-content',
          display: 'inline-block',
          padding: '6px',
          marginTop: '3px',
        }}
      >
        {message.message}
      </Container>
    </Container>
  );
}

export default DmMessage;
