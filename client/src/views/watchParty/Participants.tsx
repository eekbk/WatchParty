import { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { StyledButton } from '../../styles';
import { StyledListGroup, StyledListItem } from './styles';

const { Check } = Form;

export function Participants({ participants, setParticipants, room, status }) {
  const [show, setShow] = useState(false);

  const changeRole = (i) => {
    const tempParticipants = participants.slice();
    if (room.is_private) {
      tempParticipants[i].role =
        tempParticipants[i].role === 'ADMIN' ? 'NORMIE' : 'ADMIN';
      setParticipants(tempParticipants);
      axios
        .post('/api/party/role', {
          user_id: participants[i].id,
          party_id: room.id,
          role: tempParticipants[i].role,
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .delete('/api/party/role', {
          data: {
            user_id: participants[i].id,
            party_id: room.id,
          },
        })
        .catch((err) => console.error(err));
      tempParticipants.splice(i, 1);
      setParticipants(tempParticipants);
    }
  };

  return (
    <StyledListGroup
      id="dropdown-basic-button"
      title="Participants"
      style={{
        overflowY: 'scroll',
      }}
      hidden={!status}
    >
      <StyledListItem
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <h5 style={{ alignSelf: 'center' }}>Participants</h5>
        <StyledButton
          onClick={() => setShow(!show)}
          style={{ marginLeft: '10px', marginRight: '10px' }}
          variant="outline-dark"
        >
          {show ? 'Close' : 'Open'}
        </StyledButton>
      </StyledListItem>
      {participants.map((pt, i) =>
        pt.role !== 'CREATOR' ? (
          <StyledListItem
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            hidden={!show}
          >
            {pt.username}
            :
            {' '}
            <Check
              type="switch"
              label="Admin"
              onChange={() => changeRole(i)}
              checked={pt.role === 'ADMIN'}
            />
          </StyledListItem>
        ) : null
      )}
    </StyledListGroup>
  );
}
