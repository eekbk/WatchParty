import React, { useEffect, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';

function Calendar() {
  const { user } = useContext(UserContext);
  const [parties, setParties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/party')
      .then((data: any) => {
        console.log(data.data, 'party data....');
        setParties(
          data.data.sort(
            (a, b) =>
              Number(new Date(a.date_time)) - Number(new Date(b.date_time)),
          ),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCardClick = (party) => {
    console.log(party);
    navigate('/watchParty', {
      state: { party, videos: party.videos },
    });
  };

  return (
    <Container>
      {user ? user.user_name : 'Not logged in'}
      Calendar text
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Party Name</th>
            <th>created-by</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party) => (
            <tr onClick={() => handleCardClick(party)}>
              <td>{party.date_time.slice(0, 10)}</td>
              <td>{party.name}</td>
              <td>{party.user_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Calendar;
