import { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function Sidebar({ subjects, revisionData, activeView, onSelectView, onSelectDashboard, mobileOpen, onCloseMobile }) {
  const [expanded, setExpanded] = useState({});

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
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo" onClick={onSelectDashboard}>
          <span className="logo-icon">📚</span>
          <h2>BPSC Tracker</h2>
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
        
        <div
          className={`nav-item dashboard-btn ${activeView === 'pyq' ? 'active' : ''}`}
          onClick={() => { onSelectView('pyq'); onCloseMobile(); }}
          style={{ marginTop: '8px', background: activeView === 'pyq' ? 'var(--accent-bg)' : 'transparent', color: activeView === 'pyq' ? 'var(--accent)' : 'inherit' }}
        >
          <span className="nav-icon">🔍</span>
          <span>Previous Year Questions</span>
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
    </aside>
  );
}
