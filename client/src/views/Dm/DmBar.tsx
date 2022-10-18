import { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { StyledScrollableGroup } from '../../styles';

function DmBar({ user, socket, changeDm }) {
  const scrolly = useRef(null);
  const [dms, setDms] = useState({ parties: null, userInfo: null });

  useEffect(() => {
    socket.emit('getDms', user);
    socket.on('getDms', (people) => {
      setDms(people);
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
      {dms.parties
        ? dms.parties.map((party, user) => (
          <Container
            id={party.party_id}
            onClick={changeDm}
            style={{
                padding: '5px',
              }}
          >
            {dms.userInfo[user].user_name}
          </Container>
          ))
        : null}
    </StyledScrollableGroup>
  );
}

export default DmBar;
