import React from 'react';

export default function TaskAnalytics({ tasks, onClose }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const high = tasks.filter(t => t.priority === 'high').length;
  const medium = tasks.filter(t => t.priority === 'medium').length;
  const low = tasks.filter(t => t.priority === 'low').length;

  return (
    <div className="card analytics-card">
      <div className="analytics-header">
        <h3>📊 Productivity & Task Analytics</h3>
        {onClose && (
          <button className="icon-btn" onClick={onClose} title="Close Analytics">
            ✕
          </button>
        )}
      </div>

      <div className="analytics-stats">
        <div className="stat-box">
          <span className="stat-num">{total}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-box">
          <span className="stat-num">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-box">
          <span className="stat-num">{pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-box">
          <span className="stat-num">{percent}%</span>
          <span className="stat-label">Progress</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
      </div>

      <div className="priority-distribution">
        <span className="dist-item"><span className="priority-badge high">High</span>: {high}</span>
        <span className="dist-item"><span className="priority-badge medium">Medium</span>: {medium}</span>
        <span className="dist-item"><span className="priority-badge low">Low</span>: {low}</span>
      </div>
    </div>
  );
}
