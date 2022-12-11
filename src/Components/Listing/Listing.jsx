import { doc, getDoc } from "firebase/firestore";
import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../Loading";
import { db } from "../../firebase";
import Slider from "./slider";
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import { getAuth } from "firebase/auth";
import useUser from '../../hooks/useUser';
import timeAgo from 'epoch-timeago';
import bed from "../../Assets/bed.png"
import bathroom from "../../Assets/bathroom.png"
import Image from 'react-bootstrap/Image'
import Card from "react-bootstrap/Card"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import rent from "../../Assets/rent.png"
import sale from "../../Assets/sale.png"

export default function Listing() {
  const {user,isLoading} = useUser()
  const navigate = useNavigate()
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);
  if (loading) {
    return <Spinner />;
  }



  return (
    
      <Card className="cardListing">
        <div>
        <h1>
            {listing.name} - {listing.type == "rent" ? "Rent":"Sale"} - ${" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
            {listing.offer ? <Badge pill bg="success">Reduced Price</Badge>:null}
          </h1>
          {listing.imgUrls ? <Slider img={listing.imgUrls}/>: null}
         <br/>
        
         
         
          <Container>
          <Row>
            <Col><p className="address">
            Address: {listing.address}
            
          </p></Col>
            <Col><a className="address" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.address)}`} target="_blank">Open in Google maps</a></Col>
          </Row>
          <Row>
            <Col>
            <div>
            <p>
              {listing.type === "rent" ? <Image className="salerent" src={rent} /> : <Image className="salerent" src={sale} />}
            </p>
    
              <div>
                {listing.offer ? <p>Price: <del>{listing.regularPrice}$</del> {listing.discountedPrice}$ <Badge pill bg="success">Reduced Price</Badge></p>: <p>Price: {listing.regularPrice}$</p>}
              </div>
       
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
            </Col>
            <Col>
            <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
             {/*  <FaBed className="text-lg mr-1" />*/}
              {+listing.bedrooms > 1 ? <>{listing.bedrooms} Beds<Image className="thimbnailImg" src={bed} />  </>: "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
             {/* <FaBath className="text-lg mr-1" />*/} 
              {+listing.bathrooms > 1 ? <>{listing.bathrooms} Baths<Image className="thimbnailImg" src={bathroom} /></>: "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
             {/*  <FaParking className="text-lg mr-1" />*/}
              {listing.parking ? "Parking spot Available" : "No parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
             {/*  <FaChair className="text-lg mr-1" /> */}
              {listing.furnished ? "Furnished" : "Not furnished"}
            </li>
          </ul>
            </Col>
          </Row>

          </Container>
          {user ? <div className="contactOwner" >{listing.userRef !== auth.currentUser?.uid && (
            <div className="mt-6">
              <Button variant="success"
                onClick={() => {navigate("/messenger")}}
              >
                Contact Landlord
              </Button>
              
            </div>
          )}</div>: <div className="contactOwner"><Button onClick={()=>{navigate("/login")}}>Login to get in touch</Button></div>}
          
          <hr/>
              <p className="ptag">posted {timeAgo(listing.timestamp.seconds * 1000)}</p>
        </div>
      </Card>
    
  );
}