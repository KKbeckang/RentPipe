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
    <main>
      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full ">
        <h1 className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - {listing.type == "rent" ? "Rent":"Sale"} - ${" "}
            {listing.offer
              ? <>{listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<Badge bg="secondary">New</Badge></>
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </h1>
          {listing.imgUrls ? <Slider img={listing.imgUrls}/>: null}
         <br/>
        
          <p className="flex items-center mt-6 mb-3 font-semibold">
            Address: {listing.address}
          </p>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.address)}`} target="_blank">Open in Google maps</a>
          
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
             {/*  <FaBed className="text-lg mr-1" />*/}
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
             {/* <FaBath className="text-lg mr-1" />*/} 
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
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
        </div>
      </div>
    </main>
  );
}