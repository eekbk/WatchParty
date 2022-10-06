import ReactPlayer from 'react-player';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Container } from 'react-bootstrap';

const socket = io();

function Video({ videoUrl, isAdmin }: any) {
  // state vars
  const [isPlaying, setPause] = useState(false);
  const [pSeconds, setSeconds] = useState(0);

  const videoPlayer = useRef<ReactPlayer>(null);

  // functions

  // pauses all clients
  const pauseVid = () => {
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
    });
  });
  return (
    <Container fluid="md" style={{ height: '100%' }}>
      <ReactPlayer
        ref={videoPlayer}
        config={{
				  youtube: {
				    playerVars: {
				      controls: 1,
				    },
				  },
        }}
        onPlay={playVid}
        onPause={pauseVid}
        onProgress={updateTime}
        playing={isPlaying}
        url={videoUrl}
        width="100%"
        height="100%"
        style={{
				  pointerEvents: isAdmin ? 'all' : 'none',
        }}
      />
    </Container>
  );
}
export default Video;
