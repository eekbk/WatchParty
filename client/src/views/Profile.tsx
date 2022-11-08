// import axios from 'axios';
// import { useState, useEffect } from 'react';
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
// import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { Container, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';

// TODO: Make a profile page
function Profile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [parties, setParties] = useState([]);
  // const [allParties, setAllParties] = useState([]);

  useEffect(() => {
    axios
      .get('/api/party')
      .then((data: any) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // setAllParties();
        // setAllParties(data.data)
        setParties(
          data.data
            // .filter((pt) =>
            //   pt.users.some((ptU) =>
            //     user.following.some(
            //       (f) => f === ptU.id && ptU.role === 'CREATOR'
            //     )
            //   )
            // )
            .sort(
              (a, b) =>
                Number(new Date(a.start_date)) - Number(new Date(b.start_date))
            )
            .filter(
              // to get only the today and upcoming parties
              // (a) => Number(new Date(a.start_date)) - Number(new Date()) > 0
              (a) => Number(new Date(a.start_date)) >= Number(today)
            )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCardClick = (party) => {
    // console.log(party);
    navigate('/watchParty', {
      state: { party, videos: party.videos },
    });
  };

  return (
    <Container>
      {parties && parties.length ? (
        <>
          <Row>
            {/* my parties
    {parties.map((p, idx) => (    
      <ListGroup key={p.id} >
        <ListGroup.Item>{p.start_date.slice(5, 10)}  {p.name}</ListGroup.Item>
      </ListGroup>
    ))} */}
          </Row>
          {user ? (
            <>
              <Row>
                {user.user_name}
                <Table striped bordered hover variant="dark" responsive="sm">
                  My Parties
                  <thead>
                    <tr>
                      <th>Party Now</th>
                      <th>Date</th>
                      <th>Party Name</th>
                      {/* <th>created-by</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {user.parties.map((party) => (
                      <tr key={party.id} onClick={() => handleCardClick(party)}>
                        <td>
                          <Button
                            variant="secondary"
                            onClick={() => handleCardClick(party)}
                            size="sm"
                          >
                            Watch
                          </Button>
                        </td>
                        <td>
                          *
                          {party.start_date.slice(5, 10)}
                        </td>
                        <td>{party.name}</td>
                        {/* <td>
                    {
                      party.users.filter(
                        (u) =>
                          // console.log('changed text is true');
                          u.role === 'CREATOR'
                      )[0].username
                    }
                  </td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
              <Row>
                <Table striped bordered hover variant="dark" responsive="sm">
                  <thead>
                    <tr>
                      {/* <th>Party Now</th> */}
                      <th>Date</th>
                      <th>Party Name</th>
                      {/* <th>created-by</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {user.parties.map((party) => (
                      <tr key={party.id} onClick={() => handleCardClick(party)}>
                        {/* <td>
                    <Button
                      variant="secondary"
                      onClick={() => handleCardClick(party)}
                      size="sm"
                    >
                      Watch
                    </Button>
                  </td> */}
                        <td>
                          *
                          {party.start_date.slice(5, 10)}
                        </td>
                        <td>{party.name}</td>
                        {/* <td>
                    {
                      party.users.filter(
                        (u) =>
                          // console.log('changed text is true');
                          u.role === 'CREATOR'
                      )[0].username
                    }
                  </td> */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            </>
          ) : null}
        </>
      ) : null}
    </Container>
  );
}

export default Profile;
