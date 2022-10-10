import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Container, Form } from 'react-bootstrap';
import { StyledButton, StyledScrollableGroup } from '../../styles';

const { default: Message } = require('./Message.tsx');

const socket = io();

function Chat({
  user, room, messages, setMessages,
}): JSX.Element {
  // State vars
  const [chat, setChat] = useState('');
  const scrolly = useRef(null);
  // functions

  // handles chat submit
  const submit = (e) => {
    if (chat.length >= 1) {
      socket.emit('chat', { room, message: chat, user: user.user.id });
      setChat('');
    }
    e.preventDefault();
  };

  // handle updates
  useEffect(() => {
    scrolly.current.scrollTop = scrolly.current.scrollHeight;
    return () => {
      socket.off('chat');
    };
  }, [messages]);
  return (
    <Container
      style={{
			  textAlign: 'center',
			  color: 'white',
			  backgroundColor: '#332448',
			  borderRadius: '5px',
      }}
    >
      CHAT!!
      <Form>
        <StyledScrollableGroup
          ref={scrolly}
          style={{ overflowY: 'scroll', minHeight: '70vh', maxHeight: '70vh' }}
        >
          {messages.map((message) => (
            <Message message={message} user={user} />
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
export default Chat;
