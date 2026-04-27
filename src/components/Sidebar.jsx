import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

export default function Sidebar({ subjects, revisionData, activeView, onSelectView, onSelectDashboard, mobileOpen, onCloseMobile, collapsed, onOpenTestMode, onMouseEnter, onMouseLeave }) {
  const [expanded, setExpanded] = useState({});
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  function getTopicProgress(topic) {
    let total = 0, done = 0;
    const items = topic.chapters
      ? topic.chapters.flatMap(ch => ch.pdfs)
      : (topic.pdfs || []);
    items.forEach((_, i) => {
      const pdfId = topic.chapters
        ? (() => { let idx = 0; for (const ch of topic.chapters) { if (i < idx + ch.pdfs.length) return `${ch.id}-${i - idx}`; idx += ch.pdfs.length; } return ''; })()
        : `${topic.id}-${i}`;
      for (let r = 0; r < 5; r++) {
        total++;
        if (revisionData[`${pdfId}-r${r}`]) done++;
      }
    });
    return { total, done };
  }

  function getSubjectProgress(subject) {
    let total = 0, done = 0;
    for (const topic of subject.topics) {
      const p = getTopicProgress(topic);
      total += p.total; done += p.done;
    }
    return { total, done };
  }

  function getOverallProgress() {
    let total = 0, done = 0;
    for (const s of subjects) {
      const p = getSubjectProgress(s);
      total += p.total; done += p.done;
    }
    return { total, done };
  }

  const overall = getOverallProgress();

  return (
    <aside
      className={`sidebar ${mobileOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="sidebar-header">
        <div className="sidebar-logo" onClick={onSelectDashboard}>
          <span className="logo-icon">📚</span>
          <h2>BPSC TRE 4.0</h2>
        </div>
        <button className="mobile-close" onClick={onCloseMobile}>✕</button>
      </div>

      <div className="sidebar-progress">
        <ProgressBar value={overall.done} max={overall.total} label="Overall Progress" size="sm" />
      </div>



      <nav className="sidebar-nav">
        <div
          className={`nav-item dashboard-btn ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => { onSelectDashboard(); onCloseMobile(); }}
        >
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </div>
        
        {/* Notes Hub button */}
        <div
          className={`nav-item dashboard-btn ${activeView === 'notesHub' ? 'active' : ''}`}
          onClick={() => { onSelectView('notesHub'); onCloseMobile(); }}
          style={{ marginTop: '8px', background: activeView === 'notesHub' ? 'var(--accent-bg)' : 'transparent', color: activeView === 'notesHub' ? 'var(--accent)' : 'inherit' }}
        >
          <span className="nav-icon">📖</span>
          <span>Notes Hub</span>
        </div>

        <div
          className={`nav-item dashboard-btn ${activeView === 'historical-timeline' ? 'active' : ''}`}
          onClick={() => { onSelectView('historical-timeline'); onCloseMobile(); }}
          style={{ marginTop: '8px', background: activeView === 'historical-timeline' ? 'var(--accent-bg)' : 'transparent', color: activeView === 'historical-timeline' ? 'var(--accent)' : 'inherit' }}
        >
          <span className="nav-icon">⏳</span>
          <span>Timeline</span>
        </div>

        <div
          className={`nav-item dashboard-btn ${activeView === 'questionBank' ? 'active' : ''}`}
          onClick={() => { onSelectView('questionBank'); onCloseMobile(); }}
          style={{ marginTop: '8px', background: activeView === 'questionBank' ? 'var(--accent-bg)' : 'transparent', color: activeView === 'questionBank' ? 'var(--accent)' : 'inherit' }}
        >
          <span className="nav-icon">📝</span>
          <span>Question Bank</span>
        </div>

        <div
          className={`nav-item dashboard-btn ${activeView === 'pyq' ? 'active' : ''}`}
          onClick={() => { onSelectView('pyq'); onCloseMobile(); }}
          style={{ marginTop: '8px', background: activeView === 'pyq' ? 'var(--accent-bg)' : 'transparent', color: activeView === 'pyq' ? 'var(--accent)' : 'inherit' }}
        >
          <span className="nav-icon">🔍</span>
          <span>PYQs</span>
        </div>

        {/* Test Mode button */}
        <div
          className="nav-item dashboard-btn test-mode-btn"
          onClick={onOpenTestMode}
          style={{ marginTop: '8px' }}
        >
          <span className="nav-icon">🧪</span>
          <span>Test Mode</span>
        </div>

        {/* Test Dashboard button */}
        <div
          className={`nav-item dashboard-btn test-dash-btn`}
          onClick={() => { onSelectView('testDashboard'); onCloseMobile(); }}
          style={{
            marginTop: '4px',
            background: activeView === 'testDashboard' ? 'rgba(59,130,246,0.12)' : 'transparent',
            color: activeView === 'testDashboard' ? '#93c5fd' : 'inherit',
            borderLeft: activeView === 'testDashboard' ? '3px solid #3b82f6' : '3px solid transparent',
          }}
        >
          <span className="nav-icon">📈</span>
          <span>Test Analytics</span>
        </div>

        {subjects.map(subject => {
          const sp = getSubjectProgress(subject);
          const isExpanded = expanded[subject.id];
          return (
            <div key={subject.id} className="nav-group">
              <div className="nav-item subject-item" onClick={() => toggle(subject.id)}>
                <span className={`chevron ${isExpanded ? 'expanded' : ''}`}>›</span>
                <span className="nav-text">{subject.name}</span>
                <span className="nav-badge">{sp.total > 0 ? Math.round((sp.done / sp.total) * 100) : 0}%</span>
              </div>
              {isExpanded && (
                <div className="nav-children">
                  {subject.topics.map(topic => {
                    const tp = getTopicProgress(topic);
                    const topicExpanded = expanded[topic.id];
                    const hasChapters = topic.chapters && topic.chapters.length > 0;
                    return (
                      <div key={topic.id} className="nav-topic-group">
                        <div
                          className={`nav-item topic-item ${activeView === topic.id ? 'active' : ''}`}
                          onClick={() => {
                            if (hasChapters) {
                              toggle(topic.id);
                            } else {
                              onSelectView(topic.id);
                              onCloseMobile();
                            }
                          }}
                        >
                          {hasChapters && <span className={`chevron small ${topicExpanded ? 'expanded' : ''}`}>›</span>}
                          <span className="nav-text">{topic.name.replace(/^T-?\d+\s*[-–]?\s*/, '')}</span>
                          <span className="nav-badge-sm">{tp.total > 0 ? Math.round((tp.done / tp.total) * 100) : 0}%</span>
                        </div>
                        {hasChapters && topicExpanded && (
                          <div className="nav-chapters">
                            {topic.chapters.map(ch => (
                              <div
                                key={ch.id}
                                className={`nav-item chapter-item ${activeView === ch.id ? 'active' : ''}`}
                                onClick={() => { onSelectView(ch.id); onCloseMobile(); }}
                              >
                                <span className="nav-text">{ch.name.replace(/^CH-\d+\s*/, '')}</span>
                                <span className="ch-count">{ch.pdfs.length}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      
      
      <div className="sidebar-footer">
        <button className="nav-item db-logout-btn" onClick={toggleTheme} style={{ width: '100%', marginBottom: '8px' }}>
          <span style={{ marginRight: '8px' }}>{theme === 'light' ? '🌙' : '☀️'}</span>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <button className="nav-item db-logout-btn" onClick={() => { if(window.confirm('Reset all local data? This won\'t affect your Firebase data.')) { localStorage.clear(); window.location.reload(); } }} style={{ width: '100%' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
          Reset Local Data
        </button>
        <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.6rem', color: 'var(--text-muted)', opacity: 0.5 }}>
          BPSC TRE 4.0 v2.0
        </div>
      </div>
    </aside>
  );
}
