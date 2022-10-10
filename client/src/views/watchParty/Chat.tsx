import { useState, useEffect, useRef } from 'react';
import { Container, Form } from 'react-bootstrap';
import { StyledButton, StyledScrollableGroup } from '../../styles';

const { default: Message } = require('./Message.tsx');

function Chat({
  user, room, messages, setMessages, socket,
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
    socket.on('chat', (message) => {
      setMessages((messages) => [...messages, message]);
    });
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
            <Message message={message} user={user} socket={socket} />
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
