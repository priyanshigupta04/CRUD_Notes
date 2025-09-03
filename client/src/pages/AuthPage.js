import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

// Inline styles for AuthPage
const authStyles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  card: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  headerTitle: {
    color: '#333',
    marginBottom: '0.5rem',
    fontSize: '1.8rem',
  },
  headerSubtitle: {
    color: '#666',
    fontSize: '0.9rem',
  },
  toggle: {
    textAlign: 'center',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #eee',
  },
  toggleText: {
    color: '#666',
    fontSize: '0.9rem',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    fontWeight: '600',
    marginLeft: '0.5rem',
    textDecoration: 'underline',
  }
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div style={authStyles.container}>
      <div style={authStyles.card}>
        <div style={authStyles.header}>
          <h2 style={authStyles.headerTitle}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p style={authStyles.headerSubtitle}>{isLogin ? 'Sign in to continue' : 'Join us to get started'}</p>
        </div>
        
        {isLogin ? <Login /> : <Register />}
        
        <div style={authStyles.toggle}>
          <p style={authStyles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={toggleForm} style={authStyles.toggleButton}>
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;