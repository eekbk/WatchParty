import { useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { StyledScrollableGroup } from '../../styles';

function DmBar({ user, socket }) {
  const scrolly = useRef(null);

  useEffect(() => {
    socket.emit('getDms', user);
    socket.on('getDms', (people) => {
      console.log(people);
    });
    return () => {
      socket.off('getDms');
    };
  }, []);

  return (
    <StyledScrollableGroup
      ref={scrolly}
      style={{
			  textAlign: 'center',
			  overflowY: 'scroll',
			  backgroundColor: '#5b044b',
			  color: 'white',
			  height: '100%',
      }}
    >
      <Container>NAME HERE</Container>
    </StyledScrollableGroup>
  );
}

export default DmBar;
