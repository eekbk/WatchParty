import ReactPlayer from 'react-player';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Container, ProgressBar } from 'react-bootstrap';
import { PlayPause } from '../../styles';

const socket = io();

function Video({ videoUrl, isAdmin }: any) {
  // state vars
  const [isPlaying, setPause] = useState(false);
  const [pSeconds, setSeconds] = useState(0);
  const [duration, setDur] = useState(1);

  const videoPlayer: any = useRef<ReactPlayer>(null);

  // functions

  // Updates the duration
  const setDuration = (sec) => {
    setDur(sec);
  };

  // pauses all clients
  const pauseVid = () => {
    setPause(false);
    socket.emit('pause', false);
    socket.emit('seek', pSeconds);
    videoPlayer.current.seekTo(pSeconds);
  };
  // plays all clients
  const playVid = () => {
    socket.emit('play', true);
  };
  const updateTime = (data: any) => {
    setSeconds(data.playedSeconds);
  };

  // updates once
  useEffect(() => {
    socket.on('pause', (arg: boolean) => {
      setPause(arg);
    });
    socket.on('play', (arg: boolean) => {
      setPause(arg);
    });
    socket.on('seek', (seconds: number) => {
      setSeconds(seconds);
      videoPlayer.current.seekTo(seconds);
    });
  });
  return (
    <Container fluid="md" style={{ height: '100%' }}>
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
        onDuration={setDuration}
        onProgress={updateTime}
        playing={isPlaying}
        url={videoUrl}
        width="100%"
        height="85%"
        style={{
				  pointerEvents: 'none',
        }}
      />
      <ProgressBar variant="info" now={pSeconds} max={duration} min={0} />
      <PlayPause onClick={playVid}>Play</PlayPause>
      {' '}
      <PlayPause onClick={pauseVid}>Pause</PlayPause>
    </Container>
  );
}
export default Video;
