import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

const { default: ArchivedParties } = require('./ArchivedParties.tsx');

function Archive() {
  const [parties, setParties] = useState(() => []);
  useEffect(() => {
    const config = {
      method: 'get',
      url: '/api/party/archive',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then((response) => {
        setParties(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Container style={{ textAlign: 'center' }}>
      <h1
        style={{
          height: '45px',
          fontSize: '35px',
        }}
      >
        Personal Archives
      </h1>
      <h2
        style={{
          height: '35px',
          fontSize: '25px',
        }}
      >
        click on card below to see party
      </h2>
      <ArchivedParties parties={parties} />
    </Container>
  );
}

export default Archive;
