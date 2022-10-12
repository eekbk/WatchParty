import {
  useEffect, useContext, useRef, useState,
} from 'react';
// import { useLocation } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { UserContext } from '../../context';
import { StyledButton, StyledScrollableGroup } from '../../styles';

function Dm({ socket, room }) {
  // other vars
  const scrolly = useRef(null);
  const HARDID = 'b7f41e79-a42b-4922-a35b-378fa3356e96';
  // state vars
  const user = useContext(UserContext);
  const [chat, setChat] = useState('');

  // Functions
  const submit = (e) => {
    socket.emit('DmChat', {
      type: 'DM',
      receiverId: HARDID,
      message: chat,
      user: user.user.id,
    });
    e.preventDefault();
  };

  useEffect(() => {
    socket.emit('join', { room, type: 'DM' });
    socket.emit('userData', user);
    socket.on('data', (userData) => {
      console.log(userData);
    });
    socket.on('DmChat', (message) => {
      console.log(message);
    });
    return () => {
      socket.off('DmChat');
      socket.off('data');
    };
  }, []);
  return (
    <Container
      style={{
			  textAlign: 'center',
			  color: 'white',
			  backgroundColor: '#332448',
			  borderRadius: '5px',
      }}
    >
      DM Be nice!!
      <Form>
        <StyledScrollableGroup
          ref={scrolly}
          style={{ overflowY: 'scroll', minHeight: '70vh', maxHeight: '70vh' }}
        />
        <Form.Group>
          <Form.Control
            value={chat}
            onChange={(event) => setChat(event.target.value)}
            placeholder="type here!"
          />
          <StyledButton type="submit" onClick={submit}>
            Send!
          </StyledButton>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Dm;
