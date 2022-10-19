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
    if (user) {
      axios
        .get('/api/party')
        .then((data: any) => {
          console.log(allParties, 'allParties...');
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
    }
  }, [user]);
  // parties of people im following
  useEffect(() => {
    if (user) {
      axios
        .get('/api/party')
        .then((data: any) => {
          console.log(parties, 'parties...');

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

  const divStyle = {
    marginLeft: '10px',
    // marginRight: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '10px',
    height: '400px',
  };

  return (
    <Container>
      <Row />
      {user ? (
        <Row>
          {parties && parties.length ? (
            <Col>
              <Row style={{ fontSize: '24px' }} className="text-center">
                <Col>My Upcoming Parties</Col>
              </Row>
              <CardGroup>
                {parties.slice(0, 5).map((party) => (
                  <Card
                    key={party.id}
                    onClick={() => handleCardClick(party)}
                    style={divStyle}
                  >
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
      <Row style={{ fontSize: '24px' }} className="text-center">
        <Col> Top parties</Col>
      </Row>
      {parties && parties.length ? (
        <Row>
          <Col>
            <CardGroup>
              {allParties.slice(0, 5).map((party) => (
                <Card
                  key={party.id}
                  onClick={() => handleCardClick(party)}
                  style={divStyle}
                >
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
