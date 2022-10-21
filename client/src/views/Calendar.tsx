import React, { useEffect, useContext, useState } from 'react';
import { Container, Card, Button, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';

function Calendar() {
  const { user } = useContext(UserContext);
  const [parties, setParties] = useState([]);
  const [allParties, setAllParties] = useState([]);
  const [changeText, setChangeText] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get('/api/party')
        .then((data: any) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          setParties(
            data.data // all parties
              .filter(
                (
                  pt // party
                ) =>
                  pt.users.some(
                    (
                      ptU // user parties
                    ) =>
                      user.following.some(
                        (f) => f === ptU.id && ptU.role === 'CREATOR'
                        // userParty id && user party role is the creator or the users party
                      )
                  )
              )
              .sort(
                (a, b) =>
                  Number(new Date(a.date_time)) - Number(new Date(b.date_time))
              )
              .filter(
                // to get only the today and upcoming parties
                // (a) => Number(new Date(a.date_time)) - Number(new Date()) > 0
                (a) => Number(new Date(a.date_time)) >= Number(today)
              )
          );
        })
        .then(() => {
          console.log(parties, 'parties...');
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, changeText]);

  useEffect(() => {
    if (user) {
      axios
        .get('/api/party')
        .then((data: any) => {
          console.log(allParties, 'allParties....');
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          setAllParties(
            data.data
              .sort(
                (a, b) =>
                  Number(new Date(a.date_time)) - Number(new Date(b.date_time))
              )
              .filter(
                // to get only the today and upcoming parties
                // (a) => Number(new Date(a.date_time)) - Number(new Date()) > 0
                (a) => Number(new Date(a.date_time)) >= Number(today)
              )
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, changeText]);

  const handleChange = () => {
    console.log(changeText);
    return setChangeText(!changeText);
  };

  const handleCardClick = (party) => {
    console.log(party);
    navigate('/watchParty', {
      state: { party, videos: party.videos },
    });
  };

  return (
    <Container>
      {changeText ? (
        <Card border="danger" bg="warning">
          <Card.Header style={{ fontSize: '24px' }} className="text-center">
            <Col>
              {user ? null : null}
              Calendar
            </Col>
            <Col>
              <Button onClick={() => handleChange()}>See All Parties</Button>
            </Col>
          </Card.Header>
          <Table striped bordered hover variant="dark" responsive="sm">
            <thead>
              <tr>
                <th>Party Now</th>
                <th>Date</th>
                <th>Party Name</th>
                <th>created-by</th>
              </tr>
            </thead>
            <tbody>
              {parties.map((party) => (
                <tr key={party.id} onClick={() => handleCardClick(party)}>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => handleCardClick(party)}
                      size="sm"
                    >
                      Watch
                    </Button>
                  </td>
                  <td>
                    *
                    {party.date_time.slice(5, 10)}
                  </td>
                  <td>{party.name}</td>
                  <td>
                    {
                      party.users.filter((u) => {
                        console.log('changed text is true');
                        return u.role === 'CREATOR';
                      })[0].username
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      ) : (
        <Card border="danger" bg="warning">
          <Card.Header style={{ fontSize: '24px' }} className="text-center">
            <Col>
              {user ? null : null}
              Calendar
            </Col>
            <Col>
              <Button onClick={() => handleChange()}>
                See Friends Parties
              </Button>
            </Col>
          </Card.Header>
          <Table striped bordered hover variant="dark" responsive="sm">
            <thead>
              <tr>
                <th>Party Now</th>
                <th>Date</th>
                <th>Party Name</th>
                <th>created-by</th>
              </tr>
            </thead>
            <tbody>
              {allParties.map((party) => (
                <tr key={party.id} onClick={() => handleCardClick(party)}>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => handleCardClick(party)}
                      size="sm"
                    >
                      Watch
                    </Button>
                  </td>
                  <td>
                    *
                    {party.date_time.slice(5, 10)}
                  </td>
                  <td>{party.name}</td>
                  <td>
                    {
                      party.users.filter((u) => {
                        console.log('changed text is false');
                        return u.role === 'CREATOR';
                      })[0].username
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
    </Container>
  );
}

export default Calendar;
