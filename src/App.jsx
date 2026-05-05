import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SUBJECTS } from './data';
import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot, updateDoc, deleteField } from 'firebase/firestore';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PDFList from './components/PDFList';
import PDFViewer from './components/PDFViewer';
import PYQPage from './PYQPage';
import QuestionBank from './components/QuestionBank';
import SyncStorage from './components/SyncStorage';
import TestMode from './components/TestMode/TestMode';
import TestDashboard from './components/TestDashboard';
import SubjectView from './components/SubjectView';
import BiharNotes from './components/notes/BiharNotes';
import AdventOfEuropean from './components/notes/AdventOfEuropen';
import LandRevenueSystem from './components/notes/LandRevenueSytem';
import DevelopmentOfEducationInIndia from './components/notes/DevelopmentofEducationinIndia';
import TribalMovements from './components/notes/TribalMovements';
import EmergingTrends from './components/notes/EmergingTrends';
import Dsa from './components/notes/Dsa';
import OperatingSystem from './components/notes/OperatingSystem';
import NotesHub from './components/NotesHub';
import HistoricalTimeline from './components/HistoricalTimeline';
// ChatBot removed — was API-dependent
// import ChatBot from './components/ChatBot';

import './index.css';

import PasswordLock from './components/PasswordLock';
import InstallPrompt from './components/InstallPrompt';
import SearchModal from './components/SearchModal';
import { useAuth } from './AuthContext';

const DOC_ID = 'user-revisions';

// Helper: get breadcrumb trail for current view
function getBreadcrumbs(activeView, subjects) {
  if (activeView === 'dashboard') return [{ label: 'Dashboard', icon: '📊' }];
  if (activeView === 'pyq') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'Previous Year Questions', icon: '🔍' }];
  if (activeView === 'questionBank') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'Question Bank', icon: '📝' }];
  if (activeView === 'testDashboard') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'Test Analytics', icon: '📊' }];
  if (activeView === 'syncStorage') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'Sync Storage', icon: '☁️' }];
  if (activeView === 'bihar-notes') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'General Paper', view: 'gp' }, { label: 'History', view: 'gp-t7' }, { label: 'CH-1 Bihar Special', view: 'gp-t7-ch1' }, { label: '📖 Study Notes', icon: '📖' }];
  if (activeView === 'advent-of-european') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'General Paper', view: 'gp' }, { label: 'History', view: 'gp-t7' }, { label: 'CH-2 Advent of Europeans', view: 'gp-t7-ch2' }, { label: '📖 Study Notes', icon: '📖' }];
  if (activeView === 'land-revenue') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'General Paper', view: 'gp' }, { label: 'History', view: 'gp-t7' }, { label: 'CH-3 Land Revenue Systems in India', view: 'gp-t7-ch3' }, { label: '📖 Study Notes', icon: '📖' }];
  if (activeView === 'education-india') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'General Paper', view: 'gp' }, { label: 'History', view: 'gp-t7' }, { label: 'CH-4 Development of Education in India', view: 'gp-t7-ch4' }, { label: '📖 Study Notes', icon: '📖' }];
  if (activeView === 'tribal-movements') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'General Paper', view: 'gp' }, { label: 'History', view: 'gp-t7' }, { label: 'CH-5 Major Movements', view: 'gp-t7-ch5' }, { label: '📖 Study Notes', icon: '📖' }];
  if (activeView === 'dsa-notes') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'Computer Science', view: 'cs' }, { label: 'T-4 Data Structure and Algorithm', view: 'cs-t4' }, { label: '📖 Study Notes', icon: '📖' }];
  if (activeView === 'os-notes') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'Computer Science', view: 'cs' }, { label: 'T-1 Operating System', view: 'cs-t1' }, { label: '📖 Study Notes', icon: '📖' }];
  if (activeView === 'emerging-trends') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'Computer Science', view: 'cs' }, { label: 'T-9 Emerging Trends', view: 'cs-t9' }, { label: '📖 Study Notes', icon: '📖' }];
  if (activeView === 'notesHub') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'Notes Hub', icon: '📖' }];
  if (activeView === 'historical-timeline') return [{ label: 'Dashboard', view: 'dashboard' }, { label: 'Historical Timeline', icon: '⏳' }];

  for (const subject of subjects) {
    if (subject.id === activeView) {
      return [{ label: 'Dashboard', view: 'dashboard' }, { label: subject.name, icon: '📘' }];
    }
    for (const topic of subject.topics) {
      if (topic.id === activeView) {
        return [
          { label: 'Dashboard', view: 'dashboard' },
          { label: subject.name, view: subject.id },
          { label: topic.name.replace(/^T-?\d+\s*[-–]?\s*/, ''), icon: '📑' },
        ];
      }
      if (topic.chapters) {
        for (const ch of topic.chapters) {
          if (ch.id === activeView) {
            return [
              { label: 'Dashboard', view: 'dashboard' },
              { label: subject.name, view: subject.id },
              { label: topic.name.replace(/^T-?\d+\s*[-–]?\s*/, ''), view: topic.chapters[0]?.id || topic.id },
              { label: ch.name.replace(/^CH-\d+\s*/, ''), icon: '📄' },
            ];
          }
        }
      }
    }
  }
  return [{ label: 'Dashboard', view: 'dashboard' }];
}

function App() {
  const [revisionData, setRevisionData] = useState({});
  const [activeView, setActiveView] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'dashboard';
  });
  const [historyIndex, setHistoryIndex] = useState(() => window.history.state?.index || 0);
  const [historyLength, setHistoryLength] = useState(() => window.history.state?.length || 1);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const sidebarVisible = sidebarPinned || sidebarHovered;
  const [isLoading, setIsLoading] = useState(true);
  const [testModeOpen, setTestModeOpen] = useState(false);
  const [viewingPdf, setViewingPdf] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const swipeFns = useRef({ canGoBack: false, canGoForward: false, goBack: null, goForward: null });

  // Initialize native history state on mount
  useEffect(() => {
    if (!window.history.state || window.history.state.index === undefined) {
      window.history.replaceState({ index: 0, length: 1, view: activeView }, '', '#' + activeView);
    }
  }, []);

  // Listen to browser's native back/forward (e.g. from Mac trackpad swipe or browser buttons)
  useEffect(() => {
    const onPopState = (e) => {
      if (e.state && e.state.view) {
        setActiveView(e.state.view);
        setHistoryIndex(e.state.index);
        setHistoryLength(e.state.length);
      } else {
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        setActiveView(hash);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateTo = useCallback((view, anchorId, itemName) => {
    const contentEl = document.querySelector('.content-area');
    if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' });

    setActiveView(view);
    const newIndex = historyIndex + 1;
    const newLength = newIndex + 1;
    window.history.pushState({ index: newIndex, length: newLength, view }, '', '#' + view);
    
    setHistoryIndex(newIndex);
    setHistoryLength(newLength);

    if (anchorId || itemName) {
      setTimeout(() => {
        let el = anchorId ? document.getElementById(anchorId) : null;
        let exactTextNodeElement = null;
        
        // Robust Fallback: If no explicit ID exists, search the DOM text to find the exact portion
        if (itemName) {
          const searchRoot = el || document.body;
          const walker = document.createTreeWalker(searchRoot, NodeFilter.SHOW_TEXT, null, false);
          let node;
          while ((node = walker.nextNode())) {
            // Find text nodes that contain the searched item name (case insensitive)
            if (node.nodeValue.toLowerCase().includes(itemName.toLowerCase()) && node.parentElement) {
              // Ignore script and style tags
              if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName)) continue;
              // Ignore the search bar itself
              if (node.parentElement.closest('.search-modal')) continue;
              
              exactTextNodeElement = node.parentElement;
              // If it's a very generic container, try to find a more specific child wrapper, but parentElement is usually a p, span, div, h1-h6.
              // To make highlighting look good, if it's an inline element, grab its block parent if possible.
              if (['SPAN', 'STRONG', 'B', 'I', 'EM'].includes(exactTextNodeElement.tagName) && exactTextNodeElement.parentElement) {
                exactTextNodeElement = exactTextNodeElement.parentElement;
              }
              break;
            }
          }
        }

        const targetElement = exactTextNodeElement || el;

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Highlight effect
          targetElement.classList.add('highlight-pulse');
          setTimeout(() => targetElement.classList.remove('highlight-pulse'), 4000);
        }
      }, 600); // Wait for component to mount and render
    }
  }, [historyIndex]);

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < historyLength - 1;

  const goBack = useCallback(() => {
    if (canGoBack) window.history.back();
  }, [canGoBack]);

  const goForward = useCallback(() => {
    if (canGoForward) window.history.forward();
  }, [canGoForward]);

  useEffect(() => {
    swipeFns.current = { canGoBack, canGoForward, goBack, goForward };
  }, [canGoBack, canGoForward, goBack, goForward]);

  const handleRefresh = useCallback(() => {
    // Force re-render by toggling a key
    setActiveView(prev => {
      // Trigger re-mount by briefly setting to null then back
      setTimeout(() => setActiveView(prev), 0);
      return null;
    });
  }, []);

  // Global Swipe Gestures (Touch + Mouse)
  useEffect(() => {
    let tsX = 0, tsY = 0;
    let teX = 0, teY = 0;
    let isMouseDown = false;
    const minDistance = 50;

    const handleGesture = () => {
      const distanceX = tsX - teX;
      const distanceY = Math.abs(tsY - teY);
      
      // Ignore if mostly vertical scrolling
      if (distanceY > Math.abs(distanceX)) return;

      const { canGoBack, canGoForward, goBack, goForward } = swipeFns.current;

      if (distanceX > minDistance) {
        // Swipe Left (finger moved right-to-left) -> user requested: backward
        if (canGoBack && goBack) goBack();
      } else if (distanceX < -minDistance) {
        // Swipe Right (finger moved left-to-right) -> user requested: forward
        if (canGoForward && goForward) goForward();
      }
    };

    const onTouchStart = (e) => {
      tsX = e.changedTouches[0].screenX;
      tsY = e.changedTouches[0].screenY;
    };
    const onTouchEnd = (e) => {
      teX = e.changedTouches[0].screenX;
      teY = e.changedTouches[0].screenY;
      handleGesture();
    };

    const onMouseDown = (e) => {
      isMouseDown = true;
      tsX = e.screenX;
      tsY = e.screenY;
    };
    const onMouseUp = (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      teX = e.screenX;
      teY = e.screenY;
      handleGesture();
    };

    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // Keyboard Shortcuts (Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);



  // Read data from Firebase real-time and lock orientation
  useEffect(() => {
    const docRef = doc(db, 'appData', DOC_ID);
    
    // Set up a real-time listener
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      let cloudRevisions = {};
      if (docSnap.exists()) {
        const rawRevisions = docSnap.data().revisions || {};
        // Filter out any null/falsy values that may have leaked through
        cloudRevisions = {};
        for (const [k, v] of Object.entries(rawRevisions)) {
          if (v) cloudRevisions[k] = v;
        }
        setRevisionData(cloudRevisions);
      } else {
        // Initialize if doc doesn't exist
        setDoc(docRef, { revisions: {} });
      }

      // --- Revision Recovery Logic ---
      // If cloud is empty or missing data, check localStorage for any legacy revision checks
      const cloudCount = Object.keys(cloudRevisions).length;
      if (cloudCount === 0) {
        const localRevisions = {};
        let foundLocal = false;
        // Scan all localStorage keys for our revision pattern (e.g. gp-t7-ch1-0-r0)
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && /-[0-9]+-r[0-4]$/.test(key)) {
            const val = localStorage.getItem(key);
            if (val) {
              localRevisions[key] = parseInt(val) || Date.now();
              foundLocal = true;
            }
          }
        }
        
        if (foundLocal) {
          console.log("🚀 Found local revisions! Migrating to cloud...");
          setRevisionData(localRevisions);
          setDoc(docRef, { revisions: localRevisions }, { merge: true });
        }
      }

      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const { userRole, isAdmin } = useAuth();

  const toggleRevision = useCallback(async (key) => {
    if (!isAdmin) {
      alert("🔒 Restricted Access: You are in View-Only mode. Only the Administrator can modify revision status.");
      return;
    }

    const isCurrentlyChecked = !!revisionData[key];
    const newValue = isCurrentlyChecked ? null : Date.now();

    // Optimistic UI update (local state only)
    setRevisionData(prev => {
      const updated = { ...prev };
      if (newValue === null) {
        delete updated[key];
      } else {
        updated[key] = newValue;
      }
      return updated;
    });

    // Save ONLY this specific field to Firebase (atomic update, no overwrite)
    try {
      const docRef = doc(db, 'appData', DOC_ID);
      await updateDoc(docRef, {
        [`revisions.${key}`]: isCurrentlyChecked ? deleteField() : newValue
      });
    } catch (error) {
      console.error("Error saving revision:", error);
      // Revert optimistic update on failure
      setRevisionData(prev => {
        const reverted = { ...prev };
        if (isCurrentlyChecked) {
          reverted[key] = revisionData[key]; // restore original value
        } else {
          delete reverted[key];
        }
        return reverted;
      });
    }
  }, [revisionData, isAdmin]);

  if (isLoading) {
    return (
      <div className="skeleton-loading">
        <div className="skeleton-topbar">
          <div className="skeleton-pill" style={{ width: '120px' }} />
          <div className="skeleton-pill" style={{ width: '200px', marginLeft: 'auto' }} />
        </div>
        <div className="skeleton-body">
          <div className="skeleton-hero" />
          <div className="skeleton-stats-row">
            <div className="skeleton-stat" />
            <div className="skeleton-stat" />
            <div className="skeleton-stat" />
            <div className="skeleton-stat" />
          </div>
          <div className="skeleton-panel" />
          <div className="skeleton-panel" style={{ height: '120px' }} />
        </div>
      </div>
    );
  }
  // Find the current view content
  let content;
  if (activeView === 'dashboard') {
    content = <Dashboard subjects={SUBJECTS} revisionData={revisionData} onSelectView={navigateTo} onOpenPdf={setViewingPdf} />;
  } else if (activeView === 'testDashboard') {
    content = <TestDashboard />;
  } else if (activeView === 'gp-t7-ch1') {
    const ch = SUBJECTS.find(s => s.id === 'gp').topics.find(t => t.id === 'gp-t7').chapters.find(c => c.id === 'gp-t7-ch1');
    content = (
      <>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => navigateTo('bihar-notes')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '12px 20px', fontSize: '0.95rem', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(99,102,241,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(99,102,241,0.35)'; }}
          >
            📖 View Bihar Special Study Notes →
          </button>
        </div>
        <PDFList
          title="CH-1 Bihar Special"
          pdfs={ch.pdfs}
          idPrefix="gp-t7-ch1"
          revisionData={revisionData}
          onToggle={toggleRevision}
          onOpenPdf={setViewingPdf}
        />
      </>
    );
  } else if (activeView === 'gp-t7-ch2') {
    const ch = SUBJECTS.find(s => s.id === 'gp').topics.find(t => t.id === 'gp-t7').chapters.find(c => c.id === 'gp-t7-ch2');
    content = (
      <>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => navigateTo('advent-of-european')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #ec4899, #f43f5e)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '12px 20px', fontSize: '0.95rem', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(236,72,153,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(236,72,153,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(236,72,153,0.35)'; }}
          >
            📖 View Advent of Europeans Study Notes →
          </button>
        </div>
        <PDFList
          title="CH-2 Advent of Europeans"
          pdfs={ch.pdfs}
          idPrefix="gp-t7-ch2"
          revisionData={revisionData}
          onToggle={toggleRevision}
          onOpenPdf={setViewingPdf}
        />
      </>
    );
  } else if (activeView === 'gp-t7-ch3') {
    const ch = SUBJECTS.find(s => s.id === 'gp').topics.find(t => t.id === 'gp-t7').chapters.find(c => c.id === 'gp-t7-ch3');
    content = (
      <>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => navigateTo('land-revenue')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '12px 20px', fontSize: '0.95rem', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(16,185,129,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(16,185,129,0.35)'; }}
          >
            📖 View Land Revenue Systems Notes →
          </button>
        </div>
        <PDFList
          title="CH-3 Land Revenue Systems in India"
          pdfs={ch.pdfs}
          idPrefix="gp-t7-ch3"
          revisionData={revisionData}
          onToggle={toggleRevision}
          onOpenPdf={setViewingPdf}
        />
      </>
    );
  } else if (activeView === 'gp-t7-ch4') {
    const ch = SUBJECTS.find(s => s.id === 'gp').topics.find(t => t.id === 'gp-t7').chapters.find(c => c.id === 'gp-t7-ch4');
    content = (
      <>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => navigateTo('education-india')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '12px 20px', fontSize: '0.95rem', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(14,165,233,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(14,165,233,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(14,165,233,0.35)'; }}
          >
            📖 View Education in India Notes →
          </button>
        </div>
        <PDFList
          title="CH-4 Development of Education in India"
          pdfs={ch?.pdfs || []}
          idPrefix="gp-t7-ch4"
          revisionData={revisionData}
          onToggle={toggleRevision}
          onOpenPdf={setViewingPdf}
        />
      </>
    );
  } else if (activeView === 'gp-t7-ch5') {
    const ch = SUBJECTS.find(s => s.id === 'gp').topics.find(t => t.id === 'gp-t7').chapters.find(c => c.id === 'gp-t7-ch5');
    content = (
      <>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => navigateTo('tribal-movements')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '12px 20px', fontSize: '0.95rem', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(14,165,233,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(14,165,233,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(14,165,233,0.35)'; }}
          >
            📖 View Tribal Movements Notes →
          </button>
        </div>
        <PDFList
          title="CH-5 Major Movements"
          pdfs={ch?.pdfs || []}
          idPrefix="gp-t7-ch5"
          revisionData={revisionData}
          onToggle={toggleRevision}
          onOpenPdf={setViewingPdf}
        />
      </>
    );
  } else if (activeView === 'cs-t1') {
    const topic = SUBJECTS.find(s => s.id === 'cs').topics.find(t => t.id === 'cs-t1');
    content = (
      <>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => navigateTo('os-notes')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '12px 20px', fontSize: '0.95rem', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(14,165,233,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(14,165,233,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(14,165,233,0.35)'; }}
          >
            📖 View Operating System Notes →
          </button>
        </div>
        <PDFList
          title="T-1 Operating System"
          pdfs={topic?.pdfs || []}
          idPrefix="cs-t1"
          revisionData={revisionData}
          onToggle={toggleRevision}
          onOpenPdf={setViewingPdf}
        />
      </>
    );
  } else if (activeView === 'cs-t4') {
    const topic = SUBJECTS.find(s => s.id === 'cs').topics.find(t => t.id === 'cs-t4');
    content = (
      <>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => navigateTo('dsa-notes')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '12px 20px', fontSize: '0.95rem', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(14,165,233,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(14,165,233,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(14,165,233,0.35)'; }}
          >
            📖 View DSA Notes →
          </button>
        </div>
        <PDFList
          title="T-4 Data Structure and Algorithm"
          pdfs={topic?.pdfs || []}
          idPrefix="cs-t4"
          revisionData={revisionData}
          onToggle={toggleRevision}
          onOpenPdf={setViewingPdf}
        />
      </>
    );
  } else if (activeView === 'cs-t9') {
    const topic = SUBJECTS.find(s => s.id === 'cs').topics.find(t => t.id === 'cs-t9');
    content = (
      <>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => navigateTo('emerging-trends')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
              color: '#fff', border: 'none', borderRadius: '12px',
              padding: '12px 20px', fontSize: '0.95rem', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(14,165,233,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(14,165,233,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(14,165,233,0.35)'; }}
          >
            📖 View Emerging Trends Notes →
          </button>
        </div>
        <PDFList
          title="T-9 Emerging Trends"
          pdfs={topic?.pdfs || []}
          idPrefix="cs-t9"
          revisionData={revisionData}
          onToggle={toggleRevision}
          onOpenPdf={setViewingPdf}
        />
      </>
    );
  } else if (activeView === 'bihar-notes') {
    content = <BiharNotes embedded />;
  } else if (activeView === 'advent-of-european') {
    content = <AdventOfEuropean />;
  } else if (activeView === 'land-revenue') {
    content = <LandRevenueSystem />;
  } else if (activeView === 'education-india') {
    content = <DevelopmentOfEducationInIndia />;
  } else if (activeView === 'tribal-movements') {
    content = <TribalMovements />;
  } else if (activeView === 'dsa-notes') {
    content = <Dsa />;
  } else if (activeView === 'os-notes') {
    content = <OperatingSystem />;
  } else if (activeView === 'emerging-trends') {
    content = <EmergingTrends />;
  } else if (activeView === 'notesHub') {
    content = <NotesHub onSelectView={navigateTo} />;
  } else if (activeView === 'pyq') {
    content = <PYQPage />;
  } else if (activeView === 'questionBank') {
    content = <QuestionBank />;
  } else if (activeView === 'historical-timeline') {
    content = <HistoricalTimeline onNavigate={navigateTo} />;
  } else if (activeView === 'syncStorage') {
    content = <SyncStorage onClose={() => navigateTo('dashboard')} />;
  } else {
    // Look for matching subject, topic or chapter
    for (const subject of SUBJECTS) {
      if (subject.id === activeView) {
        content = (
            <SubjectView
              subject={subject}
              revisionData={revisionData}
              onSelectView={navigateTo}
              onOpenPdf={setViewingPdf}
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
              onOpenPdf={setViewingPdf}
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
                  onOpenPdf={setViewingPdf}
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

  const breadcrumbs = getBreadcrumbs(activeView, SUBJECTS);

  return (
    <>
      <InstallPrompt />
      {/* Full-screen Test Mode overlay — blocks everything else */}
      {testModeOpen && <TestMode onClose={() => setTestModeOpen(false)} />}
      {viewingPdf && <PDFViewer pdfName={viewingPdf} onClose={() => setViewingPdf(null)} />}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={navigateTo} />
      <div className={`app-layout ${sidebarVisible ? '' : 'sidebar-collapsed'}`}>

        {/* Invisible hover trigger zone on the left edge */}
        {!sidebarVisible && (
          <div
            className="sidebar-hover-trigger"
            onMouseEnter={() => setSidebarHovered(true)}
          />
        )}

        <Sidebar
          subjects={SUBJECTS}
          revisionData={revisionData}
          activeView={activeView}
          onSelectView={navigateTo}
          onSelectDashboard={() => navigateTo('dashboard')}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
          collapsed={!sidebarVisible}
          onOpenTestMode={() => { setTestModeOpen(true); setMobileOpen(false); }}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
        />

        {/* Dim overlay behind sidebar when it's hovered (not pinned) */}
        {sidebarHovered && !sidebarPinned && (
          <div className="sidebar-dim-overlay" onMouseEnter={() => setSidebarHovered(false)} />
        )}

        {mobileOpen && <div className="overlay" onClick={() => setMobileOpen(false)} />}

        <main className="main-content">
          <header className="topbar">
            <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            {/* Pin button — locks sidebar open */}
            <button
              className={`sidebar-toggle-btn ${sidebarPinned ? 'pinned' : ''}`}
              onClick={() => { setSidebarPinned(prev => !prev); setSidebarHovered(false); }}
              title={sidebarPinned ? 'Unpin Sidebar (auto-hide)' : 'Pin Sidebar open'}
            >
              {sidebarPinned ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5v6l1 1 1-1v-6h5v-2l-2-2z"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
              )}
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
              <button className="nav-btn search-trigger-btn" onClick={() => setSearchOpen(true)} title="Search (⌘K)" aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </div>
            {/* Breadcrumb navigation */}
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <AnimatePresence mode="popLayout">
                {breadcrumbs.map((crumb, i) => (
                  <motion.span 
                    key={crumb.label + i} 
                    className="breadcrumb-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {i > 0 && <span className="breadcrumb-sep">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </span>}
                    {crumb.view ? (
                      <button className="breadcrumb-link" onClick={() => navigateTo(crumb.view)}>{crumb.label}</button>
                    ) : (
                      <span className="breadcrumb-current">{crumb.label}</span>
                    )}
                  </motion.span>
                ))}
              </AnimatePresence>
            </nav>
          </header>
          <div className={`content-area ${activeView === 'historical-timeline' ? 'no-padding' : ''}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="page-transition"
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
