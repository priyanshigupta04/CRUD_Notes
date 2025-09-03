import axios from 'axios';

const api = axios.create({
  baseURL: 'https://crud-notes-backend-6uf2.onrender.com', // Make sure this matches your backend URL
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