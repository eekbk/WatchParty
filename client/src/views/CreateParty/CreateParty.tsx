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
import { UserContext } from '../../context';

const {
  Label, Text, Control, Group, Check,
} = StyledForm;
const { Item, Header, Body } = Accordion;

export function CreateParty() {
  const { user } = useContext(UserContext);
  const typeaheadRef = useRef(null);
  const [privateR, setPrivateR] = useState(false);
  const [archive, setArchive] = useState(false);
  const [savePlaylist, setSavePlaylist] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [video, setVideo] = useState('');
  const [invited, setInvited] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [usePlaylist, setUsePlaylist] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [importedPlaylist, setImportedPlaylist] = useState(null);
  const [created, setCreated] = useState(false);

  const handleCreate = (e) => {
    if (savePlaylist) {
      axios
        .post('/api/user/playlist', {
          playlist: {
            name: playlistName,
            description: playlistDescription,
            thumbnail: playlist[0].thumbnail,
            videos: playlist.map((vd) => vd.id),
          },
        })
        .then((playlistId) =>
          axios.post('/api/party', {
            party: {
              name,
              description,
              is_private: privateR,
              is_recurring: archive,
              invitees: invited,
              admins,
              type: 'PARTY',
            },
            playlistId: playlistId.data,
          }))
        .then(() => {
          setCreated(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (!usePlaylist) {
      axios
        .post('/api/party/playlist', {
          playlist: {
            name: playlistName,
            description: playlistDescription,
            thumbnail: playlist[0].thumbnail,
            videos: playlist.map((vd) => vd.id),
          },
        })
        .then((playlistId) =>
          axios.post('/api/party', {
            party: {
              name,
              description,
              is_private: privateR,
              is_recurring: archive,
              invitees: invited,
              admins,
              type: 'PARTY',
            },
            playlistId: playlistId.data,
          }))
        .then(() => {
          setCreated(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post('/api/party', {
          party: {
            name,
            description,
            is_private: privateR,
            is_recurring: archive,
            invitees: invited,
            admins,
            type: 'PARTY',
          },
          playlistId: importedPlaylist.id,
        })
        .then(() => {
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
          console.log(vd);
          setVideo('');
          setPlaylist(playlist.concat([vd.data]));
        })
        .catch((err) => {
          console.error(err);
          setVideo('');
        });
    } else {
      // Add alert for invalid url
      console.log('invalid url');
      setVideo('');
    }
  };

  const handleVideoRemoval = (i) => {
    const userPlaylist = playlist.slice();
    userPlaylist.splice(i, 1);
    setPlaylist(userPlaylist);
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
              <StyledButton
                disabled={!playlist.length || !name}
                onClick={handleCreate}
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
                onChange={(e) => setUsePlaylist(e.target.checked)}
                disabled={savePlaylist}
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
                disabled={usePlaylist}
              />
              <Check
                type="checkbox"
                label="Invite Only"
                onChange={(e) => setPrivateR(e.target.checked)}
              />
            </Group>
            <Group hidden={!privateR}>
              <Label>Invite friends to watch party</Label>
              <Typeahead
                multiple
                id="keep-menu-open"
                onChange={(selected) => {
								  setInvited(selected);
								  // Keep the menu open when making multiple selections.
								  typeaheadRef.current.toggleMenu();
                }}
                options={user.friends.filter(
								  (f) => !invited.some((i) => f.id === i.id),
                )}
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
                multiple
                id="keep-menu-open"
                onChange={(selected) => {
								  setAdmins(selected);
								  // Keep the menu open when making multiple selections.
								  typeaheadRef.current.toggleMenu();
                }}
                options={user.friends}
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
            <Group hidden={!usePlaylist}>
              <Label>Choose Saved Playlist</Label>
              <Accordion>
                {user.playlists.map((pl, i) => (
                  <Item eventKey={String(i)}>
                    <Header>{pl.name}</Header>
                    <Container as="img" src={pl.thumbnail} alt="" />
                    <Body>{pl.description}</Body>
                    <StyledButton onClick={(e) => setImportedPlaylist(pl)}>
                    Import
										</StyledButton>
                  </Item>
                ))}
              </Accordion>
            </Group>
            <Group hidden={usePlaylist}>
              <Label>Youtube Video Url</Label>
              <Control
                placeholder="Paste Url Here"
                onChange={(e) => setVideo(e.target.value)}
                value={video}
              />
              <Text>Choose a youtube video to add</Text>
              <StyledButton onClick={handleVideoAddition}>Add</StyledButton>
            </Group>
          </StyledForm>
        </Col>
        <Col fluid="md">
          <StyledForm style={{ overflowY: 'scroll', maxHeight: '90vh' }}>
            <Group hidden={!savePlaylist}>
              <Label>Playlist Title</Label>
              <Control
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Enter Playlist Title Here"
              />
            </Group>
            <Group hidden={!savePlaylist}>
              <Label>Description</Label>
              <Control
                onChange={(e) => setPlaylistDescription(e.target.value)}
                as="textarea"
                placeholder="Describe Playlist Here"
              />
            </Group>
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
