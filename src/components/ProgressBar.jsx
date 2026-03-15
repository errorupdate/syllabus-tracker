export default function ProgressBar({ value, max, label, size = 'md', showPercent = true }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className={`progress-bar-wrapper progress-${size}`}>
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      {showPercent && <span className="progress-pct">{pct}%</span>}
    </div>
  );
}
