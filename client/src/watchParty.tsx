import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import io from 'socket.io-client';

const socket = io();

function WatchParty({ videos }: any) {
  const [video, setVideo] = useState(() => (videos ? videos[0] : {}));
  const [isPaused, setPause] = useState(false);

  const testFunc = () => {
    socket.emit('pause', isPaused);
  };

  useEffect(() => {
    socket.on('pause', (arg: boolean) => {
      setPause(!arg);
    });
    const config = {
      method: 'get',
      url: 'http://localhost:4040/party/',
      headers: {},
    };
    axios(config)
      .then((response) => {
        setVideo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Card style={{ width: '75%', height: '750px' }}>
      <ReactPlayer
        playing={isPaused}
        url="https://www.youtube.com/watch?v=CtpdMkKvB6U"
        height="75%"
        width="75%"
      />
      <Card.Body>
        <Card.Title>
          {video.snippet ? video.snippet.title : 'Please Wait'}
        </Card.Title>
        <Card.Text>
          {video.snippet ? video.snippet.description : 'Please Wait'}
        </Card.Text>
      </Card.Body>
      <button type="button" onClick={testFunc}>
        TEE HEE
      </button>
    </Card>
  );
}
export default WatchParty;
