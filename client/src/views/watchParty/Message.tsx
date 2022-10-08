import { Container } from 'react-bootstrap';

function Message({ message, user }) {
  return (
    <Container>
      {user ? user.user_name : 'null'}
      :
      {message}
    </Container>
  );
}

export default Message;
