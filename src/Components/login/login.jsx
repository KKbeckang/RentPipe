import React from 'react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const Login = () => {
	let navigate = useNavigate();
	const [data, setData] = useState({ email: '', password: '' });
	const [error, setError] = useState({}); //error checking
	const [formErrors, setFormErrors] = useState(null);
	const [success, setSuccess] = useState('');

	//redirect user to dashboard if already logged in
	useEffect(() => {
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
		const flag = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
			values.email
		);
		if (flag === false) {
			errors.email = 'Email ID is invalid!!';
		}

		if (!values.email) {
			errors.email = 'Email ID is required';
		}
		if (!values.password) {
			errors.password = 'Password is required';
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
			AuthService.login(data.email, data.password)
				.then(() => {
					navigate('/dashboard');
					window.location.reload();
					setSuccess('Logged In successfully!!');
				})
				.catch((e) => {
					setFormErrors('Either email ID or password is incorrect!!');
				});
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<label htmlFor="loginemail">Email</label>
						<input
							id="loginemail"
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							className={styles.input}
						/>
						<p className="disError">{error ? error.email : ''}</p>
						<label htmlFor="loginpassword">Password</label>
						<input
							id="loginpassword"
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							className={styles.input}
						/>
						<p className="disError">{error ? error.password : ''}</p>
						<button className="btn btn-success btn-round-lg btn-lg ">
							<span>Login</span>
						</button>
					</form>
					<div className="loginError">
						{formErrors !== '' ? formErrors : success}
					</div>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
