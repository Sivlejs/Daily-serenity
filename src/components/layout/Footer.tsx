import type { FC } from 'react';

const Footer: FC = () => {
  const style: import('react').CSSProperties = {
    background: 'linear-gradient(90deg, #0F1A2E 0%, #1B3A6B 50%, #0F1A2E 100%)',
    color: '#C4A46B',
    textAlign: 'center',
    padding: '2rem 1.5rem',
    marginTop: 'auto',
    borderTop: '2px solid #C8970A',
  };

  return (
    <footer style={style}>
      <div style={{ marginBottom: '0.75rem', fontSize: '1.4rem', letterSpacing: '0.5rem' }} aria-label="Egyptian symbols">
        ☥ 𓂀 𓅃 ☥
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong style={{ color: '#C8970A', fontSize: '1.05rem', letterSpacing: '0.05em' }}>Daily Serenity</strong>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#C4A46B' }}>Your companion for mindfulness, balance, and well-being.</p>
      <p style={{ fontSize: '0.78rem', marginTop: '0.75rem', color: '#8B7355', letterSpacing: '0.02em' }}>
        𓂀 © {new Date().getFullYear()} Daily Serenity. All rights reserved. 𓂀
      </p>
    </footer>
  );
};

export default Footer;
