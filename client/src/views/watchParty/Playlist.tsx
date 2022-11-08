import { Col, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyledVideoCard, StyledButton } from '../../styles';
import { StyledListGroup, StyledListHeader, StyledListItem } from './styles';

const { Group, Control } = Form;

export function Playlist({
  playlist,
  setPlaylist,
  room,
  status,
  vH,
  socket,
  vid,
  setVid,
  isPlaying,
  navigate,
}) {
  const [video, setVideo] = useState('');
  const [clicked, setClicked] = useState(false);
  const [vHeight, setVHeight] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    setVHeight(vH.current ? (vH.current.clientHeight - 65) * 0.8 : 0);
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
          setPlaylist(
            playlist.concat([{ ...vd.data, index: playlist.length }])
          );
          socket.emit('playlist', {
            room: room.id,
            playlist: playlist.concat([{ ...vd.data, index: playlist.length }]),
          });
          return axios.put(`/api/party/addVideo/${room.id}`, {
            video: vd.data.id,
            index: playlist.length,
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
      .put(`/api/party/removeVideo/${room.id}`, {
        video: playlist[i].id,
        index: playlist[i].index,
      })
      .catch((err) => console.error(err));
    if (i === vid && vid === playlist.length - 1) {
      if (!playlist[vid + 1] && room.will_archive) {
        const data = JSON.stringify(room);
        const config = {
          method: 'post',
          url: '/api/party/archive',
          headers: {
            'Content-Type': 'application/json',
          },
          data,
        };
        axios(config)
          .then(() => {
            socket.emit('endParty', {
              room: room.id,
            });
            navigate('/');
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (!playlist[vid + 1] && !room.will_archive) {
        axios
          .delete(`/api/party/${room.id}`)
          .then(() => {
            socket.emit('endParty', {
              room: room.id,
            });
            navigate('/');
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      socket.emit('playlist', {
        room: room.id,
        playlist: videos,
      });
      setPlaylist(videos);
    }
  };

  const handleResize = () => {
    setVHeight(vH.current ? (vH.current.clientHeight - 65) * 0.8 : 0);
  };

  return (
    <Col md={4} style={{ display: 'flex', flexDirection: 'column' }}>
      <StyledListHeader
        onClick={() => setClicked(!clicked)}
        hidden={!status || status.role === 'NORMIE'}
        style={{ marginRight: '15px' }}
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
              <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                <StyledButton
                  style={{
                    width: 'fit-content',
                    margin: '5px',
                  }}
                  onClick={() => {
                    socket.emit('giveRoom', {
                      room: room.id,
                      video: i,
                      start: 0,
                      playing: isPlaying,
                    });
                    axios
                      .put(`/api/party/update/${room.id}`, {
                        current_video: i,
                        current_time: 0,
                      })
                      .catch((err) => console.error(err));
                    setVid(i);
                  }}
                >
                  Select
                </StyledButton>
                <StyledButton
                  style={{
                    width: 'fit-content',
                    margin: '5px',
                  }}
                  onClick={() => handleVideoRemoval(i)}
                >
                  Remove
                </StyledButton>
              </Col>
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
