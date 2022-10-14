import {
  Row, Col, Card, Container,
} from 'react-bootstrap';

function ArchiveParties({ parties }) {
  return (
    <Container>
      <Row>
        {parties.map((party) => (
          <Col>
            <Card>
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
