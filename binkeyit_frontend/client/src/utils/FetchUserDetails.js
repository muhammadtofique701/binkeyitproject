import Axios from './Axios';
import SummaryApi from '../common/SummaryApi';

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.userDetails
        })
        return response.data;
        }
    catch (error) {
        console.log('Error fetching user details:', error);
    }}

    export default fetchUserDetails;
// This code defines a function `fetchUserDetails` that makes an HTTP request to fetch user details from a server.
// It uses Axios to send the request and handles any errors that may occur during the process.