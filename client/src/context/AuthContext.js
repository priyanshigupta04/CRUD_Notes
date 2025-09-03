import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/notesApi';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser.user);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      const decodedUser = jwtDecode(res.data.token);
      setUser(decodedUser.user);
      navigate('/');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const register = async (username, password) => {
    try {
      const res = await api.post('/auth/register', { username, password });
      localStorage.setItem('token', res.data.token);
      const decodedUser = jwtDecode(res.data.token);
      setUser(decodedUser.user);
      navigate('/');
    } catch (err) {
      console.error(err.response.data.msg);
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