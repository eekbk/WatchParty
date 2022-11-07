import { useEffect, useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PartyCard from '../components/cards/PartyCard';
import { UserContext } from '../context';

function Dashboard() {
  const { user } = useContext(UserContext);
  const [parties, setParties] = useState([]);
  const [allParties, setAllParties] = useState([]);

  // all parties
  useEffect(() => {
    axios
      .get('/api/party')
      .then((data: any) => {
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
  }, []);
  // parties of people im following
  useEffect(() => {
    if (user) {
      axios
        .get('/api/party')
        .then((data: any) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
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
      {parties && parties.length && allParties && allParties.length ? (
        <Container>
          <Container>
            <p
              style={{
                height: '40px',
                textAlign: 'center',
                backgroundColor: '#320E3B',
                fontSize: '30px',
              }}
            >
              My Upcoming Parties
            </p>
          </Container>
          <Row style={{ justifyContent: 'center' }}>
            {user.parties
              .filter(
                // to get only the today and upcoming parties
                (a) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return (
                    Number(new Date(a.date_time)) >= Number(today) &&
                    a.type === 'PARTY'
                  );
                }
              )
              .sort(
                (a, b) =>
                  Number(new Date(a.date_time)) - Number(new Date(b.date_time))
              )
              .slice(0, 4)
              .map((party) => (
                <Col
                  xs={12}
                  sm={12}
                  md={4}
                  lg={3}
                  xl={3}
                  style={{
                    padding: '10px',
                    paddingTop: '24px',
                    width: 'fit-content',
                  }}
                  key={party.id}
                >
                  <PartyCard party={party} />
                </Col>
              ))}
          </Row>
          <Container>
            <p
              style={{
                height: '40px',
                textAlign: 'center',
                backgroundColor: '#320E3B',
                fontSize: '30px',
              }}
            >
              Top Parties
            </p>
          </Container>
          <Row style={{ justifyContent: 'center' }}>
            {allParties.slice(0, 4).map((party) => (
              <Col
                key={party.id}
                xs={12}
                sm={12}
                md={4}
                lg={3}
                xl={3}
                style={{
                  padding: '10px',
                  paddingTop: '24px',
                  width: 'fit-content',
                }}
              >
                <PartyCard party={party} />
              </Col>
            ))}
          </Row>
        </Container>
      ) : null}
    </Container>
  );
}

export default Dashboard;
