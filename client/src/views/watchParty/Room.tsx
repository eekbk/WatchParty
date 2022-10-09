import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Card, Container, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../context';

const { default: Video } = require('./Video.tsx');
const { default: Chat } = require('./Chat.tsx');

function WatchParty({ videos, user, room }) {
  // function WatchParty() {
  // const [roomId, setRoomId] = useState('');
  const [playListVideos, setPlaylistVideos] = useState([]);
  const [party, setParty] = useState(null);

  const currentUser = useContext(UserContext);
  const { state } = useLocation();

  const eraseThisFuncOnceYouUsePartyAndPlaylistVideos = () => {
    console.log(party, playListVideos, currentUser);
  };

  useEffect(() => {
    // get props out of useLocation
    setParty(state.party);
    console.log('state.party', state.party);
    // axios request to get vids based on roomId
    axios
      .get(`/api/watchParty/playlist/${state.party.id}`)
      .then(({ data }) => {
        console.log('data in useEffect:\n', data);
        setPlaylistVideos([1]);
      })
      .catch((err) => {
        console.error('This is the error in useEffect:\n', err);
      });
    // erase this next line when you use party and playlistVideos
    if (party === playListVideos) {
      eraseThisFuncOnceYouUsePartyAndPlaylistVideos();
    }
  }, []);

  return (
    <Container
      style={{
			  width: '100%',
			  height: '90vh',
			  marginLeft: '0px',
			  maxWidth: '100%',
      }}
    >
      <Row>
        <Col xs={14} md={9}>
          <Card
            style={{
						  width: '100%',
						  height: '90vh',
						  borderRadius: '0px 0px 10px 0px',
            }}
            bg="transparent"
            text="white"
          >
            <Video
              videos={videos}
              isAdmin={Math.random() < 0.5}
              room={room || 'test'}
            />
          </Card>
        </Col>
        <Col xs={5} md={3}>
          <Chat user={user} room={room || 'test'} />
        </Col>
      </Row>
    </Container>
  );
}
export default WatchParty;
