import { useState, useEffect, useCallback } from 'react';
import { SUBJECTS } from './data';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PDFList from './components/PDFList';
import PYQPage from './PYQPage';
import './index.css';

const STORAGE_KEY = 'bpsc-revision-data';

import PasswordLock from './components/PasswordLock';

function loadData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch { return {}; }
}

function App() {
  const [revisionData, setRevisionData] = useState(loadData);
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(revisionData));
  }, [revisionData]);

  const toggleRevision = useCallback((key) => {
    setRevisionData(prev => ({
      ...prev,
      [key]: prev[key] ? null : Date.now()
    }));
  }, []);

  // Find the current view content
  let content = null;
  if (activeView === 'dashboard') {
    content = <Dashboard subjects={SUBJECTS} revisionData={revisionData} />;
  } else if (activeView === 'pyq') {
    content = <PYQPage />;
  } else {
    // Look for matching topic or chapter
    for (const subject of SUBJECTS) {
      for (const topic of subject.topics) {
        if (topic.id === activeView) {
          content = (
            <PDFList
              title={topic.name}
              pdfs={topic.pdfs || []}
              idPrefix={topic.id}
              revisionData={revisionData}
              onToggle={toggleRevision}
            />
          );
          break;
        }
        if (topic.chapters) {
          for (const ch of topic.chapters) {
            if (ch.id === activeView) {
              content = (
                <PDFList
                  title={ch.name}
                  pdfs={ch.pdfs}
                  idPrefix={ch.id}
                  revisionData={revisionData}
                  onToggle={toggleRevision}
                />
              );
              break;
            }
          }
        }
        if (content) break;
      }
      if (content) break;
    }
  }

  return (
    <PasswordLock>
      <div className="app-layout">
        <Sidebar
          subjects={SUBJECTS}
          revisionData={revisionData}
          activeView={activeView}
          onSelectView={setActiveView}
          onSelectDashboard={() => setActiveView('dashboard')}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />
        {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)} />}
        <main className="main-content">
          <header className="topbar">
            <button className="hamburger" onClick={() => setMobileOpen(true)}>☰</button>
            <span className="topbar-title">BPSC TRE 4.0 Revision Tracker</span>
          </header>
          <div className="content-area">
            {content}
          </div>
        </main>
      </div>
    </PasswordLock>
  );
}

export default App;
