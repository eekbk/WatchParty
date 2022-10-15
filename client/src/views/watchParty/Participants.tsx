import { ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { StyledButton } from '../../styles';
import { StyledListGroup } from './styles';

const { Item } = ListGroup;

export function Participants({
  participants, setParticipants, room, status,
}) {
  const [show, setShow] = useState(false);

  const changeRole = (i) => {
    const tempParticipants = participants.slice();
    tempParticipants[i].role =			tempParticipants[i].role === 'ADMIN' ? 'NORMIE' : 'ADMIN';
    axios
      .post('/api/party/role', {
        user_id: participants[i].id,
        party_id: room.id,
        role: tempParticipants[i].role,
      })
      .catch((err) => {
        console.error(err);
      });
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
      <Item
        style={{
				  display: 'flex',
				  justifyContent: 'space-between',
        }}
      >
        <h5 style={{ alignSelf: 'center' }}>Participants</h5>
        <StyledButton onClick={() => setShow(!show)}>
          {show ? 'Close' : 'Open'}
        </StyledButton>
      </Item>
      {participants.map((pt, i) =>
			  (pt.role !== 'CREATOR' ? (
  <Item
    style={{
						  display: 'flex',
						  justifyContent: 'space-between',
    }}
    hidden={!show}
  >
    {pt.username}
    :
    {' '}
    <StyledButton onClick={() => changeRole(i)}>
      Change to
      {' '}
      {pt.role === 'ADMIN' ? 'NORMIE' : 'ADMIN'}
    </StyledButton>
  </Item>
			  ) : null))}
    </StyledListGroup>
  );
}
