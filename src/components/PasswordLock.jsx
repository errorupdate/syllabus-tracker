import { useState, useEffect } from 'react';
import './PasswordLock.css';

// Using SHA-256 hash of the password so the plaintext is not exposed in the client bundle
const TARGET_HASH = import.meta.env.VITE_APP_PASSWORD_HASH || "f6db2791536391dbae577b413420ced97deaefe56227f4a110ab20f462f417b3";

async function hashPassword(password) {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function PasswordLock({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('bpsc-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hash = await hashPassword(password);
    if (hash === TARGET_HASH) {
      localStorage.setItem('bpsc-auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  if (loading) return <div className="password-lock-overlay"></div>;

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="password-lock-overlay">
      <div className="password-lock-card glass-card">
        <h2>🔒 Security Lock</h2>
        <p>Please enter the password to access your tracker.</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            autoFocus
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="submit-btn" disabled={!password}>Unlock Application</button>
        </form>
      </div>
    </div>
  );
}
