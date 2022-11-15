import { useRef, useEffect, useState } from 'react';
import { DmUser, DmSideBar, DmUserContainer } from '../../styles';

function DmBar({ user, socket, changeDm, selected }) {
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
  }, [user]);

  return (
    <DmSideBar
      ref={scrolly}
      style={{
        textAlign: 'center',
        overflowY: 'auto',
        height: '100%',
        maxHeight: 'calc(70vh + 65px)',
      }}
    >
      {dms.parties
        ? dms.parties.map((party, user) =>
            selected !== user ? (
              <DmUserContainer
                id={party.party_id}
                onClick={(e) => changeDm(e, user)}
              >
                {dms.userInfo[user].user_name}
                <DmUser
                  id={party.party_id}
                  roundedCircle
                  src={dms.userInfo[user].profile}
                  style={{
                    padding: '5px',
                  }}
                />
              </DmUserContainer>
            ) : (
              <DmUserContainer
                id={party.party_id}
                onClick={(e) => changeDm(e, user)}
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#8a25e2',
                }}
              >
                {dms.userInfo[user].user_name}
                <DmUser
                  id={party.party_id}
                  roundedCircle
                  src={dms.userInfo[user].profile}
                  style={{
                    padding: '5px',
                  }}
                />
              </DmUserContainer>
            )
          )
        : null}
    </DmSideBar>
  );
}

export default DmBar;
