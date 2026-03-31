import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import './TestDashboard.css';

// ─── Helpers ────────────────────────────────────────────
function avg(arr) {
  if (!arr.length) return 0;
  return Math.round(arr.reduce((s, v) => s + v, 0) / arr.length);
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d} ${months[parseInt(m,10)-1]}`;
}

function getWeekStart() {
  const d = new Date();
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function getOptionText(q, optId) {
  if (!optId) return null;
  if (optId === 'optD') return 'More than one of the above';
  if (optId === 'optE') return 'None of the above';
  return q[optId] || optId;
}

// ─── Accuracy Sparkline (SVG) ─────────────────────────────
function AccuracyChart({ data }) {
  if (data.length < 2) return (
    <div className="tdb-chart-empty">📊 Take at least 2 tests to see trend</div>
  );

  const W = 100, H = 60;
  const pad = 6;
  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (W - pad * 2),
    y: pad + (1 - v / 100) * (H - pad * 2),
    v,
  }));

  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const fillD = pathD + ` L ${pts[pts.length-1].x.toFixed(1)} ${H} L ${pts[0].x.toFixed(1)} ${H} Z`;

  const colorForVal = v => v >= 70 ? '#4ade80' : v >= 40 ? '#fb923c' : '#f87171';
  const lastColor = colorForVal(pts[pts.length-1].v);

  return (
    <div className="tdb-chart-svg-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lastColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={lastColor} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[25, 50, 75].map(pct => {
          const y = pad + (1 - pct / 100) * (H - pad * 2);
          return <line key={pct} x1={pad} y1={y} x2={W - pad} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />;
        })}
        {/* Fill */}
        <path d={fillD} fill="url(#chartFill)" />
        {/* Line */}
        <path d={pathD} fill="none" stroke={lastColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Dots */}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill={colorForVal(p.v)}
            stroke="rgba(8,12,23,0.8)" strokeWidth="1" />
        ))}
      </svg>
      {/* X labels */}
      <div className="tdb-chart-xlabels">
        {data.map((_, i) => (
          <span key={i} className="tdb-chart-xlabel">{i + 1}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Test Review Modal (reused here) ──────────────────────
function TestReviewModal({ test, onClose }) {
  const { date, timeStr, category, accuracy, correct, wrong, totalQuestions, attempted,
    motivationalMessage, questionsSnapshot = [], answersMap = {} } = test;
  const accColor = accuracy >= 70 ? '#4ade80' : accuracy >= 40 ? '#fb923c' : '#f87171';
  const skipped = totalQuestions - attempted;

  return (
    <div className="tdb-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="tdb-modal-card">
        <div className="tdb-modal-header">
          <div>
            <div className="tdb-modal-meta">{date}{timeStr ? ` · ${timeStr}` : ''}</div>
            <div className="tdb-modal-title">{category}</div>
            {motivationalMessage && (
              <div className="tdb-modal-msg" style={{ color: accColor }}>
                {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '👍' : accuracy >= 40 ? '⚡' : '📖'} {motivationalMessage}
              </div>
            )}
          </div>
          <button className="tdb-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="tdb-modal-stats">
          {[['Total', totalQuestions, '#94a3b8'], ['Correct', correct, '#4ade80'],
            ['Wrong', wrong, '#f87171'], ['Skipped', skipped, '#fb923c'],
            ['Accuracy', `${accuracy}%`, accColor]].map(([lbl, val, clr]) => (
            <div key={lbl} className="tdb-modal-stat">
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: clr }}>{val}</div>
              <div style={{ fontSize: '0.66rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{lbl}</div>
            </div>
          ))}
        </div>

        <div className="tdb-modal-questions">
          {questionsSnapshot.length === 0 ? (
            <p style={{ color: '#475569', textAlign: 'center', padding: '20px 0' }}>No question data recorded for this test.</p>
          ) : questionsSnapshot.map((q, idx) => {
            const yourOptId = answersMap[q.id];
            const isSkipped = !yourOptId;
            const isCorrect = yourOptId === q.correctAnswerId;
            const yourText = getOptionText(q, yourOptId);
            const correctText = getOptionText(q, q.correctAnswerId);
            const bc = isSkipped ? '#fb923c' : isCorrect ? '#4ade80' : '#f87171';
            return (
              <div key={q.id} className="tdb-modal-q" style={{ borderLeft: `3px solid ${bc}` }}>
                <div className="tdb-modal-q-badges">
                  <span className="tdb-badge purple">{q.subjectName}</span>
                  <span className="tdb-badge blue">{q.topicName?.replace(/^T-?\d+\s*[-–]?\s*/, '') || q.topicName}</span>
                </div>
                <div className="tdb-modal-q-num">Q{idx + 1}.</div>
                <div className="tdb-modal-q-text">{q.text}</div>
                <div className="tdb-modal-q-ans">
                  {isSkipped ? (
                    <span style={{ color: '#fb923c', fontWeight: 600 }}>⏭ Skipped — Correct: {correctText}</span>
                  ) : isCorrect ? (
                    <span style={{ color: '#4ade80', fontWeight: 600 }}>✅ Correct — {correctText}</span>
                  ) : (
                    <>
                      <span style={{ color: '#f87171' }}>✗ Your answer: {yourText}</span>
                      <span style={{ color: '#4ade80', fontWeight: 600 }}> · Correct: {correctText}</span>
                    </>
                  )}
                </div>
                {q.explanation && <div className="tdb-modal-q-exp">💡 {q.explanation}</div>}
              </div>
            );
          })}
        </div>

        <div style={{ padding: '12px 20px 20px', textAlign: 'center' }}>
          <button onClick={onClose} className="tdb-close-btn">Close Review</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main TestDashboard ───────────────────────────────────
export default function TestDashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState(null);
  const [expandedSubject, setExpandedSubject] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'testResults'), orderBy('timestamp', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setHistory(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, err => { console.error(err); setLoading(false); });
    return () => unsub();
  }, []);

  const stats = useMemo(() => {
    if (!history.length) return null;
    const accuracies = history.map(t => t.accuracy);
    const totalQ = history.reduce((s, t) => s + (t.totalQuestions || 0), 0);
    const totalCorrect = history.reduce((s, t) => s + (t.correct || 0), 0);
    const totalAttempted = history.reduce((s, t) => s + (t.attempted || 0), 0);
    const weekStart = getWeekStart();
    const thisWeek = history.filter(t => {
      if (!t.date) return false;
      const [y, m, d] = t.date.split('-');
      return new Date(y, m - 1, d) >= weekStart;
    }).length;

    // Subject breakdown
    const subjectMap = {};
    history.forEach(t => {
      if (!t.subjectId || t.subjectId === 'all') return;
      if (!subjectMap[t.subjectId]) subjectMap[t.subjectId] = { name: t.category?.split(' →')[0] || t.subjectId, accs: [], topics: {} };
      subjectMap[t.subjectId].accs.push(t.accuracy);
      
      const topicName = t.topicId === 'all' ? 'Mixed' : (t.category?.split(' → ')[1] || t.category || 'Topic');
      if (!subjectMap[t.subjectId].topics[topicName]) {
        subjectMap[t.subjectId].topics[topicName] = { count: 0, accs: [] };
      }
      subjectMap[t.subjectId].topics[topicName].count++;
      subjectMap[t.subjectId].topics[topicName].accs.push(t.accuracy);
    });
    const subjectStats = Object.values(subjectMap).map(s => ({
      name: s.name,
      avg: avg(s.accs),
      count: s.accs.length,
      topics: Object.entries(s.topics).map(([tName, tData]) => ({
        name: tName,
        count: tData.count,
        avg: avg(tData.accs)
      })).sort((a, b) => b.count - a.count)
    })).sort((a, b) => b.avg - a.avg);

    // Trend (last 10, chronological)
    const trendData = [...history].slice(0, 10).reverse().map(t => t.accuracy);

    // Best streak of ≥60% accuracy
    let streak = 0, maxStreak = 0, curStreak = 0;
    [...history].reverse().forEach(t => {
      if (t.accuracy >= 60) { curStreak++; maxStreak = Math.max(maxStreak, curStreak); }
      else curStreak = 0;
    });
    // current streak (from most recent)
    for (const t of history) {
      if (t.accuracy >= 60) streak++;
      else break;
    }

    return {
      total: history.length,
      avgAcc: avg(accuracies),
      bestAcc: Math.max(...accuracies),
      worstAcc: Math.min(...accuracies),
      overallAcc: totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0,
      totalQ,
      totalCorrect,
      totalAttempted,
      thisWeek,
      trendData,
      subjectStats,
      streak,
      maxStreak,
    };
  }, [history]);

  if (loading) return (
    <div className="tdb-loading">
      <div className="tdb-spinner" />
      <span>Loading test stats…</span>
    </div>
  );

  return (
    <div className="tdb-wrap">
      <div className="tdb-page-header">
        <div>
          <h1 className="tdb-title">📊 Test Dashboard</h1>
          <p className="tdb-subtitle">Track your testing performance and improvement</p>
        </div>
      </div>

      {!stats ? (
        <div className="tdb-empty">
          <div className="tdb-empty-icon">🧪</div>
          <h3>No tests yet!</h3>
          <p>Head to <strong>Test Mode</strong> in the sidebar to take your first test. Results will appear here automatically.</p>
        </div>
      ) : (
        <>
          {/* ── Overview cards ── */}
          <div className="tdb-overview-grid">
            <div className="tdb-card glow-purple">
              <span className="tdb-card-val">{stats.total}</span>
              <span className="tdb-card-lbl">Tests Taken</span>
            </div>
            <div className="tdb-card glow-blue">
              <span className="tdb-card-val" style={{ color: stats.avgAcc >= 70 ? '#4ade80' : stats.avgAcc >= 40 ? '#fb923c' : '#f87171' }}>
                {stats.avgAcc}%
              </span>
              <span className="tdb-card-lbl">Average Accuracy</span>
            </div>
            <div className="tdb-card glow-green">
              <span className="tdb-card-val" style={{ color: '#4ade80' }}>{stats.bestAcc}%</span>
              <span className="tdb-card-lbl">Best Score</span>
            </div>
            <div className="tdb-card glow-amber">
              <span className="tdb-card-val">{stats.totalQ}</span>
              <span className="tdb-card-lbl">Questions Seen</span>
            </div>
            <div className="tdb-card glow-teal">
              <span className="tdb-card-val">{stats.totalCorrect}</span>
              <span className="tdb-card-lbl">Correct Answers</span>
            </div>
            <div className="tdb-card">
              <span className="tdb-card-val">{stats.thisWeek}</span>
              <span className="tdb-card-lbl">Tests This Week</span>
            </div>
            <div className="tdb-card">
              <span className="tdb-card-val" style={{ color: '#f87171' }}>{stats.worstAcc}%</span>
              <span className="tdb-card-lbl">Lowest Score</span>
            </div>
            <div className="tdb-card glow-purple">
              <span className="tdb-card-val">{stats.overallAcc}%</span>
              <span className="tdb-card-lbl">Overall Accuracy</span>
            </div>
          </div>

          {/* ── Streak + trend row ── */}
          <div className="tdb-mid-row">
            {/* Streak */}
            <div className="tdb-streak-card">
              <div className="tdb-streak-header">
                <span className="tdb-streak-icon">🔥</span>
                <div>
                  <div className="tdb-streak-title">Current Streak</div>
                  <div className="tdb-streak-sub">Tests with ≥60% accuracy</div>
                </div>
              </div>
              <div className="tdb-streak-nums">
                <div className="tdb-streak-stat">
                  <span className="tdb-streak-big">{stats.streak}</span>
                  <span className="tdb-streak-lbl">Current</span>
                </div>
                <div className="tdb-streak-div" />
                <div className="tdb-streak-stat">
                  <span className="tdb-streak-big" style={{ color: '#fbbf24' }}>{stats.maxStreak}</span>
                  <span className="tdb-streak-lbl">Best Ever</span>
                </div>
              </div>
            </div>

            {/* Accuracy trend */}
            <div className="tdb-trend-card">
              <div className="tdb-section-label">📈 Accuracy Trend (last {Math.min(10, stats.trendData.length)} tests)</div>
              <AccuracyChart data={stats.trendData} />
            </div>
          </div>

          {/* ── Subject breakdown + history ── */}
          <div className="tdb-bottom-row">
            {/* Subject breakdown */}
            {stats.subjectStats.length > 0 && (
              <div className="tdb-subject-card">
                <div className="tdb-section-label">📚 Subject Breakdown</div>
                <div className="tdb-subject-list">
                  {stats.subjectStats.map(s => {
                    const barColor = s.avg >= 70 ? '#4ade80' : s.avg >= 40 ? '#fb923c' : '#f87171';
                    return (
                      <div key={s.name} className={`tdb-subject-row ${expandedSubject === s.name ? 'expanded' : ''}`}>
                        <div 
                          className="tdb-subject-main" 
                          onClick={() => setExpandedSubject(prev => prev === s.name ? null : s.name)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="tdb-subject-info">
                            <span className="tdb-subject-name">
                              {s.name} <span style={{ fontSize: '0.65rem', color: '#64748b', marginLeft: '6px' }}>{expandedSubject === s.name ? '▲' : '▼'}</span>
                            </span>
                            <span className="tdb-subject-count">{s.count} test{s.count > 1 ? 's' : ''}</span>
                          </div>
                          <div className="tdb-bar-row">
                            <div className="tdb-bar-track">
                              <div className="tdb-bar-fill" style={{ width: `${s.avg}%`, background: barColor }} />
                            </div>
                            <span className="tdb-bar-val" style={{ color: barColor }}>{s.avg}%</span>
                          </div>
                        </div>

                        {expandedSubject === s.name && s.topics && (
                          <div className="tdb-subject-topics">
                            {s.topics.map(t => {
                              const tColor = t.avg >= 70 ? '#4ade80' : t.avg >= 40 ? '#fb923c' : '#f87171';
                              return (
                                <div key={t.name} className="tdb-topic-row">
                                  <div className="tdb-topic-info">
                                    <span className="tdb-topic-name">{t.name === 'Mixed' ? '🔀 Mixed Topics' : `📄 ${t.name}`}</span>
                                    <span className="tdb-topic-count">{t.count} test{t.count > 1 ? 's' : ''}</span>
                                  </div>
                                  <div className="tdb-topic-acc" style={{ color: tColor }}>{t.avg}%</div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* History */}
            <div className="tdb-history-card">
              <div className="tdb-section-label">🗂️ Test History</div>
              <div className="tdb-history-table">
                <div className="tdb-history-head">
                  <span>Date & Time</span>
                  <span>Category</span>
                  <span>Score</span>
                  <span>Acc</span>
                  <span />
                </div>
                {history.map((t, i) => {
                  const accColor = t.accuracy >= 70 ? '#4ade80' : t.accuracy >= 40 ? '#fb923c' : '#f87171';
                  const hasReview = !!t.questionsSnapshot;
                  return (
                    <div
                      key={t.id}
                      className={`tdb-history-row ${hasReview ? 'clickable' : ''}`}
                      onClick={() => hasReview && setSelectedTest(t)}
                    >
                      <span className="tdb-hist-date">
                        {formatDate(t.date)}
                        {t.timeStr && <span className="tdb-hist-time">{t.timeStr}</span>}
                      </span>
                      <span className="tdb-hist-cat">{t.category}</span>
                      <span className="tdb-hist-score">{t.correct}/{t.totalQuestions}</span>
                      <span className="tdb-hist-acc" style={{ color: accColor }}>{t.accuracy}%</span>
                      <span className="tdb-hist-icon">{hasReview ? '📋' : ''}</span>
                    </div>
                  );
                })}
              </div>
              {history.some(t => t.questionsSnapshot) && (
                <p className="tdb-hint">📋 Click any highlighted row to review its questions</p>
              )}
            </div>
          </div>
        </>
      )}

      {selectedTest && (
        <TestReviewModal test={selectedTest} onClose={() => setSelectedTest(null)} />
      )}
    </div>
  );
}
