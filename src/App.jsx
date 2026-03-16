import { useState, useEffect, useCallback } from 'react';
import { SUBJECTS } from './data';
import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PDFList from './components/PDFList';
import PYQPage from './PYQPage';
import QuestionBank from './components/QuestionBank';
import Notes from './components/Notes';
import './index.css';

import PasswordLock from './components/PasswordLock';

const DOC_ID = 'user-revisions';

function App() {
  const [revisionData, setRevisionData] = useState({});
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Read data from Firebase real-time
  useEffect(() => {
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
  let content = null;
  if (activeView === 'dashboard') {
    content = <Dashboard subjects={SUBJECTS} revisionData={revisionData} />;
  } else if (activeView === 'pyq') {
    content = <PYQPage />;
  } else if (activeView === 'questionBank') {
    content = <QuestionBank />;
  } else if (activeView === 'notes') {
    content = <Notes />;
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
