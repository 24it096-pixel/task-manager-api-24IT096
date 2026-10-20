import React, { memo } from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  const handleDelete = () => {
    // Confirmation dialog as requested in the assignment
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task._id);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input 
          type="checkbox" 
          className="task-checkbox" 
          checked={task.completed}
          onChange={() => onToggle(task._id, !task.completed)}
        />
        <div className="task-details">
          <span className="task-title">{task.title}</span>
          <div className="task-meta">
            <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
            {task.createdAt && <span>{new Date(task.createdAt).toLocaleDateString()}</span>}
          </div>
        </div>
      </div>
      <div className="task-actions">
        <button className="icon-btn delete" onClick={handleDelete} title="Delete Task">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

// React.memo optimization: Prevents unnecessary re-renders of unmodified task rows
export default memo(TaskItem);
