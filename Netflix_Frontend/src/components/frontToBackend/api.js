import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

// const apiUrl = "/choreo-apis/netvision/netbackend/v1";
const apiUrl = "https://b53520bd-d323-4148-9d70-2ac5014cbacb-prod.e1-us-east-azure.choreoapis.dev/netbackend/netbackend/v1.0";


// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL: apiUrl,
// });

const api = axios.create({
  baseURL: apiUrl || import.meta.env.VITE_API_URL,
});


// Basically I am setting authorization header here since my backend uses JWT authentication method
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token && !config.url.includes('/user/register') ) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;