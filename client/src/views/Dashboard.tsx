import { useEffect, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';
// import Carousel from 'react-bootstrap/Carousel';

function Dashboard() {
  // get user data from nodejs and return in react jsl functional component using hooks
  // use axios to get user data from prisma DB and
  // get user data from express.js return to react functional component using hooks?

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
              Number(new Date(b.date_time)) - Number(new Date(a.date_time)),
          ),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const handleCardClick = (party) => {
    axios
      .get(`/api/playlist/${party.playlist_id}`)
      .then((videos) => {
        navigate('/watchParty', {
          state: { party, videos: videos.data },
        });
      })
      .catch((err) => {
        console.error(err);
      });
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
      {parties && parties.length ? (
        <Col>
          <CardGroup>
            {parties.slice(0, 5).map((party) => (
              <Card onClick={() => handleCardClick(party)}>
                <Card.Img variant="top" src={party.playlist.thumbnail} />
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
