import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { StyledButton } from '../../styles';

const { default: Video } = require('./Video.tsx');

function WatchParty({ videos }: any) {
  const [video, setVideo] = useState(() => (videos ? videos[0] : {}));

  useEffect(() => {
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
    <Card
      style={{ width: '75%', height: '100%' }}
      bg="dark"
      key="Dark"
      text="white"
    >
      <Video videoUrl="https://www.youtube.com/watch?v=vZa0Yh6e7dw" />
      <Card.Body>
        <Card.Title>
          {video.snippet ? video.snippet.title : 'Please Wait'}
        </Card.Title>
        <Card.Text>
          {video.snippet ? video.snippet.description : 'Please Wait'}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <StyledButton>Press Me</StyledButton>
      </Card.Footer>
    </Card>
  );
}
export default WatchParty;
