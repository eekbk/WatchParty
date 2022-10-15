import React, { useEffect, useContext, useState } from 'react';
import Button, { Container } from 'react-bootstrap';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Popover from 'react-bootstrap/Popover';
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

  // const popover = (
  //   <Popover id="popover-basic">
  //     <Popover.Header as="h3">Popover right</Popover.Header>
  //     <Popover.Body>
  //       And here's some <strong>amazing</strong> content. It's very engaging.
  //       right?
  //     </Popover.Body>
  //   </Popover>
  // );

  // const Example = () => (
  //   <OverlayTrigger trigger="click" placement="right" overlay={popover}>
  //     <Button variant="success">Click me to see</Button>
  //   </OverlayTrigger>
  // );

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
            <th>watch now</th>
          </tr>
        </thead>
        {parties.map((party) => (
          <tbody>
            <tr>
              <td>{party.date_time.slice(0, 10)}</td>
              <td>{party.name}</td>
              <td>{party.user_name}</td>
              <Button onClick={() => handleCardClick(party)}>watch</Button>
            </tr>
          </tbody>
        ))}
      </Table>
    </Container>
  );
}

export default Calendar;
