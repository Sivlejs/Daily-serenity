import type { FC } from 'react';

const Footer: FC = () => {
  const style: import('react').CSSProperties = {
    background: '#1E293B',
    color: '#94A3B8',
    textAlign: 'center',
    padding: '2rem 1.5rem',
    marginTop: 'auto',
  };

  return (
    <footer style={style}>
      <div style={{ marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>🌸</span>{' '}
        <strong style={{ color: '#fff' }}>Daily Serenity</strong>
      </div>
      <p style={{ fontSize: '0.85rem' }}>Your companion for mindfulness, balance, and well-being.</p>
      <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
        © {new Date().getFullYear()} Daily Serenity. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
