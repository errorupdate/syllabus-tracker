import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { SUBJECTS } from '../data';
import { PYQ_QUESTIONS } from '../pyqData';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import './ChatBot.css';

export default function ChatBot({ revisionData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [testHistory, setTestHistory] = useState([]);
  const [dbQuestions, setDbQuestions] = useState([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const [configKey, setConfigKey] = useState(() => localStorage.getItem('gemini_api_key_override') || '');
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || configKey;

  // Fetch contextual data from Firebase
  useEffect(() => {
    // 1. Fetch Test History (latest 20 tests)
    const qTest = query(collection(db, 'testResults'), orderBy('timestamp', 'desc'), limit(20));
    const unsubTest = onSnapshot(qTest, snap => {
      setTestHistory(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => console.error(err));

    // 2. Fetch User Question Bank (v2)
    const qbRef = collection(db, 'questionBank-v2');
    const unsubQb = onSnapshot(qbRef, snap => {
      setDbQuestions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, err => console.error(err));

    return () => {
      unsubTest();
      unsubQb();
    };
  }, []);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Handle open/close
  const toggleChat = () => setIsOpen(!isOpen);

  // Auto resize textarea
  const handleInput = (e) => {
    setInputVal(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    const text = inputVal.trim();
    if (!text) return;
    
    if (!apiKey) {
      const userKey = prompt("API Key not found inside .env!\n\nSince you are testing across devices, please paste your Gemini API Key here to save it securely to this device's memory:");
      if (userKey) {
        localStorage.setItem('gemini_api_key_override', userKey.trim());
        setConfigKey(userKey.trim());
        alert("Key saved securely to this device! You can now send your message.");
      }
      return;
    }

    // Reset input
    setInputVal('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    // Append user message to UI
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      // Build Project Context from data.js
      const syllabusSummary = SUBJECTS.map(s => 
        `Subject: ${s.name}\nTopics: ${s.topics.map(t => t.name).join(', ')}`
      ).join('\n\n');

      // Build Progress Summary
      const activeKeys = Object.keys(revisionData || {}).filter(k => revisionData[k]);
      
      // Build Test History Summary
      const testSummary = testHistory.map((t, i) => 
        `Test ${i+1}: Subject/Topic ${t.subjectId || 'Mixed'}, Score: ${t.score}/${t.totalQs}, Accuracy: ${t.accuracy}%`
      ).join('\n');

      // Build Question Bank Context (Legacy + User-added)
      const allQuestions = [...PYQ_QUESTIONS.map(q => ({ q: q.question, a: q.answer, exp: q.explanation })), ...dbQuestions.map(q => {
        let correctA = '';
        if (q.correctAnswerId === 'opt1') correctA = q.opt1 || q.optA;
        if (q.correctAnswerId === 'opt2') correctA = q.opt2 || q.optB;
        if (q.correctAnswerId === 'opt3') correctA = q.opt3 || q.optC;
        if (q.correctAnswerId === 'optD') correctA = 'More than one of the above';
        if (q.correctAnswerId === 'optE') correctA = 'None of the above';
        return { q: q.text, a: correctA, exp: q.explanation || '' };
      })];
      
      const qbSummary = allQuestions.map((q, i) => `Q${i+1}: ${q.q} | Ans: ${q.a} | Note: ${q.exp}`).join('\n');

      const systemPrompt = `
You are the "Syllabus Tracker AI", an extremely helpful and intelligent RAG-driven study assistant embedded in the 'BPSC TRE 4.0 Revision Tracker' app.
You have the ability to explicitly search through minute details of the Website's internal data.

=== WEBSITE DATA: SYLLABUS STRUCTURE ===
${syllabusSummary}

=== WEBSITE DATA: USER PROGRESS ===
User has completed paths: ${activeKeys.join(', ') || 'No progress yet'}

=== WEBSITE DATA: TEST DASHBOARD RESULTS ===
${testSummary || 'No tests taken yet'}

=== WEBSITE DATA: QUESTION BANK ===
(There are ${allQuestions.length} custom questions available)
${qbSummary.substring(0, 500000) /* Safety cap to 500k chars ~120k tokens */}

Rules:
1. "SEARCH FIRST": Always check the Website Data above before providing a generic answer. If they ask about their test score, weak topics, or question bank details, extract it from the arrays above!
2. Answer anything about the syllabus, their progress, their tests, or specific questions they've stored.
3. If their question asks for general study help (outside the project), provide a great internet-based response.
4. Use clear Markdown!
      `;

      // Convert local state messages to Gemini API format
      const history = newMessages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      // Add the user's latest query
      const latestQuery = [
        ...history,
        { role: 'user', parts: [{ text: text }] }
      ];

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: latestQuery
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message || "API Error");

      const botReply = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { role: 'bot', content: "⚠️ Sorry, I encountered an error connecting to the AI. " + err.message }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Main Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>🤖 Syllabus AI Tracker <span className="chatbot-status">Online</span></h3>
          <button className="chatbot-close-btn" onClick={toggleChat} title="Close Chat">✕</button>
        </div>
        
        <div className="chatbot-messages">
          {messages.length === 0 ? (
            <div className="chatbot-empty">
              <div className="chatbot-empty-icon">✨</div>
              <h4>Ask me anything!</h4>
              <p>I know everything about your BPSC syllabus and can answer general questions too.</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.role}`}>
                {msg.role === 'bot' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            ))
          )}
          {isTyping && (
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input-area">
          <textarea
            ref={textareaRef}
            className="chatbot-textarea"
            placeholder="Type your question..."
            value={inputVal}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isTyping}
          />
          <button 
            className="chatbot-send-btn" 
            onClick={sendMessage} 
            disabled={isTyping || !inputVal.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      {!isOpen && (
        <button className="chatbot-fab" onClick={toggleChat} title="Open AI Assistant">
          ✨
        </button>
      )}
    </div>
  );
}
