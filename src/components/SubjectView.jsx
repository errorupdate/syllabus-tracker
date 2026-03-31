import React from 'react';
import ProgressBar from './ProgressBar';

export default function SubjectView({ subject, revisionData, onSelectView }) {
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

  const overallMax = subject.topics.reduce((acc, t) => acc + countPdfs(t) * 5, 0);
  const overallDone = subject.topics.reduce((acc, t) => acc + getRevDone(t), 0);

  return (
    <div className="dashboard animate-fade" style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      <div className="dashboard-header" style={{ marginBottom: '24px' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
          <span style={{ fontSize: '1.8rem' }}>📘</span> 
          {subject.name}
        </h1>
        <p className="subtitle" style={{ fontSize: '1.05rem', marginTop: '8px' }}>
          Select a topic below to dive into the revision checklist.
        </p>
      </div>

      <div className="stat-card glass-card fill-card" style={{ marginBottom: '32px', padding: '20px 24px' }}>
        <div className="card-row" style={{ marginBottom: '16px' }}>
           <span className="stat-label" style={{ fontSize: '1.05rem', fontWeight: 600 }}>Overall Subject Progress</span>
           <span className="stat-number-sm glow-text-green" style={{ fontSize: '1.2rem' }}>
             {overallMax > 0 ? Math.round((overallDone / overallMax) * 100) : 0}% 
             <span style={{ fontSize: '0.9rem', color: '#64748b', marginLeft: '6px', fontWeight: 500 }}>({overallDone}/{overallMax} revs)</span>
           </span>
        </div>
        <ProgressBar value={overallDone} max={overallMax} size="md" />
      </div>

      <div className="subject-topics-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {subject.topics.map(t => {
          const isChaptered = t.chapters && t.chapters.length > 0;
          const pdfs = countPdfs(t);
          const done = getRevDone(t);
          const max = pdfs * 5;

          return (
            <div key={t.id} className={`topic-group-card glass-card ${!isChaptered ? 'interactive' : ''}`} 
                 onClick={() => { if(!isChaptered) onSelectView(t.id); }}
                 style={{ 
                   padding: '24px', 
                   borderRadius: '16px',
                   cursor: !isChaptered ? 'pointer' : 'default',
                   transition: 'transform 0.2s, box-shadow 0.2s'
                 }}
                 onMouseEnter={e => {
                   if(!isChaptered) {
                     e.currentTarget.style.transform = 'translateY(-2px)';
                     e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                   }
                 }}
                 onMouseLeave={e => {
                   if(!isChaptered) {
                     e.currentTarget.style.transform = 'none';
                     e.currentTarget.style.boxShadow = 'none';
                   }
                 }}>
              <div 
                 className="topic-header"
                 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isChaptered ? '20px' : '0' }}
              >
                 <div style={{ flex: 1 }}>
                   <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#e2e8f0', letterSpacing: '-0.3px' }}>{t.name}</h2>
                   {!isChaptered && (
                     <div style={{ marginTop: '12px' }}>
                       <ProgressBar value={done} max={max} size="sm" />
                       <p style={{ margin: '8px 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                         {pdfs} PDFs • {done} / {max} revs done
                       </p>
                     </div>
                   )}
                 </div>
                 {!isChaptered && <span style={{ color: '#8b5cf6', fontSize: '1.4rem', marginLeft: '16px', transition: 'transform 0.2s' }} className="arrow-icon">→</span>}
              </div>
              
              {isChaptered && (
                 <div className="chapters-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
                   {t.chapters.map(ch => {
                      let chDone = 0;
                      ch.pdfs.forEach((_, i) => { for (let r = 0; r < 5; r++) if (revisionData[`${ch.id}-${i}-r${r}`]) chDone++; });
                      const chMax = ch.pdfs.length * 5;
                      return (
                        <div 
                          key={ch.id} 
                          className="chapter-card interactive" 
                          onClick={(e) => { e.stopPropagation(); onSelectView(ch.id); }}
                          style={{ 
                            background: 'rgba(255,255,255,0.02)', 
                            border: '1px solid rgba(255,255,255,0.05)', 
                            borderRadius: '12px', 
                            padding: '16px', 
                            cursor: 'pointer', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '12px', 
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { 
                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; 
                            e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)'; 
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={e => { 
                            e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; 
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; 
                            e.currentTarget.style.transform = 'none';
                          }}
                        >
                          <h4 style={{ margin: 0, fontSize: '1rem', color: '#cbd5e1', fontWeight: 600 }}>{ch.name}</h4>
                          <ProgressBar value={chDone} max={chMax} size="sm" />
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8' }}>
                             <span>{ch.pdfs.length} PDFs</span>
                             <span>{chDone}/{chMax} revs</span>
                          </div>
                        </div>
                      )
                   })}
                 </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
