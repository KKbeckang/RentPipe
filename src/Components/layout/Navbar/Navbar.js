import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const [isLoggedin, setIsLoggedIn] = useState(false) 
  const [pageState, setPageState] = useState("Sign in");
  const navigate = useNavigate();
  const auth = getAuth();


	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
		if (user) {
			setIsLoggedIn(true)
			setPageState("Account");
		} else {
			setIsLoggedIn(false)
		  setPageState("Sign in");
		}
	  });
	}, [auth]);


	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-color py-0 ">
			<div className="container-fluid width-change">
				
				<Link className="navbar-brand hover-change" to="/">
				<h1>Rentpipe</h1>
				</Link>

				<form className="d-flex">
						{/*
						<button
								className="btn btn-outline-success navbar-success button-fix"
								type="button"
								onClick={() => navigate('/offers')} 
							>
								Offers
							</button>
						 */}

							{/*For a Button that should be displayed only when the user is logged in  */}
						{isLoggedin? <div><button
								className="btn btn-outline-success navbar-success button-fix"
								type="button"
								onClick={() => navigate('/Dashboard')} 
							>
								Dashboard
							</button><button
								className="btn btn-outline-success navbar-success button-fix"
								type="button"
								onClick={() => navigate('/messages')} 
							>
								Messages
							</button></div>: null}
					
							{isLoggedin? <button
								className="btn btn-outline-success navbar-success button-fix"
								type="button"
								onClick={() => navigate('/messenger')} 
							>
								Messages
							</button>: null}

								<button
									className="btn btn-outline-success navbar-success button-fix"
									type="button"
									onClick={() => { isLoggedin?  navigate('/profile'):navigate('/login')}}
								>
									{pageState}
								</button>
							
						
				</form>
			</div>
		</nav>
	);
} 

export default Navbar;
