import { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../context';

const { default: DmBar } = require('./DmBar.tsx');
const { default: DmChat } = require('./DmChat.tsx');

function Dm({ socket, room }) {
  const { user } = useContext(UserContext);
  const [dmRoom, setRoom] = useState(() => room);
  const [messages, setMessages] = useState(() => []);

  // Functions
  const changeDm = (e) => {
    setMessages([]);

    axios
      .post('/api/party/dmMessages', {
        room: (e.target as HTMLInputElement).id,
      })
      .then((dmMessages) => setMessages(dmMessages.data))
      .catch((error) => console.log(error));

    setRoom((e.target as HTMLInputElement).id);
    socket.emit('join', {
      room: (e.target as HTMLInputElement).id,
      type: 'DM',
    });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Container
      style={{
        width: '100%',
        height: '85vh',
        margin: '0px',
        maxWidth: '100%',
      }}
    >
      <Row>
        <Col
          xs={2}
          sm={2}
          md={1}
          lg={1}
          xl={1}
          xxl={1}
          style={{ padding: '0px' }}
        >
          <DmBar user={user} socket={socket} changeDm={changeDm} />
        </Col>
        <Col
          xs={10}
          sm={10}
          md={10}
          lg={10}
          xl={10}
          xxl={10}
          style={{ margin: '0px', padding: '0px' }}
        >
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
