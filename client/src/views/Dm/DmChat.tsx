import { useEffect, useRef, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { StyledButton, StyledScrollableGroup } from '../../styles';

const { default: DmMessage } = require('./DmMessage.tsx');

function DmChat({ socket, room, user }) {
  // other vars
  const scrolly = useRef(null);
  const HARDID = 'b7f41e79-a42b-4922-a35b-378fa3356e96';
  // state vars
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState(() => []);

  // Functions
  const submit = (e) => {
    socket.emit('DmChat', {
      type: 'DM',
      receiverId: HARDID,
      message: chat,
      user: user.user,
    });
    setMessages([
      ...messages,
      { message: chat, username: user.user.user_name, user_id: user.user.id },
    ]);
    e.preventDefault();
  };

  useEffect(() => {
    // emitters

    socket.emit('join', { room, type: 'DM' });
    socket.emit('getMessages');
    // listeners

    socket.on('getMessages', (dmMessages) => {
      setMessages(dmMessages);
    });
    // receives a Dm chat and logs it for now
    socket.on('DmChat', (message) => {
      console.log(message);
      setMessages((oldMessages) => [...oldMessages, message]);
    });

    // turn off listeners
    return () => {
      socket.off('DmChat');
      socket.off('getMessages');
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
        >
          {messages.map((message) => (
            <DmMessage message={message} user={user} />
          ))}
        </StyledScrollableGroup>
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

export default DmChat;
