import { useRef, useEffect, useState } from 'react';
import { DmUser, DmSideBar, DmUserContainer } from '../../styles';

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
    <DmSideBar
      ref={scrolly}
      style={{
        textAlign: 'center',
        overflowY: 'scroll',
        height: '100%',
      }}
    >
      {dms.parties
        ? dms.parties.map((party, user) => (
          <DmUserContainer id={party.party_id} onClick={changeDm}>
            <DmUser
              id={party.party_id}
              roundedCircle
              src={dms.userInfo[user].profile}
              style={{
                  padding: '5px',
                }}
            />
            {dms.userInfo[user].user_name}
          </DmUserContainer>
          ))
        : null}
    </DmSideBar>
  );
}

export default DmBar;
