import React from 'react';

const notesData = [
  {
    subject: "General Paper (History)",
    topics: [
      { name: "CH-1 बिहार स्पेशल", view: "bihar-notes", icon: "🗺️" },
      { name: "CH-2 यूरोपियों का आगमन", view: "advent-of-european", icon: "⛵" },
      { name: "CH-3 भारत में भूमि बंदोबस्त", view: "land-revenue", icon: "📜" },
      { name: "CH-4 शिक्षा का विकास", view: "education-india", icon: "🏫" },
      { name: "CH-5 जनजातीय और किसान आंदोलन", view: "tribal-movements", icon: "🌾" }
    ]
  },
  {
    subject: "Computer Science",
    topics: [
      { name: "T-9 Emerging Trends", view: "emerging-trends", icon: "💻" }
    ]
  }
];

export default function NotesHub({ onSelectView }) {
  return (
    <div className="notes-hub" style={{ padding: 'clamp(12px, 3vw, 24px)', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      <header style={{ marginBottom: 'clamp(24px, 5vw, 40px)', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 6vw, 2.8rem)', 
          fontWeight: 800, 
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent', 
          marginBottom: '12px',
          letterSpacing: '-0.02em'
        }}>Study Notes Hub</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', fontWeight: 500 }}>All your interactive study notes categorized in one place</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {notesData.map((subject, idx) => (
          <div key={idx} style={{ 
            background: 'var(--surface)', 
            borderRadius: '20px', 
            padding: 'clamp(16px, 4vw, 30px)', 
            border: '1px solid var(--border)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ 
                width: '50px', height: '50px', borderRadius: '14px', 
                background: 'var(--accent-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem'
              }}>
                📚
              </div>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{subject.subject}</h2>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>{subject.topics.length} Interactive Modules</p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '16px' }}>
              {subject.topics.map((topic, tidx) => (
                <div 
                  key={tidx} 
                  onClick={() => onSelectView(topic.view)}
                  style={{ 
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', 
                    background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative', overflow: 'hidden'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
                    e.currentTarget.style.borderColor = 'var(--accent-purple)';
                    e.currentTarget.style.background = 'var(--surface-hover)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--bg-primary)';
                  }}
                >
                  <div style={{ 
                    fontSize: '2rem', background: 'var(--surface)', border: '1px solid var(--border)',
                    width: '56px', height: '56px', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {topic.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.3 }}>{topic.name}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Open Notes <span style={{ transition: 'transform 0.2s' }}>→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
