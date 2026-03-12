import type { FC } from 'react';

const Footer: FC = () => {
  const style: import('react').CSSProperties = {
    background: 'linear-gradient(90deg, #0F3D52 0%, #1A3A4A 50%, #0F3D52 100%)',
    borderTop: '2px solid #C9A84C',
    color: '#A0906A',
    textAlign: 'center',
    padding: '2rem 1.5rem',
    marginTop: 'auto',
  };

  return (
    <footer style={style}>
      {/* Egyptian symbol row */}
      <div style={{ fontSize: '1.5rem', letterSpacing: '0.6rem', color: '#C9A84C', marginBottom: '0.75rem' }}>
        ☥ 𓂀 𓁹 𓆉 𓇋 𓂋 ☥
      </div>
      <div style={{ marginBottom: '0.5rem' }}>
        <strong style={{ color: '#C9A84C', fontSize: '1.1rem', letterSpacing: '0.08em', fontFamily: 'Georgia, serif' }}>
          Daily Serenity
        </strong>
      </div>
      <p style={{ fontSize: '0.82rem', letterSpacing: '0.04em' }}>Your companion for mindfulness, balance, and eternal well-being.</p>
      <div style={{ fontSize: '0.75rem', marginTop: '0.75rem', color: '#6B8A5E', letterSpacing: '0.1em' }}>
        ✦ PEACE · HARMONY · BALANCE · MA'AT ✦
      </div>
      <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: '#6B7A8A' }}>
        © {new Date().getFullYear()} Daily Serenity. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
