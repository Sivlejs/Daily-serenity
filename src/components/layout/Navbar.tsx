import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const Navbar: FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navStyle: import('react').CSSProperties = {
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid #E2E8F0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const innerStyle: import('react').CSSProperties = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
  };

  return (
    <nav style={navStyle}>
      <div style={innerStyle}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5rem' }}>🌸</span>
          <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#7C3AED' }}>Daily Serenity</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={{ color: '#1E293B', fontWeight: 500, textDecoration: 'none' }}>Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" style={{ color: '#1E293B', fontWeight: 500, textDecoration: 'none' }}>Dashboard</Link>
              <Link to="/profile" style={{ color: '#1E293B', fontWeight: 500, textDecoration: 'none' }}>Profile</Link>
            </>
          )}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#64748B', fontSize: '0.9rem' }}>👋 {user?.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <Button variant="primary" size="sm" onClick={() => navigate('/auth')}>Login / Register</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
