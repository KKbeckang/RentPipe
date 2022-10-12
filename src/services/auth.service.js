import axios from 'axios';
import config from '../Config/envVariables';
const API_URL = `${config.Server_url}/users`;

//axios call to server

//signup post to server

const signup = (firstName, lastName, email, password) => {
	return axios
		.post(API_URL + '/newuser', {
			firstName,
			lastName,
			email,
			password,
		})
		.catch((e) => {
			throw e.response.data.Error;
		});
};

//login post to server
const login = (email, password) => {
	return axios
		.post(API_URL + '/auth', {
			email,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}
			return response.data;
		});
};

// logout removes token from localstorage
const logout = () => {
	localStorage.removeItem('user');
};

// gets current user data from local storage
const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
	signup,
	login,
	logout,
	getCurrentUser,
};

export default AuthService;
