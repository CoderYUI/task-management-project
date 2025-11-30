import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      await auth.login({ email, password });
      if (!remember) {
        // if user doesn't want to persist, clear stored auth after set
        const stored = localStorage.getItem('auth');
        if (stored) localStorage.removeItem('auth');
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" role="region" aria-label="Authentication">
        <div className="auth-left">
          <div className="auth-logo">Task Manager</div>
          <h3>Welcome back</h3>
          <p>Organize tasks, track progress, and collaborate with your team.</p>
          <div className="auth-illustration">✨</div>
        </div>

        <div className="auth-right">
          <h2 className="auth-title">Sign in to your account</h2>
          <div className="auth-subtitle">Continue with your email</div>

          <form className="auth-form" onSubmit={handleSubmit} aria-describedby={error ? 'login-error' : undefined}>
            {error && <div id="login-error" className="auth-error" role="alert">{error}</div>}

            <label className="auth-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="auth-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-required="true"
            />

            <label className="auth-label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              aria-required="true"
            />

            <div className="remember-row">
              <label className="remember"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} /> Remember me</label>
              <a href="#" onClick={(e) => e.preventDefault()} style={{color:'#0ea5e9'}}>Forgot?</a>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
          </form>

          <div className="auth-footer">Don’t have an account? <Link to="/signup">Create one</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
