import axios from 'axios';
import { useContext, useEffect } from 'react';
import { FiCircle, FiCheckCircle } from 'react-icons/fi';
import { StyledAttendIcon } from './buttons.styles';
import { UserContext } from '../../context';
import { VoiceContext } from '../../contexts/voiceContext';

function AttendButton({ name, partyId, isAttending, setIsAttending }: any) {
  const { user, setUser } = useContext(UserContext);
  const { attendPartyName, setAttendPartyName, resetTranscript } =
    useContext(VoiceContext);

  useEffect(() => {
    if (
      attendPartyName &&
      attendPartyName.toUpperCase() === name.toUpperCase()
    ) {
      (async () => {
        await updateAttendStatus();
        await setAttendPartyName('');
        resetTranscript();
      })();
    }
  }, [attendPartyName]);

  const updateAttendStatus = async () => {
    try {
      if (!isAttending) {
        await axios.post('/api/party/attend', {
          party_id: partyId,
          user_id: user.id,
        });
        await setIsAttending(true);
      } else {
        await axios.delete('/api/party/role', {
          data: {
            party_id: partyId,
            user_id: user.id,
          },
        });
        await setIsAttending(false);
      }
    } catch (err) {
      console.error('Error message:', err);
    }
    axios
      .get('/api/user')
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        console.error('The error from trying to update the user data:', err);
      });
  };

  const handleClick = () => {
    updateAttendStatus();
  };

  return (
    <StyledAttendIcon>
      {isAttending ? (
        <FiCheckCircle onClick={handleClick} />
      ) : (
        <FiCircle onClick={handleClick} />
      )}
    </StyledAttendIcon>
  );
}

export default AttendButton;
