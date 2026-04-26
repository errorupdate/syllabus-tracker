import { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { STUDY_NOTES } from '../data/notes';
import './StudyNotes.css';

const OPTION_D = "More than one of the above";
const OPTION_E = "None of the above";

export default function StudyNotes({ filter, onClose }) {
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [loadingQs, setLoadingQs] = useState(true);

  // Extract clean title
  const cleanTitle = useMemo(() => {
    if (!filter || !filter.title) return '';
    return filter.title.replace(/^(CH-\d+|T-?\d+\s*-?)\s*/i, '').trim();
  }, [filter]);

  // Fetch Live Questions from Firebase Question Bank
  useEffect(() => {
    if (!filter) return;
    setLoadingQs(true);
    const qRef = collection(db, 'questionBank-v2');
    const constraints = [];
    if (filter.subjectId) constraints.push(where('subjectId', '==', filter.subjectId));
    if (filter.topicId) constraints.push(where('topicId', '==', filter.topicId));
    if (filter.chapterId) constraints.push(where('chapterId', '==', filter.chapterId));
    
    const q = query(qRef, ...constraints);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const qList = [];
      snapshot.forEach(d => qList.push({ id: d.id, ...d.data() }));
      setDynamicQuestions(qList);
      setLoadingQs(false);
    }, () => setLoadingQs(false));
    return () => unsubscribe();
  }, [filter]);

  useEffect(() => {
    if (cleanTitle) {
      let notes = STUDY_NOTES[cleanTitle] || '';
      
      // Append Live Question Bank Questions if any exist
      if (dynamicQuestions.length > 0) {
        notes += `\n\n---\n\n## 📝 Recent Additions from Question Bank\n\n`;
        notes += `*These questions were added directly from your interactive Question Bank.*\n\n`;
        
        dynamicQuestions.forEach((q, i) => {
          let correctOptText = '';
          if (q.correctAnswerId === 'opt1') correctOptText = q.opt1 || q.optA;
          else if (q.correctAnswerId === 'opt2') correctOptText = q.opt2 || q.optB;
          else if (q.correctAnswerId === 'opt3') correctOptText = q.opt3 || q.optC;
          else if (q.correctAnswerId === 'optD') correctOptText = OPTION_D;
          else if (q.correctAnswerId === 'optE') correctOptText = OPTION_E;

          notes += `### Q${i + 1}. ${q.text}\n\n`;
          notes += `**✅ Answer:** ${correctOptText}\n\n`;
          if (q.explanation && q.explanation.trim()) {
            notes += `*Explanation:* ${q.explanation.trim()}\n\n`;
          }
        });
      }

      setGeneratedNotes(notes);
    }
  }, [cleanTitle, dynamicQuestions]);

  const readingTime = useMemo(() => {
    if (!generatedNotes) return 0;
    const words = generatedNotes.trim().split(/\s+/).length;
    return { min: Math.ceil(words / 200), words };
  }, [generatedNotes]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedNotes);
    alert('Notes copied to clipboard! 📋');
  };

  const handleDownload = () => {
    const blob = new Blob([generatedNotes], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cleanTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_study_notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!filter) return null;

  return (
    <div className="study-notes-container animate-fade">
      <div className="notes-header">
        <div>
          <h2>📚 Study Notes</h2>
          <p>Topic / Chapter: <strong>{filter.title}</strong></p>
          <p className="notes-meta">{dynamicQuestions.length} custom source questions detected</p>
        </div>
        <button className="btn-close" onClick={onClose}>🔙 Back</button>
      </div>

      <div className="notes-content-area">
        {loadingQs ? (
          <div className="loading-notes">
            <div className="spinner"></div>
            <p>Gathering notes and recent questions...</p>
          </div>
        ) : !generatedNotes ? (
          <div className="empty-notes">
            <h3>No study notes assigned yet.</h3>
            <p>To generate extremely detailed, textbook-like notes for <strong>{cleanTitle}</strong> based on your question bank, just ask me (your AI coding assistant) to <i>"Update the notes for {cleanTitle}"</i>!</p>
          </div>
        ) : (
          <div className="ai-generation-box">
            <div className="generated-content-wrapper">
              <div className="notes-actions-bar">
                <div className="notes-meta-badges">
                  <span className="badge-time">⏱️ {readingTime.min} min read</span>
                  <span className="badge-words">📝 {readingTime.words} words</span>
                </div>
                <div className="actions-right">
                  <button className="btn-action" onClick={handleCopy} title="Copy to Clipboard">📋 Copy</button>
                  <button className="btn-action" onClick={handleDownload} title="Download Markdown">⬇️ Download</button>
                </div>
              </div>
              <div className="ai-markdown-result">
                <ReactMarkdown>{generatedNotes}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
