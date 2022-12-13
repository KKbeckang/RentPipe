import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Badge from "react-bootstrap/esm/Badge";

function Navbar() {
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [pageState, setPageState] = useState("Sign in");
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setPageState("Account");
      } else {
        setIsLoggedIn(false);
        setPageState("Sign in");
      }
    });
  }, [auth]);

  return (
    <nav>

        <Link className="" to="/">
		<a href="https://ibb.co/PYSgMhH"><img src="https://i.ibb.co/wLv47Wm/Rent-Pipe-logos-white-adobe-express.png" alt="Rent-Pipe-logos-white-adobe-express" border="0" height="75px"/></a>

        </Link>
		<div>
		<ul id="navbar">
			<li><a className="" to="/" href="/">Home</a></li>
			<li><a className="" to="/category/rent" href="/category/rent">Rent</a></li>
			<li><a className="" to="/category/sale" href="/category/sale">Sale</a></li>
			{isLoggedin? <li><a href='javascript:void(0)' onClick={() => navigate('/messenger')} >Messages {isLoggedin? <Badge  bg="danger">2</Badge>:null}</a></li>:null}
			<li><a href='javascript:void(0)' onClick={() => { isLoggedin?  navigate('/profile'):navigate('/login')}} >{pageState}</a></li>
		</ul>
		</div>
    </nav>
  );
}

export default Navbar;
