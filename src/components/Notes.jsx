import { useState, useEffect, useRef, useCallback } from 'react';
import { SUBJECTS } from '../data';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import NoteEditable from './NoteEditable';
import './Notes.css';

const NOTES_DOC_ID = 'user-notes';

export default function Notes() {
  const [notes, setNotes] = useState({});
  const [expanded, setExpanded] = useState({});
  const [search, setSearch] = useState('');
  const [savingState, setSavingState] = useState({}); // topicId -> 'saving' | 'saved' | null
  const debounceTimers = useRef({});

  // Real-time sync with Firebase
  useEffect(() => {
    const docRef = doc(db, 'appData', NOTES_DOC_ID);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setNotes(snap.data().notes || {});
      }
    }, (err) => {
      console.error('Notes sync error:', err);
    });
    return () => unsubscribe();
  }, []);

  const saveNote = useCallback((topicId, value) => {
    setSavingState(prev => ({ ...prev, [topicId]: 'saving' }));

    // Debounce: wait 800ms after last keystroke
    if (debounceTimers.current[topicId]) {
      clearTimeout(debounceTimers.current[topicId]);
    }

    debounceTimers.current[topicId] = setTimeout(async () => {
      try {
        const docRef = doc(db, 'appData', NOTES_DOC_ID);
        const updatedNotes = { ...notes, [topicId]: value };
        // Remove empty notes to keep Firestore clean
        if (!value || value.trim() === '') {
          delete updatedNotes[topicId];
        }
        await setDoc(docRef, { notes: updatedNotes }, { merge: true });
        setSavingState(prev => ({ ...prev, [topicId]: 'saved' }));
        // Clear "saved" after 2s
        setTimeout(() => {
          setSavingState(prev => ({ ...prev, [topicId]: null }));
        }, 2000);
      } catch (err) {
        console.error('Save error:', err);
        setSavingState(prev => ({ ...prev, [topicId]: null }));
      }
    }, 800);
  }, [notes]);

  const handleNoteChange = (topicId, value) => {
    setNotes(prev => ({ ...prev, [topicId]: value }));
    saveNote(topicId, value);
  };

  const clearNote = (topicId) => {
    handleNoteChange(topicId, '');
  };

  const toggleExpand = (topicId) => {
    setExpanded(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const getWordCount = (html) => {
    if (!html || html.trim() === '') return 0;
    // Strip HTML tags for word count
    const text = html.replace(/<[^>]*>?/gm, '');
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  // Build flat list of topics for rendering
  const allTopics = [];
  for (const subject of SUBJECTS) {
    const topics = [];
    for (const topic of subject.topics) {
      topics.push({
        id: topic.id,
        name: topic.name,
        subjectId: subject.id,
        subjectName: subject.name
      });
    }
    allTopics.push({ subject, topics });
  }

  // Filter by search
  const filteredGroups = allTopics.map(group => ({
    ...group,
    topics: group.topics.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(group => group.topics.length > 0);

  // Stats
  const totalTopics = allTopics.reduce((sum, g) => sum + g.topics.length, 0);
  const notesWritten = Object.keys(notes).filter(k => notes[k] && notes[k].trim() !== '').length;
  const totalWords = Object.values(notes).reduce((sum, n) => sum + getWordCount(n), 0);

  return (
    <div className="notes-page">
      <div className="notes-header">
        <h1>📒 Study Notes</h1>
        <p>Write and organize notes for each topic</p>
      </div>

      {/* Stats */}
      <div className="notes-stats-bar">
        <div className="notes-stat-chip">
          📝 <span className="stat-value">{notesWritten}</span> / {totalTopics} topics with notes
        </div>
        <div className="notes-stat-chip">
          📖 <span className="stat-value teal">{totalWords.toLocaleString()}</span> total words
        </div>
      </div>

      {/* Search */}
      <div className="notes-search-wrapper">
        <span className="notes-search-icon">🔍</span>
        <input
          className="notes-search"
          type="text"
          placeholder="Search topics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Topics */}
      {filteredGroups.length === 0 ? (
        <div className="notes-empty">
          <div className="notes-empty-icon">🔎</div>
          <p>No topics match your search</p>
        </div>
      ) : (
        filteredGroups.map(group => (
          <div key={group.subject.id} className="notes-subject-group">
            <div className="notes-subject-title">
              <span className="subject-icon">
                {group.subject.id === 'cs' ? '💻' : '📚'}
              </span>
              <span className="subject-label">{group.subject.name}</span>
            </div>
            <div className="notes-topics-list">
              {group.topics.map(topic => {
                const noteText = notes[topic.id] || '';
                const isExpanded = expanded[topic.id];
                const wordCount = getWordCount(noteText);
                const hasNote = noteText.trim().length > 0;
                const saving = savingState[topic.id];

                return (
                  <div
                    key={topic.id}
                    className={`note-card ${hasNote ? 'has-note' : ''}`}
                  >
                    <div
                      className="note-card-header"
                      onClick={() => toggleExpand(topic.id)}
                    >
                      <div className="note-card-left">
                        <span className={`note-card-chevron ${isExpanded ? 'expanded' : ''}`}>›</span>
                        <span className="note-card-name">{topic.name}</span>
                      </div>
                      <div className="note-card-right">
                        {saving && (
                          <span className={`note-saved-badge ${saving}`}>
                            {saving === 'saving' ? 'Saving…' : 'Saved ✓'}
                          </span>
                        )}
                        {wordCount > 0 && (
                          <span className="note-word-count">{wordCount} words</span>
                        )}
                        {hasNote && <span className="note-has-indicator" />}
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="note-card-body">
                        <NoteEditable
                          html={noteText}
                          onChange={val => handleNoteChange(topic.id, val)}
                          placeholder={`Write your notes for ${topic.name}...`}
                          topicName={topic.name}
                        />
                        <div className="note-footer">
                          <span className="note-footer-hint">Auto-saves as you type • Paste from anywhere</span>
                          {hasNote && (
                            <button
                              className="note-clear-btn"
                              onClick={() => clearNote(topic.id)}
                            >
                              Clear note
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
