import axios from 'axios';
import authHeader from './auth-header';
import config from "../Config/envVariables";
const API_URL = `${config.Server_url}/user/data`;
const Public_URL = `${config.Server_url}/public`;

//can use this incase need to get public data from server eg reviews
const getPublicContent = () => {
	return axios.get(Public_URL + 'Add Route'); // should use different apiurl as this one has midleware to check if user is authorised or no
};

//using this function for specific user content eg income and expenses header will include the current accessToken
const getUserTransactionData = () => {
	return axios
		.get(API_URL + '/alltransactions', { headers: authHeader() })
		.then((response) => {
			return response.data;
		});
};

const getSpendingLimitAndMonthExpense = () => {
	return axios
		.get(API_URL + '/getSpendingLimitMonthExpense', { headers: authHeader() })
		.then((response) => {
			return response.data;
		});
};

const getPieChartData = () => {
	return axios
		.get(API_URL + '/getPieChartData', { headers: authHeader() })
		.then((response) => {
			return response.data;
		});
};

const getmonthlyComparision = () => {
	return axios
		.get(API_URL + '/monthlyComparision', { headers: authHeader() })
		.then((response) => {
			return response.data;
		});
};

const createComplaint = (body) => {
	return axios
		.get(API_URL + '/createComplaint', {
			headers: authHeader(),
			issue: body.issue,
		})
		.then((response) => {
			return response.data;
		});
};

const trackComplaint = (body) => {
	return axios
		.get(API_URL + '/trackComplaint', {
			headers: authHeader(),
			incident: body.incident,
		})
		.then((response) => {
			return response.data;
		});
};

const UserService = {
	getPublicContent,
	getUserTransactionData,
	getPieChartData,
	getmonthlyComparision,
	getSpendingLimitAndMonthExpense,
	createComplaint,
	trackComplaint,
};

export default UserService;
