import { ListGroup, CloseButton, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { StyledVideoCard, StyledButton } from '../../styles';
import { StyledListGroup } from './styles';

const { Group, Control, Text } = Form;
const { Item } = ListGroup;

export function Playlist({
  playlist, setPlaylist, room, status,
}) {
  const [video, setVideo] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleVideoAddition = () => {
    const regExp =			/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
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
    axios.put(`/api/party/removeVideo/${room.id}`, { video: playlist[i].id });
    setPlaylist(videos);
  };

  return (
    <StyledListGroup
      id="dropdown-basic-button"
      title="Playlist"
      style={{
			  overflowY: 'scroll',
			  maxHeight: '85%',
			  width: '30%',
			  position: 'absolute',
      }}
      hidden={!status}
    >
      <Item
        style={{
				  display: 'flex',
				  justifyContent: 'space-between',
        }}
      >
        <h5 style={{ alignSelf: 'center' }}>Playlist</h5>
        <StyledButton onClick={() => setClicked(!clicked)}>
          {clicked ? 'Close' : 'Open'}
        </StyledButton>
      </Item>
      {playlist.map((video, i) => (
        <Item hidden={!clicked}>
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
        </Item>
      ))}
      <Item hidden={!clicked}>
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
              >
                Add
              </StyledButton>
            </Group>
          </Group>
        </Form>
      </Item>
    </StyledListGroup>
  );
}
