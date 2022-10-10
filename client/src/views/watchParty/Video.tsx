import ReactPlayer from 'react-player';
import { useState, useEffect, useRef } from 'react';
import { Container, ProgressBar, Form } from 'react-bootstrap';
import { PlayPause } from '../../styles';

function Video({
  videos, isAdmin, room, user, socket,
}) {
  // state vars
  const [isPlaying, setPause] = useState(false);
  const [pSeconds, setSeconds] = useState(0.0001);
  const [duration, setDur] = useState(1);
  const [volume, setVol] = useState(0.5);
  const [video, setVid] = useState(0);

  const videoPlayer = useRef<ReactPlayer>(null);
  // TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  if (isAdmin) {
    socket.on('roomCheck', () => {
      socket.emit('giveRoom', { room, video, start: pSeconds });
    });
  }

  // TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // functions

  // Plays next video in playlist
  const changeVid = () => {
    setSeconds(0);
    setVid(video + 1);
  };

  // updates volume
  const setVolume = (e) => {
    setVol(e.target.value / 100);
  };

  // Updates the duration
  const setDuration = () => {
    setDur(videoPlayer.current.getDuration());
  };

  // pauses all clients
  const pauseVid = () => {
    setPause(false);
    socket.emit('pause', { room, bool: false });
    socket.emit('seek', { room, amount: pSeconds });
    videoPlayer.current.seekTo(pSeconds, 'seconds');
  };
  // plays all clients
  const playVid = () => {
    socket.emit('play', { room, bool: true });
  };
  const updateTime = (data) => {
    setSeconds(data.playedSeconds);
  };

  // updates once
  useEffect(() => {
    console.log(user);
    socket.on('pause', (arg: boolean) => {
      setPause(arg);
    });
    socket.on('play', (arg: boolean) => {
      setPause(arg);
    });
    socket.on('seek', (seconds: number) => {
      // console.log(seconds);
      videoPlayer.current.seekTo(seconds, 'seconds');
      setSeconds(seconds);
    });

    socket.on(
      'giveRoom',
      (video: { room: string; video: number; start: number }) => {
        setVid(video.video);
        setSeconds(video.start);
        videoPlayer.current.seekTo(video.start, 'seconds');
      },
    );

    return () => {
      socket.off('pause');
      socket.off('play');
      socket.off('seek');
      socket.off('giveRoom');
    };
  }, []);
  return (
    <Container
      fluid="md"
      style={{
			  height: '100%',
			  float: 'left',
			  marginLeft: '0px',
      }}
    >
      <ReactPlayer
        ref={videoPlayer}
        config={{
				  youtube: {
				    playerVars: {
				      controls: 0,
				      color: 'white',
				    },
				  },
        }}
        onEnded={changeVid}
        onBuffer={() => {
				  // console.log('buffering');
        }}
        onBufferEnd={() => {
				  // console.log('DONE');
        }}
        onStart={setDuration}
        volume={volume}
        onDuration={setDuration}
        onProgress={updateTime}
        playing={isPlaying}
        url={
					videos[video]
					  ? videos[video].url
					  : 'https://www.youtube.com/watch?v=vZa0Yh6e7dw'
				}
        width="100%"
        height="85%"
        style={{
				  pointerEvents: 'none',
        }}
      />
      <ProgressBar variant="info" now={pSeconds} max={duration} min={0} />
      <Container fluid="md" style={{ height: '1.5rm', width: '10%' }}>
        <Form.Range value={volume * 100} onChange={setVolume} />
      </Container>
      <PlayPause disabled={!isAdmin} onClick={playVid}>
        Play
      </PlayPause>
      {' '}
      <PlayPause disabled={!isAdmin} onClick={pauseVid}>
        Pause
      </PlayPause>
      {/* <Card.Body>
        <Card.Title>
          {videos[video] ? videos[video].title : 'Please Wait'}
        </Card.Title>
        <Card.Text>
          {videos[video] ? videos[video].description : 'Please Wait'}
        </Card.Text>
      </Card.Body> */}
    </Container>
  );
}
export default Video;
