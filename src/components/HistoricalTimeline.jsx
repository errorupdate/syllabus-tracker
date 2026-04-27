import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, X, BookOpen, History,
  ChevronRight, Award, ChevronDown, Swords, Flag, 
  ScrollText, Landmark, Users, Zap, 
  Clock, ExternalLink, Sparkles, Image as ImageIcon,
  Flame, Target, Lightbulb, Trophy
} from 'lucide-react';
import { TIMELINE_DATA } from '../data/timelineData';
import './HistoricalTimeline.css';

const ERAS = [
  { id: 'all', label: 'All Eras', color: '#0f172a' },
  { id: 'ancient', label: 'Ancient', color: '#f97316' },
  { id: 'medieval', label: 'Medieval', color: '#8b5cf6' },
  { id: 'early-colonial', label: 'Colonial', color: '#10b981' },
  { id: 'british-raj', label: 'British Raj', color: '#f43f5e' },
  { id: 'modern', label: 'Modern India', color: '#0ea5e9' },
];

const CATEGORY_ICONS = {
  battle: <Swords size={14} />,
  movement: <Flag size={14} />,
  law: <ScrollText size={14} />,
  culture: <Landmark size={14} />,
  foundation: <Target size={14} />,
  landmark: <Sparkles size={14} />,
  birth: <Users size={14} />,
  default: <Clock size={14} />
};

const HistoricalTimeline = ({ onNavigate }) => {
  const [activeEra, setActiveEra] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim() && activeEra === 'all') return TIMELINE_DATA.sort((a, b) => a.sortKey - b.sortKey);

    const query = searchQuery.toLowerCase().trim();
    
    return TIMELINE_DATA
      .filter(item => {
        const matchesEra = activeEra === 'all' || item.era === activeEra;
        if (!matchesEra) return false;

        if (!query) return true;

        // "Minute Search": Deep search across all fields
        const searchFields = [
          item.title,
          item.year,
          item.brief,
          item.detail,
          item.category,
          item.era
        ].join(' ').toLowerCase();

        return searchFields.includes(query);
      })
      .sort((a, b) => a.sortKey - b.sortKey);
  }, [activeEra, searchQuery]);

  // Highlight helper component
  const HighlightText = ({ text, highlight }) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? 
            <mark key={i} className="search-highlight">{part}</mark> : 
            part
        )}
      </span>
    );
  };

  const stats = useMemo(() => ({
    ancient: TIMELINE_DATA.filter(e => e.era === 'ancient').length,
    medieval: TIMELINE_DATA.filter(e => e.era === 'medieval').length,
    colonial: TIMELINE_DATA.filter(e => e.era === 'early-colonial' || e.era === 'british-raj').length,
    modern: TIMELINE_DATA.filter(e => e.era === 'modern').length,
  }), []);

  const toggleExpand = (id) => {
    const isExpanding = expandedId !== id;
    setExpandedId(prev => (prev === id ? null : id));

    if (isExpanding) {
      // Small delay to allow DOM to update before scrolling
      setTimeout(() => {
        const el = document.getElementById(`timeline-card-${id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        // We don't want to auto-close when clicking study details which navigates away
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="timeline-container" ref={containerRef}>
      {/* Premium Header */}
      <header className="premium-timeline-header">
        <div className="header-top-tag">
          <History size={16} />
          <span>BPSC TRE 4.0 ULTIMATE CHRONICLE</span>
        </div>
        <h1 className="main-headline">Historical Roadmap</h1>
        <p className="sub-headline">Every crucial date from Ancient Civilizations to Modern Bihar, curated for 100% exam accuracy.</p>
        
        {/* Quick Stats Row */}
        <div className="stats-strip">
          <div className="stat-item">
            <span className="stat-count">{stats.ancient}</span>
            <span className="stat-label">Ancient</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-count">{stats.medieval}</span>
            <span className="stat-label">Medieval</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-count">{stats.colonial}</span>
            <span className="stat-label">Colonial</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-count">{stats.modern}</span>
            <span className="stat-label">Modern</span>
          </div>
        </div>
      </header>

      {/* Control Center */}
      <div className="control-center">
        <div className="search-pill">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search years, battles, or movements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && <X className="clear-icon" size={18} onClick={() => setSearchQuery('')} />}
        </div>

        <nav className="era-navigation">
          {ERAS.map(era => (
            <button
              key={era.id}
              className={`era-btn ${activeEra === era.id ? 'active' : ''}`}
              onClick={() => setActiveEra(era.id)}
              style={{ '--active-color': era.color }}
            >
              {era.label}
            </button>
          ))}
        </nav>
      </div>

      {/* The Timeline Track */}
      <div className="timeline-track-v2" ref={timelineRef}>
        {filteredData.map((event, index) => {
          const isExpanded = expandedId === `${event.sortKey}-${index}`;
          const Icon = CATEGORY_ICONS[event.category] || CATEGORY_ICONS.default;

          return (
            <div 
              key={`${event.sortKey}-${index}`}
              className={`event-node ${event.era} ${isExpanded ? 'active' : ''}`}
              id={event.anchorId}
            >
              <div 
                id={`timeline-card-${event.sortKey}-${index}`}
                className={`event-card-v2 ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleExpand(`${event.sortKey}-${index}`)}
              >
                <div className="card-header-v2">
                  <div className="event-meta-v2">
                    <span className="year-tag">{event.year}</span>
                    <span className={`cat-tag ${event.category}`}>
                      {Icon} {event.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="event-title-v2">
                    <HighlightText text={event.title} highlight={searchQuery} />
                  </h3>
                  <p className="event-brief-v2">
                    <HighlightText text={event.brief} highlight={searchQuery} />
                  </p>
                </div>

                {isExpanded && (
                  <div className="card-body-v2" onClick={e => e.stopPropagation()}>
                    {event.image && (
                      <div className="event-visual-v2" id={`img-container-${event.sortKey}-${index}`}>
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          onError={(e) => {
                            // Hide the entire container if image fails to load
                            const container = document.getElementById(`img-container-${event.sortKey}-${index}`);
                            if (container) container.style.display = 'none';
                          }}
                        />
                        <div className="visual-badge">
                          <ImageIcon size={14} /> Historical Reference
                        </div>
                      </div>
                    )}
                    <div className="detail-section">
                      <div className="detail-header">
                        <BookOpen size={16} /> Analysis & Context
                      </div>
                      <p className="detail-body-text">
                        <HighlightText text={event.detail} highlight={searchQuery} />
                      </p>
                    </div>

                    <div className="setter-insight">
                      <Trophy size={18} />
                      <div>
                        <strong>BPSC Focus:</strong> High frequency date. Linked to 
                        {event.era === 'ancient' ? ' spiritual roots ' : ' administrative shifts '}.
                      </div>
                    </div>

                    <div className="action-row-v2">
                      <button 
                        className="btn-v2 primary"
                        onClick={() => onNavigate(event.sourceView, event.anchorId)}
                      >
                        <ExternalLink size={18} />
                        Study Exact Portion
                      </button>
                      <button 
                        className="btn-v2 secondary"
                        onClick={() => setExpandedId(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
                
                {!isExpanded && (
                  <div className="card-footer-v2">
                    <span>Explore details</span>
                    <ChevronDown size={14} />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredData.length === 0 && (
          <div className="empty-results">
            <Search size={48} />
            <p>No historical events matched your search.</p>
            <button onClick={() => { setSearchQuery(''); setActiveEra('all'); }}>Clear Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalTimeline;
