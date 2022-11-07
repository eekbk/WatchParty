import axios from 'axios';
import { useState, useRef, useContext } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import {
  StyledAlert,
  StyledCol,
  StyledRow,
  CreatePartyContainer,
  HeaderRow,
  HeaderColumn,
  StyledTabs,
  StyledTab,
  StyledButton,
} from './styles';
import { RoomDetails } from './RoomDetails';
import { RoomOptions } from './RoomOptions';
import { VideoImports } from './VideoImports';
import { VideoList } from './VideoList';
import { UserPlaylists } from './UserPlaylists';

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
            videos: playlist.map((vd, index) => ({
              index,
              video: { connect: { id: vd.id } },
            })),
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
          invitees: invited.map((i) => ({ id: i.id })),
          status: 'UPCOMING',
          admins: admins.map((a) => ({ id: a.id })),
          type: 'PARTY',
          user_id: user.id,
          thumbnail: playlist[0].thumbnail,
          videos: playlist.map((vd, index) => ({
            index,
            video: { connect: { id: vd.id } },
          })),
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

  return (
    <CreatePartyContainer>
      <HeaderRow>
        <HeaderColumn style={{ textAlign: 'center' }}>
          <h1>Create Watch Party</h1>
          <br />
        </HeaderColumn>
      </HeaderRow>
      {user && !created && !creating ? (
        <StyledRow>
          <StyledTabs defaultActiveKey="party">
            <StyledTab
              eventKey="party"
              title={name.length ? 'Party' : 'Party*'}
            >
              <RoomDetails
                setName={setName}
                setDescription={setDescription}
                setDate={setDate}
                date={date}
                name={name}
              />
            </StyledTab>
            <StyledTab
              eventKey="playlist"
              title={playlist.length ? 'Playlist' : 'Playlist*'}
            >
              <StyledRow>
                <StyledCol>
                  <VideoImports
                    handlePlaylistAddition={handlePlaylistAddition}
                    youtubePlaylist={youtubePlaylist}
                    setYoutubePlaylist={setYoutubePlaylist}
                    handleVideoAddition={handleVideoAddition}
                    video={video}
                    setVideo={setVideo}
                  />
                </StyledCol>
                <StyledCol>
                  <UserPlaylists
                    playlist={playlist}
                    setPlaylist={setPlaylist}
                    user={user}
                  />
                </StyledCol>
                <StyledCol>
                  <VideoList
                    handleVideoRemoval={handleVideoRemoval}
                    playlist={playlist}
                  />
                </StyledCol>
              </StyledRow>
            </StyledTab>
            <StyledTab eventKey="options" title="Options">
              <RoomOptions
                typeaheadRef2={typeaheadRef2}
                admins={admins}
                setAdmins={setAdmins}
                setInvited={setInvited}
                privateR={privateR}
                typeaheadRef1={typeaheadRef1}
                user={user}
                invited={invited}
                setPrivateR={setPrivateR}
                setSavePlaylist={setSavePlaylist}
                setArchive={setArchive}
                setPlaylistDescription={setPlaylistDescription}
                setPlaylistName={setPlaylistName}
                savePlaylist={savePlaylist}
              />
            </StyledTab>
          </StyledTabs>
          <br />
          <StyledButton
            disabled={!playlist.length || !name}
            onClick={handleCreate}
            variant="outline-dark"
            style={{
              marginTop: '10px',
              width: 'max-content',
              marginLeft: '22px',
              marginRight: 'auto',
            }}
          >
            Create
          </StyledButton>
        </StyledRow>
      ) : created ? (
        <StyledAlert
          key="success"
          variant="success"
          style={{
            width: 'fit-content',
            textAlign: 'center',
            position: 'absolute',
            left: 'calc(50% - 91px)',
            top: '50vh',
          }}
        >
          Watch Party Created!
        </StyledAlert>
      ) : (
        <Spinner
          animation="border"
          role="status"
          style={{
            color: '#A663CC',
            position: 'absolute',
            left: '50%',
            top: '50vh',
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </CreatePartyContainer>
  );
}
