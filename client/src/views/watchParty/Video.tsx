import ReactPlayer from 'react-player';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io();

function Video({ videoUrl }: any) {
  // state vars
  const [isPlaying, setPause] = useState(false);
  const [pSeconds, setSeconds] = useState(0);

  const videoPlayer = useRef<ReactPlayer>(null);

  // functions

  // pauses all clients
  const pauseVid = () => {
    socket.emit('pause', false);
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
  });
  return (
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
      style={{
			  height: '500px',
			  width: '500px',
      }}
    />
  );
}
export default Video;
