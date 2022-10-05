import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { StyledButton } from './styles';

function WatchParty({ videos }: any) {
  const [video, setVideo] = useState(() => (videos ? videos[0] : {}));
  const config = {
    method: 'get',
    url: '/party/',
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
    <Card style={{ width: '50rem', height: '25rem' }}>
      <Card.Img
        variant="top"
        src={video.snippet ? video.snippet.thumbnails.high.url : ''}
      />
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
