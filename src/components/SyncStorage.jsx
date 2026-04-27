import { useState, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useAuth } from '../AuthContext';
import './QuestionBank.css'; // Steal some styles for the UI

export default function SyncStorage({ onClose }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [errors, setErrors] = useState([]);
  const { isAdmin } = useAuth();
  const fileInputRef = useRef(null);

  const handleFolderSelect = (e) => {
    // Filter only PDF files
    const allFiles = Array.from(e.target.files);
    const pdfs = allFiles.filter(f => f.name.toLowerCase().endsWith('.pdf'));
    setFiles(pdfs);
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setErrors([]);
    
    let uploadedCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Clean up the name exactly like data.js does, but keep the space formatting
      // Firebase URLs are easy. We just upload it with the raw filename.
      // e.g. "Operating System 01 Class Notes.pdf"
      const storageRef = ref(storage, `pdfs/${file.name}`);
      
      setStatusText(`Uploading (${i + 1}/${files.length}): ${file.name}`);
      
      try {
        await uploadBytesResumable(storageRef, file);
        uploadedCount++;
        setProgress(Math.round((uploadedCount / files.length) * 100));
      } catch (err) {
        setErrors(prev => [...prev, `Failed to upload ${file.name}: ${err.message}`]);
      }
    }

    setStatusText(`Complete! Uploaded ${uploadedCount} PDFs to the cloud.`);
    setUploading(false);
  };

  return (
    <div className="tm-overlay">
      {!isAdmin ? (
        <div className="tm-setup-card animate-fade-in" style={{ maxWidth: '400px', width: '90%', textAlign: 'center' }}>
          <h2 style={{ color: '#ef4444', marginBottom: '20px' }}>🔒 Restricted Access</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Only the Administrator can synchronize local folders to the cloud storage.</p>
          <button className="qb-btn" onClick={onClose}>Return to Dashboard</button>
        </div>
      ) : (
        <div className="tm-setup-card animate-fade-in" style={{ maxWidth: '600px', width: '90%', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--accent)', marginBottom: '10px' }}>☁️ Cloud Firebase Sync</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Select your local "BPSC tre 4.0" folder to securely synchronize all your PDFs to the cloud across all your devices.</p>
        
        {!uploading && progress !== 100 && (
          <div style={{ marginBottom: '30px' }}>
            <input 
              type="file" 
              webkitdirectory="true" 
              directory="true" 
              multiple 
              onChange={handleFolderSelect}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button 
              className="qb-btn qb-btn-primary" 
              onClick={() => fileInputRef.current.click()}
              style={{ padding: '15px 30px', fontSize: '1.2rem', background: 'white', color: 'black' }}
            >
              📁 Select Local PDF Folder
            </button>
            {files.length > 0 && (
              <p style={{ marginTop: '15px', color: '#4ade80' }}>✔ {files.length} PDFs detected and ready to sync.</p>
            )}
          </div>
        )}

        {files.length > 0 && !uploading && progress === 0 && (
          <button 
            className="qb-btn qb-btn-success" 
            onClick={uploadFiles}
            style={{ width: '100%', padding: '15px', fontSize: '1.2rem', marginBottom: '20px' }}
          >
            🚀 Start Cloud Upload
          </button>
        )}

        {(uploading || progress > 0) && (
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '15px' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.3s' }}></div>
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{progress}% Complete</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{statusText}</p>
          </div>
        )}

        {errors.length > 0 && (
          <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(244, 67, 54, 0.1)', border: '1px solid #f44336', borderRadius: '8px', color: '#f44336', textAlign: 'left', maxHeight: '150px', overflowY: 'auto' }}>
            <strong>Errors encountered:</strong>
            <ul style={{ margin: 0, paddingLeft: '20px', marginTop: '10px', fontSize: '0.85rem' }}>
              {errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        )}

        <button 
          className="qb-btn" 
          onClick={onClose}
          style={{ marginTop: '30px' }}
          disabled={uploading}
        >
          {progress === 100 ? 'Go to Dashboard' : 'Cancel & Close'}
        </button>
        </div>
      )}
    </div>
  );
}
