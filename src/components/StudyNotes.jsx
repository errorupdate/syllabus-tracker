import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { PYQ_QUESTIONS } from '../pyqData';
import ReactMarkdown from 'react-markdown';
import './StudyNotes.css';

const OPTION_D = "More than one of the above";
const OPTION_E = "None of the above";

export default function StudyNotes({ filter, onClose }) {
  const [dynamicQuestions, setDynamicQuestions] = useState([]);
  const [loadingQs, setLoadingQs] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState(() => localStorage.getItem(`ai_notes_${filter?.title}`) || '');

  const [showConfig, setShowConfig] = useState(false);
  const [selectedModel, setSelectedModel] = useState(() => localStorage.getItem('study_notes_model') || 'gemini-1.5-flash');
  const [customPrompt, setCustomPrompt] = useState(() => localStorage.getItem('study_notes_prompt') || '');

  const availableModels = [
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Fast & Free)' },
    { id: 'gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro (Advanced)' },
    { id: 'gemini-1.5-flash-8b', name: 'Gemini 1.5 Flash-8B (Efficient)' },
    { id: 'gemini-pro', name: 'Gemini 1.0 Pro' },
  ];

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
    a.download = `${filter.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_study_notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Extract clean title
  const cleanTitle = useMemo(() => {
    if (!filter || !filter.title) return '';
    return filter.title.replace(/^(CH-\d+|T\d+\s*-?)\s*/i, '').trim().toLowerCase();
  }, [filter]);

  // Fetch Questions
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
      snapshot.forEach(doc => qList.push({ id: doc.id, ...doc.data() }));
      setDynamicQuestions(qList);
      setLoadingQs(false);
    }, () => setLoadingQs(false));
    return () => unsubscribe();
  }, [filter]);

  const mergedNotes = useMemo(() => {
    if (!filter) return [];
    const notesList = dynamicQuestions.map(q => {
      let correctOptText = '';
      if (q.correctAnswerId === 'opt1') correctOptText = q.opt1 || q.optA;
      else if (q.correctAnswerId === 'opt2') correctOptText = q.opt2 || q.optB;
      else if (q.correctAnswerId === 'opt3') correctOptText = q.opt3 || q.optC;
      else if (q.correctAnswerId === 'optD') correctOptText = OPTION_D;
      else if (q.correctAnswerId === 'optE') correctOptText = OPTION_E;

      return {
        question: q.text,
        correctAnswer: correctOptText,
        explanation: q.explanation || ''
      };
    });

    if (cleanTitle) {
      const primaryKeyword = cleanTitle.split(' ')[0].replace(/[^a-z0-9]/gi, '');
      const pyqMatches = PYQ_QUESTIONS.filter(q => {
        const sub = (q.subject || '').toLowerCase();
        const theme = (q.theme || '').toLowerCase();
        return (primaryKeyword.length > 3 && (sub.includes(primaryKeyword) || theme.includes(primaryKeyword)));
      });

      pyqMatches.forEach(q => {
        if (!notesList.some(n => n.question === q.question)) {
          notesList.push({
            question: q.question,
            correctAnswer: q.answer,
            explanation: q.explanation || ''
          });
        }
      });
    }
    return notesList;
  }, [dynamicQuestions, filter, cleanTitle]);

  const generateAINotes = async () => {
    if (mergedNotes.length === 0) return alert("No questions found to generate notes from.");

    setIsGenerating(true);
    try {
      // Build Prompt
      const sourceMaterial = mergedNotes.map((n, i) => 
        `Q${i+1}: ${n.question}\nCorrect Answer: ${n.correctAnswer}\nContext/Explanation: ${n.explanation}`
      ).join('\n\n');

      const promptText = `
        You are an expert tutor and an expert at writing clean, structured markdown study guides.
        I am going to provide you with a list of questions, their correct answers, and explanations.
        Your task is to ignore the "quiz" aspect of this data and instead synthesize a real, cohesive "Study Notes" document that teaches the underlying concepts.

        Rules:
        1. Use headings, bullet points, and short paragraphs.
        2. Do NOT list the questions. Instead, group similar concepts together and explain them clearly.
        3. Extract the key takeaways from the explanations.
        4. Make it highly readable and strictly formatted in Markdown.
        5. The topic is: "${filter.title}".

        ${customPrompt ? `Here are additional instructions from the user to follow strictly:\n"${customPrompt}"\n\n` : ''}

        Here is the source material to analyze and synthesize into a study guide:
        
        ${sourceMaterial}
      `;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: selectedModel,
          contents: promptText
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      const generatedText = data.text;
      
      setGeneratedNotes(generatedText);
      localStorage.setItem(`ai_notes_${filter.title}`, generatedText);

    } catch (err) {
      console.error(err);
      alert("Failed to generate notes. Check your API Key or try again later. " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!filter) return null;

  return (
    <div className="study-notes-container animate-fade">
      <div className="notes-header">
        <div>
          <h2>✨ AI Study Notes</h2>
          <p>Topic / Chapter: <strong>{filter.title}</strong></p>
          <p className="notes-meta">Powered by Google Gemini • {mergedNotes.length} source questions detected</p>
        </div>
        <button className="btn-close" onClick={onClose}>🔙 Back</button>
      </div>

      <div className="notes-content-area">
        {loadingQs ? (
          <div className="loading-notes">
            <div className="spinner"></div>
            <p>Fetching questions...</p>
          </div>
        ) : mergedNotes.length === 0 ? (
          <div className="empty-notes">
            <h3>No questions found.</h3>
            <p>Add questions to the Question Bank under this topic to automatically generate study notes here.</p>
          </div>
        ) : (
          <div className="ai-generation-box">
            <div className="ai-generation-controls" style={{ flexDirection: 'column' }}>
              <button 
                style={{ width: '100%', justifyContent: 'center' }}
                className={`btn-generate-ai ${isGenerating ? 'generating' : ''}`}
                onClick={generateAINotes}
                disabled={isGenerating}
              >
                {isGenerating ? '✨ Synthesizing Notes...' : (generatedNotes ? '✨ Regenerate Notes' : '✨ Generate Study Notes')}
              </button>
              
              <button className="ai-settings-toggle" onClick={() => setShowConfig(!showConfig)}>
                ⚙️ {showConfig ? 'Hide AI Settings' : 'AI Settings & Overrides'}
              </button>

              {showConfig && (
                <div className="ai-settings-panel animate-fade">
                  <div className="settings-group">
                    <label>Select AI Model</label>
                    <select 
                      value={selectedModel} 
                      onChange={(e) => {
                        setSelectedModel(e.target.value);
                        localStorage.setItem('study_notes_model', e.target.value);
                      }}
                    >
                      {availableModels.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="settings-group">
                    <label>Custom Instructions (Optional)</label>
                    <textarea 
                      rows={2}
                      placeholder="e.g., 'Keep it under 3 paragraphs' or 'Summarize simply'"
                      value={customPrompt}
                      onChange={(e) => {
                        setCustomPrompt(e.target.value);
                        localStorage.setItem('study_notes_prompt', e.target.value);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {generatedNotes && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
