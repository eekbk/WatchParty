// import axios from 'axios';
// import { useState, useEffect } from 'react';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

function Profile() {

  useEffect(() => {
    axios.get('http://localhost:4040/test')
    .then((data) => console.log(data, 'data axios.......'))
    .catch((err) => {
      console.error(err)
    })
  }, [])
  return (
    <Container>Profile</Container>
  )
}

export default Profile

 