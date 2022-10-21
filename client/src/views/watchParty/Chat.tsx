import { useState, useEffect, useRef } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { StyledButton, StyledScrollableGroup } from '../../styles';

const { default: Message } = require('./Message.tsx');

function Chat({
  user,
  room,
  messages,
  setMessages,
  socket,
  isArchived,
}): JSX.Element {
  // State vars
  const [chat, setChat] = useState('');
  const scrolly = useRef(null);
  // functions

  // handles chat submit
  const submit = (e) => {
    if (chat.length >= 1) {
      socket.emit('chat', {
        room,
        message: chat,
        user: user.user.id,
        type: 'COMMENT',
      });
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
        borderRadius: '0px 5px 5px 0px',
        margin: '0px',
        height: '100%',
        paddingBottom: '56.25%',
      }}
    >
      CHAT!!
      <Form>
        <StyledScrollableGroup
          ref={scrolly}
          style={{ overflowY: 'scroll', height: 'inherit' }}
        >
          {messages.map((message) => (
            <Message message={message} user={user} socket={socket} />
          ))}
        </StyledScrollableGroup>
        <InputGroup>
          <Form.Control
            value={chat}
            onChange={(event) => setChat(event.target.value)}
            placeholder="type here!"
            disabled={isArchived}
          />
          <StyledButton type="submit" onClick={submit} disabled={isArchived}>
            Send!
          </StyledButton>
        </InputGroup>
      </Form>
    </Container>
  );
}
export default Chat;
