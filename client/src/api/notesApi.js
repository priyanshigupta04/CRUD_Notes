import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
  baseURL: 'https://crud-notes-backend-6uf2.onrender.com', // Make sure this matches your backend URL
=======
  baseURL: 'https://crud-notes-backend-6uf2.onrender.com', 
>>>>>>> 577ec91a3b39b3663ed1873bb2c3f564b7aa564c
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
