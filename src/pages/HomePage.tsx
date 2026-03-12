import { useEffect } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const HomePage: FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const features = [
    { icon: '𓂀', title: 'Mindfulness', desc: 'Guided meditations tailored to your mood and schedule.' },
    { icon: '𓆉', title: 'Breathing', desc: 'Ancient and modern breathing practices to calm or energize.' },
    { icon: '𓇋', title: 'Nutrition', desc: 'Mood-boosting meal suggestions for every time of day.' },
    { icon: '𓂋', title: 'Progress', desc: 'Track your daily activities and build lasting harmony.' },
  ];

  const quotes = [
    { text: 'Know thyself and thou shalt know the gods.', author: 'Temple of Luxor inscription' },
    { text: 'The heart that is pure knows no fear.', author: 'Ancient Egyptian proverb' },
    { text: 'Every morning that you wake is a gift from the divine.', author: 'Kemetic wisdom' },
  ];

  const dividerStyle = {
    color: '#C9A84C',
    fontSize: '1rem',
    letterSpacing: '0.5rem',
    textAlign: 'center' as const,
    marginBottom: '40px',
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif' }}>
      {/* Hero */}
      <section style={{ padding: '90px 1.5rem 70px', textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
        {/* Ankh symbol + hieroglyph-style decorative row */}
        <div style={{ fontSize: '3rem', color: '#C9A84C', marginBottom: '8px', letterSpacing: '0.4rem' }}>☥</div>
        <div style={{ ...dividerStyle, marginBottom: '20px' }}>✦ ─────────── ✦</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#2C1810', marginBottom: '12px', lineHeight: 1.2, letterSpacing: '0.04em' }}>
          Welcome to <span style={{ color: '#C9A84C' }}>Daily Serenity</span>
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#A0783A', marginBottom: '18px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          ✦ Harmony · Balance · Ma'at ✦
        </p>
        <p style={{ fontSize: '1.1rem', color: '#5C3A1E', marginBottom: '36px', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 36px' }}>
          Your all-in-one sanctuary for mindfulness, healthy nutrition, and breathing exercises.
          Begin each day with sacred intention and close it with deep gratitude.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/auth')}>Begin Your Journey ☥</Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            Discover More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '70px 1.5rem', background: 'rgba(201,168,76,0.08)', borderTop: '1px solid #D4B896', borderBottom: '1px solid #D4B896' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={dividerStyle}>✦ ─────────── ✦</div>
          <h2 style={{ textAlign: 'center', fontSize: '1.9rem', color: '#2C1810', marginBottom: '42px', letterSpacing: '0.04em' }}>
            Sacred Pillars of Daily Well-Being
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: 'linear-gradient(160deg, #FFF8ED 0%, #F5E6C8 100%)',
                padding: '32px 24px',
                borderRadius: '10px',
                boxShadow: '0 4px 18px rgba(44,24,16,0.10)',
                textAlign: 'center',
                border: '1px solid #D4B896',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '14px', color: '#C9A84C' }}>{f.icon}</div>
                <h3 style={{ color: '#2C1810', marginBottom: '8px', letterSpacing: '0.04em' }}>{f.title}</h3>
                <p style={{ color: '#6B4C2A', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section style={{ padding: '70px 1.5rem' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={dividerStyle}>✦ ─────────── ✦</div>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', color: '#2C1810', marginBottom: '40px', letterSpacing: '0.04em' }}>
            Ancient Words of Wisdom
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '22px' }}>
            {quotes.map((q) => (
              <div key={q.author} style={{
                background: 'linear-gradient(160deg, #FFF8ED, #EDD9A3)',
                padding: '28px',
                borderRadius: '10px',
                borderLeft: '4px solid #C9A84C',
                boxShadow: '0 2px 12px rgba(44,24,16,0.08)',
              }}>
                <p style={{ color: '#2C1810', fontStyle: 'italic', marginBottom: '14px', lineHeight: 1.7, fontSize: '1rem' }}>"{q.text}"</p>
                <p style={{ color: '#A0783A', fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.04em' }}>— {q.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '70px 1.5rem',
        background: 'linear-gradient(135deg, #0F3D52 0%, #1A3A4A 50%, #0F2A1E 100%)',
        textAlign: 'center',
        borderTop: '2px solid #C9A84C',
      }}>
        <div style={{ fontSize: '2rem', color: '#C9A84C', marginBottom: '12px', letterSpacing: '0.4rem' }}>☥ 𓂀 ☥</div>
        <h2 style={{ color: '#EDD9A3', fontSize: '2rem', marginBottom: '14px', letterSpacing: '0.06em', fontFamily: 'Georgia, serif' }}>
          Ready to Find Your Serenity?
        </h2>
        <p style={{ color: 'rgba(237,217,163,0.8)', marginBottom: '32px', fontSize: '1.05rem', letterSpacing: '0.04em' }}>
          Walk the path of balance and inner peace — as the ancients did before you.
        </p>
        <button
          onClick={() => navigate('/auth')}
          style={{
            padding: '14px 32px',
            fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #C9A84C, #A0783A)',
            color: '#FBF5E6',
            border: '1px solid #A0783A',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.06em',
          }}
        >
          ☥ Begin Your Journey
        </button>
      </section>
    </div>
  );
};

export default HomePage;
