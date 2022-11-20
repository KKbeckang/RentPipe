//import Moment from "react-moment";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where,
  } from "firebase/firestore";
  import { db } from "../../firebase";
  

  const Listingitem = (props) => {
  return (
    <Row xs={1} sm={2}  lg={4} className="g-4">
      {props.data.map((listing) => (
        <Col key={listing.id}>
          <Card >
            <Card.Img variant="top" src={`${listing.data.imgUrls[0]}`} />
            <Card.Body>
              <Card.Title>{listing.data.name}</Card.Title>
              <Card.Subtitle>
                {`${listing.data.regularPrice}$`}
              </Card.Subtitle>
              <Card.Text>
                {listing.data.type == "rent"? "Rent":"Sale"}
              </Card.Text>
              <Card.Text>
                {`${listing.data.address}`}
              </Card.Text>
              <Card.Link href={`/listing/${listing.id}`}> Contact Listing</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Listingitem;