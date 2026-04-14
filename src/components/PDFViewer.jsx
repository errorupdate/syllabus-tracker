import { useState } from 'react';
import { getDriveId } from '../data/driveMap';
import './QuestionBank.css';

export default function PDFViewer({ pdfName, onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const driveId = getDriveId(pdfName);
  const driveUrl = driveId
    ? `https://drive.google.com/file/d/${driveId}/preview`
    : null;

  return (
    <div className="tm-overlay" style={{ zIndex: 9999 }}>
      {/* Top Header Bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '60px',
        background: 'var(--bg-secondary)', borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden', flex: 1 }}>
          <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>📄</span>
          <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {pdfName}
          </h2>
        </div>
        <button 
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
            width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
            flexShrink: 0
          }}
        >
          ✕
        </button>
      </div>

      {/* Content Area */}
      <div style={{
        position: 'absolute', top: '60px', bottom: 0, left: 0, right: 0,
        background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {!driveUrl && (
          <div style={{ padding: '30px', background: 'rgba(244,67,54,0.1)', border: '1px solid #f44336', borderRadius: '12px', color: '#f44336', textAlign: 'center', maxWidth: '80%' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '15px' }}>⚠️</span>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
              PDF not found in Google Drive: <strong>{pdfName}</strong>
            </p>
            <p style={{ fontSize: '0.9rem', marginTop: '10px', color: 'rgba(244,67,54,0.7)' }}>
              Make sure this file has been uploaded to your Google Drive folder.
            </p>
          </div>
        )}

        {driveUrl && loading && (
          <div className="tm-loading" style={{ position: 'absolute', zIndex: 5 }}>
            <div className="tm-spinner" />
            <span>Loading PDF from Google Drive...</span>
          </div>
        )}

        {driveUrl && (
          <iframe 
            src={driveUrl}
            style={{ 
              width: '100%', height: '100%', border: 'none',
              opacity: loading ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}
            title={pdfName}
            allow="autoplay"
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError(true); }}
          />
        )}

        {error && (
          <div style={{ position: 'absolute', padding: '30px', background: 'rgba(244,67,54,0.1)', border: '1px solid #f44336', borderRadius: '12px', color: '#f44336', textAlign: 'center', maxWidth: '80%' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '15px' }}>⚠️</span>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
              Failed to load PDF. Please check your Google Drive sharing settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
