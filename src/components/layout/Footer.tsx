import type { FC } from 'react';

const Footer: FC = () => {
  const style: import('react').CSSProperties = {
    background: 'linear-gradient(90deg, #1B3A6B 0%, #0F2347 100%)',
    color: '#DAA520',
    textAlign: 'center',
    padding: '2.5rem 1.5rem',
    marginTop: 'auto',
    borderTop: '2px solid #B8860B',
  };

  return (
    <footer style={style}>
      <div style={{ marginBottom: '0.75rem', fontSize: '1.6rem', letterSpacing: '0.5rem' }}>
        ☥ 𓂀 𓋹
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong style={{ color: '#DAA520', fontFamily: 'Georgia, serif', fontSize: '1.1rem', letterSpacing: '0.06em' }}>Daily Serenity</strong>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#C2915C' }}>Your sanctuary for mindfulness, balance, and ancient wisdom.</p>
      <p style={{ fontSize: '0.8rem', marginTop: '0.75rem', color: '#7A9CC6' }}>
        © {new Date().getFullYear()} Daily Serenity · All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
