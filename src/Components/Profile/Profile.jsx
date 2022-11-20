import React from 'react'
import { getAuth, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
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
    <div>{currentuser ? `${currentuser}'s Profile`: "Profile" }</div>
    <br/>
    <button type="button" className="btn btn-primary btn-lg">Edit Profile</button>
    <br/>
    <br/>
    <button type="button" className="btn btn-danger btn-lg" onClick={onLogout}>Log Out</button>
    <br/>
    <br/>
    <button type="button" className="btn btn-primary btn-lg" onClick={()=>{navigate("/sellorrentyourhome")}}>Sell or Rent your Home</button>
    <br/>
    <br/> 
    <br/>
    <br/>
    
    {!loading && listings.length > 0 && (
          <>
           
            
           <h2>My Listings</h2>
                <ListingItem
                  data={listings}
                />
  
          </>
        )} 
    
    </div>
  )
}
