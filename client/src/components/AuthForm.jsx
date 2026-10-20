import React, { useState } from 'react';
import { loginUser, registerUser } from '../api';

export default function AuthForm({ onAuthSuccess, addToast }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    if (!isLogin && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      let data;
      if (isLogin) {
        data = await loginUser(email, password);
        addToast('Welcome back! Logged in successfully.', 'success');
      } else {
        data = await registerUser(email, password);
        addToast('Account created and logged in!', 'success');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message || 'Authentication failed');
      addToast(err.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>{isLogin ? 'Sign In to Task Master' : 'Create an Account'}</h2>
        <p className="auth-subtitle">
          {isLogin 
            ? 'Access your secured tasks with JWT Authentication' 
            : 'Register a new account to manage private tasks'}
        </p>
      </div>

      {error && <div className="auth-error-banner">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="auth-email">Email Address</label>
          <input
            id="auth-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
        </button>
      </form>

      <div className="auth-switch">
        <span>
          {isLogin ? "Don't have an account yet?" : 'Already have an account?'}
        </span>
        <button
          type="button"
          className="link-btn"
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
          disabled={loading}
        >
          {isLogin ? 'Register now' : 'Sign in'}
        </button>
      </div>
    </div>
  );
}
