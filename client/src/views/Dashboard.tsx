import { useEffect, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useNavigate } from 'react-router-dom';
// import ListGroup from 'react-bootstrap/ListGroup';
import { UserContext } from '../context';

function Dashboard() {
  const { user } = useContext(UserContext);
  const [parties, setParties] = useState([]);
  const [allParties, setAllParties] = useState([]);
  const navigate = useNavigate();

  // all parties
  useEffect(() => {
    axios
      .get('/api/party')
      .then((data: any) => {
        setAllParties(
          data.data.sort(
            (a, b) =>
              Number(new Date(a.date_time)) - Number(new Date(b.date_time))
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // parties of people im following
  useEffect(() => {
    if (user) {
      axios
        .get('/api/party')
        .then((data: any) => {
          setParties(
            data.data
              .filter((pt) =>
                pt.users.some((ptU) =>
                  user.following.some(
                    (f) => f === ptU.id && ptU.role === 'CREATOR'
                  )
                )
              )
              .sort(
                (a, b) =>
                  Number(new Date(a.date_time)) - Number(new Date(b.date_time))
              )
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  const handleCardClick = (party) => {
    navigate('/watchParty', {
      state: { party, videos: party.videos },
    });
  };

  return (
    <Container>
      <Row>{user ? user.user_name : 'Not logged in'}</Row>
      <Row />
      {user ? (
        <Row>
          <Row>My upcoming follows party</Row>
          {parties && parties.length ? (
            <Col>
              <CardGroup>
                {parties.slice(0, 5).map((party) => (
                  <Card key={party.id} onClick={() => handleCardClick(party)}>
                    <Card.Img variant="top" src={party.thumbnail} />
                    <Card.Body>
                      <Card.Title>{party.name}</Card.Title>
                      <Card.Text>{party.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Starting on: 
                        {' '}
                        {party.date_time.slice(0, 10)}
                      </small>
                    </Card.Footer>
                  </Card>
                ))}
              </CardGroup>
            </Col>
          ) : null}
        </Row>
      ) : null}
      <Row> Top parties</Row>
      {parties && parties.length ? (
        <Row>
          <Col>
            <CardGroup>
              {allParties.slice(0, 5).map((party) => (
                <Card key={party.id} onClick={() => handleCardClick(party)}>
                  <Card.Img variant="top" src={party.thumbnail} />
                  <Card.Body>
                    <Card.Title>{party.name}</Card.Title>
                    <Card.Text>{party.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Starting on: 
                      {' '}
                      {party.date_time.slice(0, 10)}
                    </small>
                  </Card.Footer>
                </Card>
              ))}
            </CardGroup>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}

export default Dashboard;
