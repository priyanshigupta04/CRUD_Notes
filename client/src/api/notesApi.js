import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure this matches your backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;