import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// Inline styles for Login component
const loginStyles = {
  container: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
    fontSize: '1.8rem',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#555',
  },
  input: {
    padding: '0.8rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
    outline: 'none',
  },
  button: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    marginTop: '0.5rem',
  },
  error: {
    color: '#e53e3e',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  },
  forgotPassword: {
    textAlign: 'right',
    marginTop: '-0.5rem',
  },
  forgotLink: {
    color: '#667eea',
    fontSize: '0.9rem',
    textDecoration: 'none',
    cursor: 'pointer',
  }
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(username, password);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#667eea';
    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = '#e2e8f0';
    e.target.style.boxShadow = 'none';
  };

  const handleButtonHover = (e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 4px 8px rgba(102, 126, 234, 0.3)';
  };

  const handleButtonOut = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
  };

  const handleForgotPassword = () => {
    // Implement forgot password functionality here
    alert('Forgot password feature coming soon!');
  };

  return (
    <div style={loginStyles.container}>
      <h2 style={loginStyles.title}>Welcome Back</h2>
      <form onSubmit={handleSubmit} style={loginStyles.form}>
        <div style={loginStyles.inputGroup}>
          <label htmlFor="login-username" style={loginStyles.label}>Username</label>
          <input
            id="login-username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={loginStyles.input}
            disabled={isLoading}
          />
        </div>
        
        <div style={loginStyles.inputGroup}>
          <label htmlFor="login-password" style={loginStyles.label}>Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={loginStyles.input}
            disabled={isLoading}
          />
        </div>
        
        <div style={loginStyles.forgotPassword}>
          <a 
            style={loginStyles.forgotLink}
            onClick={handleForgotPassword}
          >
            Forgot password?
          </a>
        </div>
        
        <button 
          type="submit" 
          style={loginStyles.button}
          onMouseOver={handleButtonHover}
          onMouseOut={handleButtonOut}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Login'}
        </button>
        
        {error && <div style={loginStyles.error}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;