import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Container, Form } from 'react-bootstrap';
import { StyledButton } from '../../styles';

const { default: Message } = require('./Message.tsx');

const socket = io();

function Chat({ user, room }): JSX.Element {
  // State vars
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);
  // functions

  // handles chat submit
  const submit = (e) => {
    if (chat.length >= 1) {
      socket.emit('chat', { room, message: chat });
    }
    e.preventDefault();
  };

  // handle updates
  useEffect(() => {
    socket.on('chat', (message) => {
      setMessages((messages) => [...messages, message]);
    });
    return () => {
      socket.off('chat');
    };
  }, []);
  console.log(messages);
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
        <StyledButton
          type="submit"
          onClick={(e) => {
					  submit(e);
          }}
        >
          Send!
        </StyledButton>
      </Form>
      {messages.map((message) => (
        <Message message={message} />
      ))}
    </Container>
  );
}
export default Chat;
