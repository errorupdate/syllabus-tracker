import React, { useState, useEffect, useMemo, useRef } from 'react';
import { SUBJECTS } from '../data';
import { PYQ_QUESTIONS } from '../pyqData';
import * as notesData from '../data/notesData.jsx';
import './SearchModal.css';

const STUDY_NOTES = [
  { id: 'bihar-notes', name: 'Bihar Special Notes', type: 'note', icon: '📜', source: 'BIHAR' },
  { id: 'advent-of-european', name: 'Advent of Europeans', type: 'note', icon: '⛵', source: 'EUROPEAN' },
  { id: 'land-revenue', name: 'Land Revenue Systems', type: 'note', icon: '🌾', source: 'LAND_REVENUE' },
  { id: 'education-india', name: 'Development of Education', type: 'note', icon: '🎓', source: 'EDUCATION' },
  { id: 'tribal-movements', name: 'Tribal & Peasant Movements', type: 'note', icon: '🏹', source: 'TRIBAL' },
  { id: 'emerging-trends', name: 'Emerging Trends in CS', type: 'note', icon: '🚀', source: 'EMERGING' },
  { id: 'historical-timeline', name: 'Historical Timeline', type: 'note', icon: '⏳', source: 'TIMELINE' },
];

export default function SearchModal({ isOpen, onClose, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDocked, setIsDocked] = useState(false);
  
  // Draggable State
  const [position, setPosition] = useState(null); // null means use CSS defaults
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const modalStart = useRef({ x: 0, y: 0 });
  
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const modalRef = useRef(null);

  // Helper: slugify text for anchors
  const slugify = (text) => {
    if (!text) return '';
    return text.toString().toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setActiveIndex(0);
      setIsDocked(false);
      setPosition(null); // Reset position on open
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden'; // Keep body from scrolling if we want, or allow it
      // Actually if we want them to interact with the left side, we should allow body overflow
      document.body.style.overflow = 'unset';
    } else {
      document.body.style.overflow = 'unset';
      setIsDragging(false);
    }
  }, [isOpen]);
  
  // Dragging Logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPosition({
        x: modalStart.current.x + dx,
        y: modalStart.current.y + dy
      });
    };
    
    const handleMouseUp = () => setIsDragging(false);
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection while dragging
    } else {
      document.body.style.userSelect = '';
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  const handleMouseDown = (e) => {
    // Only start drag if clicking the header itself, not its inputs or buttons
    if (e.target.closest('input') || e.target.closest('button')) return;
    
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      modalStart.current = { x: rect.left, y: rect.top };
      setPosition({ x: rect.left, y: rect.top });
    }
  };

  const results = useMemo(() => {
    if (searchTerm.length < 2) return [];
    const term = searchTerm.toLowerCase();
    const matches = [];

    // 1. Search Study Notes (Titles & Content)
    STUDY_NOTES.forEach(note => {
      if (note.name.toLowerCase().includes(term)) {
        matches.push({ ...note, category: 'Study Notes' });
      }
    });

    // Deep Search in Study Notes Data
    Object.entries(notesData).forEach(([key, dataArray]) => {
        if (!Array.isArray(dataArray)) return;

        let mapping = { id: 'dashboard', category: 'General', icon: '🔍' };
        if (key.startsWith('BIHAR_')) {
            mapping = { id: 'bihar-notes', category: 'Bihar Special', icon: '📜' };
        } else if (key === 'EUROPEAN_POWERS') {
            mapping = { id: 'advent-of-european', category: 'History', icon: '⛵' };
        } else if (key === 'TRIBAL_MOVEMENTS') {
            mapping = { id: 'tribal-movements', category: 'History', icon: '🏹' };
        } else if (key === 'LAND_REVENUE_SYSTEMS') {
            mapping = { id: 'land-revenue', category: 'History', icon: '🌾' };
        } else if (key === 'EMERGING_TRENDS') {
            mapping = { id: 'emerging-trends', category: 'Computer Science', icon: '🚀' };
        }

        dataArray.forEach(item => {
            if (!item || typeof item !== 'object') return;
            
            // Extract all string/number values recursively or flat
            const itemText = Object.values(item).map(v => {
                if (typeof v === 'string' || typeof v === 'number') return String(v);
                if (Array.isArray(v)) return v.join(' ');
                return '';
            }).join(' ').toLowerCase();

            if (itemText.includes(term)) {
                // Heuristic to find a display name
                const itemName = item.name || item.title || item.topic || item.label || item.location || item.year || 'Detail';
                
                // Create a context snippet around the matched term
                const matchIndex = itemText.indexOf(term);
                const start = Math.max(0, matchIndex - 30);
                const end = Math.min(itemText.length, matchIndex + term.length + 30);
                const snippet = '...' + itemText.substring(start, end).replace(/\s+/g, ' ') + '...';

                matches.push({
                    id: mapping.id,
                    name: itemName,
                    category: mapping.category,
                    subcategory: snippet,
                    icon: mapping.icon,
                    anchorId: slugify(itemName)
                });
            }
        });
    });

    // 2. Search Syllabus (Subjects, Topics, Chapters, PDFs)
    SUBJECTS.forEach(subject => {
      if (subject.name.toLowerCase().includes(term)) {
        matches.push({ id: subject.id, name: subject.name, category: 'Syllabus', subcategory: 'Subject', icon: '📘', searchContext: term });
      }
      subject.topics.forEach(topic => {
        if (topic.name.toLowerCase().includes(term)) {
          matches.push({ id: topic.id, name: topic.name, category: 'Syllabus', subcategory: 'Topic', icon: '📑', searchContext: term });
        }
        if (topic.chapters) {
          topic.chapters.forEach(ch => {
            if (ch.name.toLowerCase().includes(term)) {
              matches.push({ id: ch.id, name: ch.name, category: 'Syllabus', subcategory: 'Chapter', icon: '📄' });
            }
            ch.pdfs.forEach(pdf => {
              if (pdf.toLowerCase().includes(term)) {
                matches.push({ id: ch.id, name: pdf, category: 'Syllabus', subcategory: 'PDF', icon: '📎' });
              }
            });
          });
        } else if (topic.pdfs) {
          topic.pdfs.forEach(pdf => {
            if (pdf.toLowerCase().includes(term)) {
              matches.push({ id: topic.id, name: pdf, category: 'Syllabus', subcategory: 'PDF', icon: '📎' });
            }
          });
        }
      });
    });

    // 3. Search PYQ Questions (Deep Search)
    const pyqMatches = PYQ_QUESTIONS.filter(q => 
      (q.question && q.question.toLowerCase().includes(term)) ||
      (q.answer && q.answer.toLowerCase().includes(term)) ||
      (q.explanation && q.explanation.toLowerCase().includes(term)) ||
      (q.theme && q.theme.toLowerCase().includes(term))
    ).slice(0, 15);

    pyqMatches.forEach(q => {
      matches.push({ 
        id: 'pyq', 
        name: q.question || 'PYQ Question', 
        category: 'Questions', 
        subcategory: `${q.exam} ${q.year} - ${q.theme}`, 
        icon: '❓',
        data: q 
      });
    });

    // De-duplicate matches by name and subcategory
    const seen = new Set();
    return matches.filter(item => {
        const key = `${item.name}-${item.subcategory}-${item.id}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    }).slice(0, 30);
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && results[activeIndex]) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (item) => {
    // Pass the EXACT search term typed by the user to the navigation handler
    // so it can find and highlight that exact string in the DOM
    onNavigate(item.id, item.anchorId, searchTerm);
    setIsDocked(true);
    setPosition(null); // Clear manual drag position so it can smoothly dock to the right side!
    // DO NOT onClose() here. We want the user to see the page on the left 
    // while keeping the search drawer open on the right!
  };

  useEffect(() => {
    const activeEl = resultsRef.current?.children[activeIndex];
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <div className={`search-overlay ${isDocked ? 'docked' : ''}`} onClick={onClose}>
      <div 
        className="search-modal" 
        onClick={e => e.stopPropagation()}
        ref={modalRef}
        style={position ? { 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          transform: 'none', 
          transition: isDragging ? 'none' : 'all 0.3s ease',
          margin: 0
        } : {}}
      >
        <div className="search-header" onMouseDown={handleMouseDown} style={{ cursor: 'grab' }}>
          <span className="search-modal-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search anything... (Topic, Note, word)"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            title="Close Search (ESC)"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="search-results" ref={resultsRef}>
          {searchTerm.length === 0 ? (
            <div className="search-empty">
              <div className="search-hint-icon">⚡</div>
              <p>Type at least 2 characters to start searching</p>
              <div className="search-tips">
                <span>Try "Bihar"</span>
                <span>"Article 14"</span>
                <span>"CPU"</span>
                <span>"Network"</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="search-empty">
              <div className="search-hint-icon">😕</div>
              <p>No results found for "{searchTerm}"</p>
            </div>
          ) : (
            results.map((item, index) => (
              <div
                key={`${item.id}-${item.anchorId}-${index}`}
                className={`search-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="item-icon">{item.icon}</div>
                <div className="item-info">
                  <div className="item-name">
                    {item.name.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) => 
                      part.toLowerCase() === searchTerm.toLowerCase() 
                        ? <mark key={i}>{part}</mark> 
                        : part
                    )}
                  </div>
                  <div className="item-meta">
                    <span className="item-category">{item.category}</span>
                    {item.subcategory && <span className="item-subcategory">• {item.subcategory}</span>}
                  </div>
                </div>
                <div className="item-action">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="search-footer">
          <div className="footer-tip">
            <kbd>↑↓</kbd> to navigate
          </div>
          <div className="footer-tip">
            <kbd>ENTER</kbd> to open
          </div>
          <div className="footer-tip">
             Found {results.length} results
          </div>
        </div>
      </div>
    </div>
  );
}
