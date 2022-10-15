import {
  Row, Col, Card, Container,
} from 'react-bootstrap';
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
      <Row>
        {parties.map((party) => (
          <Col>
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
