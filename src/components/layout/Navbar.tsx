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
    background: 'linear-gradient(90deg, #1A3A4A 0%, #0F3D52 60%, #1A3A4A 100%)',
    borderBottom: '2px solid #C9A84C',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
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

  const linkStyle: import('react').CSSProperties = {
    color: '#EDD9A3',
    fontWeight: 500,
    textDecoration: 'none',
    letterSpacing: '0.04em',
    transition: 'color 0.2s',
  };

  return (
    <nav style={navStyle}>
      <div style={innerStyle}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Ankh symbol */}
          <span style={{ fontSize: '1.6rem', color: '#C9A84C', lineHeight: 1 }}>☥</span>
          <div>
            <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#C9A84C', letterSpacing: '0.06em', fontFamily: 'Georgia, serif' }}>
              Daily Serenity
            </span>
            <div style={{ fontSize: '0.6rem', color: '#A0906A', letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1 }}>
              ✦ Peace · Balance · Harmony ✦
            </div>
          </div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/" style={linkStyle}>Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
              <Link to="/profile" style={linkStyle}>Profile</Link>
            </>
          )}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#A0906A', fontSize: '0.9rem' }}>☥ {user?.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <Button variant="primary" size="sm" onClick={() => navigate('/auth')}>Sign In</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
