import { CloseButton, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { StyledVideoCard, StyledButton } from '../../styles';
import { StyledListGroup, StyledListItem } from './styles';

const { Group, Control, Text } = Form;

export function Playlist({ playlist, setPlaylist, room, status }) {
  const [video, setVideo] = useState('');
  const [clicked, setClicked] = useState(false);

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

  return (
    <StyledListGroup
      id="dropdown-basic-button"
      title="Playlist"
      style={{
        overflowY: 'auto',
        maxHeight: '800px',
      }}
      hidden={!status || status.role === 'NORMIE'}
    >
      <StyledListItem
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h5 style={{ alignSelf: 'center', marginRight: '10px' }}>Playlist</h5>
        <StyledButton
          onClick={() => setClicked(!clicked)}
          variant="outline-dark"
        >
          {clicked ? 'Close' : 'Open'}
        </StyledButton>
      </StyledListItem>
      {playlist.map((video, i) => (
        <StyledListItem hidden={!clicked}>
          <StyledVideoCard>
            <CloseButton onClick={() => handleVideoRemoval(i)} />
            <StyledVideoCard.Title>{video.title}</StyledVideoCard.Title>
            <StyledVideoCard.Body>
              <StyledVideoCard.Img src={video.thumbnail} />
              <StyledVideoCard.Text>
                {video.description.slice(0, 150)}
              </StyledVideoCard.Text>
            </StyledVideoCard.Body>
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
            <Group style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text>Choose a youtube video to add</Text>
              <StyledButton
                style={{ marginLeft: '5px' }}
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
  );
}
