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
    background: 'linear-gradient(90deg, #1B3A6B 0%, #2E5FA3 100%)',
    borderBottom: '2px solid #B8860B',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(27,58,107,0.25)',
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
    color: '#DAA520',
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '0.95rem',
    letterSpacing: '0.03em',
    transition: 'color 0.2s ease',
  };

  return (
    <nav style={navStyle}>
      <div style={innerStyle}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.6rem', lineHeight: 1 }} aria-label="Ankh symbol">☥</span>
          <span style={{ fontWeight: 700, fontSize: '1.2rem', color: '#DAA520', fontFamily: 'Georgia, serif', letterSpacing: '0.04em' }}>
            Daily Serenity
          </span>
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
              <span style={{ color: 'rgba(218,165,32,0.6)', fontSize: '0.9rem' }}>☥ {user?.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <Button variant="primary" size="sm" onClick={() => navigate('/auth')}>Enter the Temple</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
