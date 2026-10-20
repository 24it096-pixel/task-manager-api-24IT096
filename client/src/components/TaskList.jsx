import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete, loading }) {
  if (loading && tasks.length === 0) {
    return <div className="loading-spinner"></div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="card empty-state">
        <p>No tasks found. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task._id || Math.random().toString()} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
