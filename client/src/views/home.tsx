import { Container } from 'react-bootstrap';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home(): JSX.Element {
  return (
		<Container>
			TEEHEEEHE
			{/* {user ? user.user_name : 'not logged in'} */}
			<Row>
				<Col sm={8}>sm=8</Col>
				<Col sm={4}>sm=4</Col>
			</Row>
			<Row>
				<Col sm>sm=true</Col>
				<Col sm>sm=true</Col>
				<Col sm>sm=true</Col>
			</Row>
		</Container>
  );
}
export default Home;
