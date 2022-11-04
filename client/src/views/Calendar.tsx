import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { Container, Col, Row, Tab } from 'react-bootstrap';
import { StyledTabs } from '../styles';
import { UserContext } from '../context';
import CalPartyCard from '../components/cards/CalPartyCard';

// function CalRow({ children }) {
//   return <Row xs={4}>{children}</Row>;
// }

function Calendar() {
  const { user } = useContext(UserContext);
  const [parties, setParties] = useState([]);
  const [allParties, setAllParties] = useState([]);
  const [rows, setRows] = useState(null);
  const [rowsT, setRowsT] = useState(null);

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
    if (user) {
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
              party.users.some(
                (u) => u.id === user.id && u.role === 'CREATOR'
              ) && party.type === 'PARTY'
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
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
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
      <Container>
        <p
          style={{
            height: '45px',
            textAlign: 'center',
            backgroundColor: '#320E3B',
            fontSize: '35px',
          }}
        >
          Calendar
        </p>
      </Container>
      <StyledTabs defaultActiveKey="all parties">
        <Tab eventKey="all parties" title="All Parties">
          <Row style={{ justifyContent: 'center' }}>{rows}</Row>
        </Tab>
        <Tab eventKey="parties" title="My Parties">
          <Row style={{ justifyContent: 'center' }}>{rowsT}</Row>
        </Tab>
      </StyledTabs>
    </Container>
  );
}
export default Calendar;
