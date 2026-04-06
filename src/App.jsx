import { useState, useEffect, useCallback, useRef } from 'react';
import { SUBJECTS } from './data';
import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PDFList from './components/PDFList';
import PYQPage from './PYQPage';
import QuestionBank from './components/QuestionBank';
import TestMode from './components/TestMode/TestMode';
import TestDashboard from './components/TestDashboard';
import SubjectView from './components/SubjectView';
import StudyNotes from './components/StudyNotes';
import ChatBot from './components/ChatBot';

import './index.css';

import PasswordLock from './components/PasswordLock';
import InstallPrompt from './components/InstallPrompt';

const DOC_ID = 'user-revisions';

function App() {
  const [revisionData, setRevisionData] = useState({});
  const [activeView, setActiveView] = useState('dashboard');
  const [viewHistory, setViewHistory] = useState(['dashboard']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testModeOpen, setTestModeOpen] = useState(false);
  const [activeNotesFilter, setActiveNotesFilter] = useState(null);
  const isNavigatingRef = useRef(false);

  // Navigate to a new view (pushes to history)
  const navigateTo = useCallback((view) => {
    // Scroll content area to top smoothly
    const contentEl = document.querySelector('.content-area');
    if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' });

    if (isNavigatingRef.current) {
      // Coming from back/forward, don't push to history
      isNavigatingRef.current = false;
      setActiveView(view);
      return;
    }
    setActiveView(view);
    setViewHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(view);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const openNotes = useCallback((filter) => {
    setActiveNotesFilter(filter);
    navigateTo('notes');
  }, [navigateTo]);

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < viewHistory.length - 1;

  const goBack = useCallback(() => {
    if (!canGoBack) return;
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    isNavigatingRef.current = true;
    navigateTo(viewHistory[newIndex]);
  }, [canGoBack, historyIndex, viewHistory, navigateTo]);

  const goForward = useCallback(() => {
    if (!canGoForward) return;
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    isNavigatingRef.current = true;
    navigateTo(viewHistory[newIndex]);
  }, [canGoForward, historyIndex, viewHistory, navigateTo]);

  const handleRefresh = useCallback(() => {
    // Force re-render by toggling a key
    setActiveView(prev => {
      // Trigger re-mount by briefly setting to null then back
      setTimeout(() => setActiveView(prev), 0);
      return null;
    });
  }, []);



  // Read data from Firebase real-time and lock orientation
  useEffect(() => {
    // Try to lock screen orientation to portrait
    if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
      window.screen.orientation.lock('portrait').catch(() => {
        // Ignore errors (not supported on all browsers or requires fullscreen)
      });
    }

    const docRef = doc(db, 'appData', DOC_ID);
    
    // Set up a real-time listener
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setRevisionData(docSnap.data().revisions || {});
      } else {
        // Initialize if doc doesn't exist
        setDoc(docRef, { revisions: {} });
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const toggleRevision = useCallback(async (key) => {
    // Optimistic UI update
    const newValue = revisionData[key] ? null : Date.now();
    const updatedRevisions = {
      ...revisionData,
      [key]: newValue
    };
    
    setRevisionData(updatedRevisions);

    // Save to Firebase
    try {
      const docRef = doc(db, 'appData', DOC_ID);
      await setDoc(docRef, { revisions: updatedRevisions }, { merge: true });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }, [revisionData]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
        height: '100vh', background: '#0a0e1a', gap: '20px' 
      }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          border: '4px solid rgba(139,92,246,0.15)',
          borderTopColor: '#8b5cf6',
          animation: 'spin 0.8s linear infinite'
        }} />
        <span style={{ color: '#94a3b8', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif' }}>
          Loading your data securely...
        </span>
      </div>
    );
  }
  // Find the current view content
  let content;
  if (activeView === 'dashboard') {
    content = <Dashboard subjects={SUBJECTS} revisionData={revisionData} onSelectView={navigateTo} />;
  } else if (activeView === 'testDashboard') {
    content = <TestDashboard />;
  } else if (activeView === 'pyq') {
    content = <PYQPage />;
  } else if (activeView === 'questionBank') {
    content = <QuestionBank />;
  } else if (activeView === 'notes') {
    content = <StudyNotes filter={activeNotesFilter} onClose={goBack} />;
  } else {
    // Look for matching subject, topic or chapter
    for (const subject of SUBJECTS) {
      if (subject.id === activeView) {
        content = (
          <SubjectView
            subject={subject}
            revisionData={revisionData}
            onSelectView={navigateTo}
            onOpenNotes={openNotes}
          />
        );
        break;
      }
      for (const topic of subject.topics) {
        if (topic.id === activeView) {
          content = (
            <PDFList
              title={topic.name}
              pdfs={topic.pdfs || []}
              idPrefix={topic.id}
              revisionData={revisionData}
              onToggle={toggleRevision}
              onOpenNotes={() => openNotes({
                subjectId: subject.id,
                topicId: topic.id,
                title: topic.name
              })}
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
                  onOpenNotes={() => openNotes({
                    subjectId: subject.id,
                    topicId: topic.id,
                    chapterId: ch.id,
                    title: ch.name
                  })}
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
      <InstallPrompt />
      {/* Full-screen Test Mode overlay — blocks everything else */}
      {testModeOpen && <TestMode onClose={() => setTestModeOpen(false)} />}
      <div className={`app-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Sidebar
          subjects={SUBJECTS}
          revisionData={revisionData}
          activeView={activeView}
          onSelectView={navigateTo}
          onSelectDashboard={() => navigateTo('dashboard')}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
          collapsed={sidebarCollapsed}
          onOpenTestMode={() => { setTestModeOpen(true); setMobileOpen(false); }}
        />
        {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)} />}
        <main className="main-content">
          <header className="topbar">
            <button className="hamburger" onClick={() => setMobileOpen(true)}>☰</button>
            <button className="sidebar-toggle-btn" onClick={() => setSidebarCollapsed(prev => !prev)} title={sidebarCollapsed ? 'Show Sidebar' : 'Hide Sidebar'}>
              {sidebarCollapsed ? '☰' : '✕'}
            </button>
            <div className="nav-buttons">
              <button className={`nav-btn ${!canGoBack ? 'disabled' : ''}`} onClick={goBack} disabled={!canGoBack} title="Go Back" aria-label="Go back">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className={`nav-btn ${!canGoForward ? 'disabled' : ''}`} onClick={goForward} disabled={!canGoForward} title="Go Forward" aria-label="Go forward">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <button className="nav-btn" onClick={handleRefresh} title="Refresh" aria-label="Refresh page">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
              </button>
            </div>
            <span className="topbar-title">BPSC TRE 4.0 Revision Tracker</span>
          </header>
          <div className="content-area">
            <div key={activeView} className="page-transition">
              {content}
            </div>
          </div>
          <ChatBot revisionData={revisionData} />
        </main>
      </div>
    </PasswordLock>
  );
}

export default App;
