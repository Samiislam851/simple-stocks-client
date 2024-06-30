import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../feature/User/UserSlice";

const customAxios = axios.create({
    baseURL: 'https://basic-stocks-server.onrender.com',
})
customAxios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwt'); // Retrieve JWT token from local storage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header with token
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  customAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const dispatch = useDispatch();
        // Check if the error is a 401 Unauthorized
        if (error.response && error.response.status === 401) {
          dispatch(logout())
        }
        return Promise.reject(error);
    }
);
export default customAxios