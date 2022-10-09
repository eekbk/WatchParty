// import axios from 'axios';
// import { useState, useEffect } from 'react';
import { useEffect, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';
// import Carousel from 'react-bootstrap/Carousel';

function Dashboard() {
  // get user data from nodejs and return in react jsl functional component using hooks
  // use axios to get user data from prisma DB and
  // get user data from express.js return to react functional component using hooks?

  const { user, setUser } = useContext(UserContext);
  const [parties, setParties] = useState([]);
  const [dummy, setDummy] = useState([]);
  const [topParties, setTopParties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/user')
      .then((data) => {
        setUser(data.data);
        console.log(data.data, 'user data....');
      })
      .catch((err) => {
        console.error(err);
      });
    // if (user) {
    axios
      .get('/api/party')
      .then((data: any) => {
        setParties(data.data);
        console.log(data.data, 'party data........');
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get('/api/party/test')
      .then((data: any) => {
        setDummy(data.data.items);
        console.log(data.data.items, 'data.data......');
        console.log(
          data.data.items[0].snippet.thumbnails.medium.url,
          'dummy data......',
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  useEffect(() => {
    if (dummy.length > 0) {
      console.log(
        dummy[0].snippet.thumbnails.medium.url,
        '2nd useEffect dummy[0].........',
      );
    }
  }, [dummy]);
  useEffect(() => {
    axios
      .get('/api/party/topParties')
      .then((data: any) => {
        setTopParties(data.data);
        console.log(data.data, 'topParty data........');
        console.log(topParties, 'topParty state data........');
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCardClick = (party) => {
    navigate('/watchParty', { state: { party } });
  };
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Container>
      {user ? user.user_name : ' not logged in'}
      <Row />
      {user ? (
        <Row>
          <Col sm={8}>
            <Card style={{ width: '18rem' }}>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Img variant="top" src={user.profile} />
              <Card.Body>
                <Card.Title>
                  {user.user_name}
                  &apos;s profile info
                </Card.Title>
                <Card.Text>random giberish</Card.Text>
                <Button variant="primary" onClick={() => handleProfileClick()}>
                  profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card style={{ width: '18rem' }} />
          </Col>
        </Row>
      ) : null}
      <Row>Top Rooms</Row>
      {parties.length ? (
        <CardGroup>
          {topParties.map((party) => (
            <Card onClick={() => handleCardClick(party)}>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>{party.name}</Card.Title>
                <Card.Text>{party.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          ))}
        </CardGroup>
      ) : null}
    </Container>
  );
}

export default Dashboard;
