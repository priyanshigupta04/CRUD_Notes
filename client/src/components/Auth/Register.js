import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

// Inline styles for Register component
const registerStyles = {
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
  success: {
    color: '#38a169',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  }
};

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(username, password);
      setSuccess('Registration successful! You can now login.');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
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

  return (
    <div style={registerStyles.container}>
      <form onSubmit={handleSubmit} style={registerStyles.form}>
        <div style={registerStyles.inputGroup}>
          <label htmlFor="username" style={registerStyles.label}>Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={registerStyles.input}
            disabled={isLoading}
          />
        </div>
        
        <div style={registerStyles.inputGroup}>
          <label htmlFor="password" style={registerStyles.label}>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={registerStyles.input}
            disabled={isLoading}
          />
        </div>
        
        <div style={registerStyles.inputGroup}>
          <label htmlFor="confirmPassword" style={registerStyles.label}>Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            style={registerStyles.input}
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          style={registerStyles.button}
          onMouseOver={handleButtonHover}
          onMouseOut={handleButtonOut}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Register'}
        </button>
        
        {error && <div style={registerStyles.error}>{error}</div>}
        {success && <div style={registerStyles.success}>{success}</div>}
      </form>
    </div>
  );
};

export default Register;