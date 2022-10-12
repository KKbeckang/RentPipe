import axios from 'axios';
import authHeader from './auth-header';
import config from '../Config/envVariables';
const API_URL = `${config.Server_url}/user/data`;
// const Public_URL = `${config.Server_url}/public`;

const getUserReportSpecificRange = (body) => {
	return axios
		.post(
			API_URL + '/reportGeneration',
			{ body: body },
			{ headers: authHeader(), responseType: 'blob' }
		)
		.then(async (res) => {
			if (res.status === 200) {
				console.log('ReportGenerated');
				return res;
			}
		});
};

const getUserReport = () => {
	axios(`http://localhost:8080/user/data/reportGeneration`, {
		method: 'GET',
		headers: authHeader(),
		responseType: 'blob',
		//Force to receive data in a Blob Format
	})
		.then((response) => {
			//Create a Blob from the PDF Stream
			const file = new Blob([response.data], {
				type: 'application/pdf',
			});
			//Build a URL from the file
			const fileURL = URL.createObjectURL(file);

			//Open the URL on new Window
			window.open(fileURL);
		})
		.catch((error) => {
			console.log(error);
		});
};

const ReportService = {
	getUserReportSpecificRange,
	getUserReport,
};

export default ReportService;
