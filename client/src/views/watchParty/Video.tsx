import axios from 'axios';
import ReactPlayer from 'react-player';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ProgressBar, Col } from 'react-bootstrap';
import { Participants } from './Participants';
import {
  LButton,
  VolSlider,
  PlayButton,
  PauseButton,
  NextButton,
  BackButton,
  StRow,
  PStRow,
  StContainer,
} from '../../styles';
import { Playlist } from './Playlist';

function Video({
  playlist,
  setPlaylist,
  participants,
  setParticipants,
  status,
  room,
  user,
  socket,
  isArchived,
  vH,
}) {
  const navigate = useNavigate();
  // state vars
  const [clicked, setClicked] = useState(false);
  const [isPlaying, setPause] = useState(() => false);
  const [pSeconds, setSeconds] = useState(() => room.current_time);
  const [duration, setDur] = useState(1);
  const [volume, setVol] = useState(0.5);
  const [video, setVid] = useState(room.current_video);

  const videoPlayer = useRef<ReactPlayer>(null);
  if (status) {
    socket.on('roomCheck', () => {
      socket.emit('giveRoom', {
        room: room.id,
        video,
        start: pSeconds,
        playing: isPlaying,
      });
    });
  }
  // functions

  // Plays next video in playlist
  const changeVid = (bool) => {
    setSeconds(0);
    if (bool) {
      if (video < playlist.length) {
        if (!playlist[video + 1] && room.will_archive) {
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
        } else if (!playlist[video + 1] && !room.will_archive) {
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
        } else {
          socket.emit('giveRoom', {
            room: room.id,
            video: video + 1,
            start: 0,
            playing: isPlaying,
          });
          setVid(video + 1);
          axios
            .put(`/api/party/update/${room.id}`, {
              current_video: video + 1,
              current_time: 0,
            })
            .catch((err) => console.error(err));
        }
      } else {
        socket.emit('giveRoom', {
          room: room.id,
          video,
          start: 0,
          playing: isPlaying,
        });
      }
    } else {
      socket.emit('giveRoom', {
        room: room.id,
        video: video ? video - 1 : video,
        start: 0,
        playing: isPlaying,
      });
      setVid(video ? video - 1 : video);
    }
    videoPlayer.current.seekTo(0, 'seconds');
  };

  // updates volume
  const setVolume = (e) => {
    setVol(e.target.value / 100);
  };

  // Updates the duration
  const setDuration = () => {
    setDur(videoPlayer.current.getDuration());
  };

  // TODO: Get video player to start at stored video/time if nobody is already in the room
  const onReady = () => {
    // videoPlayer.current.seekTo(pSeconds, 'seconds');
    // setPause(isPlaying);
  };

  // pauses all clients
  const pauseVid = () => {
    setPause(false);
    socket.emit('pause', { room: room.id, bool: false });
    socket.emit('seek', { room: room.id, amount: pSeconds });
    videoPlayer.current.seekTo(pSeconds, 'seconds');
    axios
      .put(`/api/party/update/${room.id}`, {
        current_video: video,
        current_time: pSeconds,
      })
      .catch((err) => console.error(err));
  };
  // plays all clients
  const playVid = () => {
    socket.emit('play', { room: room.id, bool: true });
  };
  const updateTime = (data) => {
    setSeconds(data.playedSeconds);
  };

  // updates once
  useEffect(() => {
    setDuration();
    socket.on('pause', (arg: boolean) => {
      setPause(arg);
    });
    socket.on('play', (arg: boolean) => {
      setPause(arg);
    });
    socket.on('seek', (seconds: number) => {
      videoPlayer.current.seekTo(seconds, 'seconds');
      setSeconds(seconds);
    });

    socket.on(
      'giveRoom',
      (video: {
        room: any;
        video: number;
        start: number;
        playing: boolean;
      }) => {
        setVid(video.video);
        setPause(() => {
          videoPlayer.current.seekTo(video.start, 'seconds');
          return video.playing;
        });
        setSeconds(video.start);
      }
    );

    return () => {
      socket.off('pause');
      socket.off('play');
      socket.off('seek');
      socket.off('giveRoom');
    };
  }, []);
  // Positioning of playlist and participants needs work
  return (
    <Container
      ref={vH}
      fluid
      style={{
        float: 'left',
        position: 'relative',
        width: '100%',
        height: '0',
        paddingBottom: '56.25%',
      }}
    >
      <ReactPlayer
        ref={videoPlayer}
        onReady={onReady}
        config={{
          youtube: {
            playerVars: {
              controls: 0,
              color: 'white',
              start: pSeconds,
            },
          },
        }}
        onEnded={() => {
          changeVid(true);
        }}
        onStart={setDuration}
        volume={volume}
        onDuration={setDuration}
        onProgress={updateTime}
        playing={isPlaying}
        url={
          playlist[video]
            ? playlist[video].url
            : 'https://www.youtube.com/watch?v=vZa0Yh6e7dw'
        }
        width="100%"
        height="100%"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '0',
          top: '0',
        }}
      />
      <StContainer
        style={
          clicked
            ? {
                'backdrop-filter': 'blur(10px) saturate(50%)',
                '-webkit-backdrop-filter': 'blur(10px) saturate(50%)',
                'background-color': 'rgba(17, 25, 40, 0)',
              }
            : {}
        }
      >
        <PStRow>
          <Playlist
            room={room}
            playlist={playlist}
            setPlaylist={setPlaylist}
            status={status}
            vH={vH}
            socket={socket}
            vid={video}
            setVid={setVid}
            isPlaying={isPlaying}
            navigate={navigate}
            clicked={clicked}
            setClicked={setClicked}
          />
          <Participants
            room={room}
            status={status}
            participants={participants || []}
            setParticipants={setParticipants}
            vH={vH}
            socket={socket}
          />
        </PStRow>
        <StRow>
          <Col
            md="auto"
            lg="auto"
            sm="auto"
            style={{
              padding: '0px',
              width: '2.5rem',
            }}
          >
            <VolSlider
              value={volume * 100}
              onChange={setVolume}
              style={{
                height: '1.5rm',
                transform: 'rotate(-90deg)',
                position: 'relative',
                top: '12px',
              }}
            />
          </Col>
          <Col md="auto" lg="auto" sm="auto">
            <LButton
              style={{
                visibility: isArchived
                  ? 'visible'
                  : status
                  ? status.role === 'CREATOR'
                    ? 'visible'
                    : 'hidden'
                  : 'hidden',
              }}
              disabled={
                isArchived ? false : status ? status.role !== 'CREATOR' : true
              }
              onClick={() => (isPlaying ? pauseVid() : playVid())}
            >
              {isPlaying ? (
                <PauseButton size="2em" />
              ) : (
                <PlayButton size="2em" />
              )}
            </LButton>
          </Col>
          <Col md="auto" lg="auto" sm="auto">
            <LButton
              style={{
                visibility: isArchived
                  ? 'visible'
                  : status
                  ? status.role === 'CREATOR'
                    ? 'visible'
                    : 'hidden'
                  : 'hidden',
              }}
              disabled={
                isArchived ? false : status ? status.role !== 'CREATOR' : true
              }
              onClick={() => changeVid(false)}
            >
              <BackButton size="2em" />
            </LButton>
          </Col>
          <Col md="auto" lg="auto" sm="auto">
            <LButton
              style={{
                visibility: isArchived
                  ? 'visible'
                  : status
                  ? status.role === 'CREATOR'
                    ? 'visible'
                    : 'hidden'
                  : 'hidden',
              }}
              disabled={
                isArchived ? false : status ? status.role !== 'CREATOR' : true
              }
              onClick={() => changeVid(true)}
            >
              <NextButton size="2em" />
            </LButton>
          </Col>
          <ProgressBar
            variant="info"
            now={pSeconds}
            max={duration}
            min={0}
            style={{ padding: '0px' }}
          />
        </StRow>
      </StContainer>
    </Container>
  );
}
export default Video;
