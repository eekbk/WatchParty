import { useEffect, useState, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
// import io from 'socket.io-client';
import { UserContext } from '../../context';

const { default: Video } = require('./Video.tsx');
const { default: Chat } = require('./Chat.tsx');

// function WatchParty({ videos, user, room }: any) {
function WatchParty({ socket }) {
  // styling
  const vH = useRef(null);
  // state vars
  const [dbMessages, setMessages] = useState([]);
  const { user } = useContext(UserContext);
  const { state } = useLocation();
  const room = state.party;
  const isArchived = state.isArchived || false;
  const [playlist, setPlaylist] = useState(room.videos);
  const [participants, setParticipants] = useState(room.users);

  useEffect(() => {
    socket.emit('join', { room: room.id, type: 'PARTY' });
    socket.emit('getMessages', room.id || 'test');
    socket.on('getMessages', (messages) => {
      setMessages(messages);
    });
    return () => {
      socket.off('getMessages');
      socket.off('getStatus');
    };
  }, []);

  return (
    <Container
      fluid
      style={{
        position: 'relative',
        width: '100%',
        height: '0',
        maxHeight: '56vh',
        paddingBottom: '56.25%',
      }}
    >
      <Row style={{ height: 'inherit' }}>
        <Col xs={12} xl={9} style={{ padding: '0px' }}>
          <Card
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '0px 0px 10px 0px',
              border: '0px',
            }}
            bg="transparent"
            text="white"
          >
            <Video
              vH={vH}
              isArchived={isArchived}
              user={user}
              playlist={playlist}
              setPlaylist={setPlaylist}
              participants={participants}
              setParticipants={setParticipants}
              status={
                user
                  ? user.parties.filter((party) => party.id === room.id)[0]
                  : null
              }
              room={room}
              socket={socket}
            />
          </Card>
        </Col>
        <Col xs={12} xl={3} style={{ padding: '0px', textAlign: 'center' }}>
          <h4>chat</h4>
          <Chat
            vH={vH}
            isArchived={isArchived}
            user={user}
            room={room.id || 'test'}
            messages={dbMessages}
            setMessages={setMessages}
            socket={socket}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default WatchParty;
