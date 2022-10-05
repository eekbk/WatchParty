import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

function Video({ videoUrl }: any) {
  // state vars
  const [isPlaying, setPause] = useState(false);

  // functions

  // pauses all clients
  const pauseVid = () => {
    socket.emit('pause', false);
  };
  // plays all clients
  const playVid = () => {
    socket.emit('play', true);
  };
  const testFunc = (data: any) => {
    console.log(data);
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
  console.log(isPlaying);
  return (
    <ReactPlayer
      config={{
			  youtube: {
			    playerVars: {
			      controls: 1,
			    },
			  },
      }}
      onPlay={playVid}
      onPause={pauseVid}
      onSeek={testFunc}
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
