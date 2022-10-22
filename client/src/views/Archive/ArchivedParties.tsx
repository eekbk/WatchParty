import { Row, Col, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ArchiveGlassCard } from '../../styles';

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
        {parties.map((party) => {
          const { length } = party.description;
          return (
            <Col style={{ padding: '5px' }}>
              <ArchiveGlassCard onClick={() => handleCardClick(party)}>
                <Card.Img
                  variant="top"
                  src={party.thumbnail}
                  style={{
                    borderRadius: '12px 12px 0px 0px',
                  }}
                />
                <Card.Body>
                  <Card.Title>{party.name}</Card.Title>
                  <Card.Text>
                    {length > 35
                      ? `${party.description.slice(0, 67)}...`
                      : party.description}
                  </Card.Text>
                </Card.Body>
              </ArchiveGlassCard>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default ArchiveParties;
