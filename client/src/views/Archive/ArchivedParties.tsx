import { Row, Col, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ArchiveParties({ parties }) {
  const navigate = useNavigate();

  const handleCardClick = (party) => {
    navigate('/watchParty', {
      state: { party, videos: party.videos, isArchived: true },
    });
  };
  return (
    <Container>
      <Row sm={3} lg={4} md={4}>
        {parties.map((party) => (
          <Col style={{ padding: '5px' }}>
            <Card onClick={() => handleCardClick(party)}>
              <Card.Img variant="top" src={party.thumbnail} />
              <Card.Body>
                <Card.Title>{party.name}</Card.Title>
                <Card.Text>{party.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ArchiveParties;
