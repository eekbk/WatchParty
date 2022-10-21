import { useEffect, useRef, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { StyledButton, StyledScrollableGroup } from '../../styles';

const { default: DmMessage } = require('./DmMessage.tsx');
// const { default: DmOutGoingMessage } = require('./DmOutGoingMessage.tsx');

function DmChat({ socket, room, user, messages, setMessages }) {
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
    scrolly.current.scrollTop = scrolly.current.scrollHeight;
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
  useEffect(() => {
    scrolly.current.scrollTop = scrolly.current.scrollHeight;
  }, [messages]);
  return (
    <Container
      style={{
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#332448',
        borderRadius: '0px 5px 5px 0px',
        margin: '0px',
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
        <InputGroup>
          <Form.Control
            value={chat}
            onChange={(event) => setChat(event.target.value)}
            placeholder="type here!"
          />
          <StyledButton type="submit" onClick={submit}>
            Send!
          </StyledButton>
        </InputGroup>
      </Form>
    </Container>
  );
}

export default DmChat;
