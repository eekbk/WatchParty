import { Col, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledVideoCard, StyledButton } from '../../styles';
import { StyledListGroup, StyledListHeader, StyledListItem } from './styles';

const { Group, Control } = Form;

export function Playlist({ playlist, setPlaylist, room, status, vH }) {
  const [video, setVideo] = useState('');
  const [clicked, setClicked] = useState(false);
  const [vHeight, setVHeight] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setVHeight((vH.current.clientHeight - 65) * 0.8);
  }, []);

  const handleVideoAddition = () => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = video.match(regExp);
    const videoId = match[2];
    const videoUrl = video;
    if (match && match[2].length === 11) {
      axios
        .post('/api/party/video', { videoId, videoUrl })
        .then((vd) => {
          setVideo('');
          setPlaylist(playlist.concat([vd.data]));
          return axios.put(`/api/party/addVideo/${room.id}`, {
            video: vd.data.id,
          });
        })
        .catch((err) => {
          console.error(err);
          setVideo('');
        });
    } else {
      setVideo('');
    }
  };

  const handleVideoRemoval = (i) => {
    const videos = playlist.slice();
    videos.splice(i, 1);
    axios
      .put(`/api/party/removeVideo/${room.id}`, { video: playlist[i].id })
      .then(() => {
        // TODO: Somehow get all the places that can render this to update their
        // parties from the database to reflect the role changes
      })
      .catch((err) => console.error(err));
    setPlaylist(videos);
  };

  const handleResize = () => {
    setVHeight((vH.current.clientHeight - 65) * 0.8);
    console.log(vHeight, (vH.current.clientHeight - 65) * 0.8);
  };

  return (
    <Col md={4} style={{ display: 'flex', flexDirection: 'column' }}>
      <StyledListHeader
        onClick={() => setClicked(!clicked)}
        hidden={!status || status.role === 'NORMIE'}
      >
        Playlist
      </StyledListHeader>
      <StyledListGroup
        id="dropdown-basic-button"
        title="Playlist"
        style={{
          overflowY: 'auto',
          maxHeight: vHeight,
          textAlign: 'center',
          paddingTop: '0px',
        }}
        hidden={!status || status.role === 'NORMIE'}
      >
        {playlist.map((video, i) => (
          <StyledListItem hidden={!clicked}>
            <StyledVideoCard>
              <StyledVideoCard.Title>{video.title}</StyledVideoCard.Title>
              <StyledVideoCard.Body>
                <StyledVideoCard.Img src={video.thumbnail} />
                <StyledVideoCard.Text>
                  {video.description.slice(0, 150)}
                </StyledVideoCard.Text>
              </StyledVideoCard.Body>
              <StyledButton
                style={{
                  width: 'fit-content',
                  margin: '5px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                onClick={() => handleVideoRemoval(i)}
              >
                Remove
              </StyledButton>
            </StyledVideoCard>
          </StyledListItem>
        ))}
        <StyledListItem hidden={!clicked}>
          <Form>
            <Group>
              <Control
                placeholder="Paste Url Here"
                onChange={(e) => setVideo(e.target.value)}
                value={video}
              />
              <Group
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <StyledButton
                  style={{ marginLeft: '5px', marginTop: '5px' }}
                  onClick={handleVideoAddition}
                  variant="outline-dark"
                >
                  Add
                </StyledButton>
              </Group>
            </Group>
          </Form>
        </StyledListItem>
      </StyledListGroup>
    </Col>
  );
}
