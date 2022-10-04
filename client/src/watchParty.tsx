import axios from 'axios';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function WatchParty({ videos }) {
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
    </Card>
  );
}
export default WatchParty;
