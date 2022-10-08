// import axios from 'axios';
// import { useState, useEffect } from 'react';
import { useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserContext } from '../context';

function Dashboard() {
  // get user data from nodejs and return in react jsl functional component using hooks
  // use axios to get user data from prisma DB and
  // get user data from express.js return to react functional component using hooks?

  const { user, setUser } = useContext(UserContext);
  // const [ data1, setData1 ] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:4040/test').then((data) => {
      setUser(data.data);
      console.log(data.data, '2nd data....');
    });
    axios
      .get('http://localhost:4040/api/party/test')
      .then((data) => {
        console.log(data, 'party data........');
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <Container>
      dashboard
      {user ? user.user_name : 'not logged in'}
      <Row>search bar here</Row>
      <Row>
        <Col sm={8}>user info</Col>
        <Col sm={4}>reminders</Col>
      </Row>
      <Row>Top Rooms</Row>
      <Row>
        <Col sm>room</Col>
        <Col sm>room</Col>
        <Col sm>room</Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
