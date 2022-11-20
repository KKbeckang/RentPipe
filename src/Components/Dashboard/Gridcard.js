import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function GridExample() {
  return (
    <Row xs={1} sm={2}  lg={4} className="g-4">
      {Array.from({ length: 5}).map((_, idx) => (
        <Col>
          <Card>
            <Card.Img variant="top" src="https://i.ibb.co/M2j04ft/1126773.jpg" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <button> Contact Logo</button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default GridExample;
