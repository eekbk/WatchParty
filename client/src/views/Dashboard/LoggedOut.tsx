import { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PartyCard from '../../components/cards/PartyCard';

export function LoggedOut() {
  const [allParties, setAllParties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/party')
      .then((data: any) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tempParties = data.data
          .filter(
            // to get only the today and upcoming parties
            // (a) => Number(new Date(a.start_date)) - Number(new Date()) > 0
            (a) => Number(new Date(a.start_date)) >= Number(today)
          )
          .filter((pt) => !pt.is_private)
          .sort(
            (a, b) =>
              Number(new Date(a.start_date)) - Number(new Date(b.start_date))
          );
        setAllParties(tempParties);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Container>
      {!loading ? (
        <Row style={{ justifyContent: 'center' }}>
          <Col xs={12}>
            <h2
              style={{
                height: '45px',
                textAlign: 'center',
                fontSize: '35px',
              }}
              hidden={!allParties.length}
            >
              Top Parties
            </h2>
          </Col>
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
      ) : (
        <Spinner
          animation="border"
          role="status"
          style={{
            color: '#A663CC',
            position: 'absolute',
            left: '50%',
            top: '50vh',
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
}
