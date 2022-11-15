import { useState, useEffect, useRef, useContext } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { VoiceContext } from '../../contexts/voiceContext';
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
    vH.current ? vH.current.clientHeight - 65 : '80%'
  );
  const [chat, setChat] = useState('');
  const scrolly = useRef(null);
  const { messageText, setMessageText, resetTranscript, isSent } =
    useContext(VoiceContext);
  // functions
  // handle chat submit
  const submitChat = () => {
    if (chat.length >= 1) {
      socket.emit('chat', {
        room,
        message: chat,
        user: user.id,
        type: 'COMMENT',
      });
      setChat('');
    }
  };

  // handles click
  const handleSubmit = (e) => {
    submitChat();
    e.preventDefault();
  };

  const handleResize = () => {
    setVHight(vH.current ? vH.current.clientHeight - 65 : '80%');
  };

  // func for async voiceSubmit
  const voiceChatSubmit = async () => {
    await submitChat();
    setMessageText('');
    setChat('');
    resetTranscript();
  };

  // for style
  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [vHeight]);

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

  // voiceControl populate the form
  useEffect(() => {
    setChat(messageText);
  }, [messageText]);

  // voiceControl send the message
  useEffect(() => {
    if (messageText) {
      voiceChatSubmit();
    }
  }, [isSent]);

  return (
    <Container
      style={{
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'transparent',
        borderRadius: '0px 5px 5px 0px',
        margin: '0px',
        height: vH.current ? vH.current.clientHeight - 65 : '80%%',
        maxHeight: vH.current ? vH.current.clientHeight - 65 : '80%%',
      }}
    >
      <Form style={{ height: '100%' }}>
        {isArchived ? 'Archived' : null}
        <ThinScrollBar
          ref={scrolly}
          style={{ overflowY: 'auto', height: '100%' }}
        >
          {messages.map((message) => (
            <Message message={message} user={user} />
          ))}
        </ThinScrollBar>
        {isArchived ? null : (
          <InputGroup style={{ marginTop: '5px' }}>
            <Form.Control
              value={chat}
              onChange={(event) => setChat(event.target.value)}
              placeholder="type here"
              disabled={isArchived}
            />
            <StyledButton
              type="submit"
              onClick={handleSubmit}
              disabled={isArchived}
            >
              Send
            </StyledButton>
          </InputGroup>
        )}
      </Form>
    </Container>
  );
}
export default Chat;
