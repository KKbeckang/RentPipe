import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import AuthService from '../../services/auth.service';

const Signup = () => {
	const [formErrors, setFormErrors] = useState(null);
	const [success, setSuccess] = useState('');
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState({});
	let navigate = useNavigate();

	//redirect user to dashboard if already logged in
	useEffect(() => {
		//checks only if current user is there major checking on dashboard
		var currentUser = AuthService.getCurrentUser();
		if (currentUser) {
			navigate('/dashboard');
		}
	}, []);

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const validate = (values) => {
		let errors = {};

		const first = /^[a-zA-Z]+$/.test(values.firstName);
		const last = /^[a-zA-Z]+$/.test(values.lastName);
		const flag = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
			values.email
		);
		if (flag === false) {
			errors.email = 'Email ID is invalid!!';
		}

		if (values.password.length < 6) {
			errors.password = 'Length of password should be greater than 6';
		}

		if (first === false) {
			errors.firstName =
				'Name cannot contain numerical values or spaces in this field';
		}
		if (last === false) {
			errors.lastName =
				'Name cannot contain numerical values or spaces in this field';
		}

		if (!values.email) {
			errors.email = 'Email ID is required';
		}
		if (!values.password) {
			errors.password = 'Password is required';
		}
		if (!values.firstName) {
			errors.firstName = 'First Name is required';
		}

		if (!values.lastName) {
			errors.lastName = 'Last Name is required';
		}

		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		setFormErrors('');
		let errorPage = await validate(data);
		await setError(errorPage);

		if (Object.keys(errorPage).length === 0) {
			AuthService.signup(
				data.firstName,
				data.lastName,
				data.email,
				data.password
			)
				.then((response) => {
					//   setMessage(response.data.message);
					navigate('/login');
					setSuccess('Signed UP successfully!!');
				})
				.catch((e) => {
					//console.log(e);
					setFormErrors(e);
				});
		}
	};
	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Login
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<label htmlFor="firstName">First Name</label>
						<input
							id="firstName"
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							// required
							className={styles.input}
						/>
						<p className="disError">{error ? error.firstName : ''}</p>
						<label htmlFor="lastName">Last Name</label>
						<input
							id="lastName"
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							className={styles.input}
						/>
						<p className="disError">{error ? error.lastName : ''}</p>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							className={styles.input}
						/>
						<p className="disError">{error ? error.email : ''}</p>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							className={styles.input}
						/>
						<p className="disError">{error ? error.password : ''}</p>
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
					<div className="loginError">
						{formErrors !== '' ? formErrors : success}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
