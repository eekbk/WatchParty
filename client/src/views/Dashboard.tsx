import { useEffect, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
// import DashboardPartyCard from '../cards/DashboardPartyCard';
import PartyCard from '../cards/PartyCard';
// import { useNavigate } from 'react-router-dom';
// import ListGroup from 'react-bootstrap/ListGroup';
import { UserContext } from '../context';

function Dashboard() {
  const { user } = useContext(UserContext);
  const [parties, setParties] = useState([]);
  const [allParties, setAllParties] = useState([]);
  // const [userParties, setUserParties] = useState([]);
  // const navigate = useNavigate();

  // all parties
  useEffect(() => {
    axios
      .get('/api/party')
      .then((data: any) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log(data.data, 'data.data...');
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
  }, []);
  // parties of people im following
  useEffect(() => {
    if (user) {
      axios
        .get('/api/party')
        .then((data: any) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          console.log(user, 'user...');
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

  return (
    <Container>
      {user ? (
        <Row>
          {parties && parties.length ? (
            <Col>
              <Row
                style={{ fontSize: '24px', padding: '10px', color: 'white' }}
                className="text-center"
              >
                <Col>My Upcoming Parties</Col>
              </Row>
              <Row style={{ justifyContent: 'center' }}>
                {user.parties
                  .sort(
                    (a, b) =>
                      Number(new Date(a.date_time)) -
                      Number(new Date(b.date_time))
                  )
                  .filter(
                    // to get only the today and upcoming parties
                    (a) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return Number(new Date(a.date_time)) >= Number(today);
                    }
                  )
                  .slice(0, 4)
                  .map((party) => (
                    <Col style={{ borderRadius: '1px' }} key={party.id}>
                      <PartyCard party={party} />
                    </Col>
                  ))}
              </Row>
            </Col>
          ) : null}
        </Row>
      ) : null}
      <Row
        style={{ fontSize: '24px', padding: '10px', color: 'white' }}
        className="text-center"
      >
        <Col> Top parties</Col>
      </Row>
      <Row>
        {allParties && allParties.length ? (
          <Col>
            <Row>
              {allParties.slice(0, 4).map((party) => (
                <Col key={party.id}>
                  <PartyCard party={party} />
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
