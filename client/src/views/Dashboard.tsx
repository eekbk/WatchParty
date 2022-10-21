import { useEffect, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
import DashboardPartyCard from '../cards/DashboardPartyCard';
// import { useNavigate } from 'react-router-dom';
// import ListGroup from 'react-bootstrap/ListGroup';
import { UserContext } from '../context';

function Dashboard() {
  const { user } = useContext(UserContext);
  const [parties, setParties] = useState([]);
  const [allParties, setAllParties] = useState([]);
  // const navigate = useNavigate();

  // all parties
  useEffect(() => {
    if (user) {
      axios
        .get('/api/party')
        .then((data: any) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          console.log(data.data, 'allParties...');
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
  }, [user]);
  // parties of people im following
  useEffect(() => {
    if (user) {
      axios
        .get('/api/party')
        .then((data: any) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          console.log(data.data, 'parties...');
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
  }, [user]);

  // const handleCardClick = (party) => {
  //   navigate('/watchParty', {
  //     state: { party, videos: party.videos },
  //   });
  // };

  // const divStyle = {
  //   marginLeft: '10px',
  //   marginRight: '10px',
  //   marginTop: '10px',
  //   marginBottom: '10px',
  //   padding: '10px',
  //   height: '400px',
  // };

  return (
    <Container>
      <Row />
      {user ? (
        <Row>
          {parties && parties.length ? (
            <Col>
              <Row
                style={{ fontSize: '24px', padding: '10px' }}
                className="text-center"
              >
                <Col>My Upcoming Parties</Col>
              </Row>
              <Row >
                {parties.slice(0, 4).map((party) => (
                  <Col>
                    <DashboardPartyCard party={party} key={party.id} />
                  </Col>
                ))}
              </Row>
            </Col>
          ) : null}
        </Row>
      ) : null}
      <Row
        style={{ fontSize: '24px', padding: '10px' }}
        className="text-center"
      >
        <Col> Top parties</Col>
      </Row>
      <Row>
        {parties && parties.length ? (
          <Col>
            <Row>
              {allParties.slice(0, 4).map((party) => (
                <Col>
                  <DashboardPartyCard party={party} key={party.id} />
                </Col>
              ))}
            </Row>
          </Col>
        ) : null}
      </Row>
    </Container>
  );
}

export default Dashboard;
