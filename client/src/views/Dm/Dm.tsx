import { useEffect, useContext, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { UserContext } from '../../context';

const { default: DmBar } = require('./DmBar.tsx');
const { default: DmChat } = require('./DmChat.tsx');

function Dm({ socket, room }) {
  const user = useContext(UserContext);
  const [dmRoom, setRoom] = useState(() => room);
  const [messages, setMessages] = useState(() => []);

  // Functions
  const changeDm = (e) => {
    // console.log('roomChange should occur');
    setRoom((e.target as HTMLInputElement).id);
    socket.emit('join', {
      room: (e.target as HTMLInputElement).id,
      type: 'DM',
    });
    setMessages([]);
    socket.emit('getMessages', (e.target as HTMLInputElement).id);
    socket.on('getMessages', (dmMessages) => {
      setMessages(dmMessages);
    });
  };

  useEffect(() => {
    // emitters
  }, []);
  return (
    <Container
      style={{
			  width: '100%',
			  height: '85vh',
			  marginLeft: '0px',
			  maxWidth: '100%',
      }}
    >
      <Row>
        <Col xs={1} md={1}>
          <DmBar user={user} socket={socket} changeDm={changeDm} />
        </Col>
        <Col xs={14} md={10}>
          <DmChat
            user={user}
            socket={socket}
            room={dmRoom}
            setMessages={setMessages}
            messages={messages}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Dm;
