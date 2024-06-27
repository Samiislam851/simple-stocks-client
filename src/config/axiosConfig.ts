import customAxios from "../util/axiosInstance/axiosInstance";

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