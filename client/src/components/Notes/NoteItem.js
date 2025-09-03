import React from 'react';

// Inline styles for NoteItem
const noteItemStyles = {
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderLeft: '4px solid #667eea',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  content: {
    marginBottom: '1rem',
  },
  title: {
    color: '#333',
    marginBottom: '0.8rem',
    fontSize: '1.2rem',
    fontWeight: '600',
  },
  text: {
    color: '#666',
    lineHeight: '1.6',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: '0.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    fontSize: '1.1rem',
  },
  editButton: {
    backgroundColor: 'transparent',
  },
  deleteButton: {
    backgroundColor: 'transparent',
  }
};

const NoteItem = ({ note, onDelete, onEdit }) => {
  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.15)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  };

  const handleEditHover = (e) => {
    e.target.style.backgroundColor = '#e6fffa';
  };

  const handleDeleteHover = (e) => {
    e.target.style.backgroundColor = '#fed7d7';
  };

  const handleButtonOut = (e) => {
    e.target.style.backgroundColor = 'transparent';
  };

  return (
    <div 
      style={noteItemStyles.card}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div style={noteItemStyles.content}>
        <h3 style={noteItemStyles.title}>{note.title}</h3>
        <p style={noteItemStyles.text}>{note.content}</p>
      </div>
      <div style={noteItemStyles.actions}>
        <button 
          onClick={onEdit} 
          style={{...noteItemStyles.actionButton, ...noteItemStyles.editButton}}
          aria-label="Edit note"
          onMouseOver={handleEditHover}
          onMouseOut={handleButtonOut}
        >
          ✏️
        </button>
        <button 
          onClick={onDelete} 
          style={{...noteItemStyles.actionButton, ...noteItemStyles.deleteButton}}
          aria-label="Delete note"
          onMouseOver={handleDeleteHover}
          onMouseOut={handleButtonOut}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default NoteItem;