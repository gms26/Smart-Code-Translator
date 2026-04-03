import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import { register, emailLogin, googleLogin } from '../services/authService.js';

const LoginPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.email) { toast.error('Email is required'); return false; }
    if (!form.password) { toast.error('Password is required'); return false; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return false; }
    if (isSignUp && !form.name) { toast.error('Name is required'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      let data;
      if (isSignUp) {
        data = await register(form.name, form.email, form.password);
      } else {
        data = await emailLogin(form.email, form.password);
      }
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      const data = await googleLogin(credentialResponse.credential);
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-logo">⚡</span>
          <h1 className="login-title">Smart Code Translator</h1>
          <p className="login-subtitle">
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                className="form-input"
                autoComplete="name"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="form-input"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={handleChange}
              className="form-input"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? <span className="spinner-inline" /> : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="login-divider">
          <span>or</span>
        </div>

        <div className="google-btn-wrap">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google sign-in failed')}
            theme="filled_black"
            shape="rectangular"
            size="large"
            width="100%"
            text={isSignUp ? 'signup_with' : 'signin_with'}
          />
        </div>

        <p className="login-toggle">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            className="toggle-btn"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setForm({ name: '', email: '', password: '' });
            }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
