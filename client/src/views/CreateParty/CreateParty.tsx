import {
  Container,
  Row,
  Col,
  Accordion,
  CloseButton,
  Alert,
} from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { StyledForm, StyledButton, StyledVideoCard } from '../../styles';
import { StyledAccordion } from './styles';
import { UserContext } from '../../context';

const { Label, Text, Control, Group, Check } = StyledForm;
const { Item, Header, Body } = Accordion;

export function CreateParty() {
  const { user, setUser } = useContext(UserContext);
  const typeaheadRef = useRef(null);
  const [privateR, setPrivateR] = useState(false);
  const [archive, setArchive] = useState(false);
  const [savePlaylist, setSavePlaylist] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [video, setVideo] = useState('');
  const [youtubePlaylist, setYoutubePlaylist] = useState('');
  const [invited, setInvited] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [created, setCreated] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  // Creates the party in the database
  const handleCreate = () => {
    // Creates the new playlist in the database
    if (savePlaylist) {
      axios
        .post('/api/playlist', {
          playlist: {
            name: playlistName,
            description: playlistDescription,
            thumbnail: playlist[0].thumbnail,
            videos: playlist.map((vd) => vd.id),
            user_id: user.id,
          },
        })
        .catch((err) => console.error(err));
    }
    axios
      .post('/api/party', {
        party: {
          name,
          description,
          date_time: date,
          is_private: privateR,
          will_archive: archive,
          invitees: invited.map((i) => i.id),
          status: 'UPCOMING',
          admins: admins.map((a) => a.id),
          type: 'PARTY',
          user_id: user.id,
          thumbnail: playlist[0].thumbnail,
          videos: playlist.map((vd) => ({ id: vd.id })),
        },
      })
      .then(() => axios.get('/api/user'))
      .then((data) => {
        setUser(data.data);
        setCreated(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Creates the video in the database
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
        })
        .catch((err) => {
          console.error(err);
          setVideo('');
        });
    } else {
      // TODO: Add alert for invalid url
      setVideo('');
    }
  };

  // Creates all of the videos from the playlist in the database
  const handlePlaylistAddition = () => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?list=|\&list=)([^#\&\?]*).*/;
    const match = youtubePlaylist.match(regExp);
    const altCheck = youtubePlaylist.split('list=')[1].slice(0, 34);
    if (match && match[2].length === 34) {
      axios
        .get(`/api/playlist/youtube/${match[2]}`)
        .then((pl) => {
          setYoutubePlaylist('');
          setPlaylist(playlist.concat(pl.data));
        })
        .catch((err) => {
          console.error(err);
          setYoutubePlaylist('');
        });
    } else if (altCheck.length === 34) {
      axios
        .get(`/api/playlist/youtube/${altCheck}`)
        .then((pl) => {
          setYoutubePlaylist('');
          setPlaylist(playlist.concat(pl.data));
        })
        .catch((err) => {
          console.error(err);
          setYoutubePlaylist('');
        });
    } else {
      // TODO: Add alert for invalid url
      setYoutubePlaylist('');
    }
  };

  // Removes a video from the current list of videos
  const handleVideoRemoval = (i) => {
    const pl = playlist.slice();
    pl.splice(i, 1);
    setPlaylist(pl);
  };

  return user && !created ? (
    <Container fluid="md">
      <Row>
        <Col fluid="md">
          <StyledForm>
            <Group>
              <Label>Room Name</Label>
              <Control
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Room Name Here"
              />
            </Group>
            <Group>
              <Label>Description</Label>
              <Control
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                placeholder="Describe Room Here"
              />
            </Group>
            <Group>
              <Label>Start Date</Label>
              <Control
                as="input"
                value={date.toISOString().slice(0, 10)}
                min={new Date().toISOString().slice(0, 10)}
                max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .slice(0, 10)}
                type="date"
                onChange={(e) => setDate(new Date(e.target.value))}
              />
            </Group>
            <Group>
              <StyledButton
                disabled={!playlist.length || !name}
                onClick={handleCreate}
                style={{ marginTop: '5px' }}
              >
                Create
              </StyledButton>
            </Group>
          </StyledForm>
        </Col>
        <Col fluid="md">
          <StyledForm>
            <Group>
              <Check
                type="checkbox"
                label="Archive on End"
                onChange={(e) => setArchive(e.target.checked)}
              />
              <Check
                type="checkbox"
                label="Save Videos as New Playlist"
                onChange={(e) => setSavePlaylist(e.target.checked)}
              />
              <Check
                type="checkbox"
                label="Invite Only"
                onChange={(e) => setPrivateR(e.target.checked)}
              />
            </Group>
            <Group hidden={!privateR}>
              <Label>Invite people to your watch party</Label>
              <Typeahead
                labelKey={(option: any) => option.username}
                multiple
                id="keep-menu-open"
                onChange={(selected) => {
                  setInvited(selected);
                  // Keep the menu open when making multiple selections.
                  typeaheadRef.current.toggleMenu();
                }}
                options={user.tempFollowing}
                placeholder="Enter usernames"
                ref={typeaheadRef}
                selected={invited}
                renderToken={(option: any, { onRemove }, index) => (
                  <Token key={index} onRemove={onRemove} option={option}>
                    {`@${option.username}`}
                  </Token>
                )}
              />
            </Group>
            <Group>
              <Label>Assign Admins</Label>
              <Typeahead
                labelKey={(option: any) => option.username}
                multiple
                id="keep-menu-open"
                onChange={(selected) => {
                  setAdmins(selected);
                  typeaheadRef.current.toggleMenu();
                }}
                options={privateR ? invited : user.tempFollowing}
                placeholder="Enter usernames"
                ref={typeaheadRef}
                selected={admins}
                renderToken={(option: any, { onRemove }, index) => (
                  <Token key={index} onRemove={onRemove} option={option}>
                    {`@${option.username}`}
                  </Token>
                )}
              />
            </Group>
          </StyledForm>
        </Col>
        <Col fluid="md">
          <StyledForm>
            <Group>
              <Label>Youtube Video Url</Label>
              <Control
                placeholder="Paste Url Here"
                onChange={(e) => setVideo(e.target.value)}
                value={video}
              />
              <Text>Choose a YouTube video to add</Text>
              <br />
              <StyledButton onClick={handleVideoAddition}>Add</StyledButton>
            </Group>
            <Group style={{ marginTop: '20px' }}>
              <Label>Public Youtube Playlist Url</Label>
              <Control
                placeholder="Paste Url Here"
                onChange={(e) => setYoutubePlaylist(e.target.value)}
                value={youtubePlaylist}
              />
              <Text>Choose a YouTube playlist to import videos from</Text>
              <br />
              <StyledButton onClick={handlePlaylistAddition}>Add</StyledButton>
            </Group>
          </StyledForm>
          <StyledForm style={{ marginTop: '10px' }}>
            <Group style={{ maxHeight: '35vh' }}>
              <Label>Choose Saved Playlist</Label>
              <StyledAccordion
                style={{ maxHeight: '100%', overflowY: 'scroll' }}
              >
                {user.playlists.map((pl, i) => (
                  <Item eventKey={String(i)}>
                    <Header>{pl.name}</Header>
                    <Body>
                      <Container as="img" src={pl.thumbnail} alt="" />
                      {pl.description}
                    </Body>
                    <StyledButton
                      style={{ marginTop: '5px' }}
                      onClick={() => setPlaylist(playlist.concat(pl.videos))}
                    >
                      Import
                    </StyledButton>
                  </Item>
                ))}
              </StyledAccordion>
            </Group>
          </StyledForm>
        </Col>
        <Col fluid="md">
          <StyledForm>
            <Group>
              <Label>Playlist Title</Label>
              <Control
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Enter Playlist Title"
                disabled={!savePlaylist}
              />
            </Group>
            <Group>
              <Label>Description</Label>
              <Control
                onChange={(e) => setPlaylistDescription(e.target.value)}
                as="textarea"
                placeholder="Describe Playlist"
                disabled={!savePlaylist}
              />
            </Group>
          </StyledForm>
          <StyledForm
            style={{
              overflowY: 'scroll',
              maxHeight: '80vh',
              marginTop: '10px',
            }}
          >
            <Group>
              <Label>Video List</Label>
              {playlist.map((vd, i) => (
                <StyledVideoCard>
                  <CloseButton onClick={() => handleVideoRemoval(i)} />
                  <StyledVideoCard.Title>{vd.title}</StyledVideoCard.Title>
                  <StyledVideoCard.Body>
                    <StyledVideoCard.Img src={vd.thumbnail} />
                    <StyledVideoCard.Text>
                      {vd.description.slice(0, 150)}
                    </StyledVideoCard.Text>
                  </StyledVideoCard.Body>
                </StyledVideoCard>
              ))}
            </Group>
          </StyledForm>
        </Col>
      </Row>
    </Container>
  ) : created ? (
    <Alert key="success" variant="success">
      Watch Party Created!
    </Alert>
  ) : (
    <Alert key="warning" variant="warning">
      Please log in to create Watch Parties
    </Alert>
  );
}
