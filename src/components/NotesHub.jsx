import React, { useState } from 'react';
import { SUBJECTS } from '../data';

const INTERACTIVE_NOTES_MAP = {
  'gp-t7-ch1': { view: 'bihar-notes', icon: '🗺️' },
  'gp-t7-ch2': { view: 'advent-of-european', icon: '⛵' },
  'gp-t7-ch3': { view: 'land-revenue', icon: '📜' },
  'gp-t7-ch4': { view: 'education-india', icon: '🏫' },
  'gp-t7-ch5': { view: 'tribal-movements', icon: '🌾' },
  'cs-t1': { view: 'os-notes', icon: '⚙️' },
  'cs-t4': { view: 'dsa-notes', icon: '🌳' },
  'cs-t9': { view: 'emerging-trends', icon: '💻' }
};

export default function NotesHub({ onSelectView }) {
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [activeTopicId, setActiveTopicId] = useState(null);

  const setActiveSubjectIdWithScroll = (id) => {
    setActiveSubjectId(id);
    const contentEl = document.querySelector('.content-area');
    if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setActiveTopicIdWithScroll = (id) => {
    setActiveTopicId(id);
    const contentEl = document.querySelector('.content-area');
    if (contentEl) contentEl.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get subjects that have any interactive notes
  const noteSubjects = SUBJECTS.map(subject => {
    const topicsWithNotes = subject.topics.map(topic => {
      const interactiveTopic = INTERACTIVE_NOTES_MAP[topic.id];
      const interactiveChapters = topic.chapters?.filter(ch => INTERACTIVE_NOTES_MAP[ch.id]) || [];
      
      if (interactiveTopic || interactiveChapters.length > 0) {
        return {
          ...topic,
          interactiveTopic,
          interactiveChapters,
          totalNotes: (interactiveTopic ? 1 : 0) + interactiveChapters.length
        };
      }
      return null;
    }).filter(Boolean);

    if (topicsWithNotes.length > 0) {
      return {
        ...subject,
        topics: topicsWithNotes,
        totalNotes: topicsWithNotes.reduce((acc, t) => acc + t.totalNotes, 0)
      };
    }
    return null;
  }).filter(Boolean);

  const activeSubject = noteSubjects.find(s => s.id === activeSubjectId);
  const activeTopic = activeSubject?.topics.find(t => t.id === activeTopicId);



  return (
    <div className="notes-hub" style={{ padding: 'clamp(12px, 3vw, 24px)', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: 'clamp(24px, 5vw, 40px)', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', 
          fontWeight: 800, 
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          margin: '0 0 16px 0',
          letterSpacing: '-0.02em'
        }}>
          {activeTopic 
            ? activeTopic.name.replace(/^T-?\d+\s*[-–]?\s*/, '') 
            : activeSubject 
              ? activeSubject.name 
              : 'Study Notes Hub'}
        </h1>
        
        <div className="hub-breadcrumbs" style={{ 
          color: 'var(--text-muted)', 
          fontSize: '1.05rem', 
          fontWeight: 600, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '12px' 
        }}>
           <span 
             onClick={() => { setActiveSubjectIdWithScroll(null); setActiveTopicIdWithScroll(null); }}
             style={{ cursor: 'pointer', transition: 'color 0.2s' }}
             className="breadcrumb-item"
           >
             Notes
           </span>
           {activeSubject && (
             <>
               <span style={{ opacity: 0.3, fontWeight: 300 }}>/</span> 
               <span 
                 onClick={() => setActiveTopicIdWithScroll(null)}
                 style={{ 
                   cursor: activeTopicId ? 'pointer' : 'default', 
                   color: activeTopicId ? 'var(--text-muted)' : 'var(--accent-purple)',
                   transition: 'color 0.2s'
                 }}
                 className={activeTopicId ? "breadcrumb-item" : ""}
               >
                 {activeSubject.name}
               </span>
             </>
           )}
           {activeTopic && (
             <>
               <span style={{ opacity: 0.3, fontWeight: 300 }}>/</span> 
               <span style={{ color: 'var(--accent-purple)' }}>
                 {activeTopic.name.replace(/^T-?\d+\s*[-–]?\s*/, '')}
               </span>
             </>
           )}
        </div>
      </header>

      {!activeSubjectId ? (
        // Level 1: Subject List
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
          {noteSubjects.map(subject => (
            <div 
              key={subject.id}
              onClick={() => setActiveSubjectIdWithScroll(subject.id)}
              className="hub-card level-1"
              style={{ 
                cursor: 'pointer', background: 'var(--surface)', borderRadius: '32px', 
                padding: '40px', border: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                position: 'relative',
                animation: 'fadeInUp 0.5s ease-out'
              }}
            >
              <div className="hub-icon-large">
                {subject.id === 'cs' ? '💻' : '📚'}
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 12px 0', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                {subject.name}
              </h2>
              <div style={{ 
                padding: '10px 20px', background: 'var(--accent-bg)', 
                borderRadius: '16px', fontSize: '1rem', fontWeight: 700, color: 'var(--accent)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}>
                {subject.topics.length} Topic Areas
              </div>
              <p style={{ marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                {subject.totalNotes} Interactive study modules available
              </p>
            </div>
          ))}
        </div>
      ) : !activeTopicId ? (
        // Level 2: Topic List within Subject
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '24px', animation: 'fadeInScale 0.4s ease-out' }}>
          {activeSubject.topics.map(topic => (
            <div 
              key={topic.id}
              onClick={() => setActiveTopicIdWithScroll(topic.id)}
              className="hub-card level-2"
              style={{ 
                cursor: 'pointer', background: 'var(--surface)', borderRadius: '24px', 
                padding: '30px', border: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div className="hub-icon-medium">
                  {activeSubject.id === 'cs' ? '⚡' : '📑'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', fontWeight: 800, textTransform: 'uppercase' }}>
                  Topic Area
                </div>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 8px 0', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {topic.name.replace(/^T-?\d+\s*[-–]?\s*/, '')}
              </h3>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500, marginTop: 'auto' }}>
                {topic.totalNotes} Note Module{topic.totalNotes !== 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Level 3: Notes List within Topic
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', 
          gap: '20px',
          animation: 'fadeInScale 0.4s ease-out'
        }}>
          {activeTopic.interactiveTopic && (
            <div 
              onClick={() => onSelectView(activeTopic.interactiveTopic.view)}
              className="note-card-final"
              style={{ 
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', padding: '28px', 
                background: 'var(--surface)', borderRadius: '22px', border: '1px solid var(--border)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
              }}
            >
              <div className="final-note-icon">
                {activeTopic.interactiveTopic.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Full Module Notes
                </div>
                <div className="final-note-link">
                  Open Interactive Study Material <span>→</span>
                </div>
              </div>
            </div>
          )}

          {activeTopic.interactiveChapters.map(ch => {
            const config = INTERACTIVE_NOTES_MAP[ch.id];
            return (
              <div 
                key={ch.id}
                onClick={() => onSelectView(config.view)}
                className="note-card-final"
                style={{ 
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', padding: '28px', 
                  background: 'var(--surface)', borderRadius: '22px', border: '1px solid var(--border)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                }}
              >
                <div className="final-note-icon">
                  {config.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '4px', lineHeight: 1.3 }}>
                    {ch.name.replace(/^CH-\d+\s*/, '')}
                  </div>
                  <div className="final-note-link">
                    Explore Chapter Notes <span>→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .hub-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
          border-color: var(--accent-purple) !important;
        }
        .hub-card.level-1:hover { transform: translateY(-12px) scale(1.02); }
        
        .hub-icon-large {
          font-size: 4.5rem; margin-bottom: 24px;
          background: var(--bg-primary); width: 120px; height: 120px;
          display: flex; alignItems: center; justifyContent: center;
          border-radius: 32px; border: 1px solid var(--border);
        }
        .hub-icon-medium {
          font-size: 2.2rem; background: var(--bg-primary);
          width: 60px; height: 60px; display: flex; alignItems: center; justifyContent: center;
          border-radius: 16px; border: 1px solid var(--border);
        }
        .note-card-final:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.07) !important;
          border-color: var(--accent-blue) !important;
          background: var(--surface-hover) !important;
        }
        .final-note-icon {
          font-size: 2.5rem; width: 72px; height: 72px;
          background: var(--bg-primary); border-radius: 16px;
          display: flex; alignItems: center; justifyContent: center;
          border: 1px solid var(--border);
        }
        .final-note-link {
          color: var(--accent-blue); font-size: 0.95rem; font-weight: 800;
          display: flex; align-items: center; gap: 8px;
        }
        .final-note-link span { transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .note-card-final:hover .final-note-link span { transform: translateX(6px); }
        
        .breadcrumb-item:hover {
          color: var(--accent-purple) !important;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
