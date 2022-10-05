import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

function Video({ videoUrl }: any) {
  const [isPlaying, setPause] = useState(false);

  const pauseVid = () => {
    socket.emit('pause', false);
  };
  const playVid = () => {
    socket.emit('play', true);
  };

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
      onPlay={playVid}
      onPause={pauseVid}
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
