import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import ReactPlayer from 'react-player';

function WatchParty({ videos }: any) {
  const [video, setVideo] = useState(() => (videos ? videos[0] : {}));
  const config = {
    method: 'get',
    url: 'http://localhost:4040/party/',
    headers: {},
  };

  useEffect(() => {
    axios(config)
      .then((response) => {
        console.log(response.data);
        setVideo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card style={{ width: '75%', height: '750px' }}>
      <ReactPlayer
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
    </Card>
  );
}
export default WatchParty;
