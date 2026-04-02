import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { SUBJECTS } from '../../data';
import './TestMode.css';

// ──────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────
const OPTION_D = 'More than one of the above';
const OPTION_E = 'None of the above';
const COUNT_OPTIONS = [5, 10, 15, 20, 25, 30];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDisplayOptions(q) {
  const shuffledCustom = shuffle(['opt1', 'opt2', 'opt3']);
  return [
    { letter: 'A', id: shuffledCustom[0], text: q[shuffledCustom[0]] },
    { letter: 'B', id: shuffledCustom[1], text: q[shuffledCustom[1]] },
    { letter: 'C', id: shuffledCustom[2], text: q[shuffledCustom[2]] },
    { letter: 'D', id: 'optD', text: OPTION_D },
    { letter: 'E', id: 'optE', text: OPTION_E },
  ];
}

// ──────────────────────────────────────────────
// Phase: SETUP
// ──────────────────────────────────────────────
function SetupScreen({ questions, onStart }) {
  const [subjectId, setSubjectId] = useState('all');
  const [topicId, setTopicId] = useState('all');
  const [count, setCount] = useState(10);
  const [customCount, setCustomCount] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const selectedSubject = SUBJECTS.find(s => s.id === subjectId);

  const availableQuestions = useMemo(() => {
    return questions.filter(q => {
      if (subjectId !== 'all' && q.subjectId !== subjectId) return false;
      if (topicId !== 'all' && q.topicId !== topicId) return false;
      return true;
    });
  }, [questions, subjectId, topicId]);

  const effectiveCount = useCustom
    ? Math.min(parseInt(customCount) || 0, availableQuestions.length)
    : Math.min(count, availableQuestions.length);

  const canStart = effectiveCount > 0 && availableQuestions.length > 0;

  const categoryLabel = useMemo(() => {
    if (subjectId === 'all') return 'Mixed (All Subjects)';
    const sName = SUBJECTS.find(s => s.id === subjectId)?.name || subjectId;
    if (topicId === 'all') return sName;
    const tName = selectedSubject?.topics.find(t => t.id === topicId)?.name?.replace(/^T-?\d+\s*[-–]?\s*/, '') || topicId;
    return `${sName} → ${tName}`;
  }, [subjectId, topicId, selectedSubject]);

  const handleStart = () => {
    const sampled = shuffle(availableQuestions).slice(0, effectiveCount);
    onStart({
      questions: sampled.map(q => ({ ...q, displayOptions: buildDisplayOptions(q) })),
      category: categoryLabel,
      subjectId,
      topicId,
    });
  };

  return (
    <div className="tm-setup animate-fade-in">
      <div className="tm-setup-header">
        <div className="tm-logo">🧪</div>
        <h1>Test Mode</h1>
        <p>Configure your test and challenge yourself</p>
      </div>

      <div className="tm-setup-card">
        <div className="tm-field-group">
          <label className="tm-label">📚 Subject</label>
          <select
            className="tm-select"
            value={subjectId}
            onChange={e => { setSubjectId(e.target.value); setTopicId('all'); }}
          >
            <option value="all">🌐 Mixed — All Subjects</option>
            {SUBJECTS.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="tm-field-group">
          <label className="tm-label">🗂️ Topic</label>
          <select
            className="tm-select"
            value={topicId}
            onChange={e => setTopicId(e.target.value)}
            disabled={subjectId === 'all'}
          >
            <option value="all">All Topics</option>
            {selectedSubject?.topics.map(t => (
              <option key={t.id} value={t.id}>
                {t.name.replace(/^T-?\d+\s*[-–]?\s*/, '')}
              </option>
            ))}
          </select>
        </div>

        <div className="tm-field-group">
          <label className="tm-label">🔢 Number of Questions</label>
          <div className="tm-count-chips">
            {COUNT_OPTIONS.map(n => (
              <button
                key={n}
                className={`tm-chip ${!useCustom && count === n ? 'active' : ''} ${n > availableQuestions.length ? 'disabled' : ''}`}
                onClick={() => { setCount(n); setUseCustom(false); }}
                disabled={n > availableQuestions.length}
              >
                {n}
              </button>
            ))}
            <button
              className={`tm-chip ${useCustom ? 'active' : ''}`}
              onClick={() => setUseCustom(true)}
            >
              Custom
            </button>
          </div>
          {useCustom && (
            <input
              className="tm-custom-count"
              type="number"
              min={1}
              max={availableQuestions.length}
              value={customCount}
              onChange={e => setCustomCount(e.target.value)}
              placeholder={`1–${availableQuestions.length}`}
              autoFocus
            />
          )}
        </div>

        {/* Summary strip */}
        <div className="tm-summary-strip">
          <div className="tm-summary-item">
            <span className="tm-summary-val">{availableQuestions.length}</span>
            <span className="tm-summary-label">Available</span>
          </div>
          <div className="tm-summary-sep">→</div>
          <div className="tm-summary-item">
            <span className="tm-summary-val accent">{canStart ? effectiveCount : 0}</span>
            <span className="tm-summary-label">Will be tested</span>
          </div>
          <div className="tm-summary-sep">|</div>
          <div className="tm-summary-item">
            <span className="tm-summary-val" style={{ fontSize: '0.9rem' }}>{categoryLabel}</span>
            <span className="tm-summary-label">Category</span>
          </div>
        </div>

        {availableQuestions.length === 0 && (
          <div className="tm-warn">⚠️ No questions found for this selection. Add questions to the Question Bank first.</div>
        )}

        <button
          className="tm-start-btn"
          onClick={handleStart}
          disabled={!canStart}
        >
          🚀 Start Test
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Phase: ACTIVE TEST
// ──────────────────────────────────────────────
function ActiveTest({ config, onEnd }) {
  const { questions } = config;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { qId: selectedOptionId }
  const [cardAnim, setCardAnim] = useState('');
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  const current = questions[currentIdx];
  const attemptedId = answers[current?.id];
  const isAttempted = !!attemptedId;
  const isCorrect = isAttempted && attemptedId === current?.correctAnswerId;
  const progress = ((currentIdx + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  const goToIndex = useCallback((newIdx, dir) => {
    setCardAnim(dir);
    setTimeout(() => { setCurrentIdx(newIdx); setCardAnim(''); }, 260);
  }, []);

  const goNext = useCallback(() => {
    if (currentIdx < questions.length - 1) goToIndex(currentIdx + 1, 'slide-left');
  }, [currentIdx, questions.length, goToIndex]);

  const goPrev = useCallback(() => {
    if (currentIdx > 0) goToIndex(currentIdx - 1, 'slide-right');
  }, [currentIdx, goToIndex]);

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

  const handleAnswer = useCallback((optId) => {
    if (isAttempted) return;
    setAnswers(prev => ({ ...prev, [current.id]: optId }));
    if (currentIdx < questions.length - 1) {
      setTimeout(() => goNext(), 500);
    }
  }, [isAttempted, current, currentIdx, questions.length, goNext]);

  const handleEndTest = () => {
    // Build result
    let correct = 0, wrong = 0;
    questions.forEach(q => {
      const ans = answers[q.id];
      if (ans) {
        if (ans === q.correctAnswerId) correct++;
        else wrong++;
      }
    });
    onEnd({
      ...config,
      totalQuestions: questions.length,
      attempted: answeredCount,
      correct,
      wrong,
      accuracy: answeredCount > 0 ? Math.round((correct / answeredCount) * 100) : 0,
      answersMap: answers,
    });
  };

  if (!current) return null;

  return (
    <div className="tm-active">
      {/* Top bar */}
      <div className="tm-topbar">
        <div className="tm-topbar-left">
          <span className="tm-mode-badge">🧪 Test Mode</span>
          <span className="tm-category-tag">{config.category}</span>
        </div>
        <div className="tm-topbar-center">
          <span className="tm-qcounter">Q {currentIdx + 1} / {questions.length}</span>
        </div>
        <div className="tm-topbar-right">
          <button className="tm-end-btn" onClick={() => setShowEndConfirm(true)}>
            End Test ✕
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="tm-progress-track">
        <div className="tm-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question card */}
      <div 
        className="tm-question-area"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={`tm-question-card ${cardAnim}`} key={current.id}>
          {/* Meta badges */}
          <div className="tm-q-meta">
            <span className="q-badge subject">{current.subjectName}</span>
            <span className="q-badge topic">{current.topicName?.replace(/^T-?\d+\s*[-–]?\s*/, '') || current.topicName}</span>
            {current.chapterName && (
              <span className="q-badge chapter">{current.chapterName?.replace(/^CH-\d+\s*/, '') || current.chapterName}</span>
            )}
          </div>

          <div className="tm-q-number">Q{currentIdx + 1}.</div>
          <div className="tm-q-text">{current.text}</div>

          <div className="tm-options">
            {current.displayOptions.map(opt => {
              let cls = 'tm-option';
              if (isAttempted) {
                if (opt.id === attemptedId) cls += ' selected';
                else cls += ' dimmed';
              } else {
                cls += ' interactive';
              }
              return (
                <div
                  key={opt.id}
                  className={cls}
                  onClick={() => handleAnswer(opt.id)}
                >
                  <span className="tm-opt-letter">{opt.letter}.</span>
                  <span className="tm-opt-text">{opt.text}</span>
                  {isAttempted && opt.id === attemptedId && (
                    <span className="tm-opt-icon">●</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="tm-nav-row">
          <button className="tm-nav-btn" onClick={goPrev} disabled={currentIdx === 0}>
            ◀ Prev
          </button>
          <div className="tm-dot-row">
            {questions.map((_, i) => (
              <span
                key={i}
                className={`tm-dot ${i === currentIdx ? 'active' : ''} ${answers[questions[i]?.id] ? 'answered' : ''}`}
                onClick={() => goToIndex(i, i > currentIdx ? 'slide-left' : 'slide-right')}
              />
            ))}
          </div>
          <button className="tm-nav-btn" onClick={goNext} disabled={currentIdx === questions.length - 1}>
            Next ▶
          </button>
        </div>
      </div>

      {/* End Confirm Modal */}
      {showEndConfirm && (
        <div className="tm-confirm-overlay">
          <div className="tm-confirm-card">
            <h3>🏁 End Test?</h3>
            <p>You've answered <strong>{answeredCount}</strong> of <strong>{questions.length}</strong> questions.</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Unanswered questions will be marked as skipped.</p>
            <div className="tm-confirm-actions">
              <button className="tm-btn-cancel" onClick={() => setShowEndConfirm(false)}>Continue Test</button>
              <button className="tm-btn-confirm" onClick={handleEndTest}>End & See Results</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// Phase: RESULT
// ──────────────────────────────────────────────
function ResultScreen({ result, onNewTest, onClose }) {
  const [showReview, setShowReview] = useState(false);
  const { totalQuestions, attempted, correct, wrong, accuracy, category, questions, answersMap } = result;
  const skipped = totalQuestions - attempted;

  const trendIcon = accuracy >= 80 ? '🏆' : accuracy >= 60 ? '👍' : accuracy >= 40 ? '⚡' : '📖';
  const trendMsg =
    accuracy >= 80 ? 'Outstanding performance!' :
    accuracy >= 60 ? 'Good job! Room to improve.' :
    accuracy >= 40 ? 'Keep practicing!' :
    'Review the weak areas and try again.';

  return (
    <div className="tm-result animate-fade-in">
      <div className="tm-result-header">
        <div className="tm-result-icon">{trendIcon}</div>
        <h2>Test Complete!</h2>
        <div className="tm-result-category">{category}</div>
        <div className="tm-result-date">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
      </div>

      <div className="tm-result-stats">
        <div className="tm-rstat total">
          <span className="tm-rstat-n">{totalQuestions}</span>
          <span className="tm-rstat-l">Total</span>
        </div>
        <div className="tm-rstat attempted">
          <span className="tm-rstat-n">{attempted}</span>
          <span className="tm-rstat-l">Attempted</span>
        </div>
        <div className="tm-rstat correct">
          <span className="tm-rstat-n">{correct}</span>
          <span className="tm-rstat-l">Correct</span>
        </div>
        <div className="tm-rstat wrong">
          <span className="tm-rstat-n">{wrong}</span>
          <span className="tm-rstat-l">Wrong</span>
        </div>
        {skipped > 0 && (
          <div className="tm-rstat skipped">
            <span className="tm-rstat-n">{skipped}</span>
            <span className="tm-rstat-l">Skipped</span>
          </div>
        )}
      </div>

      <div className="tm-accuracy-ring-wrapper">
        <div className="tm-accuracy-ring">
          <svg viewBox="0 0 120 120" width="160" height="160">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke={accuracy >= 70 ? '#3fb950' : accuracy >= 40 ? '#f0883e' : '#f85149'}
              strokeWidth="12"
              strokeDasharray={`${(accuracy / 100) * 314.16} 314.16`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          </svg>
          <div className="tm-accuracy-center">
            <span className="tm-accuracy-pct">{accuracy}%</span>
            <span className="tm-accuracy-lbl">Accuracy</span>
          </div>
        </div>
        <div className="tm-trend-msg">{trendMsg}</div>
      </div>

      {/* Bar */}
      {attempted > 0 && (
        <div className="tm-result-bar-wrap">
          <div className="tm-result-bar">
            <div className="tm-result-bar-correct" style={{ width: `${(correct / attempted) * 100}%` }} />
            <div className="tm-result-bar-wrong" style={{ width: `${(wrong / attempted) * 100}%` }} />
          </div>
          <div className="tm-result-bar-labels">
            <span style={{ color: '#3fb950' }}>✓ {correct} correct</span>
            <span style={{ color: '#f85149' }}>✗ {wrong} wrong</span>
          </div>
        </div>
      )}

      {/* Review toggle */}
      <button className="tm-review-toggle" onClick={() => setShowReview(p => !p)}>
        {showReview ? '▲ Hide Answer Review' : '📜 Review Answers'}
      </button>

      {showReview && (
        <div className="tm-review-list">
          {questions.map((q, i) => {
            const yourAns = answersMap[q.id];
            const isSkipped = !yourAns;
            const isQCorrect = yourAns === q.correctAnswerId;
            const correctLetter = q.displayOptions.find(o => o.id === q.correctAnswerId)?.letter;
            const yourLetter = yourAns ? q.displayOptions.find(o => o.id === yourAns)?.letter : null;
            return (
              <div key={q.id} className={`tm-review-item ${isSkipped ? 'skipped' : isQCorrect ? 'correct' : 'wrong'}`}>
                <div className="tm-review-num">Q{i + 1}</div>
                <div className="tm-review-body">
                  <div className="tm-review-text">{q.text}</div>
                  <div className="tm-review-ans">
                    {isSkipped ? (
                      <span className="tm-ans-skipped">⏭ Skipped</span>
                    ) : isQCorrect ? (
                      <span className="tm-ans-correct">✅ Correct — Option {correctLetter}</span>
                    ) : (
                      <>
                        <span className="tm-ans-wrong">✗ Your answer: Option {yourLetter}</span>
                        <span className="tm-ans-correct-hint"> | Correct: Option {correctLetter}</span>
                      </>
                    )}
                  </div>
                  {q.explanation && <div className="tm-review-exp">💡 {q.explanation}</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="tm-result-actions">
        <button className="tm-btn-new" onClick={onNewTest}>🔄 New Test</button>
        <button className="tm-btn-dash" onClick={onClose}>🏠 Dashboard</button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Root: TestMode
// ──────────────────────────────────────────────
export default function TestMode({ onClose }) {
  const [phase, setPhase] = useState('setup'); // 'setup' | 'active' | 'result'
  const [testConfig, setTestConfig] = useState(null);
  const [testResult, setTestResult] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loadingQ, setLoadingQ] = useState(true);

  // Load all questions once
  useEffect(() => {
    const q = query(collection(db, 'questionBank-v2'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setAllQuestions(list);
      setLoadingQ(false);
    }, err => { console.error(err); setLoadingQ(false); });
    return () => unsub();
  }, []);

  const handleStart = useCallback((config) => {
    setTestConfig(config);
    setPhase('active');
  }, []);

  const handleEnd = useCallback(async (result) => {
    setTestResult(result);
    setPhase('result');

    // Compute motivational message (same logic as ResultScreen)
    const { accuracy } = result;
    const motivationalMessage =
      accuracy >= 80 ? 'Outstanding performance!' :
      accuracy >= 60 ? 'Good job! Room to improve.' :
      accuracy >= 40 ? 'Keep practicing!' :
      'Review the weak areas and try again.';

    // Build a lightweight questions snapshot (no displayOptions — just core fields)
    const questionsSnapshot = result.questions.map(q => ({
      id: q.id,
      text: q.text,
      opt1: q.opt1 || '',
      opt2: q.opt2 || '',
      opt3: q.opt3 || '',
      correctAnswerId: q.correctAnswerId,
      explanation: q.explanation || '',
      subjectName: q.subjectName || '',
      topicName: q.topicName || '',
      chapterName: q.chapterName || '',
    }));

    // Save to Firestore
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const timeStr = today.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    try {
      await addDoc(collection(db, 'testResults'), {
        date: dateStr,
        timeStr,
        timestamp: serverTimestamp(),
        category: result.category,
        subjectId: result.subjectId,
        topicId: result.topicId,
        totalQuestions: result.totalQuestions,
        attempted: result.attempted,
        correct: result.correct,
        wrong: result.wrong,
        accuracy: result.accuracy,
        motivationalMessage,
        questionsSnapshot,
        answersMap: result.answersMap,
      });
    } catch (e) {
      console.error('Failed to save test result:', e);
    }
  }, []);


  const handleNewTest = useCallback(() => {
    setTestConfig(null);
    setTestResult(null);
    setPhase('setup');
  }, []);

  return (
    <div className="tm-overlay">
      {loadingQ ? (
        <div className="tm-loading">
          <div className="tm-spinner" />
          <span>Loading question bank…</span>
        </div>
      ) : phase === 'setup' ? (
        <SetupScreen questions={allQuestions} onStart={handleStart} />
      ) : phase === 'active' ? (
        <ActiveTest config={testConfig} onEnd={handleEnd} />
      ) : (
        <ResultScreen result={testResult} onNewTest={handleNewTest} onClose={onClose} />
      )}
    </div>
  );
}
