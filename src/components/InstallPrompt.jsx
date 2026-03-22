import { useState, useEffect } from 'react';
import './InstallPrompt.css';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return; // Already running as PWA
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setShowBanner(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
  };

  if (!showBanner || installed) return null;

  return (
    <div className="install-banner">
      <div className="install-banner-content">
        <div className="install-banner-icon">📲</div>
        <div className="install-banner-text">
          <strong>Install BPSC Tracker</strong>
          <span>Get the app on your device for quick access</span>
        </div>
      </div>
      <div className="install-banner-actions">
        <button className="install-btn" onClick={handleInstall}>
          Install
        </button>
        <button className="install-dismiss" onClick={handleDismiss}>
          ✕
        </button>
      </div>
    </div>
  );
}
