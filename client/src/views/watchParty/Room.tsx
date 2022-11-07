import { useEffect, useState, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
// import io from 'socket.io-client';
import axios from 'axios';
import { UserContext } from '../../context';

const { default: Video } = require('./Video.tsx');
const { default: Chat } = require('./Chat.tsx');
const { default: Likes } = require('./Likes.tsx');

// function WatchParty({ videos, user, room }: any) {
function WatchParty({ socket }) {
  // styling
  const vH = useRef(null);
  // state vars
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const isArchived = state.isArchived || false;
  const [room, setRoom] = useState(state.party);
  const [playlist, setPlaylist] = useState(state.party.videos);
  const [participants, setParticipants] = useState(state.party.users);
  const [dbMessages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('join', { room: room.id, type: 'PARTY' });
    socket.emit('getMessages', room.id || 'test');
    socket.on('getMessages', (messages) => {
      setMessages(messages);
    });
    socket.on('playlist', (pl) => {
      setPlaylist(pl);
    });
    socket.on('participants', (pt) => {
      setParticipants(pt);
    });
    socket.on('endParty', () => {
      navigate('/');
    });
    axios
      .get(`/api/party/id/${room.id}`)
      .then(({ data: party }: any) => {
        setRoom(party);
        setParticipants(party.users);
        setPlaylist(party.videos);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      socket.off('getMessages');
      socket.off('getStatus');
      socket.off('playlist');
      socket.off('participants');
      socket.off('endParty');
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
          <Likes />
        </Col>
        <Col xs={12} xl={3} style={{ padding: '0px', textAlign: 'center' }}>
          <h4>Chat</h4>
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
