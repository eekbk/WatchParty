import { useEffect, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { UserContext } from '../context';

function Dashboard() {
  const { user } = useContext(UserContext);
  const [parties, setParties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/party')
      .then((data: any) => {
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
    navigate('/watchParty', {
      state: { party },
    });
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleCalendarClick = () => {
    navigate('/calendar');
  };
  const handleScrollClick = () => {
    navigate('/scrollDash');
  };

  return (
    <Container>
      <Row>{user ? user.user_name : 'Not logged in'}</Row>
      <Row />
      {user ? (
        <Row>
          <Col sm={8}>
            <Card style={{ width: '14rem' }}>
              <Card.Img variant="top" src={user.profile} />
              <Card.Body>
                <Card.Title>
                  {user.user_name}
                  &apos;s dashboard
                </Card.Title>
                <Card.Text>Trick or Treat</Card.Text>
                <Button variant="primary" onClick={() => handleProfileClick()}>
                  profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col />
          <Col sm={3}>
            <ListGroup
              style={{
							  overflowY: 'scroll',
              }}
            >
              <ListGroup.Item action variant="dark">
                <Col>Upcoming Watch Parties</Col>
                <Col>
                  <Row>
                    <Col>
                    <Button
                    variant="primary"
                    onClick={() => handleCalendarClick()}
                  >
  Calendar
                  </Button>
                  </Col>
                    <Col>
                    <Button
                    variant="primary"
                    onClick={() => handleScrollClick()}
                  >
  profile
                  </Button>
                  </Col>
                  </Row>
                </Col>
              </ListGroup.Item>
              {parties.slice(0, 5).map((party) => (
                <ListGroup.Item
                  action
                  variant="light"
                  onClick={() => handleCardClick(party)}
                  key={party}
                >
                  <Col>{party.date_time.slice(5, 10)}</Col>
                  {' '}
                  {party.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      ) : null}
      <Row> Top Rooms</Row>
      {parties && parties.length ? (
        <Col>
          <CardGroup>
            {parties.slice(0, 5).map((party) => (
              <Card onClick={() => handleCardClick(party)}>
                <Card.Img variant="top" src={party.thumbnail} />
                <Card.Body>
                  <Card.Title>{party.name}</Card.Title>
                  <Card.Text>{party.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Starting on: {party.date_time.slice(0, 10)}
                  </small>
                </Card.Footer>
              </Card>
            ))}
          </CardGroup>
        </Col>
      ) : null}
    </Container>
  );
}

export default Dashboard;
