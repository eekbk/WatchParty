import { useEffect, useContext, useRef, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { VoiceContext } from '../../contexts/voiceContext';
// import { useLocation } from 'react-router-dom';
import { StyledButton, ThinScrollBar, DmChatBox } from '../../styles';

const { default: DmMessage } = require('./DmMessage.tsx');
// const { default: DmOutGoingMessage } = require('./DmOutGoingMessage.tsx');

function DmChat({ socket, room, user, messages, setMessages }) {
  // other vars
  const scrolly = useRef(null);
  // state vars
  const [chat, setChat] = useState('');
  const { messageText, setMessageText, resetTranscript, isSent } =
    useContext(VoiceContext);

  // Functions
  const submitChat = () => {
    socket.emit('DmChat', {
      dmId: room,
      type: 'DM',
      message: chat,
      user,
    });
    setMessages([
      ...messages,
      {
        message: chat,
        user: { user_name: user.user_name, id: user.id },
      },
    ]);
    setChat('');
  };

  const handleSubmit = (e) => {
    submitChat();
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

  // function for async voiceSubmit
  const voiceChatSubmit = async () => {
    await submitChat();
    setMessageText('');
    setChat('');
    resetTranscript();
  };

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

  useEffect(() => {
    scrolly.current.scrollTop = scrolly.current.scrollHeight;
  }, [messages]);
  return (
    <DmChatBox>
      DM Be nice!!
      <Form>
        <ThinScrollBar
          ref={scrolly}
          style={{ overflowY: 'auto', minHeight: '70vh', maxHeight: '70vh' }}
        >
          {messages.map((message) => (
            <DmMessage message={message} user={user} />
          ))}
        </ThinScrollBar>
        <InputGroup>
          <Form.Control
            value={chat}
            onChange={(event) => setChat(event.target.value)}
            placeholder="type here!"
          />
          <StyledButton
            type="submit"
            onClick={handleSubmit}
            variant="outline-dark"
          >
            Send!
          </StyledButton>
        </InputGroup>
      </Form>
    </DmChatBox>
  );
}

export default DmChat;
