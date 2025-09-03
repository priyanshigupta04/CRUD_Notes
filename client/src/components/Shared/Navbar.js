import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

// Inline styles for Navbar
const navbarStyles = {
  navbar: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    textDecoration: 'none',
    flex: 1, // Takes available space to push other elements to right
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align items to the right
    gap: '1rem',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  welcome: {
    color: 'white',
    fontWeight: '500',
    marginRight: '1rem',
  },
  logoutButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    whiteSpace: 'nowrap', // Prevent text wrapping
  },
  authLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    border: '2px solid white',
    borderRadius: '6px',
    transition: 'background-color 0.2s ease',
  }
};

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogoutHover = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
  };

  const handleLogoutOut = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
  };

  const handleAuthLinkHover = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  };

  const handleAuthLinkOut = (e) => {
    e.target.style.backgroundColor = 'transparent';
  };

  return (
    <nav style={navbarStyles.navbar}>
      <div style={navbarStyles.container}>
        <Link to="/" style={navbarStyles.brand}>
          📝 NoteApp
        </Link>
        
        <div style={navbarStyles.menu}>
          {user ? (
            <div style={navbarStyles.user}>
              <span style={navbarStyles.welcome}>{user.username}</span>
              <button 
                onClick={logout} 
                style={navbarStyles.logoutButton}
                onMouseOver={handleLogoutHover}
                onMouseOut={handleLogoutOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/auth" 
              style={navbarStyles.authLink}
              onMouseOver={handleAuthLinkHover}
              onMouseOut={handleAuthLinkOut}
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;