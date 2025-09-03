import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/notesApi';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser.user);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      localStorage.removeItem('token');
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      const decodedUser = jwtDecode(res.data.token);
      setUser(decodedUser.user);
      navigate('/');
      return res; // Return the response for success handling in the component
    } catch (err) {
      console.error(err.response?.data?.msg || 'Login failed');
      throw err; // Propagate the error to the calling component
    }
  };

  const register = async (username, password) => {
    try {
      const res = await api.post('/auth/register', { username, password });
      localStorage.setItem('token', res.data.token);
      const decodedUser = jwtDecode(res.data.token);
      setUser(decodedUser.user);
      navigate('/');
      return res; // Return the response for success handling in the component
    } catch (err) {
      console.error(err.response?.data?.msg || 'Registration failed');
      throw err; // Propagate the error to the calling component
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};