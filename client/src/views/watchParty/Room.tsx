import {
  Card, Container, Row, Col,
} from 'react-bootstrap';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const { default: Video } = require('./Video.tsx');
const { default: Chat } = require('./Chat.tsx');

function WatchParty({ videos, user, room }: any) {
  const [dbMessages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('join', room);
    socket.emit('getMessages', room || 'test');
    socket.on('getMessages', (messages) => {
      setMessages(messages);
    });
    socket.on('chat', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off('getMessages');
      socket.off('chat');
    };
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
