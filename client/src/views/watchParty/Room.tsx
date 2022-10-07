import { Card } from 'react-bootstrap';

const { default: Video } = require('./Video.tsx');

function WatchParty({ videos }: any) {
  return (
		<Card
  style={{ width: '75%', height: '90vh', borderRadius: '0px 0px 10px 0px' }}
  bg="transparent"
  text="white"
		>
			<Video videos={videos} isAdmin={Math.random() < 0.5} room="test" />
		</Card>
  );
}
export default WatchParty;
