import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Container, Form } from 'react-bootstrap';
import { StyledButton } from '../../styles';

const { default: Message } = require('./Message.tsx');

const socket = io();

function Chat({
  user, room, messages, setMessages,
}): JSX.Element {
  // State vars
  const [chat, setChat] = useState('');
  // const [messages, setMessages] = useState(dbMessages);
  // functions

  // console.log(messages), dbMessages;

  // handles chat submit
  const submit = (e) => {
    if (chat.length >= 1) {
      socket.emit('chat', { room, message: chat, user });
      setChat('');
      // setMessages((messages) => [...messages, chat])
    }
    e.preventDefault();
  };

  // handle updates
  useEffect(() => {
    console.log('arrived in chat');

    return () => {
      socket.off('chat');
    };
  }, []);
  return (
    <Container
      style={{
			  textAlign: 'center',
      }}
    >
      CHAT!!
      <Form>
        <Form.Control
          value={chat}
          onChange={(event) => setChat(event.target.value)}
          placeholder="type here!"
        />
        <StyledButton type="submit" onClick={submit}>
          Send!
        </StyledButton>
      </Form>
      {messages.map((message) => (
        <Message message={message} user={user} />
      ))}
    </Container>
  );
}
export default Chat;
