import { Row, Col, Card } from 'react-bootstrap';
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
    <Row sm={3} lg={4} md={4} xs={1} style={{ justifyContent: 'center' }}>
      {parties.map((party) => {
        const { length } = party.description;
        return (
          <Col
            style={{ padding: '5px', width: 'fit-content' }}
            lg={3}
            md={3}
            sm={4}
            xs={12}
          >
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
                <Card.Text style={{ textAlign: 'left' }}>
                  {length > 89
                    ? `${party.description.slice(0, 89)}...`
                    : party.description}
                </Card.Text>
              </Card.Body>
            </ArchiveGlassCard>
          </Col>
        );
      })}
    </Row>
  );
}

export default ArchiveParties;
