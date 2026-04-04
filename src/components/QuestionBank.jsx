import { useState, useEffect, useMemo, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import { SUBJECTS } from '../data';
import './QuestionBank.css';

// Fixed Option Texts
const OPTION_D = "More than one of the above";
const OPTION_E = "None of the above";

// Helper: Fisher-Yates shuffle
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default function QuestionBank() {
  const [activeTab, setActiveTab] = useState('list'); // 'add', 'list'
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // -- List View State --
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterTopic, setFilterTopic] = useState('All');
  const [attempts, setAttempts] = useState({}); // { qId: selectedOptionId }
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState({}); // { qId: [shuffled custom options] }
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [shuffleSeed, setShuffleSeed] = useState(() => Date.now()); // changes every refresh
  const [successMsg, setSuccessMsg] = useState(''); // toast message after adding
  const questionTextRef = useRef(null); // ref for auto-focus after adding

  // -- Single Card Navigation --
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardAnim, setCardAnim] = useState(''); // 'slide-left', 'slide-right', ''

  // -- Swipe Handlers --
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > minSwipeDistance) goNext(); // Swipe Left -> Next
    if (distance < -minSwipeDistance) goPrev(); // Swipe Right -> Prev
  };

  // -- Scoring State (persisted via localStorage) --
  const [score, setScore] = useState(() => {
    try {
      const saved = localStorage.getItem('qb-score');
      return saved ? JSON.parse(saved) : { attempted: 0, correct: 0, wrong: 0 };
    } catch { return { attempted: 0, correct: 0, wrong: 0 }; }
  });

  // -- Completion Tracking State --
  const [completions, setCompletions] = useState({});
  const [completedSubjectsList, setCompletedSubjectsList] = useState([]);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [currentCompletionStats, setCurrentCompletionStats] = useState(null);

  // -- Add/Edit View State --
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = adding, string = editing
  const [newQuestion, setNewQuestion] = useState({
    subjectId: '',
    topicId: '',
    chapterId: '', // optional
    text: '',
    opt1: '',
    opt2: '',
    opt3: '',
    correctAnswerId: 'opt1', // Maps to opt1, opt2, opt3, D, or E
    explanation: ''
  });

  // Fetch Questions
  useEffect(() => {
    const q = query(collection(db, 'questionBank-v2'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const qList = [];
      const newShuffledMap = {};
      
      snapshot.forEach((doc) => {
        const raw = doc.data();
        const id = doc.id;

        // --- Normalize field names ---
        // Bulk-inserted questions use optA/optB/optC + correctAnswer (e.g. "optB")
        // The component expects opt1/opt2/opt3 + correctAnswerId (e.g. "opt1")
        // Also ensure subjectName / topicName always exist (fall back to IDs)
        const legacyMap = { optA: 'opt1', optB: 'opt2', optC: 'opt3' };
        const normalized = { ...raw };
        if (raw.optA !== undefined && raw.opt1 === undefined) {
          normalized.opt1 = raw.optA;
          normalized.opt2 = raw.optB;
          normalized.opt3 = raw.optC;
        }
        if (raw.correctAnswer !== undefined && raw.correctAnswerId === undefined) {
          // correctAnswer is like "optA", "optB", "optC", map to opt1/opt2/opt3
          normalized.correctAnswerId = legacyMap[raw.correctAnswer] || raw.correctAnswer;
        }
        // Ensure subjectName / topicName always present
        if (!normalized.subjectName) {
          const subObj = SUBJECTS.find(s => s.id === normalized.subjectId);
          normalized.subjectName = subObj?.name || normalized.subjectId || '';
        }
        if (!normalized.topicName) {
          const subObj = SUBJECTS.find(s => s.id === normalized.subjectId);
          const topObj = subObj?.topics?.find(t => t.id === normalized.topicId);
          normalized.topicName = topObj?.name || normalized.topicId || '';
        }
        if (!normalized.chapterName && normalized.chapterId) {
          const subObj = SUBJECTS.find(s => s.id === normalized.subjectId);
          const topObj = subObj?.topics?.find(t => t.id === normalized.topicId);
          const chObj = topObj?.chapters?.find(c => c.id === normalized.chapterId);
          normalized.chapterName = chObj?.name || '';
        }

        qList.push({ id, ...normalized });
        
        // Ensure every question getting rendered has a shuffled state for its 3 custom options
        if (!shuffledOptionsMap[id]) {
          newShuffledMap[id] = shuffle(['opt1', 'opt2', 'opt3']);
        } else {
          newShuffledMap[id] = shuffledOptionsMap[id];
        }
      });
      setQuestions(qList);
      setShuffledOptionsMap(prev => ({ ...prev, ...newShuffledMap }));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching questions: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // Run once on mount, real-time listener updates data

  // Fetch Completions
  useEffect(() => {
    const docRef = doc(db, 'appData', 'qb-completions');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setCompletions(docSnap.data().data || {});
      } else {
        setDoc(docRef, { data: {} });
      }
    }, (error) => {
      console.error("Error fetching completions: ", error);
    });
    return () => unsubscribe();
  }, []);

  // Check Subject Completion - only when attempts or filterSubject changes
  useEffect(() => {
    if (filterSubject === 'All' || filterTopic !== 'All' || searchQuery !== '') return;
    if (questions.length === 0) return;

    // Get relevant questions for current subject
    const subjectQuestions = questions.filter(q => q.subjectId === filterSubject);
    if (subjectQuestions.length === 0) return;

    const allAttempted = subjectQuestions.every(q => attempts[q.id]);
    
    if (allAttempted && !completedSubjectsList.includes(filterSubject)) {
      let correct = 0;
      subjectQuestions.forEach(q => {
        if (attempts[q.id] === q.correctAnswerId) correct++;
      });
      const accuracy = Math.round((correct / subjectQuestions.length) * 100);

      const currentSubjectObj = SUBJECTS.find(s => s.id === filterSubject);
      const existingData = completions[filterSubject] || { count: 0, bestAccuracy: 0, lastAccuracy: 0 };
      const nextData = {
        ...existingData,
        count: existingData.count + 1,
        lastAccuracy: accuracy,
        bestAccuracy: Math.max(existingData.bestAccuracy || 0, accuracy)
      };

      const newCompletionsMap = {
        ...completions,
        [filterSubject]: nextData
      };

      setCompletedSubjectsList(prev => [...prev, filterSubject]);
      setDoc(doc(db, 'appData', 'qb-completions'), { data: newCompletionsMap }, { merge: true });

      setCurrentCompletionStats({
        subjectName: currentSubjectObj?.name || 'Subject',
        accuracy,
        count: nextData.count
      });
      setShowCompletionModal(true);
    }
  }, [attempts, filterSubject, filterTopic, searchQuery, completedSubjectsList, completions, questions]);

  // --- Add Question Handlers ---
  const handleAddQuestionChange = (field, value) => {
    setNewQuestion(prev => {
      const updated = { ...prev, [field]: value };
      // Cascade resets
      if (field === 'subjectId') {
        updated.topicId = '';
        updated.chapterId = '';
      }
      if (field === 'topicId') {
        updated.chapterId = '';
      }
      return updated;
    });
  };

  const currentAddSubject = SUBJECTS.find(s => s.id === newQuestion.subjectId);
  const currentAddTopic = currentAddSubject?.topics.find(t => t.id === newQuestion.topicId);

  const startEdit = (q) => {
    setEditingId(q.id);
    setNewQuestion({
      subjectId: q.subjectId,
      topicId: q.topicId,
      chapterId: q.chapterId || '',
      text: q.text,
      opt1: q.opt1,
      opt2: q.opt2,
      opt3: q.opt3,
      correctAnswerId: q.correctAnswerId,
      explanation: q.explanation || ''
    });
    setActiveTab('add');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewQuestion({
      subjectId: '',
      topicId: '',
      chapterId: '',
      text: '',
      opt1: '',
      opt2: '',
      opt3: '',
      correctAnswerId: 'opt1',
      explanation: ''
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestion.subjectId || !newQuestion.topicId || !newQuestion.text.trim() || 
        !newQuestion.opt1.trim() || !newQuestion.opt2.trim() || !newQuestion.opt3.trim()) {
      alert("Please fill out the required fields (Subject, Topic, Question, and the 3 custom options).");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        subjectId: newQuestion.subjectId,
        subjectName: currentAddSubject.name,
        topicId: newQuestion.topicId,
        topicName: currentAddTopic.name,
        chapterId: newQuestion.chapterId,
        chapterName: currentAddTopic.chapters?.find(c => c.id === newQuestion.chapterId)?.name || '',
        text: newQuestion.text,
        opt1: newQuestion.opt1,
        opt2: newQuestion.opt2,
        opt3: newQuestion.opt3,
        correctAnswerId: newQuestion.correctAnswerId,
        explanation: newQuestion.explanation,
      };

      if (editingId) {
        // Update existing
        await updateDoc(doc(db, 'questionBank-v2', editingId), payload);
        setEditingId(null);
        // After edit, go back to list
        setNewQuestion({ subjectId: '', topicId: '', chapterId: '', text: '', opt1: '', opt2: '', opt3: '', correctAnswerId: 'opt1', explanation: '' });
        setActiveTab('list');
      } else {
        // Add new
        payload.createdAt = serverTimestamp();
        await addDoc(collection(db, 'questionBank-v2'), payload);
        // Stay on add form with same subject/topic, clear only question fields
        setNewQuestion(prev => ({
          ...prev,
          chapterId: prev.chapterId, // keep chapter too
          text: '',
          opt1: '',
          opt2: '',
          opt3: '',
          correctAnswerId: 'opt1',
          explanation: ''
        }));
        // Show success toast
        setSuccessMsg('✅ Question added! Add another one below.');
        setTimeout(() => setSuccessMsg(''), 3000);
        // Auto-focus the question textarea for next entry
        setTimeout(() => questionTextRef.current?.focus(), 100);
        // Stay on 'add' tab - do NOT switch to list
      }
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Failed to save question.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- List View Handlers ---
  const handleAttempt = (questionId, answeredOptionId, correctAnswerId) => {
    if (!attempts[questionId]) {
      setAttempts(prev => ({ ...prev, [questionId]: answeredOptionId }));
      // Update score
      const isCorrect = answeredOptionId === correctAnswerId;
      setScore(prev => {
        const updated = {
          attempted: prev.attempted + 1,
          correct: prev.correct + (isCorrect ? 1 : 0),
          wrong: prev.wrong + (isCorrect ? 0 : 1)
        };
        localStorage.setItem('qb-score', JSON.stringify(updated));
        return updated;
      });
      // Auto-advance to next question after 1.5s
      if (currentIndex < filteredQuestions.length - 1) {
        setTimeout(() => goNext(), 1500);
      }
    }
  };

  // --- Card Navigation ---
  const goToQuestion = (newIndex, direction) => {
    setCardAnim(direction);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setCardAnim('');
    }, 280); // match animation duration
  };

  const goNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      goToQuestion(currentIndex + 1, 'slide-left');
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1, 'slide-right');
    }
  };

  // Reset index when filters change
  useEffect(() => {
    setCurrentIndex(0);
    setCardAnim('');
  }, [filterSubject, filterTopic, searchQuery]);

  const resetScore = () => {
    setScore({ attempted: 0, correct: 0, wrong: 0 });
    setAttempts({});
    setCompletedSubjectsList([]); // reset completions flags for this session
    localStorage.setItem('qb-score', JSON.stringify({ attempted: 0, correct: 0, wrong: 0 }));
    setCurrentIndex(0);
    setCardAnim('');
    // Re-shuffle on reset
    setShuffleSeed(Date.now());
    setShuffledOptionsMap({});
  };

  const handleDelete = async (questionId) => {
    if (window.confirm('Are you sure you want to completely delete this question?')) {
      try {
        await deleteDoc(doc(db, 'questionBank-v2', questionId));
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("Failed to delete question.");
      }
    }
  };

  const toggleSelectMode = () => {
    setSelectionMode(prev => !prev);
    setSelectedIds(new Set());
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(filteredQuestions.map(q => q.id)));
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`Delete ${selectedIds.size} selected question(s)? This cannot be undone.`)) return;
    try {
      await Promise.all([...selectedIds].map(id => deleteDoc(doc(db, 'questionBank-v2', id))));
      setSelectedIds(new Set());
      setSelectionMode(false);
    } catch (error) {
      console.error("Bulk delete failed:", error);
      alert('Some questions could not be deleted.');
    }
  };

  // Shuffle question order (deterministic per refresh via shuffleSeed)
  const shuffledQuestions = useMemo(() => {
    const arr = [...questions];
    // Seeded shuffle using shuffleSeed to ensure same order within a session
    let seed = shuffleSeed;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [questions, shuffleSeed]);

  // Complex Filtering (applied on shuffled questions)
  const filteredQuestions = useMemo(() => {
    return shuffledQuestions.filter(q => {
      // 1. Search Query — guard against missing name fields
      if (searchQuery) {
        const queryLower = searchQuery.toLowerCase();
        const matchesText = (q.text || '').toLowerCase().includes(queryLower);
        const matchesTopic = (q.topicName || q.topicId || '').toLowerCase().includes(queryLower);
        const matchesSub = (q.subjectName || q.subjectId || '').toLowerCase().includes(queryLower);
        if (!matchesText && !matchesTopic && !matchesSub) return false;
      }
      
      // 2. Subject Filter
      if (filterSubject !== 'All' && q.subjectId !== filterSubject) return false;

      // 3. Topic Filter
      if (filterTopic !== 'All' && q.topicId !== filterTopic) return false;

      return true;
    });
  }, [shuffledQuestions, searchQuery, filterSubject, filterTopic]);

  const currentFilterSubjectObj = SUBJECTS.find(s => s.id === filterSubject);

  return (
    <div className="qb-container">
      <div className="qb-header">
        <h2>📝 Advanced Question Bank</h2>
        <div className="qb-tabs">
          <button 
            className={`qb-tab ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            🔍 Browse Questions
          </button>
          <button 
            className={`qb-tab add-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => { cancelEdit(); setActiveTab('add'); }}
          >
            + Add Question
          </button>
        </div>
      </div>

      {/* Subject Completion Modal */}
      {showCompletionModal && currentCompletionStats && (
        <div className="qb-completion-modal-overlay">
          <div className="qb-completion-modal">
            <h2 className="confetti-title">🎉 Subject Completed! 🎉</h2>
            <p className="completion-msg">
              You have successfully attempted all questions for <strong>{currentCompletionStats.subjectName}</strong>.
            </p>
            
            <div className="completion-stats-box">
              <div className="c-stat">
                <span className="c-label">Accuracy</span>
                <span className="c-value accuracy-value">{currentCompletionStats.accuracy}%</span>
              </div>
              <div className="c-stat">
                <span className="c-label">Total Completions</span>
                <span className="c-value">{currentCompletionStats.count}</span>
              </div>
            </div>

            <div className="completion-actions">
              <button className="btn-primary" onClick={() => setShowCompletionModal(false)}>Close</button>
              <button className="btn-reset-modal" onClick={() => {
                setShowCompletionModal(false);
                resetScore();
              }}>🔄 Reset Subject to Retake</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast - Fixed overlay */}
      {successMsg && (
        <div className="qb-success-toast-overlay">
          <div className="qb-success-toast">
            {successMsg}
          </div>
        </div>
      )}

      {activeTab === 'add' && (
        <form className="qb-add-form animate-fade" onSubmit={handleFormSubmit}>
          <h3 style={{ margin: '0 0 20px 0', color: editingId ? '#f0883e' : 'var(--accent)' }}>
            {editingId ? '✏️ Edit Question' : '➕ New Question'}
          </h3>
          <div className="form-row">
            <div className="form-group half">
              <label>Subject *</label>
              <select 
                className="form-control"
                value={newQuestion.subjectId}
                onChange={(e) => handleAddQuestionChange('subjectId', e.target.value)}
                required
              >
                <option value="" disabled>Select Subject...</option>
                {SUBJECTS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group half">
              <label>Topic *</label>
              <select 
                className="form-control"
                value={newQuestion.topicId}
                onChange={(e) => handleAddQuestionChange('topicId', e.target.value)}
                required
                disabled={!newQuestion.subjectId}
              >
                <option value="" disabled>Select Topic...</option>
                {currentAddSubject?.topics.map(t => (
                  <option key={t.id} value={t.id}>{t.name.split('-')[1]?.trim() || t.name}</option>
                ))}
              </select>
            </div>
          </div>

          {currentAddTopic?.chapters && currentAddTopic.chapters.length > 0 && (
            <div className="form-group">
              <label>Sub-Topic / Chapter (Optional)</label>
              <select 
                className="form-control"
                value={newQuestion.chapterId}
                onChange={(e) => handleAddQuestionChange('chapterId', e.target.value)}
              >
                <option value="">None</option>
                {currentAddTopic.chapters.map(c => (
                  <option key={c.id} value={c.id}>{c.name.split('-')[1]?.trim() || c.name}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Question Text *</label>
            <textarea 
              ref={questionTextRef}
              className="form-control" 
              placeholder="Enter the question..."
              value={newQuestion.text}
              onChange={(e) => handleAddQuestionChange('text', e.target.value)}
              required
            />
          </div>

          <div className="options-setup">
            <h4>Dynamic Options</h4>
            <p className="help-text">These 3 options will be randomly shuffled into A, B, and C positions every time the question is viewed.</p>
            
            <div className="form-group">
              <label>Option 1 *</label>
              <input type="text" className="form-control" required
                value={newQuestion.opt1} onChange={e => handleAddQuestionChange('opt1', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Option 2 *</label>
              <input type="text" className="form-control" required
                value={newQuestion.opt2} onChange={e => handleAddQuestionChange('opt2', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Option 3 *</label>
              <input type="text" className="form-control" required
                value={newQuestion.opt3} onChange={e => handleAddQuestionChange('opt3', e.target.value)} />
            </div>

            <div className="fixed-options-preview">
              <div className="fixed-opt"><strong>Fixed D:</strong> {OPTION_D}</div>
              <div className="fixed-opt"><strong>Fixed E:</strong> {OPTION_E}</div>
            </div>
          </div>

          <div className="form-group highlight-box">
            <label>Which one is Correct? *</label>
            <select 
              className="form-control"
              value={newQuestion.correctAnswerId}
              onChange={(e) => handleAddQuestionChange('correctAnswerId', e.target.value)}
            >
              <option value="opt1">Option 1: {newQuestion.opt1 || '(Empty)'}</option>
              <option value="opt2">Option 2: {newQuestion.opt2 || '(Empty)'}</option>
              <option value="opt3">Option 3: {newQuestion.opt3 || '(Empty)'}</option>
              <option value="optD">Fixed D: {OPTION_D}</option>
              <option value="optE">Fixed E: {OPTION_E}</option>
            </select>
          </div>

          <div className="form-group">
            <label>Explanation (Optional)</label>
            <textarea 
              className="form-control" 
              placeholder="Why is this the answer?"
              value={newQuestion.explanation}
              onChange={(e) => handleAddQuestionChange('explanation', e.target.value)}
              style={{ minHeight: '80px' }}
            />
          </div>

          <div className="form-actions">
            {editingId && (
              <button type="button" className="btn-cancel-edit" onClick={() => { cancelEdit(); setActiveTab('list'); }}>
                Cancel Edit
              </button>
            )}
            <button type="submit" className="btn-primary large" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingId ? '💾 Save Changes' : '+ Add Question'}
            </button>
          </div>
        </form>
      )}

      {activeTab === 'list' && (
        <div className="qb-list-view animate-fade">
          <div className="qb-filters">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search questions by keyword..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              className="filter-select"
              value={filterSubject}
              onChange={e => {
                setFilterSubject(e.target.value);
                setFilterTopic('All'); // Reset topic when subject changes
              }}
            >
              <option value="All">All Subjects</option>
              {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>

            <select 
              className="filter-select"
              value={filterTopic}
              onChange={e => setFilterTopic(e.target.value)}
              disabled={filterSubject === 'All'}
            >
              <option value="All">All Topics</option>
              {currentFilterSubjectObj?.topics.map(t => (
                <option key={t.id} value={t.id}>{t.name.split('-')[1]?.trim() || t.name}</option>
              ))}
            </select>
            
            {filterSubject !== 'All' && completions[filterSubject] && completions[filterSubject].count > 0 && (
              <div className="completion-badge">
                🏆 Completions: {completions[filterSubject].count} | Record Accuracy: {completions[filterSubject].bestAccuracy}%
              </div>
            )}
          </div>

          {/* Scoreboard */}
          <div className="qb-scoreboard">
            <div className="score-stats">
              <div className="score-stat attempted">
                <span className="score-num">{score.attempted}</span>
                <span className="score-label">Attempted</span>
              </div>
              <div className="score-stat correct">
                <span className="score-num">{score.correct}</span>
                <span className="score-label">Correct</span>
              </div>
              <div className="score-stat wrong">
                <span className="score-num">{score.wrong}</span>
                <span className="score-label">Wrong</span>
              </div>
              <div className="score-stat accuracy">
                <span className="score-num">{score.attempted > 0 ? Math.round((score.correct / score.attempted) * 100) : 0}%</span>
                <span className="score-label">Accuracy</span>
              </div>
            </div>
            {score.attempted > 0 && (
              <div className="score-bar-wrapper">
                <div className="score-bar">
                  <div className="score-bar-correct" style={{ width: `${(score.correct / score.attempted) * 100}%` }} />
                  <div className="score-bar-wrong" style={{ width: `${(score.wrong / score.attempted) * 100}%` }} />
                </div>
                <button className="btn-reset-score" onClick={resetScore} title="Reset scores & reshuffle">
                  🔄 Reset
                </button>
              </div>
            )}
          </div>

          {/* Selection toolbar */}
          <div className="selection-toolbar">
            <button
              className={`btn-select-mode ${selectionMode ? 'active' : ''}`}
              onClick={toggleSelectMode}
            >
              {selectionMode ? '✕ Cancel' : '☑ Select'}
            </button>
            {selectionMode && (
              <>
                <button className="btn-select-all" onClick={selectAll}>
                  Select All ({filteredQuestions.length})
                </button>
                {selectedIds.size > 0 && (
                  <button className="btn-bulk-delete" onClick={handleBulkDelete}>
                    🗑️ Delete {selectedIds.size} Selected
                  </button>
                )}
                {selectedIds.size > 0 && (
                  <span className="selection-count">{selectedIds.size} selected</span>
                )}
              </>
            )}
          </div>

          {loading ? (
            <div className="loading-spinner"><div className="spinner"></div></div>
          ) : filteredQuestions.length === 0 ? (
            <div className="empty-state">
              <p>No questions found.</p>
              <button className="btn-primary" onClick={() => setActiveTab('add')}>Add a Question</button>
            </div>
          ) : selectionMode ? (
            /* Selection mode: show all cards */
            <div className="questions-list">
              {filteredQuestions.map((q, index) => (
                <div
                  key={q.id}
                  className={`question-card v2 ${selectedIds.has(q.id) ? 'selected' : ''}`}
                  onClick={() => toggleSelect(q.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="q-header">
                    <div className="q-meta">
                      <input type="checkbox" className="q-checkbox" checked={selectedIds.has(q.id)} onChange={() => toggleSelect(q.id)} onClick={e => e.stopPropagation()} />
                      <span className="q-badge subject">{q.subjectName}</span>
                      <span className="q-badge topic">{q.topicName.split('-')[1]?.trim() || q.topicName}</span>
                      {q.chapterName && <span className="q-badge chapter">{q.chapterName.split('-')[1]?.trim() || q.chapterName}</span>}
                    </div>
                  </div>
                  <div className="q-number">Q{index + 1}.</div>
                  <div className="q-text">{q.text}</div>
                  <div className="selection-mode-hint">Click card to select / deselect</div>
                </div>
              ))}
            </div>
          ) : (
            /* Single-card quiz mode */
            (() => {
              const safeIndex = Math.min(currentIndex, filteredQuestions.length - 1);
              const q = filteredQuestions[safeIndex];
              if (!q) return null;

              const attemptedId = attempts[q.id];
              const isAttempted = !!attemptedId;
              const isCorrectAttempt = attemptedId === q.correctAnswerId;
              const dynamicLayout = shuffledOptionsMap[q.id] || ['opt1', 'opt2', 'opt3'];
              const displayOptions = [
                { letter: 'A', id: dynamicLayout[0], text: q[dynamicLayout[0]] },
                { letter: 'B', id: dynamicLayout[1], text: q[dynamicLayout[1]] },
                { letter: 'C', id: dynamicLayout[2], text: q[dynamicLayout[2]] },
                { letter: 'D', id: 'optD', text: OPTION_D },
                { letter: 'E', id: 'optE', text: OPTION_E },
              ];

              return (
                <div 
                  className="single-card-wrapper"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  {/* Navigation header */}
                  <div className="card-nav-header">
                    <button className="btn-nav" onClick={goPrev} disabled={safeIndex === 0}>
                      ◀ Prev
                    </button>
                    <span className="card-counter">
                      {safeIndex + 1} / {filteredQuestions.length}
                    </span>
                    <button className="btn-nav" onClick={goNext} disabled={safeIndex === filteredQuestions.length - 1}>
                      Next ▶
                    </button>
                  </div>

                  {/* The question card */}
                  <div key={q.id} className={`question-card v2 single-card ${cardAnim}`}>
                    <div className="q-header">
                      <div className="q-meta">
                        <span className="q-badge subject">{q.subjectName}</span>
                        <span className="q-badge topic">{q.topicName.split('-')[1]?.trim() || q.topicName}</span>
                        {q.chapterName && <span className="q-badge chapter">{q.chapterName.split('-')[1]?.trim() || q.chapterName}</span>}
                      </div>
                      <div className="q-actions">
                        <button className="btn-edit" onClick={() => startEdit(q)} title="Edit">✏️</button>
                        <button className="btn-delete" onClick={() => handleDelete(q.id)} title="Delete">🗑️</button>
                      </div>
                    </div>

                    <div className="q-number">Q{safeIndex + 1}.</div>
                    <div className="q-text">{q.text}</div>

                    <div className="q-options-5">
                      {displayOptions.map(opt => {
                        let optionClass = '';
                        if (isAttempted) {
                          if (opt.id === q.correctAnswerId) optionClass = 'correct';
                          else if (opt.id === attemptedId && !isCorrectAttempt) optionClass = 'incorrect';
                        }
                        return (
                          <div
                            key={opt.id}
                            className={`q-option ${optionClass} ${!isAttempted ? 'interactive' : ''}`}
                            onClick={() => !isAttempted && handleAttempt(q.id, opt.id, q.correctAnswerId)}
                          >
                            <span className="opt-letter">{opt.letter}.</span>
                            <span className="opt-text">{opt.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Skip button - only if not attempted */}
                    {!isAttempted && safeIndex < filteredQuestions.length - 1 && (
                      <button className="btn-skip" onClick={goNext}>
                        Skip ⏭
                      </button>
                    )}
                    {isAttempted && (
                      <div className="attempt-feedback slide-down">
                        {isCorrectAttempt ? (
                          <div className="feedback-correct">✅ Correct!</div>
                        ) : (
                          <div className="feedback-incorrect">
                            ❌ Incorrect. The correct answer was <strong>Option {displayOptions.find(o => o.id === q.correctAnswerId)?.letter}</strong>.
                          </div>
                        )}
                        {q.explanation && (
                          <div className="q-explanation">
                            <strong>Explanation:</strong> {q.explanation}
                          </div>
                        )}
                        {safeIndex < filteredQuestions.length - 1 && (
                          <div className="auto-next-hint">Moving to next question...</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}
    </div>
  );
}
