export default function PDFList({ title, pdfs, idPrefix, revisionData, onToggle, onOpenNotes }) {
  return (
    <div className="pdf-list">
      <div className="pdf-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0 }}>{title}</h1>
          <span className="pdf-count" style={{ display: 'block', marginTop: '6px' }}>{pdfs.length} PDFs</span>
        </div>
        {onOpenNotes && (
          <button 
            className="btn-inline-notes" 
            style={{ padding: '8px 16px', fontSize: '0.95rem' }} 
            onClick={onOpenNotes}
          >
            📝 View Notes
          </button>
        )}
      </div>

      <div className="pdf-table">
        <div className="pdf-table-head">
          <span className="col-name">PDF Name</span>
          <span className="col-revisions">
            {[1, 2, 3, 4, 5].map(n => <span key={n} className="rev-head">R{n}</span>)}
          </span>
          <span className="col-progress">Progress</span>
        </div>

        {pdfs.map((pdf, i) => {
          const key = `${idPrefix}-${i}`;
          let doneCount = 0;
          for (let r = 0; r < 5; r++) if (revisionData[`${key}-r${r}`]) doneCount++;
          const allDone = doneCount === 5;

          return (
            <div key={key} className={`pdf-row ${allDone ? 'completed' : ''}`}>
              <span className="col-name pdf-name">
                <span className="pdf-icon">{allDone ? '✅' : '📄'}</span>
                {pdf}
              </span>
              <span className="col-revisions">
                {[0, 1, 2, 3, 4].map(r => {
                  const timestamp = revisionData[`${key}-r${r}`];
                  const checked = !!timestamp;
                  
                  // Calculate days from previous revision if both exist
                  let daysLabel = null;
                  if (r > 0 && checked) {
                    const prevTimestamp = revisionData[`${key}-r${r-1}`];
                    if (prevTimestamp) {
                      const diffMs = timestamp - prevTimestamp;
                      // Only show if positive (in case they were clicked out of order)
                      if (diffMs > 0) {
                        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                        daysLabel = days === 0 ? 'Today' : `${days}d`;
                      }
                    }
                  }

                  return (
                    <div key={r} className="rev-wrapper">
                      <button
                        className={`rev-circle ${checked ? 'checked' : ''}`}
                        onClick={() => onToggle(`${key}-r${r}`)}
                        title={checked ? new Date(timestamp).toLocaleDateString() : `Revision ${r + 1}`}
                      >
                        {checked ? '✓' : r + 1}
                      </button>
                      {daysLabel && <span className="rev-days">+{daysLabel}</span>}
                    </div>
                  );
                })}
              </span>
              <span className="col-progress">
                <span className={`progress-mini ${allDone ? 'done' : ''}`}>{doneCount}/5</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
