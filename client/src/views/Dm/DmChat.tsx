import { useEffect, useRef, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { StyledButton, StyledScrollableGroup } from '../../styles';

const { default: DmMessage } = require('./DmMessage.tsx');

function DmChat({
  socket, room, user, messages, setMessages,
}) {
  // other vars
  const scrolly = useRef(null);
  // state vars
  const [chat, setChat] = useState('');

  // Functions
  const submit = (e) => {
    socket.emit('DmChat', {
      dmId: room,
      type: 'DM',
      message: chat,
      user: user.user,
    });
    setMessages([
      ...messages,
      {
        message: chat,
        user: { user_name: user.user.user_name, id: user.user.id },
      },
    ]);
    setChat('');
    e.preventDefault();
  };

  useEffect(() => {
    // emitters
    socket.emit('getMessages', room);
    // listeners

    socket.on('getMessages', (dmMessages) => {
      setMessages(dmMessages);
    });
    // receives a Dm chat and logs prints it
    socket.on('DmChat', (message) => {
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
