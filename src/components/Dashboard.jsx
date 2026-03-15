import ProgressBar from './ProgressBar';

export default function Dashboard({ subjects, revisionData }) {
  function countPdfs(topic) {
    if (topic.chapters) return topic.chapters.reduce((s, ch) => s + ch.pdfs.length, 0);
    return (topic.pdfs || []).length;
  }

  function getRevDone(topic) {
    let done = 0;
    if (topic.chapters) {
      for (const ch of topic.chapters) {
        ch.pdfs.forEach((_, i) => {
          for (let r = 0; r < 5; r++) if (revisionData[`${ch.id}-${i}-r${r}`]) done++;
        });
      }
    } else if (topic.pdfs) {
      topic.pdfs.forEach((_, i) => {
        for (let r = 0; r < 5; r++) if (revisionData[`${topic.id}-${i}-r${r}`]) done++;
      });
    }
    return done;
  }

  // Calculate Today and Yesterday stats
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterdayStart = todayStart - (24 * 60 * 60 * 1000);

  let todayRevisions = 0;
  let yesterdayRevisions = 0;
  let totalPdfs = 0, totalRevDone = 0, totalRevMax = 0;
  
  // Track recently revised PDFs for a 'Recent Activity' section
  const recentPdfs = new Map();

  const countActivity = (topic, chId, idx, pdfName) => {
    let tDone = 0;
    for (let r = 0; r < 5; r++) {
      const ts = revisionData[`${chId}-${idx}-r${r}`];
      if (ts) {
        tDone++;
        totalRevDone++;
        const key = `${chId}-${idx}`;
        if (ts >= todayStart) {
          todayRevisions++;
          if (!recentPdfs.has(key) || recentPdfs.get(key).ts < ts) {
            recentPdfs.set(key, { topicName: topic.name, pdfName, ts, type: 'today', rev: r + 1 });
          }
        } else if (ts >= yesterdayStart && ts < todayStart) {
          yesterdayRevisions++;
          if (!recentPdfs.has(key) || recentPdfs.get(key).ts < ts) {
            recentPdfs.set(key, { topicName: topic.name, pdfName, ts, type: 'yesterday', rev: r + 1 });
          }
        }
      }
    }
    return tDone;
  };

  const subjectStats = subjects.map(s => {
    let sPdfs = 0, sDone = 0;
    s.topics.forEach(t => { 
      let tPdfs = countPdfs(t);
      sPdfs += tPdfs; 
      
      let tDone = 0;
      if (t.chapters) {
        for (const ch of t.chapters) {
          ch.pdfs.forEach((pdf, i) => { tDone += countActivity(t, ch.id, i, pdf); });
        }
      } else if (t.pdfs) {
        t.pdfs.forEach((pdf, i) => { tDone += countActivity(t, t.id, i, pdf); });
      }
      sDone += tDone;
    });
    totalPdfs += sPdfs; 
    totalRevMax += sPdfs * 5;
    return { ...s, pdfCount: sPdfs, revDone: sDone, revMax: sPdfs * 5 };
  });

  const overallPct = totalRevMax > 0 ? Math.round((totalRevDone / totalRevMax) * 100) : 0;

  // Find least-revised topics
  const topicProgress = [];
  subjects.forEach(s => {
    s.topics.forEach(t => {
      const pdfCount = countPdfs(t);
      const done = getRevDone(t);
      const max = pdfCount * 5;
      topicProgress.push({ name: t.name, pct: max > 0 ? Math.round((done / max) * 100) : 0, done, max });
    });
  });
  topicProgress.sort((a, b) => a.pct - b.pct);
  
  const todayList = Array.from(recentPdfs.values())
    .filter(item => item.type === 'today')
    .sort((a, b) => b.ts - a.ts);

  const yesterdayList = Array.from(recentPdfs.values())
    .filter(item => item.type === 'yesterday')
    .sort((a, b) => b.ts - a.ts);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📖 BPSC Revision Tracker</h1>
        <p className="subtitle">Track your revision progress across all subjects</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card glow-purple">
          <div className="stat-number">{totalPdfs}</div>
          <div className="stat-label">Total PDFs</div>
        </div>
        <div className="stat-card glow-teal">
          <div className="stat-number">{totalRevDone}</div>
          <div className="stat-label">Total Done</div>
        </div>
        <div className="stat-card glow-blue">
          <div className="stat-number">{todayRevisions}</div>
          <div className="stat-label">Done Today</div>
        </div>
        <div className="stat-card glow-amber">
          <div className="stat-number">{yesterdayRevisions}</div>
          <div className="stat-label">Done Yesterday</div>
        </div>
      </div>

      <div className="stats-grid-secondary">
        <div className="stat-card glass-card fill-card">
           <div className="card-row">
             <span className="stat-label">Overall Progress</span>
             <span className="stat-number-sm glow-text-green">{overallPct}% ({totalRevDone}/{totalRevMax})</span>
           </div>
           <ProgressBar value={totalRevDone} max={totalRevMax} size="md" />
        </div>
      </div>

      <div className="dashboard-columns">
        <div className="dashboard-section main-col">
          <h2>📂 Subject Progress</h2>
          <div className="subject-cards">
            {subjectStats.map(s => (
              <div key={s.id} className="subject-card glass-card">
                <div className="subject-card-header">
                  <h3>{s.name}</h3>
                  <span className="topic-count">{s.topics.length} topics</span>
                </div>
                <div className="subject-card-stats">
                  <span>{s.pdfCount} PDFs</span>
                  <span>{s.revDone} / {s.revMax} revs</span>
                </div>
                <ProgressBar value={s.revDone} max={s.revMax} size="md" />
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section side-col">
          {todayList.length > 0 && (
            <div className="side-panel-group">
              <h2>⚡ Done Today</h2>
              <div className="attention-list">
                {todayList.map((item, i) => (
                  <div key={i} className="attention-item glass-card list-item-compact">
                    <div className="activity-details">
                      <span className="attention-name">{item.pdfName.replace(/\.pdf$/i, '')}</span>
                      <span className="activity-subtext">{item.topicName.replace(/^T-?\d+\s*[-–]?\s*/, '')} (R{item.rev})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {yesterdayList.length > 0 && (
            <div className={`side-panel-group ${todayList.length > 0 ? 'mt-6' : ''}`}>
              <h2>📅 Done Yesterday</h2>
              <div className="attention-list">
                {yesterdayList.map((item, i) => (
                  <div key={i} className="attention-item glass-card list-item-compact">
                    <div className="activity-details">
                      <span className="attention-name">{item.pdfName.replace(/\.pdf$/i, '')}</span>
                      <span className="activity-subtext">{item.topicName.replace(/^T-?\d+\s*[-–]?\s*/, '')} (R{item.rev})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="side-panel-group mt-6">
            <h2>🎯 Needs Attention</h2>
            <div className="attention-list">
              {topicProgress.slice(0, 6).map((t, i) => (
                <div key={i} className="attention-item glass-card">
                  <span className="attention-name">{t.name.replace(/^T-?\d+\s*[-–]?\s*/, '')}</span>
                  <ProgressBar value={t.done} max={t.max} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
