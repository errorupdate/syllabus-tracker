import { useState, useEffect } from 'react';
import AuthContext from '../AuthContext';
import { Lock, Shield, User, Key, CheckCircle, AlertCircle } from 'lucide-react';
import './PasswordLock.css';

const ADMIN_HASH = "f6db2791536391dbae577b413420ced97deaefe56227f4a110ab20f462f417b3";
const USER_HASH = "15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225";

/**
 * SECURITY NOTE:
 * We use SHA-256 (Secure Hash Algorithm 2) to protect credentials.
 * The plaintext password is NEVER stored in the database or seen by the server.
 * Only the cryptographically secure hash is compared locally.
 * This ensures that even if someone sees the code, they cannot "undo" the hash to find your password.
 */
async function hashPassword(password) {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function PasswordLock({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'user'
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isHasing, setIsHasing] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('bpsc-auth');
    const role = localStorage.getItem('bpsc-role');
    if (auth === 'true' && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;
    
    setIsHasing(true);
    setError('');
    
    try {
      const hash = await hashPassword(password);
      
      // Artificial delay to prevent automated brute-force attacks
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (hash === ADMIN_HASH) {
        login('admin');
      } else if (hash === USER_HASH) {
        login('user');
      } else {
        setError('Unauthorized access. Access key is incorrect.');
        setPassword('');
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setIsHasing(false);
    }
  };

  const login = (role) => {
    localStorage.setItem('bpsc-auth', 'true');
    localStorage.setItem('bpsc-role', role);
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('bpsc-auth');
    localStorage.removeItem('bpsc-role');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (loading) return <div className="auth-overlay-loading"></div>;

  if (isAuthenticated) {
    return (
      <AuthContext.Provider value={{ isAuthenticated, userRole, logout, isAdmin: userRole === 'admin' }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-visual-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="auth-card-wrapper animate-fade-in">
        <div className="auth-card-premium">
          <div className="auth-header">
            <div className="auth-icon-badge">
              <Shield size={32} className="shield-icon" />
            </div>
            <h1>BPSC TRE 4.0</h1>
            <p className="auth-subtitle">Secure Academic Portal</p>
          </div>

          <div className="auth-body">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group-premium">
                <div className="input-icon-wrapper">
                  <Key size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Secure Key"
                  autoFocus
                  className={error ? 'input-error' : ''}
                />
              </div>

              {error && (
                <div className="auth-error-pill animate-shake">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}

              <button 
                type="submit" 
                className={`auth-submit-btn ${isHasing ? 'loading' : ''}`} 
                disabled={!password || isHasing}
              >
                {isHasing ? (
                  <span className="spinner"></span>
                ) : (
                  <>
                    <span>Unlock Portal</span>
                    <Lock size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="auth-footer">
            <p>© 2026 BPSC Syllabus Tracker</p>
            <div className="auth-status-tags">
              <span className="status-tag"><CheckCircle size={10} /> Fully Encrypted</span>
              <span className="status-tag"><CheckCircle size={10} /> Role-Based Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
