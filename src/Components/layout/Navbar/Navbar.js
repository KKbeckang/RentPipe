import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import AuthService from '../../../services/auth.service';

function Navbar(props) {
	let navigate = useNavigate();
	const redirectRoute = (path) => {
		navigate(path);
	};

	const [content, setContent] = useState('');
	const [accessToken, setAccessToken] = useState('');
	//checks local storage and gets information about the user
	//if no Token shows Signin and sign up button
	useEffect(() => {
		var data = AuthService.getCurrentUser();
		if (data) {
			setContent(data.user.userName);
			setAccessToken(data.accessToken);
		} else {
			setContent('');
			setAccessToken(undefined);
		}
	}, []);

	const handleLogout = async (e) => {
		AuthService.logout();
		redirectRoute('/');
		window.location.reload();
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-color py-0 ">
			<div className="container-fluid width-change">
				<Link className="navbar-brand hover-change" to="/">
					{/* <a className="navbar-brand hover-change"> */}
					HOME
					{/* </a> */}
				</Link>

				<form className="d-flex">
					{accessToken !== undefined ? (
						<React.Fragment>
							<a href="/#" id="justtext">
								<i className="fa fa-fw fa-user"></i>Welcome {content} !
							</a>

						<button
								className="btn btn-outline-success navbar-success button-fix"
								type="button"
								onClick={() => redirectRoute('/dashboard')} //Redirects to DashBoard
							>
								Dashboard
							</button>
							<button
								className="btn btn-outline-success navbar-success button-fix"
								type="button"
								onClick={handleLogout} //Handle logout event
							>
								Logout
							</button>
						</React.Fragment>
					) : (
						<React.Fragment>
							<div className="width-change">
								<button
									className="btn btn-outline-success navbar-success"
									type="button"
									onClick={() => redirectRoute('/signup')}
								>
									Sign Up
								</button>
								<button
									className="btn btn-outline-success navbar-success"
									type="button"
									onClick={() => redirectRoute('/login')}
								>
									Sign In
								</button>
							</div>
						</React.Fragment>
					)}
				</form>
			</div>
		</nav>
	);
}

export default Navbar;
