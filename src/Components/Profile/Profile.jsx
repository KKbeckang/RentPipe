import React from 'react'
import { getAuth, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import ad from "../../Assets/adhouse.jpg"
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
import ListingItem from "../Listingitem/Listingitem.jsx";

export default function Profile() {
    
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
    const [currentuser, setCurrentUser] = useState(null);
    const auth = getAuth();
    const navigate = useNavigate();
    console.log(auth)
    function onLogout() {
        auth.signOut().then(()=>{
        alert("User Signed out")
        navigate("/");
        }).catch(()=>{
        alert("Error with signning out")
        })
        
      }

      
      useEffect(() => {
        async function fetchUserListings() {
          const listingRef = collection(db, "listings");
          const q = query(
            listingRef,
            where("userRef", "==", auth.currentUser.uid),
            orderBy("timestamp", "desc")
          );
          const querySnap = await getDocs(q);
          let listings = [];
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setListings(listings);
          setLoading(false);
        }
        setCurrentUser(auth.currentUser.displayName)
        fetchUserListings();
      }, [auth.currentUser.uid]);

      async function onDelete(listingID) {
        /*if (window.confirm("Are you sure you want to delete?")) {
          await deleteDoc(doc(db, "listings", listingID));
          const updatedListings = listings.filter(
            (listing) => listing.id !== listingID
          );
          setListings(updatedListings);
          toast.success("Successfully deleted the listing");
        }
        */
      }
      function onEdit(listingID) {
        //navigate(`/edit-listing/${listingID}`);
      }
  
    return (
    <div>
      
      <Container ><Row>
      <Col xs={12} sm={12} lg={4}>
      <div className='profileCard'>
      <Card className='card'>
						<div className='profileImage one' />
						<Card.Body>
							<Card.Title>{currentuser ? `${currentuser}'s Profile`: null }</Card.Title>
							
              
						</Card.Body>
            <div className='profileBtnGrp'>
            <button type="button" className="btn btn-primary btn-m">Edit Profile</button>
            <button type="button" className="btn btn-danger btn-m" onClick={onLogout}>Log Out</button>
            </div>
      </Card>
      </div>
      </Col>
      <Col xs={12} sm={12} lg={8}>
      <div className='profileCard'>
      <Card className='card'>
      <div className='adCard bg'>
        <Card.Body className='adBody'>
        <div className='adHeading'>Want To Sell Or Rent A Home?</div>
        <button type="button" className="btn btn-primary btn-lg center" onClick={()=>{navigate("/sellorrentyourhome")}}>Creat Listing</button>
        </Card.Body>
        </div>
      </Card>
      </div>
        </Col></Row></Container>
    
    <br/>
    
    {!loading && listings.length > 0 ? <div className='myListingHeading'>My Listings</div>: null}
    {!loading && listings.length > 0 && (
          <>
                <ListingItem
                  data={listings}
                />
  
          </>
        )} 
    
    </div>
  )
}
