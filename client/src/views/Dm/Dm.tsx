import { useEffect, useContext } from 'react';
// import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { UserContext } from '../../context';

const { default: DmBar } = require('./DmBar.tsx');
const { default: DmChat } = require('./DmChat.tsx');

function Dm({ socket, room }) {
  const user = useContext(UserContext);

  // Functions

  useEffect(() => {
    // emitters
    socket.emit('join', { room, type: 'DM' });
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
          <DmBar user={user} socket={socket} />
        </Col>
        <Col xs={14} md={10}>
          <DmChat user={user} socket={socket} room={room} />
        </Col>
      </Row>
    </Container>
  );
}

export default Dm;
