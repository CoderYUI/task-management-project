import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await auth.signup({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" role="region" aria-label="Create account">
        <div className="auth-left">
          <div className="auth-logo">Task Manager</div>
          <h3>Create your account</h3>
          <p>Start organizing tasks and collaborating with your team.</p>
          <div className="auth-illustration">🗂️</div>
        </div>

        <div className="auth-right">
          <h2 className="auth-title">Create account</h2>
          <div className="auth-subtitle">Use your email to register</div>

          <form className="auth-form" onSubmit={handleSubmit} aria-describedby={error ? 'signup-error' : undefined}>
            {error && <div id="signup-error" className="auth-error" role="alert">{error}</div>}

            <label className="auth-label" htmlFor="signup-name">Full name</label>
            <input id="signup-name" className="auth-input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" aria-required="true" />

            <label className="auth-label" htmlFor="signup-email">Email</label>
            <input id="signup-email" className="auth-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" aria-required="true" />

            <label className="auth-label" htmlFor="signup-password">Password</label>
            <input id="signup-password" className="auth-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" aria-required="true" />

            <label className="auth-label" htmlFor="signup-confirm">Confirm password</label>
            <input id="signup-confirm" className="auth-input" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" aria-required="true" />

            <button type="submit" className="auth-submit" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
          </form>

          <div className="auth-footer">Already have an account? <Link to="/login">Sign in</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
