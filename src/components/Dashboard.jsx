import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import ProgressBar from './ProgressBar';

export default function Dashboard({ subjects, revisionData, onSelectView }) {
  const [qbStats, setQbStats] = useState({ total: 0, cs: 0, gp: 0 });
  const [testHistory, setTestHistory] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null); // test to review

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'questionBank-v2'), (snap) => {
      let total = 0, cs = 0, gp = 0;
      snap.forEach(doc => {
        const d = doc.data();
        total++;
        if (d.subjectId === 'cs') cs++;
        else if (d.subjectId === 'gp') gp++;
      });
      setQbStats({ total, cs, gp });
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'testResults'), orderBy('timestamp', 'desc'), limit(10));
    const unsub = onSnapshot(q, snap => {
      setTestHistory(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => console.error('testResults fetch:', err));
    return () => unsub();
  }, []);
  function countPdfs(topic) {
    if (topic.chapters) return topic.chapters.reduce((s, ch) => s + ch.pdfs.length, 0);
    return (topic.pdfs || []).length;
  }

  function getRevDone(topic) {
    let done = 0;
    if (topic.chapters) {
      for (const ch of topic.chapters) {
        ch.pdfs.forEach((_, i) => {
          for (let r = 0; r < 5; r++) if (revisionData[`${ch.id}-${i}-r${r}`]) done++;
        });
      }
    } else if (topic.pdfs) {
      topic.pdfs.forEach((_, i) => {
        for (let r = 0; r < 5; r++) if (revisionData[`${topic.id}-${i}-r${r}`]) done++;
      });
    }
    return done;
  }

  // Calculate Today and Yesterday stats
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterdayStart = todayStart - (24 * 60 * 60 * 1000);

  let todayRevisions = 0;
  let yesterdayRevisions = 0;
  let totalPdfs = 0, totalRevDone = 0, totalRevMax = 0;
  
  // Track recently revised PDFs for a 'Recent Activity' section
  const recentPdfs = new Map();

  const countActivity = (topic, chId, idx, pdfName) => {
    let tDone = 0;
    for (let r = 0; r < 5; r++) {
      const ts = revisionData[`${chId}-${idx}-r${r}`];
      if (ts) {
        tDone++;
        totalRevDone++;
        const key = `${chId}-${idx}`;
        if (ts >= todayStart) {
          todayRevisions++;
          if (!recentPdfs.has(key) || recentPdfs.get(key).ts < ts) {
            recentPdfs.set(key, { topicName: topic.name, pdfName, ts, type: 'today', rev: r + 1, targetId: chId });
          }
        } else if (ts >= yesterdayStart && ts < todayStart) {
          yesterdayRevisions++;
          if (!recentPdfs.has(key) || recentPdfs.get(key).ts < ts) {
            recentPdfs.set(key, { topicName: topic.name, pdfName, ts, type: 'yesterday', rev: r + 1, targetId: chId });
          }
        }
      }
    }
    return tDone;
  };

  const subjectStats = subjects.map(s => {
    let sPdfs = 0, sDone = 0;
    s.topics.forEach(t => { 
      let tPdfs = countPdfs(t);
      sPdfs += tPdfs; 
      
      let tDone = 0;
      if (t.chapters) {
        for (const ch of t.chapters) {
          ch.pdfs.forEach((pdf, i) => { tDone += countActivity(t, ch.id, i, pdf); });
        }
      } else if (t.pdfs) {
        t.pdfs.forEach((pdf, i) => { tDone += countActivity(t, t.id, i, pdf); });
      }
      sDone += tDone;
    });
    totalPdfs += sPdfs; 
    totalRevMax += sPdfs * 5;
    return { ...s, pdfCount: sPdfs, revDone: sDone, revMax: sPdfs * 5, targetId: s.id };
  });

  const overallPct = totalRevMax > 0 ? Math.round((totalRevDone / totalRevMax) * 100) : 0;

  // Find least-revised topics
  const topicProgress = [];
  subjects.forEach(s => {
    s.topics.forEach(t => {
      const pdfCount = countPdfs(t);
      const done = getRevDone(t);
      const max = pdfCount * 5;
      const targetId = t.chapters && t.chapters.length > 0 ? t.chapters[0].id : t.id;
      topicProgress.push({ name: t.name, pct: max > 0 ? Math.round((done / max) * 100) : 0, done, max, targetId });
    });
  });
  topicProgress.sort((a, b) => a.pct - b.pct);
  
  const todayList = Array.from(recentPdfs.values())
    .filter(item => item.type === 'today')
    .sort((a, b) => b.ts - a.ts);

  const yesterdayList = Array.from(recentPdfs.values())
    .filter(item => item.type === 'yesterday')
    .sort((a, b) => b.ts - a.ts);

  // Compute test analytics for the dashboard
  const totalTests = testHistory.length;
  let totalTestAttempted = 0;
  let totalTestCorrect = 0;
  testHistory.forEach(t => {
    totalTestAttempted += t.attempted || 0;
    totalTestCorrect += t.correct || 0;
  });
  const avgTestAccuracy = totalTestAttempted > 0 ? Math.round((totalTestCorrect / totalTestAttempted) * 100) : 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📖 BPSC Revision Tracker</h1>
        <p className="subtitle">Track your revision progress across all subjects</p>
      </div>

      {/* ── Top Overview Cards ── */}
      <div className="stats-grid animate-slide-up delay-1">
        <div className="stat-card glow-purple" onClick={() => onSelectView('questionBank')} style={{ cursor: 'pointer' }}>
          <div className="stat-number">{qbStats.total}</div>
          <div className="stat-label">Total Questions</div>
        </div>
        <div className="stat-card glow-teal" onClick={() => onSelectView('testDashboard')} style={{ cursor: 'pointer' }}>
          <div className="stat-number">{totalTests}</div>
          <div className="stat-label">Tests Taken</div>
        </div>
        <div className="stat-card glow-blue">
          <div className="stat-number">{totalPdfs}</div>
          <div className="stat-label">Total PDFs</div>
        </div>
        <div className="stat-card glow-amber">
          <div className="stat-number">{totalRevDone}</div>
          <div className="stat-label">Total Revs Done</div>
        </div>
      </div>

      <div className="stats-grid-secondary animate-slide-up delay-2">
        <div className="stat-card glass-card fill-card">
           <div className="card-row">
             <span className="stat-label">Overall Revision Progress</span>
             <span className="stat-number-sm glow-text-green">{overallPct}% ({totalRevDone}/{totalRevMax})</span>
           </div>
           <ProgressBar value={totalRevDone} max={totalRevMax} size="md" />
        </div>
      </div>

      {/* ── Question Bank & Test Stats ── */}
      <div className="dashboard-qb-test-grid animate-slide-up delay-3">
        
        {/* Question Bank */}
        <div className="stat-card glass-card fill-card interactive" onClick={() => onSelectView('questionBank')} style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
          <div className="card-row">
            <span className="stat-label">📝 Question Bank</span>
            <span className="stat-number-sm glow-text-purple">Browse →</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '100px', background: 'rgba(0,0,0,0.15)', borderRadius: '10px', padding: '12px 10px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Computer Science</span>
              <span style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', fontWeight: 'bold', color: 'var(--accent)' }}>{qbStats.cs}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '100px', background: 'rgba(0,0,0,0.15)', borderRadius: '10px', padding: '12px 10px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>General Paper</span>
              <span style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', fontWeight: 'bold', color: '#3fb950' }}>{qbStats.gp}</span>
            </div>
          </div>
        </div>

        {/* Test Analytics Summary */}
        <div className="stat-card glass-card fill-card interactive" onClick={() => onSelectView('testDashboard')} style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
          <div className="card-row">
            <span className="stat-label">🧪 Testing Performance</span>
            <span className="stat-number-sm" style={{ color: '#93c5fd' }}>Full Analytics →</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '100px', background: 'rgba(0,0,0,0.15)', borderRadius: '10px', padding: '12px 10px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Avg Accuracy</span>
              <span style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', fontWeight: 'bold', color: avgTestAccuracy >= 70 ? '#4ade80' : avgTestAccuracy >= 40 ? '#fb923c' : '#f85149' }}>{avgTestAccuracy}%</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '100px', background: 'rgba(0,0,0,0.15)', borderRadius: '10px', padding: '12px 10px' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Questions Hit</span>
              <span style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', fontWeight: 'bold', color: '#e2e8f0' }}>{totalTestAttempted}</span>
            </div>
          </div>
        </div>

      </div>

      <div className="dashboard-columns animate-slide-up delay-4">
        <div className="dashboard-section main-col">
          <h2>📂 Subject Progress</h2>
          <div className="subject-cards">
            {subjectStats.map(s => (
              <div 
                key={s.id} 
                className="subject-card glass-card interactive"
                onClick={() => s.targetId && onSelectView(s.targetId)}
                style={{ cursor: s.targetId ? 'pointer' : 'default', transition: 'transform 0.2s' }}
                onMouseEnter={e => s.targetId && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={e => s.targetId && (e.currentTarget.style.transform = 'none')}
              >
                <div className="subject-card-header">
                  <h3>{s.name}</h3>
                  <span className="topic-count">{s.topics.length} topics</span>
                </div>
                <div className="subject-card-stats">
                  <span>{s.pdfCount} PDFs</span>
                  <span>{s.revDone} / {s.revMax} revs</span>
                </div>
                <ProgressBar value={s.revDone} max={s.revMax} size="md" />
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section side-col">
          {(todayList.length > 0 || yesterdayList.length > 0) && (
            <div className="side-panel-group">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>⚡ Recent Activity</h2>
              <div className="attention-list">
                {[...todayList, ...yesterdayList].slice(0, 6).map((item, i) => (
                  <div 
                    key={i} 
                    className={`attention-item glass-card list-item-compact interactive ${item.type === 'today' ? 'highlight' : ''}`}
                    onClick={() => item.targetId && onSelectView(item.targetId)}
                    style={{ cursor: item.targetId ? 'pointer' : 'default', transition: 'transform 0.2s', padding: '10px 14px' }}
                    onMouseEnter={e => item.targetId && (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={e => item.targetId && (e.currentTarget.style.transform = 'none')}
                  >
                    <div className="activity-details">
                      <span className="attention-name">{item.pdfName.replace(/\.pdf$/i, '')}</span>
                      <span className="activity-subtext">{item.topicName.replace(/^T-?\d+\s*[-–]?\s*/, '')} (R{item.rev}) · {item.type === 'today' ? 'Today' : 'Yesterday'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`side-panel-group ${(todayList.length > 0 || yesterdayList.length > 0) ? 'mt-6' : ''}`}>
            <h2>🎯 Needs Attention</h2>
            <div className="attention-list">
              {topicProgress.slice(0, 5).map((t, i) => (
                <div 
                  key={i} 
                  className="attention-item glass-card interactive"
                  onClick={() => t.targetId && onSelectView(t.targetId)}
                  style={{ cursor: t.targetId ? 'pointer' : 'default', transition: 'transform 0.2s', padding: '12px 16px' }}
                  onMouseEnter={e => t.targetId && (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={e => t.targetId && (e.currentTarget.style.transform = 'none')}
                >
                  <span className="attention-name">{t.name.replace(/^T-?\d+\s*[-–]?\s*/, '')}</span>
                  <ProgressBar value={t.done} max={t.max} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Test History & Trend ── */}
      <div className="dashboard-section animate-slide-up delay-5" style={{ marginTop: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ margin: 0 }}>🧪 Test History</h2>
          <button 
            onClick={() => onSelectView('testDashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: 'rgba(139,92,246,0.1)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.18)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.1)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)'; }}
          >
             <span>📊</span> Full Analytics
          </button>
        </div>

        {testHistory.length === 0 ? (
          <div style={{ color: '#64748b', fontSize: '0.9rem', background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px 24px' }}>
            No tests taken yet. Hit <strong style={{ color: '#fbbf24' }}>Test Mode</strong> from the sidebar to start!
          </div>
        ) : (
          <>
            {/* Trend message (based on last 3) */}
            {(() => {
              const last3 = testHistory.slice(0, 3).map(t => t.accuracy);
              let msg = '', icon = '', color = '#94a3b8';
              if (last3.length >= 2) {
                const improving = last3.every((v, i) => i === 0 || v <= last3[i - 1]);
                const declining = last3.every((v, i) => i === 0 || v >= last3[i - 1]);
                if (improving && last3[0] > last3[last3.length - 1]) {
                  icon = '📈'; msg = 'Your accuracy is improving! Keep it up!'; color = '#3fb950';
                } else if (declining && last3[0] < last3[last3.length - 1]) {
                  icon = '📉'; msg = 'Accuracy is dipping — review your weak topics!'; color = '#f85149';
                } else {
                  icon = '➡️'; msg = 'Consistent performance across recent tests.'; color = '#fbbf24';
                }
              }
              return msg ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}33`, borderRadius: '12px', padding: '12px 18px', marginBottom: '16px', color }}>
                  <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>{msg}</span>
                </div>
              ) : null;
            })()}

            {/* History — card layout for mobile, table for desktop */}
            <div className="test-history-table">
              <div className="test-history-head">
                <span>Date</span><span>Category</span><span className="text-center">Total</span><span className="text-center">Correct</span><span className="text-center">Skip</span><span className="text-center">Acc</span><span />
              </div>
              {testHistory.slice(0, 8).map((t, i) => {
                const accColor = t.accuracy >= 70 ? '#3fb950' : t.accuracy >= 40 ? '#f0883e' : '#f85149';
                return (
                  <div key={t.id}
                    className="test-history-row"
                    style={{ cursor: t.questionsSnapshot ? 'pointer' : 'default' }}
                    onClick={() => t.questionsSnapshot && setSelectedTest(t)}
                  >
                    <span className="th-date">{t.date}{t.timeStr ? <><br /><span className="th-time">{t.timeStr}</span></> : ''}</span>
                    <span className="th-category">{t.category}</span>
                    <span className="text-center th-stat">{t.totalQuestions}</span>
                    <span className="text-center th-correct">{t.correct}</span>
                    <span className="text-center th-skip">{t.totalQuestions - t.attempted}</span>
                    <span className="text-center th-acc" style={{ color: accColor }}>{t.accuracy}%</span>
                    <span className="text-center th-icon">{t.questionsSnapshot ? '📋' : ''}</span>
                  </div>
                );
              })}
            </div>
            {testHistory.some(t => t.questionsSnapshot) && (
              <p style={{ color: '#475569', fontSize: '0.75rem', marginTop: '8px', textAlign: 'center' }}>📋 Click any row to review questions from that test</p>
            )}
          </>
        )}
      </div>

      {/* ── Test Review Modal ── */}
      {selectedTest && (
        <TestReviewModal test={selectedTest} onClose={() => setSelectedTest(null)} />
      )}
    </div>
  );
}

// ────────────────────────────────────────
// Helper: get displayed text for an optionId
// ────────────────────────────────────────
function getOptionText(q, optId) {
  if (!optId) return null;
  if (optId === 'optD') return 'More than one of the above';
  if (optId === 'optE') return 'None of the above';
  return q[optId] || optId;
}

// ────────────────────────────────────────
// Test Review Modal
// ────────────────────────────────────────
function TestReviewModal({ test, onClose }) {
  const { date, timeStr, category, accuracy, correct, wrong, totalQuestions, attempted,
          motivationalMessage, questionsSnapshot = [], answersMap = {} } = test;

  const accColor = accuracy >= 70 ? '#3fb950' : accuracy >= 40 ? '#f0883e' : '#f85149';
  const skipped = totalQuestions - attempted;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '24px 12px 48px' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: '#0f1629', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', width: '100%', maxWidth: '680px', animation: 'fadeInUp 0.3s ease' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>{date}{timeStr ? ` · ${timeStr}` : ''}</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#e2e8f0' }}>{category}</div>
            {motivationalMessage && (
              <div style={{ marginTop: '8px', fontSize: '0.88rem', color: accColor, fontWeight: 600 }}>
                {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '👍' : accuracy >= 40 ? '⚡' : '📖'} {motivationalMessage}
              </div>
            )}
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#94a3b8', fontSize: '1rem', width: '32px', height: '32px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {[['Total', totalQuestions, '#94a3b8'], ['Correct', correct, '#3fb950'], ['Wrong', wrong, '#f85149'], ['Skipped', skipped, '#f0883e'], ['Accuracy', `${accuracy}%`, accColor]].map(([lbl, val, clr]) => (
            <div key={lbl} style={{ flex: 1, padding: '14px 8px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: clr }}>{val}</div>
              <div style={{ fontSize: '0.68rem', color: '#475569', fontWeight: 600, textTransform: 'uppercase', marginTop: '2px' }}>{lbl}</div>
            </div>
          ))}
        </div>

        {/* Question review list */}
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {questionsSnapshot.length === 0 ? (
            <p style={{ color: '#475569', textAlign: 'center' }}>No question data recorded.</p>
          ) : questionsSnapshot.map((q, idx) => {
            const yourOptId = answersMap[q.id];
            const isSkipped = !yourOptId;
            const isCorrect = yourOptId === q.correctAnswerId;
            const yourText = getOptionText(q, yourOptId);
            const correctText = getOptionText(q, q.correctAnswerId);
            const borderColor = isSkipped ? '#f0883e' : isCorrect ? '#3fb950' : '#f85149';
            return (
              <div key={q.id} style={{ background: '#111827', border: `1px solid rgba(255,255,255,0.05)`, borderLeft: `3px solid ${borderColor}`, borderRadius: '12px', padding: '14px 16px' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', padding: '2px 7px', borderRadius: '999px' }}>{q.subjectName}</span>
                  <span style={{ fontSize: '0.7rem', color: '#93c5fd', background: 'rgba(59,130,246,0.1)', padding: '2px 7px', borderRadius: '999px' }}>{q.topicName?.replace(/^T-?\d+\s*[-–]?\s*/, '') || q.topicName}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600, marginBottom: '4px' }}>Q{idx + 1}.</div>
                <div style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.55, marginBottom: '10px' }}>{q.text}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.82rem' }}>
                  {isSkipped ? (
                    <span style={{ color: '#f0883e', fontWeight: 600 }}>⏭ Skipped — Correct: {correctText}</span>
                  ) : isCorrect ? (
                    <span style={{ color: '#3fb950', fontWeight: 600 }}>✅ Correct — {correctText}</span>
                  ) : (
                    <>
                      <span style={{ color: '#f85149' }}>✗ Your answer: {yourText}</span>
                      <span style={{ color: '#3fb950', fontWeight: 600 }}>✓ Correct: {correctText}</span>
                    </>
                  )}
                  {q.explanation && (
                    <div style={{ color: '#64748b', fontStyle: 'italic', fontSize: '0.78rem', marginTop: '4px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>💡 {q.explanation}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ padding: '12px 20px 20px', textAlign: 'center' }}>
          <button onClick={onClose} style={{ padding: '10px 28px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Close Review</button>
        </div>
      </div>
    </div>
  );
}

