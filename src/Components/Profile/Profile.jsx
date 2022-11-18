import React from 'react'
import { getAuth, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
    
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
        setCurrentUser(auth.currentUser.displayName)
      }, [auth.currentUser.uid]);
  
  
    return (
    <div>
    <div>{currentuser ? `${currentuser}'s Profile`: "Profile" }</div>
    <br/>
    <button type="button" class="btn btn-primary btn-lg">Edit Profile</button>
    <br/>
    <br/>
    <button type="button" class="btn btn-danger btn-lg" onClick={onLogout}>Log Out</button>
    <br/>
    <br/>
    <button type="button" class="btn btn-primary btn-lg" onClick={()=>{navigate("/sellorrentyourhome")}}>Sell or Rent your Home</button>

    
    </div>
  )
}
