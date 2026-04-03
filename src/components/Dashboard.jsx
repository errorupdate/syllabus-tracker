import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import ProgressBar from './ProgressBar';

export default function Dashboard({ subjects, revisionData, onSelectView }) {
  const [qbStats, setQbStats] = useState({ total: 0, cs: 0, gp: 0 });
  const [testHistory, setTestHistory] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null); // test to review

  // Daily Goal state (localStorage)
  const [dailyGoal, setDailyGoal] = useState(() => {
    try { return parseInt(localStorage.getItem('daily-goal')) || 5; } catch { return 5; }
  });
  const [showGoalEditor, setShowGoalEditor] = useState(false);
  const [goalInput, setGoalInput] = useState(dailyGoal);

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
  let totalPdfs = 0, totalRevDone = 0, totalRevMax = 0, totalCovered = 0;
  
  // Track recently revised PDFs for a 'Recent Activity' section
  const recentPdfs = new Map();

  // ─── 7-Day activity chart data ───
  const DAY_MS = 24 * 60 * 60 * 1000;
  const weekDays = [];
  for (let d = 6; d >= 0; d--) {
    const dayStart = todayStart - d * DAY_MS;
    const dayEnd = dayStart + DAY_MS;
    const dt = new Date(dayStart);
    weekDays.push({
      label: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dt.getDay()],
      date: `${dt.getDate()}/${dt.getMonth()+1}`,
      start: dayStart,
      end: dayEnd,
      count: 0,
      isToday: d === 0,
    });
  }

  // ─── Streak calculation ───
  // Collect all unique days with revisions
  const revisionDays = new Set();

  const countActivity = (topic, chId, idx, pdfName) => {
    let tDone = 0;
    for (let r = 0; r < 5; r++) {
      const ts = revisionData[`${chId}-${idx}-r${r}`];
      if (ts) {
        tDone++;
        totalRevDone++;
        const key = `${chId}-${idx}`;

        // Track day for streak
        const dayKey = new Date(ts).toDateString();
        revisionDays.add(dayKey);

        // Count for 7-day chart
        for (const wd of weekDays) {
          if (ts >= wd.start && ts < wd.end) { wd.count++; break; }
        }

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
    let sPdfs = 0, sDone = 0, sCovered = 0;
    s.topics.forEach(t => { 
      let tPdfs = countPdfs(t);
      sPdfs += tPdfs; 
      
      let tDone = 0;
      let tCovered = 0;
      if (t.chapters) {
        for (const ch of t.chapters) {
          ch.pdfs.forEach((pdf, i) => { 
            let pDone = countActivity(t, ch.id, i, pdf); 
            tDone += pDone; 
            if (pDone > 0) tCovered++;
          });
        }
      } else if (t.pdfs) {
        t.pdfs.forEach((pdf, i) => { 
            let pDone = countActivity(t, t.id, i, pdf);
            tDone += pDone;
            if (pDone > 0) tCovered++;
        });
      }
      sDone += tDone;
      sCovered += tCovered;
    });
    totalPdfs += sPdfs; 
    totalRevMax += sPdfs * 5;
    totalCovered += sCovered;
    return { ...s, pdfCount: sPdfs, revDone: sDone, revMax: sPdfs * 5, coveredPdfs: sCovered, targetId: s.id };
  });

  const overallPct = totalRevMax > 0 ? Math.round((totalRevDone / totalRevMax) * 100) : 0;

  // ─── Compute streak ───
  let currentStreak = 0;
  {
    const todayStr = new Date(todayStart).toDateString();
    let checkDate = todayStart;
    // If no revision today, start from yesterday
    if (!revisionDays.has(todayStr)) {
      checkDate = todayStart - DAY_MS;
    }
    while (true) {
      const ds = new Date(checkDate).toDateString();
      if (revisionDays.has(ds)) {
        currentStreak++;
        checkDate -= DAY_MS;
      } else {
        break;
      }
    }
  }

  // Best streak (from localStorage)
  const storedBest = parseInt(localStorage.getItem('best-streak') || '0');
  const bestStreak = Math.max(storedBest, currentStreak);
  if (bestStreak > storedBest) {
    localStorage.setItem('best-streak', String(bestStreak));
  }

  // 7-day chart max
  const weekMax = Math.max(...weekDays.map(d => d.count), 1);

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

  // ─── Weakest topics from test data ───
  const topicAccMap = {}; // { topicName: { correct, total } }
  testHistory.forEach(t => {
    if (!t.questionsSnapshot || !t.answersMap) return;
    t.questionsSnapshot.forEach(q => {
      const name = q.topicName?.replace(/^T-?\d+\s*[-–]?\s*/, '') || q.topicName || 'Unknown';
      if (!topicAccMap[name]) topicAccMap[name] = { correct: 0, total: 0, topicId: q.topicId };
      topicAccMap[name].total++;
      if (t.answersMap[q.id] === q.correctAnswerId) topicAccMap[name].correct++;
    });
  });
  const weakTopics = Object.entries(topicAccMap)
    .map(([name, d]) => ({ name, accuracy: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0, total: d.total, correct: d.correct, topicId: d.topicId }))
    .filter(t => t.total >= 3) // only topics with enough data
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 4);

  // ─── Smart Motivational Banner ───
  const dailyGoalMet = todayRevisions >= dailyGoal;
  let bannerMsg = '', bannerIcon = '', bannerColor = '#94a3b8', bannerBg = 'rgba(148,163,184,0.06)';
  if (totalRevDone === 0) {
    bannerIcon = '🚀'; bannerMsg = 'Welcome! Start your first revision to begin tracking progress.'; bannerColor = '#8b5cf6'; bannerBg = 'rgba(139,92,246,0.08)';
  } else if (dailyGoalMet) {
    bannerIcon = '🎉'; bannerMsg = `Daily goal smashed! You've done ${todayRevisions} revisions today. Keep the momentum!`; bannerColor = '#22c55e'; bannerBg = 'rgba(34,197,94,0.08)';
  } else if (todayRevisions === 0) {
    bannerIcon = '⏰'; bannerMsg = `You haven't revised anything today. Your streak is ${currentStreak} day${currentStreak !== 1 ? 's' : ''} — don't let it break!`; bannerColor = '#f59e0b'; bannerBg = 'rgba(245,158,11,0.08)';
  } else if (todayRevisions > 0 && !dailyGoalMet) {
    const remaining = dailyGoal - todayRevisions;
    bannerIcon = '💪'; bannerMsg = `${remaining} more revision${remaining !== 1 ? 's' : ''} to hit your daily goal. You got this!`; bannerColor = '#3b82f6'; bannerBg = 'rgba(59,130,246,0.08)';
  }

  // ─── Daily Action Plan ───
  // Build a rich per-topic map: { id, name, subjectName, pct, done, pdfCount, targetId }
  const allTopicStats = [];
  subjects.forEach(s => {
    s.topics.forEach(t => {
      const pdfCount = countPdfs(t);
      const done = getRevDone(t);
      const max = pdfCount * 5;
      const pct = max > 0 ? Math.round((done / max) * 100) : 0;
      const targetId = t.chapters && t.chapters.length > 0 ? t.chapters[0].id : t.id;
      // Count how many PDFs have been touched (≥1 rev)
      let touchedPdfs = 0;
      if (t.chapters) {
        for (const ch of t.chapters) {
          ch.pdfs.forEach((_, i) => {
            for (let r = 0; r < 5; r++) if (revisionData[`${ch.id}-${i}-r${r}`]) { touchedPdfs++; break; }
          });
        }
      } else if (t.pdfs) {
        t.pdfs.forEach((_, i) => {
          for (let r = 0; r < 5; r++) if (revisionData[`${t.id}-${i}-r${r}`]) { touchedPdfs++; break; }
        });
      }
      // Check if revised today
      const revisedToday = todayList.some(it => it.targetId === (t.chapters?.[0]?.id || t.id));
      allTopicStats.push({ id: t.id, name: t.name.replace(/^T-?\d+\s*[-–]?\s*/, ''), subjectName: s.name, pct, done, max, pdfCount, touchedPdfs, targetId, revisedToday });
    });
  });

  // Build today's test topic set (topics tested today)
  const testedTopicNamesSet = new Set();
  testHistory.forEach(t => {
    if (!t.timestamp) return;
    const tDate = t.timestamp.toDate ? t.timestamp.toDate() : new Date(t.timestamp);
    if (tDate.getTime() >= todayStart) {
      if (t.questionsSnapshot) t.questionsSnapshot.forEach(q => testedTopicNamesSet.add(q.topicName));
    }
  });

  // Build daily action plan tasks (priority scored)
  const dailyPlan = [];

  // 1. FIX WEAK — lowest accuracy topics from tests (< 80%) not already tested today
  weakTopics.filter(w => w.accuracy < 80 && !testedTopicNamesSet.has(w.name)).slice(0, 2).forEach(w => {
    dailyPlan.push({
      type: 'weak',
      icon: '🔴',
      tag: 'Fix Weak',
      tagColor: '#f85149',
      tagBg: 'rgba(248,81,73,0.12)',
      title: w.name,
      subtitle: `Test accuracy: ${w.accuracy}% (${w.correct}/${w.total}) — Revise & re-test this topic`,
      targetId: w.topicId,
      priority: 10 - Math.floor(w.accuracy / 10),
    });
  });

  // 2. UNTOUCHED topics — 0% progress, not revised today, pick highest-PDF topics across both subjects
  const untouched = allTopicStats
    .filter(t => t.pct === 0 && t.pdfCount > 0 && !t.revisedToday)
    .sort((a, b) => b.pdfCount - a.pdfCount);
  // Pick 1 from CS and 1 from GP to ensure variety
  const untouchedCS = untouched.filter(t => t.subjectName === 'Computer Science')[0];
  const untouchedGP = untouched.filter(t => t.subjectName === 'General Paper')[0];
  [untouchedCS, untouchedGP].filter(Boolean).forEach(t => {
    dailyPlan.push({
      type: 'start',
      icon: '🆕',
      tag: 'Start Fresh',
      tagColor: '#8b5cf6',
      tagBg: 'rgba(139,92,246,0.12)',
      title: t.name,
      subtitle: `${t.subjectName} · ${t.pdfCount} PDFs — Not started yet, begin R1 now`,
      targetId: t.targetId,
      priority: 7,
    });
  });

  // 3. IN-PROGRESS — started but < 50% and not fully done today, pick 2
  allTopicStats
    .filter(t => t.pct > 0 && t.pct < 50 && !t.revisedToday)
    .sort((a, b) => b.touchedPdfs - a.touchedPdfs)
    .slice(0, 2)
    .forEach(t => {
      dailyPlan.push({
        type: 'continue',
        icon: '▶️',
        tag: 'Continue',
        tagColor: '#3b82f6',
        tagBg: 'rgba(59,130,246,0.12)',
        title: t.name,
        subtitle: `${t.subjectName} · ${t.pct}% done (${t.touchedPdfs}/${t.pdfCount} PDFs) — Keep going!`,
        targetId: t.targetId,
        priority: 6,
      });
    });

  // 4. TAKE TEST — topics with ≥ 20% revision progress not tested recently
  const testedTopicIdsRecent = new Set();
  testHistory.slice(0, 5).forEach(t => {
    if (t.questionsSnapshot) t.questionsSnapshot.forEach(q => testedTopicIdsRecent.add(q.topicId));
  });
  allTopicStats
    .filter(t => t.pct >= 20 && !testedTopicIdsRecent.has(t.id) && !testedTopicNamesSet.has(t.name))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 1)
    .forEach(t => {
      dailyPlan.push({
        type: 'test',
        icon: '🧪',
        tag: 'Take Test',
        tagColor: '#14b8a6',
        tagBg: 'rgba(20,184,166,0.12)',
        title: t.name,
        subtitle: `${t.subjectName} · ${t.pct}% revised — Validate your knowledge with a test`,
        targetId: 'questionBank',
        priority: 8,
      });
    });

  // 5. REVIEW DONE — topics at ≥ 80%, prompt for next revision cycle
  allTopicStats
    .filter(t => t.pct >= 80 && !t.revisedToday)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 1)
    .forEach(t => {
      dailyPlan.push({
        type: 'review',
        icon: '🔄',
        tag: 'Review',
        tagColor: '#f59e0b',
        tagBg: 'rgba(245,158,11,0.12)',
        title: t.name,
        subtitle: `${t.subjectName} · ${t.pct}% — Almost complete! Push to 100% or start next cycle`,
        targetId: t.targetId,
        priority: 5,
      });
    });

  // Sort by priority desc and cap at 6 cards
  dailyPlan.sort((a, b) => b.priority - a.priority);
  const topDailyPlan = dailyPlan.slice(0, 6);

  // Today's summary sentence
  const todayDoneTopicNames = [...new Set(todayList.map(i => i.topicName.replace(/^T-?\d+\s*[-–]?\s*/, '')))];
  const planDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  // ─── Daily Goal handlers ───
  const saveGoal = () => {
    const val = Math.max(1, Math.min(50, parseInt(goalInput) || 5));
    setDailyGoal(val);
    localStorage.setItem('daily-goal', String(val));
    setShowGoalEditor(false);
  };

  // Daily goal ring SVG params
  const goalPct = Math.min(100, dailyGoal > 0 ? Math.round((todayRevisions / dailyGoal) * 100) : 0);
  const ringRadius = 38;
  const ringCirc = 2 * Math.PI * ringRadius;
  const ringOffset = ringCirc - (goalPct / 100) * ringCirc;

  return (
    <div className="dashboard">

      {/* ══ HERO HEADER ══ */}
      <div className="db-hero animate-slide-up">
        <div className="db-hero-left">
          <div className="db-hero-greeting">
            {todayRevisions === 0 ? '👋 Hey, ready to study?' : dailyGoalMet ? '🎉 Goal crushed today!' : `💪 ${dailyGoal - todayRevisions} more to go`}
          </div>
          <h1 className="db-hero-title">BPSC Revision Tracker</h1>
          <p className="db-hero-sub">{planDate}</p>
        </div>
        <div className="db-hero-right">
          {/* Streak pill */}
          <div className="db-hero-pill streak-pill">
            <span className="pill-icon">🔥</span>
            <div>
              <div className="pill-val">{currentStreak}</div>
              <div className="pill-lbl">day streak</div>
            </div>
          </div>
          {/* Goal ring – compact */}
          <div className="db-hero-pill goal-pill" onClick={() => { setGoalInput(dailyGoal); setShowGoalEditor(s => !s); }} style={{ cursor: 'pointer' }}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4"/>
              <circle cx="22" cy="22" r="18" fill="none"
                stroke={dailyGoalMet ? '#22c55e' : '#8b5cf6'} strokeWidth="4" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 18}
                strokeDashoffset={2 * Math.PI * 18 - (goalPct / 100) * 2 * Math.PI * 18}
                style={{ transform: 'rotate(-90deg)', transformOrigin: '22px 22px', transition: 'stroke-dashoffset 0.8s cubic-bezier(0.34,1.56,0.64,1)' }}
              />
              <text x="22" y="26" textAnchor="middle" fill={dailyGoalMet ? '#22c55e' : '#e2e8f0'} fontSize="11" fontWeight="800" fontFamily="Inter,sans-serif">{todayRevisions}</text>
            </svg>
            <div>
              <div className="pill-val" style={{ color: dailyGoalMet ? '#22c55e' : 'inherit' }}>{goalPct}%</div>
              <div className="pill-lbl">daily goal</div>
            </div>
          </div>
          {showGoalEditor && (
            <div className="hero-goal-editor">
              <input type="number" min="1" max="50" value={goalInput} onChange={e => setGoalInput(e.target.value)} className="goal-input" />
              <button onClick={saveGoal} className="goal-save-btn">Set</button>
            </div>
          )}
        </div>
      </div>

      {/* ══ QUICK STATS ROW ══ */}
      <div className="db-quick-stats animate-slide-up delay-1">
        <div className="qs-card purple" onClick={() => onSelectView('questionBank')} style={{ cursor: 'pointer' }}>
          <div className="qs-val">{qbStats.total}</div>
          <div className="qs-lbl">Questions</div>
        </div>
        <div className="qs-card teal" onClick={() => onSelectView('testDashboard')} style={{ cursor: 'pointer' }}>
          <div className="qs-val">{totalTests}</div>
          <div className="qs-lbl">Tests Done</div>
        </div>
        <div className="qs-card blue">
          <div className="qs-val">{totalCovered}<span className="qs-denom">/{totalPdfs}</span></div>
          <div className="qs-lbl">PDFs Covered</div>
        </div>
        <div className="qs-card amber">
          <div className="qs-val">{overallPct}<span className="qs-denom">%</span></div>
          <div className="qs-lbl">Overall Progress</div>
        </div>
      </div>

      {/* ══ OVERALL PROGRESS BAR ══ */}
      <div className="db-progress-bar-row animate-slide-up delay-1">
        <div className="db-progress-labels">
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Revision Coverage</span>
          <span style={{ color: 'var(--accent-teal)', fontSize: '0.78rem', fontWeight: 700 }}>{totalRevDone} / {totalRevMax} revisions · {totalCovered}/{totalPdfs} PDFs started</span>
        </div>
        <ProgressBar value={totalRevDone} max={totalRevMax} size="md" />
      </div>

      {/* ══ WHAT TO DO TODAY ══ */}
      {topDailyPlan.length > 0 && (
        <div className="daily-plan-section animate-slide-up delay-2">
          <div className="daily-plan-header">
            <div className="daily-plan-title-row">
              <span className="daily-plan-icon">📋</span>
              <div>
                <h2 className="daily-plan-title">What To Do Today</h2>
                {todayDoneTopicNames.length > 0 && (
                  <p className="daily-plan-date">✅ Done: {todayDoneTopicNames.slice(0, 2).join(', ')}{todayDoneTopicNames.length > 2 ? ` +${todayDoneTopicNames.length - 2} more` : ''}</p>
                )}
              </div>
            </div>
          </div>
          <div className="daily-plan-scroll">
            {topDailyPlan.map((task, i) => (
              <div
                key={i}
                className={`daily-plan-card dp-${task.type}`}
                onClick={() => task.targetId && onSelectView(task.targetId)}
                style={{ cursor: task.targetId ? 'pointer' : 'default', animationDelay: `${i * 55}ms` }}
              >
                <div className="dp-card-top">
                  <span className="dp-tag" style={{ color: task.tagColor, background: task.tagBg }}>
                    {task.icon} {task.tag}
                  </span>
                  <span className="dp-arrow">→</span>
                </div>
                <div className="dp-card-title">{task.title}</div>
                <div className="dp-card-sub">{task.subtitle}</div>
                <div className="dp-card-bar" style={{ background: task.tagBg }}>
                  <div className="dp-card-bar-fill" style={{
                    background: task.tagColor,
                    width: task.type === 'weak' ? `${weakTopics.find(w => w.name === task.title)?.accuracy || 0}%`
                      : task.type === 'continue' ? `${allTopicStats.find(t => t.name === task.title)?.pct || 0}%`
                      : task.type === 'review' ? `${allTopicStats.find(t => t.name === task.title)?.pct || 0}%`
                      : '100%',
                    opacity: (task.type === 'start' || task.type === 'test') ? 0 : 1
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ ACTIVITY + SUBJECT COLUMNS ══ */}
      <div className="db-body-grid animate-slide-up delay-3">

        {/* LEFT: Activity chart + Subject Progress */}
        <div className="db-body-main">

          {/* 7-Day Activity */}
          <div className="db-panel glass-card">
            <div className="db-panel-header">
              <span className="db-panel-title">📅 7-Day Activity</span>
              <span className="chart-total">{weekDays.reduce((s, d) => s + d.count, 0)} revisions</span>
            </div>
            <div className="activity-bars">
              {weekDays.map((d, i) => (
                <div key={i} className="activity-bar-col">
                  <div className="bar-value">{d.count > 0 ? d.count : ''}</div>
                  <div className="bar-track">
                    <div className={`bar-fill ${d.isToday ? 'today' : ''} ${d.count === 0 ? 'empty' : ''}`}
                      style={{ height: `${d.count > 0 ? Math.max(12, (d.count / weekMax) * 100) : 4}%` }} />
                  </div>
                  <div className={`bar-label ${d.isToday ? 'today' : ''}`}>{d.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Progress */}
          <div className="db-panel">
            <div className="db-panel-header">
              <span className="db-panel-title">📂 Subject Progress</span>
            </div>
            <div className="subject-cards">
              {subjectStats.map(s => (
                <div
                  key={s.id}
                  className="subject-card glass-card interactive"
                  onClick={() => s.targetId && onSelectView(s.targetId)}
                  style={{ cursor: s.targetId ? 'pointer' : 'default' }}
                >
                  <div className="subject-card-header">
                    <h3>{s.name}</h3>
                    <span className="topic-count">{s.topics.length} topics</span>
                  </div>
                  <div className="subject-card-stats">
                    <span>{s.coveredPdfs} / {s.pdfCount} PDFs</span>
                    <span style={{ color: 'var(--accent-teal)', fontWeight: 700 }}>{Math.round((s.revDone / s.revMax) * 100) || 0}%</span>
                  </div>
                  <ProgressBar value={s.revDone} max={s.revMax} size="md" />
                </div>
              ))}
            </div>
          </div>

          {/* Test History */}
          <div className="db-panel">
            <div className="db-panel-header">
              <span className="db-panel-title">🧪 Test History</span>
              <button onClick={() => onSelectView('testDashboard')} className="db-panel-action-btn">Full Analytics →</button>
            </div>
            {testHistory.length === 0 ? (
              <div style={{ color: '#64748b', fontSize: '0.9rem', background: '#111827', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px 24px' }}>
                No tests yet. Use <strong style={{ color: '#fbbf24' }}>Test Mode</strong> from the sidebar!
              </div>
            ) : (
              <>
                {(() => {
                  const last3 = testHistory.slice(0, 3).map(t => t.accuracy);
                  let msg = '', icon = '', color = '#94a3b8';
                  if (last3.length >= 2) {
                    if (last3[0] > last3[last3.length - 1]) { icon = '📈'; msg = 'Accuracy is improving! Keep it up!'; color = '#3fb950'; }
                    else if (last3[0] < last3[last3.length - 1]) { icon = '📉'; msg = 'Accuracy dipping — review weak topics!'; color = '#f85149'; }
                    else { icon = '➡️'; msg = 'Consistent performance lately.'; color = '#fbbf24'; }
                  }
                  return msg ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}33`, borderRadius: '12px', padding: '10px 16px', marginBottom: '12px', color }}>
                      <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{msg}</span>
                    </div>
                  ) : null;
                })()}
                <div className="test-history-table">
                  <div className="test-history-head">
                    <span>Date</span><span>Category</span><span className="text-center">Total</span><span className="text-center">✓</span><span className="text-center">Skip</span><span className="text-center">Acc</span><span />
                  </div>
                  {testHistory.slice(0, 8).map((t, i) => {
                    const accColor = t.accuracy >= 70 ? '#3fb950' : t.accuracy >= 40 ? '#f0883e' : '#f85149';
                    return (
                      <div key={t.id} className="test-history-row" style={{ cursor: t.questionsSnapshot ? 'pointer' : 'default' }} onClick={() => t.questionsSnapshot && setSelectedTest(t)}>
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
                  <p style={{ color: '#475569', fontSize: '0.72rem', marginTop: '8px', textAlign: 'center' }}>📋 Tap a row to review that test</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* RIGHT: Weak topics + Recent Activity + Needs Attention + QB/Test stats */}
        <div className="db-body-side">

          {/* QB & Test mini stats */}
          <div className="db-panel glass-card db-mini-stats-panel">
            <div className="db-mini-stat" onClick={() => onSelectView('questionBank')} style={{ cursor: 'pointer' }}>
              <span className="db-mini-icon">📝</span>
              <div>
                <div className="db-mini-val" style={{ color: 'var(--accent-purple)' }}>{qbStats.cs} <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>CS</span></div>
                <div className="db-mini-val" style={{ color: '#3fb950' }}>{qbStats.gp} <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>GP</span></div>
                <div className="db-mini-lbl">Question Bank</div>
              </div>
            </div>
            <div className="db-mini-divider" />
            <div className="db-mini-stat" onClick={() => onSelectView('testDashboard')} style={{ cursor: 'pointer' }}>
              <span className="db-mini-icon">🎯</span>
              <div>
                <div className="db-mini-val" style={{ color: avgTestAccuracy >= 70 ? '#4ade80' : avgTestAccuracy >= 40 ? '#fb923c' : '#f85149' }}>{avgTestAccuracy}%</div>
                <div className="db-mini-lbl">Avg Accuracy</div>
              </div>
            </div>
          </div>

          {/* Weak Topics */}
          {weakTopics.length > 0 && (
            <div className="db-panel glass-card">
              <div className="db-panel-header">
                <span className="db-panel-title">📉 Weak Topics</span>
              </div>
              <div className="attention-list">
                {weakTopics.map((t, i) => (
                  <div key={i} className="attention-item glass-card weak-topic-item interactive"
                    onClick={() => t.topicId && onSelectView(t.topicId)}
                    style={{ cursor: t.topicId ? 'pointer' : 'default', padding: '10px 14px' }}>
                    <div className="weak-topic-row">
                      <span className="attention-name">{t.name}</span>
                      <span className="weak-accuracy" style={{ color: t.accuracy < 50 ? '#f85149' : t.accuracy < 70 ? '#f0883e' : '#fbbf24' }}>{t.accuracy}%</span>
                    </div>
                    <div className="weak-bar-track">
                      <div className="weak-bar-fill" style={{ width: `${t.accuracy}%`, background: t.accuracy < 50 ? 'linear-gradient(90deg,#f85149,#fb7185)' : t.accuracy < 70 ? 'linear-gradient(90deg,#f0883e,#fbbf24)' : 'linear-gradient(90deg,#fbbf24,#a3e635)' }} />
                    </div>
                    <span style={{ fontSize: '0.65rem', color: '#475569' }}>{t.correct}/{t.total} correct</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          {(todayList.length > 0 || yesterdayList.length > 0) && (
            <div className="db-panel glass-card">
              <div className="db-panel-header">
                <span className="db-panel-title">⚡ Recent Activity</span>
              </div>
              <div className="attention-list">
                {[...todayList, ...yesterdayList].slice(0, 5).map((item, i) => (
                  <div key={i} className={`attention-item glass-card list-item-compact interactive ${item.type === 'today' ? 'highlight' : ''}`}
                    onClick={() => item.targetId && onSelectView(item.targetId)}
                    style={{ cursor: item.targetId ? 'pointer' : 'default', padding: '9px 12px' }}>
                    <div className="activity-details">
                      <span className="attention-name">{item.pdfName.replace(/\.pdf$/i, '')}</span>
                      <span className="activity-subtext">{item.topicName.replace(/^T-?\d+\s*[-–]?\s*/, '')} (R{item.rev}) · {item.type === 'today' ? 'Today' : 'Yesterday'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Needs Attention */}
          <div className="db-panel glass-card">
            <div className="db-panel-header">
              <span className="db-panel-title">🎯 Needs Attention</span>
            </div>
            <div className="attention-list">
              {topicProgress.slice(0, 5).map((t, i) => (
                <div key={i} className="attention-item glass-card interactive"
                  onClick={() => t.targetId && onSelectView(t.targetId)}
                  style={{ cursor: t.targetId ? 'pointer' : 'default', padding: '10px 14px' }}>
                  <span className="attention-name">{t.name.replace(/^T-?\d+\s*[-–]?\s*/, '')}</span>
                  <ProgressBar value={t.done} max={t.max} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
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
