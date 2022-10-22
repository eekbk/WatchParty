import { useState, useEffect, useRef } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { StyledButton, ThinScrollBar } from '../../styles';

const { default: Message } = require('./Message.tsx');

function Chat({
  user,
  room,
  messages,
  setMessages,
  socket,
  isArchived,
  vH,
}): JSX.Element {
  // State vars
  const [vHeight, setVHight] = useState(
    vH.current ? vH.current.clientHeight : '100%'
  );
  const [chat, setChat] = useState('');
  const scrolly = useRef(null);
  // functions

  // handles chat submit
  const submit = (e) => {
    if (chat.length >= 1) {
      socket.emit('chat', {
        room,
        message: chat,
        user: user.id,
        type: 'COMMENT',
      });
      setChat('');
    }
    e.preventDefault();
  };

  const handleResize = () => {
    setVHight(vH.current ? vH.current.clientHeight : '100%');
  };
  // for style
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [vHeight]);

  // handle updates
  useEffect(() => {
    console.log(vH.current ? vH.current.clientHeight : '100%', vH.current);
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
        backgroundColor: 'transparent',
        borderRadius: '0px 5px 5px 0px',
        margin: '0px',
        height: vH.current ? vH.current.clientHeight : '100%',
        maxHeight: vH.current ? vH.current.clientHeight : '100%',
      }}
    >
      <Form style={{ height: '100%' }}>
        <ThinScrollBar
          ref={scrolly}
          style={{ overflowY: 'scroll', height: '100%' }}
        >
          {messages.map((message) => (
            <Message message={message} user={user} socket={socket} />
          ))}
        </ThinScrollBar>
        <InputGroup style={{ marginTop: '5px' }}>
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
