import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import './AuthForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await authService.login({ email, password });
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
      <h2>Login</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required autoFocus />
      <div style={{position:'relative'}}>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type={showPassword ? 'text' : 'password'}
          required
        />
        <button
          type="button"
          tabIndex={-1}
          className="show-password-btn"
          onClick={() => setShowPassword(v => !v)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          style={{position:'absolute',right:10,top:10,background:'none',border:'none',cursor:'pointer',color:'#4f8cff',fontWeight:600,fontSize:'1rem'}}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <button type="submit">Login</button>
      {success && <div className="success animate-success">Login successful! Redirecting...</div>}
      {error && <div className="error animate-error">{error}</div>}
    </form>
  );
};

export default Login;
