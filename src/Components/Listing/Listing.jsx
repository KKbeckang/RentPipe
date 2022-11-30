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

  const timestamp = (seconds)=>{
    seconds = parseInt(seconds)
    let day = (seconds / (24 * 3600))
    let month = day/30
    let hour = ((seconds % (24 * 3600)) / 3600 )
    let min = ((seconds % (24 * 3600 * 3600)) / 60 )
    
    
    if(month >=1)return month.toString()
    else if(day >= 1) return day.toString()
    else if(hour >=1) return hour.toString()
    else return min.toString()

  }

  return (
    <main>
      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
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
            {listing.offer ? <Badge pill bg="success">Discounted Price</Badge>:null}
          </h1>
          {listing.imgUrls ? <Slider img={listing.imgUrls}/>: null}
         <br/>
        
          <p>
            Address: {listing.address}
          </p>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.address)}`} target="_blank">Open in Google maps</a>
          
          <div>
            <p>
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
    
              <div>
                {listing.offer ? <p>Price: <del>{listing.regularPrice}$</del> {listing.discountedPrice}$ <Badge pill bg="success">Discount</Badge></p>: <p>Price: {listing.regularPrice}$</p>}
              </div>
       
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
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
          {user ? <div>{listing.userRef !== auth.currentUser?.uid && (
            <div className="mt-6">
              <Button
                onClick={() => {navigate("/messenger")}}
              >
                Contact Landlord
              </Button>
              
            </div>
          )}</div>: <Button onClick={()=>{navigate("/login")}}>Login to get in touch</Button>}
          <hr/>
              <p className="ptag">posted {timeAgo(listing.timestamp.seconds * 1000)}</p>
        </div>
      </div>
    </main>
  );
}