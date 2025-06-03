import axios from 'axios';
import {baseURL} from '../common/SummaryApi'

const Axios = axios.create({

  baseURL : baseURL + '/api', // ✅ points to your backend base URL
  withCredentials: true // optional, if using cookies/sessions
});

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.authorization = `Bearer ${accessToken}`;
  }

  return config;
});


//extend the life span of access token with 
// the help refresh
Axios.interceptors.request.use(
    (response)=>{
        return response
    },
    async(error)=>{
        let originRequest = error.config 

        if(error.response.status === 401 && !originRequest.retry){
            originRequest.retry = true

            const refreshToken = localStorage.getItem("refresh_token")

            if(refreshToken){
                const newAccessToken = await refreshAccessToken(refreshToken)

                if(newAccessToken){
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originRequest)
                }
            }
        }
        
        return Promise.reject(error)
    }
)
  
export default Axios;
