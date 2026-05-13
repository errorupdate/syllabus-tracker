import { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import './UpdatePrompt.css';

export default function UpdatePrompt() {
  const [dismissing, setDismissing] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, registration) {
      // Check for updates every 60 seconds
      if (registration) {
        setInterval(() => {
          registration.update();
        }, 60 * 1000);
      }
    },
    onRegSWUpdFound() {
      console.log('[PWA] New service worker found, update available.');
    },
  });

  // Auto-dismiss after 30 seconds
  useEffect(() => {
    if (!needRefresh || dismissed) return;
    const timer = setTimeout(() => {
      handleDismiss();
    }, 30000);
    return () => clearTimeout(timer);
  }, [needRefresh, dismissed]);

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(() => {
      setDismissed(true);
      setNeedRefresh(false);
      setDismissing(false);
    }, 400);
  };

  if (!needRefresh || dismissed) return null;

  return (
    <div className={`update-prompt-overlay ${dismissing ? 'dismissing' : ''}`}>
      <div className="update-prompt-card">
        <div className="update-prompt-header">
          <div className="update-prompt-icon">🚀</div>
          <div>
            <p className="update-prompt-title">New Version Available</p>
            <p className="update-prompt-subtitle">
              Tap update to get the latest features
            </p>
          </div>
        </div>
        <div className="update-prompt-progress">
          <div className="update-prompt-progress-bar" />
        </div>
        <div className="update-prompt-actions">
          <button className="update-btn-primary" onClick={handleUpdate}>
            Update Now
          </button>
          <button className="update-btn-dismiss" onClick={handleDismiss}>
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
