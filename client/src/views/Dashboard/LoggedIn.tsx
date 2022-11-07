import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { Container, Col, Row, Tab, Spinner } from 'react-bootstrap';
import { StyledTabs } from '../../styles';
import { UserContext } from '../../context';
import CalPartyCard from '../../components/cards/CalPartyCard';

// function CalRow({ children }) {
//   return <Row xs={4}>{children}</Row>;
// }

export function LoggedIn() {
  const { user } = useContext(UserContext);
  const [parties, setParties] = useState([]);
  const [allParties, setAllParties] = useState([]);
  const [rows, setRows] = useState(null);
  const [rowsT, setRowsT] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tempRows = [];
    for (let i = 0; i < allParties.length / 4; i++) {
      tempRows[i] = [];
    }
    allParties.forEach((pt, i) => {
      tempRows[Math.floor(i / 4)].push(
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
        >
          <CalPartyCard party={pt} />
        </Col>
      );
    });
    // tempRows = tempRows.map((r) => <Row xs={12} sm={12} md={4} lg={3} xl={3}>{r}</Row>);
    setRows(tempRows);
  }, [allParties]);

  useEffect(() => {
    const tempRows = [];
    for (let i = 0; i < parties.length / 4; i++) {
      tempRows[i] = [];
    }
    parties.forEach((pt, i) => {
      tempRows[Math.floor(i / 4)].push(
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
        >
          <CalPartyCard party={pt} />
        </Col>
      );
    });
    // tempRows = tempRows.map((r) => <Row xs={12} sm={12} md={4} lg={3} xl={3}>{r}</Row>);
    setRowsT(tempRows);
  }, [parties]);

  useEffect(() => {
    axios
      .get('/api/party')
      .then((data: any) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tempArr = data.data // all parties
          .filter((party) =>
            party.users.some((partyU) =>
              user.following.some(
                (f) => f === partyU.id && partyU.role === 'CREATOR'
                // userParty id && user party role is the creator or the users party
              )
            )
          );
        const tempUserArr = user.parties.filter(
          (party) =>
            party.users.some((u) => u.id === user.id && u.role === 'CREATOR') &&
            party.type === 'PARTY'
        );
        setParties(
          [...tempArr, ...tempUserArr]
            .sort(
              (a, b) =>
                Number(new Date(a.date_time)) - Number(new Date(b.date_time))
            )
            .filter(
              // to get only the today and upcoming parties
              (a) => Number(new Date(a.date_time)) >= Number(today)
            )
        );
        setAllParties(
          data.data
            .sort(
              (a, b) =>
                Number(new Date(a.date_time)) - Number(new Date(b.date_time))
            )
            .filter(
              // to get only the today and upcoming parties
              (a) => Number(new Date(a.date_time)) >= Number(today)
            )
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Container>
      <Row>
        <h1
          style={{
            height: '45px',
            textAlign: 'center',
            fontSize: '35px',
          }}
        >
          Dashboard
        </h1>
      </Row>
      <Row>
        <StyledTabs defaultActiveKey="all parties">
          <Tab eventKey="all parties" title="All Parties">
            {!loading ? (
              <Row
                style={{
                  justifyContent: 'center',
                  maxHeight: 'max(65vh, 23rem)',
                  overflowY: 'scroll',
                }}
              >
                {rows}
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
          </Tab>
          <Tab eventKey="parties" title="My Parties">
            {!loading ? (
              <Row
                style={{
                  justifyContent: 'center',
                  maxHeight: 'max(65vh, 23rem)',
                  overflowY: 'scroll',
                }}
              >
                {rowsT}
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
          </Tab>
        </StyledTabs>
      </Row>
    </Container>
  );
}
