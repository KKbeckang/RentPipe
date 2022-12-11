import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Badge from "react-bootstrap/Badge"
import '../Style/style.css';
const Listingitem = (props) => {
	return (
		<Row xs={1} sm={2} lg={4} className="g-4">
			{props.data.map((listing) => (
				<Col key={listing.id}>
					<Card>
						<Link to={`/${listing.data.type}/${listing.id}`}>
						<Card.Img variant="top" src={`${listing.data.imgUrls[0]}`} />
						</Link>
						<Card.Body>
							<Card.Title>{listing.data.name}{listing.data.offer ? <Badge pill bg="success">Reduced Price</Badge>:null}</Card.Title>
							<Card.Subtitle>{`${listing.data.regularPrice}$`}</Card.Subtitle>
							<Card.Text>
								{listing.data.type == 'rent' ? 'Rent' : 'Sale'}
							</Card.Text>
							<Card.Text>{`${listing.data.address}`}</Card.Text>
							<Card.Link href={`/${listing.data.type}/${listing.id}`}>
								{' '}
								Contact Listing
							</Card.Link>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default Listingitem;
