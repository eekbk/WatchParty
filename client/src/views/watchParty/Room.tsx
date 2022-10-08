import {
  Card, Container, Row, Col,
} from 'react-bootstrap';

const { default: Video } = require('./Video.tsx');
const { default: Chat } = require('./Chat.tsx');

function WatchParty({ videos, user, room }: any) {
  return (
		<Container
  style={{
			  width: '100%',
			  height: '90vh',
			  marginLeft: '0px',
			  maxWidth: '100%',
  }}
		>
			<Row>
				<Col xs={14} md={9}>
					<Card
  style={{
						  width: '100%',
						  height: '90vh',
						  borderRadius: '0px 0px 10px 0px',
  }}
  bg="transparent"
  text="white"
					>
						<Video
  videos={videos}
  isAdmin={Math.random() < 0.5}
  room={room || 'test'}
						/>
					</Card>
				</Col>
				<Col xs={5} md={3}>
					<Chat user={user} room={room || 'test'} />
				</Col>
			</Row>
		</Container>
  );
}
export default WatchParty;
