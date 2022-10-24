import axios from 'axios';
import { useState, useRef, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import {
  StyledAlert,
  StyledCloseButton,
  StyledCol,
  StyledRow,
  StyledToken,
  StyledTypeahead,
  StyledForm,
  StyledButton,
  StyledVideoCard,
  StyledContainer,
  StyledFormCheck,
  StyledFormGroup,
  StyledFormControl,
  StyledFormText,
  StyledFormLabel,
  StyledFormTextarea,
  StyledScrollableGroup,
} from './styles';

export function CreateParty() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const typeaheadRef1 = useRef(null);
  const typeaheadRef2 = useRef(null);
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
  const [creating, setCreating] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  // Creates the party in the database
  const handleCreate = () => {
    setCreating(true);
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
        setTimeout(() => navigate('/'), 3000);
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

  return user && !created && !creating ? (
    <StyledContainer fluid="lg">
      <StyledRow>
        <StyledCol style={{ 'text-align': 'center' }}>
          <h1>Create Watch Party</h1>
          <br />
        </StyledCol>
      </StyledRow>
      <StyledRow xs={1} sm={1} lg={3}>
        <StyledCol
          sm={10}
          lg={4}
          style={{
            backgroundColor: '#A663CC',
            borderRadius: '16px',
            paddingBottom: '10px',
            boxShadow: 'inset 0px 0px 5px black',
            marginRight: '5px',
            marginBottom: '5px',
          }}
        >
          <StyledForm style={{ marginTop: '10px' }}>
            <StyledFormGroup>
              <StyledFormLabel>Room Name</StyledFormLabel>
              <StyledFormControl
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Room Name Here"
              />
              <br />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledFormLabel>Description</StyledFormLabel>
              <br />
              <StyledFormTextarea
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                placeholder="Describe Room Here"
              />
            </StyledFormGroup>
            <br />
            <StyledFormGroup>
              <StyledFormLabel>Start Date</StyledFormLabel>
              <br />
              <StyledFormControl
                as="input"
                value={date.toISOString().slice(0, 10)}
                min={new Date().toISOString().slice(0, 10)}
                max={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                  .toISOString()
                  .slice(0, 10)}
                type="date"
                onChange={(e) => setDate(new Date(e.target.value))}
              />
            </StyledFormGroup>
          </StyledForm>
          <StyledForm style={{ marginTop: '10px' }}>
            <StyledFormGroup>
              <StyledFormLabel>Room Options</StyledFormLabel>
              <StyledFormCheck
                type="checkbox"
                label="Archive on End"
                onChange={(e) => setArchive(e.target.checked)}
              />
              <StyledFormCheck
                type="checkbox"
                label="Save Videos as New Playlist"
                onChange={(e) => setSavePlaylist(e.target.checked)}
              />
              <StyledFormCheck
                type="checkbox"
                label="Invite Only"
                onChange={(e) => setPrivateR(e.target.checked)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <br />
              <StyledFormLabel>Assign Admins</StyledFormLabel>
              <StyledTypeahead
                labelKey={(option: any) => option.username}
                multiple
                id="keep-menu-open"
                onChange={(selected: any[]) => {
                  setAdmins(selected);
                  setInvited(
                    invited.concat(
                      selected.filter(
                        (ad) => !invited.some((inv) => inv.id === ad.id)
                      )
                    )
                  );
                  typeaheadRef1.current.toggleMenu();
                }}
                options={privateR ? invited : user.tempFollowing}
                placeholder="Enter usernames"
                ref={typeaheadRef1}
                selected={admins}
                renderToken={(option: any, { onRemove }, index) => (
                  <StyledToken key={index} onRemove={onRemove} option={option}>
                    {`@${option.username}`}
                  </StyledToken>
                )}
              />
            </StyledFormGroup>
            <StyledFormGroup hidden={!privateR}>
              <br />
              <StyledFormLabel>
                Invite people to your watch party
              </StyledFormLabel>
              <StyledTypeahead
                labelKey={(option: any) => option.username}
                multiple
                id="keep-menu-open"
                onChange={(selected: any[]) => {
                  setInvited(selected);
                  setAdmins(
                    admins.filter((adm) =>
                      selected.some((sel) => adm.id === sel.id)
                    )
                  );
                  // Keep the menu open when making multiple selections.
                  typeaheadRef2.current.toggleMenu();
                }}
                options={user.tempFollowing}
                placeholder="Enter usernames"
                ref={typeaheadRef2}
                selected={invited}
                renderToken={(option: any, { onRemove }, index) => (
                  <StyledToken key={index} onRemove={onRemove} option={option}>
                    {`@${option.username}`}
                  </StyledToken>
                )}
              />
            </StyledFormGroup>
          </StyledForm>
          <StyledForm style={{ marginTop: '10px' }}>
            <StyledFormGroup>
              <StyledFormLabel>Youtube Video Url</StyledFormLabel>
              <StyledFormControl
                placeholder="Paste Url Here"
                onChange={(e) => setVideo(e.target.value)}
                value={video}
              />
              <StyledFormText>Choose a YouTube video to add</StyledFormText>
              <br />
              <StyledButton
                onClick={handleVideoAddition}
                variant="outline-dark"
              >
                Add
              </StyledButton>
            </StyledFormGroup>
            <StyledFormGroup style={{ marginTop: '20px' }}>
              <StyledFormLabel>Public Youtube Playlist Url</StyledFormLabel>
              <StyledFormControl
                placeholder="Paste Url Here"
                onChange={(e) => setYoutubePlaylist(e.target.value)}
                value={youtubePlaylist}
              />
              <StyledFormText>
                Choose a YouTube playlist to import videos from
              </StyledFormText>
              <br />
              <StyledButton
                onClick={handlePlaylistAddition}
                variant="outline-dark"
              >
                Add
              </StyledButton>
            </StyledFormGroup>
          </StyledForm>
        </StyledCol>
        <StyledCol
          sm={10}
          lg={4}
          style={{
            backgroundColor: '#A663CC',
            borderRadius: '16px',
            paddingBottom: '10px',
            boxShadow: 'inset 0px 0px 5px black',
            marginRight: '5px',
            marginBottom: '5px',
          }}
        >
          <StyledForm style={{ marginTop: '10px' }}>
            <StyledFormLabel style={{ width: '100%', 'text-align': 'center' }}>
              Choose Saved Playlist
            </StyledFormLabel>
            <StyledScrollableGroup style={{ maxHeight: '54vh' }}>
              {user.playlists.map((pl, i) => (
                <StyledVideoCard style={{ marginTop: '5px' }}>
                  <StyledVideoCard.Title
                    style={{
                      paddingLeft: '1rem',
                      paddingRight: '1rem',
                      paddingTop: '1rem',
                    }}
                  >
                    {pl.name}
                  </StyledVideoCard.Title>
                  <StyledVideoCard.Body>
                    <StyledVideoCard.Img src={pl.thumbnail} />
                    <StyledVideoCard.Text>
                      {pl.description.slice(0, 150)}
                    </StyledVideoCard.Text>
                    <StyledButton
                      style={{ marginTop: '5px' }}
                      onClick={() => setPlaylist(playlist.concat(pl.videos))}
                      variant="outline-dark"
                    >
                      Import
                    </StyledButton>
                  </StyledVideoCard.Body>
                </StyledVideoCard>
              ))}
            </StyledScrollableGroup>
          </StyledForm>
        </StyledCol>
        <StyledCol
          sm={10}
          lg={3}
          style={{
            backgroundColor: '#A663CC',
            borderRadius: '16px',
            paddingBottom: '10px',
            boxShadow: 'inset 0px 0px 5px black',
          }}
        >
          <StyledForm style={{ marginTop: '10px' }} hidden={!savePlaylist}>
            <StyledFormGroup>
              <StyledFormLabel>Playlist Title</StyledFormLabel>
              <StyledFormControl
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Enter Playlist Title"
                disabled={!savePlaylist}
              />
              <br />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledFormLabel>Description</StyledFormLabel>
              <br />
              <StyledFormTextarea
                onChange={(e) => setPlaylistDescription(e.target.value)}
                as="textarea"
                placeholder="Describe Playlist"
                disabled={!savePlaylist}
              />
            </StyledFormGroup>
          </StyledForm>
          <StyledForm style={{ marginTop: '10px' }}>
            <StyledFormLabel style={{ width: '100%', 'text-align': 'center' }}>
              Video List
            </StyledFormLabel>
            <StyledScrollableGroup style={{ maxHeight: '40vh' }}>
              {playlist.map((vd, i) => (
                <StyledVideoCard style={{ marginTop: '10px' }}>
                  <StyledCloseButton
                    onClick={() => handleVideoRemoval(i)}
                    style={{ marginTop: '5px', marginLeft: '5px' }}
                  />
                  <StyledVideoCard.Title
                    style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                  >
                    {vd.title}
                  </StyledVideoCard.Title>
                  <StyledVideoCard.Body>
                    <StyledVideoCard.Img src={vd.thumbnail} />
                    <StyledVideoCard.Text>
                      {vd.description.slice(0, 150)}
                    </StyledVideoCard.Text>
                  </StyledVideoCard.Body>
                </StyledVideoCard>
              ))}
            </StyledScrollableGroup>
            <StyledButton
              disabled={!playlist.length || !name}
              onClick={handleCreate}
              variant="outline-dark"
              style={{ marginTop: '10px' }}
            >
              Create
            </StyledButton>
          </StyledForm>
        </StyledCol>
      </StyledRow>
    </StyledContainer>
  ) : created ? (
    <StyledAlert
      key="success"
      variant="success"
      style={{ maxWidth: '20rem', margin: '40%', textAlign: 'center' }}
    >
      Watch Party Created!
    </StyledAlert>
  ) : (
    <Spinner
      animation="border"
      role="status"
      style={{ margin: '45%', color: '#A663CC' }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
