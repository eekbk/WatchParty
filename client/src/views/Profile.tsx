// import axios from 'axios';
// import { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

// TODO: Make a profile page
function Dashboard() {
  useEffect(() => {
    axios.get('/test').catch((err) => {
      console.error(err);
    });
  }, []);
  return <Container>Dashboard</Container>;
}

export default Dashboard;
