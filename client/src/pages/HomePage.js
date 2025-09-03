import React from 'react';
import NoteList from '../components/Notes/NoteList';
import Navbar from '../components/Shared/Navbar';

// Inline styles for HomePage
const homeStyles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  content: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    color: 'white',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: '0.9',
    fontWeight: '300',
  }
};

const HomePage = () => {
  return (
    <div style={homeStyles.container}>
      <Navbar />
      <div style={homeStyles.content}>
        <header style={homeStyles.header}>
          <h1 style={homeStyles.title}>My Notes</h1>
          <p style={homeStyles.subtitle}>Organize your thoughts and ideas</p>
        </header>
        <NoteList />
      </div>
    </div>
  );
};

export default HomePage;