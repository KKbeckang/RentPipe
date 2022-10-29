import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
//import AuthService from '../../../services/auth.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const [pageState, setPageState] = useState("Sign in");
  const navigate = useNavigate();
  const auth = getAuth();


	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
		if (user) {
			setPageState("Profile");
		} else {
		  setPageState("Sign in");
		}
	  });
	}, [auth]);


	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-color py-0 ">
			<div className="container-fluid width-change">
				<Link className="navbar-brand hover-change" to="/">
					HOME
				</Link>

				<form className="d-flex">
				
				
						<button
								className="btn btn-outline-success navbar-success button-fix"
								type="button"
								onClick={() => navigate('/offers')} 
							>
								Offers
							</button>
							
					
							
								<button
									className="btn btn-outline-success navbar-success button-fix"
									type="button"
									onClick={() => {pageState === "Sign in" ? navigate('/login'): navigate('/profile')}}
								>
									{pageState}
								</button>
							
						
				</form>
			</div>
		</nav>
	);
}

export default Navbar;
