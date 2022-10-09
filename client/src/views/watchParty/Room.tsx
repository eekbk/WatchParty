import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Card, Container, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import { UserContext } from '../../context';

const socket = io();

const { default: Video } = require('./Video.tsx');
const { default: Chat } = require('./Chat.tsx');

// function WatchParty({ videos, user, room }: any) {
function WatchParty() {
  const [dbMessages, setMessages] = useState([]);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [room, setRoom] = useState(null);

  const user = useContext(UserContext);
  const { state } = useLocation();

  // const eraseThisFuncOnceYouUsePartyAndPlaylistVideos = () => {
  //   console.log('THIS CONSOLELOG WILL BE ERASED!', room, playlistVideos, user);
  // };

  // not sure if this should be in the below useEfect or keep them separate
  useEffect(() => {
    // get props out of useLocation
    setRoom(state.party);
    // axios request to get vids based on roomId
    axios
      .get(`/api/party/playlist/${state.party.id}`)
      .then(({ data }) => {
        setPlaylistVideos(data.playlist.videos);
      })
      .catch((err) => {
        console.error('This is the error in useEffect:\n', err);
      });
    // // erase this next line when you use party and playlistVideos
    // if (room === playlistVideos) {
    //   eraseThisFuncOnceYouUsePartyAndPlaylistVideos();
    // }
  }, []);

  useEffect(() => {
    socket.emit('join', room);
    socket.emit('getMessages', room || 'test');
    socket.on('getMessages', (messages) => {
      // console.log(messages);
      setMessages(messages);
    });
    socket.on('chat', (message) => {
      // console.log(message);
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off('getMessages');
      socket.off('chat');
    };
  }, [room]);

  // // UNCOMMENT TO CHECK IF PLAYLIST VIDEOS ARE BEING UPDATED
  // useEffect(() => {
  //   console.log('THIRD useEffect playlistVideos:\n', playlistVideos);
  // }, [playlistVideos]);

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
              videos={playlistVideos}
              isAdmin={Math.random() < 0.5}
              room={room || 'test'}
            />
          </Card>
        </Col>
        <Col xs={5} md={3}>
          <Chat
            user={user}
            room={room || 'test'}
            messages={dbMessages}
            setMessages={setMessages}
          />
        </Col>
      </Row>
    </Container>
  );
}
export default WatchParty;
