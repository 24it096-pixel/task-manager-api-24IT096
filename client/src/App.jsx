import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, fetchMe } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Toast from './components/Toast';

// Code Splitting with React.lazy(): Loaded only on demand
const AuthForm = lazy(() => import('./components/AuthForm'));
const TaskAnalytics = lazy(() => import('./components/TaskAnalytics'));

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Handle unauthorized/expired token events from api.js
  useEffect(() => {
    const handleUnauthorized = () => {
      setCurrentUser(null);
      setTasks([]);
      addToast('Session expired. Please log in again.', 'error');
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [addToast]);

  // Load user profile and tasks on authentication
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      addToast(err.message || 'Failed to load tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchMe()
        .then(res => {
          if (res.user) {
            setCurrentUser(res.user);
            loadTasks();
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setCurrentUser(null);
        });
    }
  }, [loadTasks]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    setTasks([]);
    setShowAnalytics(false);
    addToast('Logged out successfully', 'info');
  };

  const handleAddTask = async (taskData) => {
    // Optimistic UI Update
    const tempId = `temp-${Date.now()}`;
    const optimisticTask = { ...taskData, _id: tempId };
    setTasks(prev => [optimisticTask, ...prev]);

    try {
      const savedTask = await createTask(taskData);
      setTasks(prev => prev.map(t => t._id === tempId ? savedTask : t));
      addToast('Task created successfully!', 'success');
    } catch (err) {
      setTasks(prev => prev.filter(t => t._id !== tempId));
      addToast(err.message || 'Failed to create task', 'error');
    }
  };

  const handleToggleTask = async (id, completed) => {
    // Optimistic UI Update
    setTasks(prev => prev.map(t => t._id === id ? { ...t, completed } : t));

    try {
      const updated = await updateTask(id, { completed });
      setTasks(prev => prev.map(t => t._id === id ? updated : t));
      addToast(`Task marked as ${completed ? 'completed' : 'pending'}`, 'success');
    } catch (err) {
      // Revert on error
      setTasks(prev => prev.map(t => t._id === id ? { ...t, completed: !completed } : t));
      addToast(err.message || 'Failed to update task', 'error');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
      addToast('Task deleted successfully', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to delete task', 'error');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <h1>Task Master</h1>
          <p className="app-subtitle">Full Stack React + Node + MongoDB</p>
        </div>
        {currentUser && (
          <div className="user-nav">
            <span className="user-email">👤 {currentUser.email}</span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowAnalytics(prev => !prev)}
            >
              {showAnalytics ? '✕ Hide Stats' : '📊 Analytics'}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>

      {!currentUser ? (
        <Suspense fallback={<div className="loading-spinner"></div>}>
          <AuthForm
            onAuthSuccess={(user) => {
              setCurrentUser(user);
              loadTasks();
            }}
            addToast={addToast}
          />
        </Suspense>
      ) : (
        <main className="dashboard-content">
          {showAnalytics && (
            <Suspense fallback={<div className="loading-spinner"></div>}>
              <TaskAnalytics
                tasks={tasks}
                onClose={() => setShowAnalytics(false)}
              />
            </Suspense>
          )}

          <TaskForm onAddTask={handleAddTask} />
          <TaskList
            tasks={tasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            loading={loading}
          />
        </main>
      )}

      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </div>
  );
}
