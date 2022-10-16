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
// import { UnStyledForm } from './styles';
import { UserContext } from '../../context';

const {
  Label, Text, Control, Group, Check,
} = StyledForm;
const { Item, Header, Body } = Accordion;

export function CreateParty() {
  const { user, setUser } = useContext(UserContext);
  const typeaheadRef = useRef(null);
  const [privateR, setPrivateR] = useState(false);
  const [archive, setArchive] = useState(false);
  const [savePlaylist, setSavePlaylist] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [video, setVideo] = useState('');
  const [invited, setInvited] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [created, setCreated] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const handleCreate = () => {
    if (savePlaylist) {
      axios
        .post('/api/user/playlist', {
          playlist: {
            name: playlistName,
            description: playlistDescription,
            thumbnail: playlist[0].thumbnail,
            videos: playlist.map((vd) => vd.id),
            user_id: user.id,
          },
        })
        .then(() =>
          axios.post('/api/party', {
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
          }))
        .then(() => axios.get('/api/user'))
        .then((data) => {
          setUser(data.data);
          setCreated(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log(archive);
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
    }
  };

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
        })
        .catch((err) => {
          console.error(err);
          setVideo('');
        });
    } else {
      // Add alert for invalid url
      setVideo('');
    }
  };

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
                label="Import Playlist"
                onChange={(e) => setShowPlaylists(e.target.checked)}
              />
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
              <Text>Choose a youtube video to add</Text>
              <br />
              <StyledButton onClick={handleVideoAddition}>Add</StyledButton>
            </Group>
          </StyledForm>
          <StyledForm style={{ marginTop: '10px' }} hidden={!showPlaylists}>
            <Group>
              <Label>Choose Saved Playlist</Label>
              <Accordion>
                {user.playlists.map((pl, i) => (
                  <Item eventKey={String(i)}>
                    <Header>{pl.name}</Header>
                    <Container as="img" src={pl.thumbnail} alt="" />
                    <Body>{pl.description}</Body>
                    <StyledButton
                    style={{ marginTop: '5px' }}
                    onClick={() => setPlaylist(playlist.concat(pl.videos))}
                  >
  Import
                  </StyledButton>
                  </Item>
                ))}
              </Accordion>
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
