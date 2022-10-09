// import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserContext } from '../context';

function Home(): JSX.Element {
  // const [index, setIndex] = useState(0);
  const { user, setUser } = useContext(UserContext);
  const [vids, setVids] = useState([]);

  useEffect(() => {
    axios
      .get('/api/user')
      .then((data) => {
        setUser(data.data);
        console.log(data.data, '2nd data....');
      })
      .catch((err) => {
        console.error(err);
      });
    // if (user) {
    axios
      .get('/api/party')
      .then((data: any) => {
        setVids(data.data);
        console.log(data.data, 'party data........');
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };
  return (
    <Container>
      TEEHEEEHE
      {user ? user.user_name : 'not logged in'}
      <Row>
        <Col sm={8}>sm=8</Col>
        <Col sm={4}>sm=4</Col>
      </Row>
      {vids.length ? (
        <Row>
          <Col sm>
            sm=true
            {vids[0].description}
          </Col>
          <Col sm>{vids[1].description}</Col>
          <Col sm>{vids[2].description}</Col>
        </Row>
      ) : null}
    </Container>
  );
}
export default Home;

// <Carousel activeIndex={index} onSelect={handleSelect}>
// <Carousel.Item>
//   <img
//     className="d-block w-100"
//     src="holder.js/800x400?text=First slide&bg=373940"
//     alt="First slide"
//   />
//   <Carousel.Caption>
//     <h3>{vids[0].name}</h3>
//     <p>{vids[0].description}</p>
//   </Carousel.Caption>
// </Carousel.Item>
// <Carousel.Item>
//   <img
//     className="d-block w-100"
//     src="holder.js/800x400?text=Second slide&bg=282c34"
//     alt="Second slide"
//   />

//   <Carousel.Caption>
//     <h3>Second slide label</h3>
//     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//   </Carousel.Caption>
// </Carousel.Item>
// <Carousel.Item>
//   <img
//     className="d-block w-100"
//     src="holder.js/800x400?text=Third slide&bg=20232a"
//     alt="Third slide"
//   />

//   <Carousel.Caption>
//     <h3>Third slide label</h3>
//     <p>
//       Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//     </p>
//   </Carousel.Caption>
// </Carousel.Item>
// </Carousel>
