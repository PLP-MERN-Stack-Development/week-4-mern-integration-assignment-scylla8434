import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '../services/api';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const user = authService.getCurrentUser();
  const [darkMode, setDarkMode] = useState(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    document.body.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };
  // Avatar initials
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'U';
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">MERN Blog</div>
        <ul className="navbar-links">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li className={location.pathname === '/create' ? 'active' : ''}>
              <Link to="/create">Create Post</Link>
            </li>
          )}
          {user && (
            <li className={location.pathname === '/categories/create' ? 'active' : ''}>
              <Link to="/categories/create">Create Category</Link>
            </li>
          )}
          {!user && (
            <>
              <li className={location.pathname === '/login' ? 'active' : ''}>
                <Link to="/login">Login</Link>
              </li>
              <li className={location.pathname === '/register' ? 'active' : ''}>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li style={{display:'flex',alignItems:'center',gap:'0.3rem'}}>
                <span className="user-avatar">{getInitials(user.username)}</span>
                <span style={{color:'#fff'}}>{user.username}</span>
              </li>
              <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            </>
          )}
          <li>
            <button
              className="darkmode-toggle"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setDarkMode(dm => !dm)}
              style={{background:'none',border:'none',cursor:'pointer',fontSize:'1.3rem',marginLeft:'0.7rem',color:'#fff'}}
            >
              {darkMode ? '🌙' : '☀️'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
