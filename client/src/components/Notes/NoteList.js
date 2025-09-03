import React, { useState, useEffect } from "react";
import api from "../../api/notesApi";
import NoteItem from "./NoteItem";

// Inline styles for NoteList
const noteListStyles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  form: {
    background: 'white',
    padding: '2rem',
    borderRadius: '15px',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    marginBottom: '1.5rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
  },
  textarea: {
    width: '100%',
    padding: '0.8rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
    minHeight: '120px',
    resize: 'vertical',
  },
  createButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '0.8rem 2rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'transform 0.2s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    padding: '2rem',
    borderRadius: '15px',
    width: '90%',
    maxWidth: '500px',
  },
  modalActions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '1rem',
  },
  saveButton: {
    background: '#48bb78',
    color: 'white',
    padding: '0.6rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  cancelButton: {
    background: '#e53e3e',
    color: 'white',
    padding: '0.6rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  notesList: {
    display: 'grid',
    gap: '1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: 'white',
    fontSize: '1.2rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    color: 'white',
  },
  emptyStateTitle: {
    marginBottom: '0.5rem',
    fontSize: '1.5rem',
  }
};

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err.response.data.msg);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNote = async (id, updatedData) => {
    try {
      const res = await api.put(`/notes/${id}`, updatedData);
      setNotes(notes.map((note) => (note._id === id ? res.data : note)));
      setEditingNote(null);
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
  };

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/notes", newNote);
      setNotes([res.data, ...notes]);
      setNewNote({ title: "", content: "" });
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#667eea';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = '#e2e8f0';
  };

  const handleCreateButtonHover = (e) => {
    e.target.style.transform = 'translateY(-1px)';
  };

  const handleCreateButtonOut = (e) => {
    e.target.style.transform = 'translateY(0)';
  };

  if (isLoading) {
    return <div style={noteListStyles.loading}>Loading notes...</div>;
  }

  return (
    <div style={noteListStyles.container}>
      {/* Create Note Form */}
      <form onSubmit={createNote} style={noteListStyles.form}>
        <h3 style={noteListStyles.formTitle}>Create New Note</h3>
        <input
          type="text"
          placeholder="Note title..."
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          style={noteListStyles.input}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          required
        />
        <textarea
          placeholder="Write your note here..."
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
          style={noteListStyles.textarea}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          rows="4"
          required
        ></textarea>
        <button 
          type="submit" 
          style={noteListStyles.createButton}
          onMouseOver={handleCreateButtonHover}
          onMouseOut={handleCreateButtonOut}
        >
          Add Note
        </button>
      </form>

      {/* Edit Note Modal */}
      {editingNote && (
        <div style={noteListStyles.modalOverlay}>
          <div style={noteListStyles.modalContent}>
            <h3>Edit Note</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateNote(editingNote._id, editingNote);
              }}
            >
              <input
                type="text"
                value={editingNote.title}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, title: e.target.value })
                }
                style={noteListStyles.input}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <textarea
                value={editingNote.content}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, content: e.target.value })
                }
                style={noteListStyles.textarea}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                rows="4"
              ></textarea>
              <div style={noteListStyles.modalActions}>
                <button type="submit" style={noteListStyles.saveButton}>
                  Save Changes
                </button>
                <button 
                  type="button" 
                  onClick={() => setEditingNote(null)}
                  style={noteListStyles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div style={noteListStyles.notesList}>
        {notes.length === 0 ? (
          <div style={noteListStyles.emptyState}>
            <h3 style={noteListStyles.emptyStateTitle}>No notes yet</h3>
            <p>Create your first note to get started!</p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteItem
              key={note._id}
              note={note}
              onDelete={() => deleteNote(note._id)}
              onEdit={() => handleEditClick(note)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NoteList;