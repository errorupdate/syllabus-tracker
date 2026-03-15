import { useState, useMemo } from 'react';
import { PYQ_QUESTIONS } from './pyqData';
import './PYQPage.css';

export default function PYQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedTheme, setSelectedTheme] = useState('All');
  const [expandedCards, setExpandedCards] = useState({});

  // Extract unique filters
  const exams = ['All', ...new Set(PYQ_QUESTIONS.map(q => q.exam).filter(Boolean))].sort();
  const years = ['All', ...new Set(PYQ_QUESTIONS.map(q => q.year))].sort();
  const subjects = ['All', ...new Set(PYQ_QUESTIONS.map(q => q.subject))].sort();

  const themes = useMemo(() => {
    let filteredForThemes = PYQ_QUESTIONS;
    if (selectedSubject !== 'All') {
      filteredForThemes = filteredForThemes.filter(q => q.subject === selectedSubject);
    }
    return ['All', ...new Set(filteredForThemes.map(q => q.theme).filter(Boolean))].sort();
  }, [selectedSubject]);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedTheme('All'); // Reset theme when subject changes
  };

  // Filter and search logic
  const filteredQuestions = useMemo(() => {
    return PYQ_QUESTIONS.filter(q => {
      const matchExam = selectedExam === 'All' || q.exam === selectedExam;
      const matchYear = selectedYear === 'All' || q.year === selectedYear;
      const matchSubject = selectedSubject === 'All' || q.subject === selectedSubject;
      const matchTheme = selectedTheme === 'All' || q.theme === selectedTheme;
      const searchStr = searchTerm.toLowerCase();
      const matchSearch = searchTerm === '' || 
        (q.question && q.question.toLowerCase().includes(searchStr)) ||
        (q.answer && q.answer.toLowerCase().includes(searchStr)) ||
        (q.theme && q.theme.toLowerCase().includes(searchStr)) ||
        (q.explanation && q.explanation.toLowerCase().includes(searchStr));

      return matchExam && matchYear && matchSubject && matchTheme && matchSearch;
    });
  }, [searchTerm, selectedExam, selectedYear, selectedSubject, selectedTheme]);

  const toggleAnswer = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getYearColor = (year) => {
    if (year === '2019') return 'year-2019';
    if (year === '2020') return 'year-2020';
    if (year === '2023') return 'year-2023';
    return 'year-default';
  };

  return (
    <div className="pyq-page">
      <div className="pyq-header">
        <h1>🔍 Previous Year Questions</h1>
        <p className="subtitle">Master your exams with historical questions and detailed explanations</p>
      </div>

      <div className="pyq-controls glass-card">
        <div className="search-box">
          <span className="search-icon">🔎</span>
          <input 
            type="text" 
            placeholder="Search questions, answers, themes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <label>Exam:</label>
            <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
              {exams.map(ex => <option key={ex} value={ex}>{ex}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Year:</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Subject:</label>
            <select value={selectedSubject} onChange={handleSubjectChange}>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Subtopic:</label>
            <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
              {themes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="pyq-stats">
        <span>Showing {filteredQuestions.length} of {PYQ_QUESTIONS.length} questions</span>
      </div>

      <div className="pyq-grid">
        {filteredQuestions.length === 0 ? (
          <div className="no-results">
            <h3>No questions found matching your criteria.</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          filteredQuestions.map((q, index) => (
            <div key={q.id || index} className={`pyq-card ${getYearColor(q.year)}`}>
              <div className="card-header">
                <span className="badge exam-badge">{q.exam} {q.year}</span>
                <span className="badge subject-badge">{q.subject}</span>
              </div>
              
              <div className="card-theme">{q.theme}</div>
              
              <h3 className="card-question">Q: {q.question || "Image/Formula Based Question (See PDF)"}</h3>
              
              <button 
                className={`toggle-answer-btn ${expandedCards[q.id] ? 'open' : ''}`}
                onClick={() => toggleAnswer(q.id)}
              >
                {expandedCards[q.id] ? 'Hide Answer ↑' : 'Show Answer ↓'}
              </button>
              
              {expandedCards[q.id] && (
                <div className="card-answer-section">
                  <div className="answer-box">
                    <strong>Answer:</strong> {q.answer}
                  </div>
                  {q.explanation && (
                    <div className="explanation-box">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
