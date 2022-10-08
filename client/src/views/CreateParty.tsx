import {
  Container, Row, Col, Accordion, CloseButton,
} from 'react-bootstrap';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import { useState, useRef, useContext } from 'react';
import axios from 'axios';
import { StyledForm, StyledButton, StyledVideoCard } from '../styles';
import { UserContext } from '../context';

const {
  Label, Text, Control, Group, Check,
} = StyledForm;
const { Item, Header, Body } = Accordion;

export function CreateParty() {
  const { user } = useContext(UserContext);
  const temp = { playlists: [], friends: [] };
  const typeaheadRef = useRef(null);
  const [privateR, setPrivateR] = useState(false);
  const [archive, setArchive] = useState(false);
  const [savePlaylist, setSavePlaylist] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [video, setVideo] = useState('');
  const [invited, setInvited] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [usePlaylist, setUsePlaylist] = useState(false);

  const handleCreate = (e) => {
    axios.post('/api/party', {
      party: {
        private: privateR,
        creatorId: user.id,
        archive,
        playlist,
        invited,
        admins,
      },
      savePlaylist,
    });
  };

  const handlePlaylistImport = (pl) => {
    console.log('filler');
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
    const tempPlaylist = playlist.slice();
    tempPlaylist.splice(i, 1);
    setPlaylist(tempPlaylist);
  };

  return (
    <Container fluid="md">
      <Row>
        <Col fluid="md">
          <StyledForm>
            <Group>
              <Label>Room Name</Label>
              <Control placeholder="Enter Room Name Here" />
            </Group>
            <Group>
              <Label>Description</Label>
              <Control as="textarea" placeholder="Describe Room Here" />
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
                hidden={savePlaylist}
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
                hidden={usePlaylist}
              />
              <Check
                type="checkbox"
                label="Invite Only"
                onChange={(e) => setPrivateR(e.target.checked)}
              />
            </Group>
            <Group hidden={privateR}>
              <Label>Invite friends to watch party</Label>
              <Typeahead
                multiple
                id="keep-menu-open"
                onChange={(selected) => {
								  setInvited(selected);
								  // Keep the menu open when making multiple selections.
								  typeaheadRef.current.toggleMenu();
                }}
                options={temp.friends.filter(
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
                options={temp.friends}
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
                {temp.playlists.map((pl, i) => (
                  <Item eventKey={String(i)}>
                    <Header>{pl.title}</Header>
                    <Body>{pl.description}</Body>
                    <StyledButton onClick={(pl) => handlePlaylistImport(pl)}>
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
        <Col fluid="md" hidden={!savePlaylist}>
          <StyledForm>
            <Group>
              <Label>Playlist Title</Label>
              <Control placeholder="Enter Playlist Title Here" />
            </Group>
            <Group>
              <Label>Description</Label>
              <Control as="textarea" placeholder="Describe Playlist Here" />
            </Group>
          </StyledForm>
        </Col>
      </Row>
      <Row>
        <StyledButton disabled={playlist.length} onClick={handleCreate}>
          Create
        </StyledButton>
      </Row>
    </Container>
  );
}
