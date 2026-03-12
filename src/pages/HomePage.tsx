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
    { icon: '☥', title: 'Sacred Meditation', desc: 'Voice-guided meditations inspired by ancient wisdom and Kemetic tradition.' },
    { icon: '𓂀', title: 'Breathing Rites', desc: 'Sacred breathing exercises to restore balance and awaken inner calm.' },
    { icon: '𓋹', title: 'Grief & Healing', desc: 'Compassionate support sessions for those walking the path of loss and renewal.' },
    { icon: '𓅃', title: 'Daily Progress', desc: 'Track your journey and build a daily practice of peace and intention.' },
  ];

  const quotes = [
    { text: 'Know thyself, and thou shalt know the gods.', author: 'Ancient Kemetic Inscription' },
    { text: 'The heart that has truly loved never forgets.', author: 'Book of Coming Forth by Day' },
    { text: 'Silence is the language of the gods — all else is poor translation.', author: 'Kemetic Proverb' },
  ];

  const goldBorder: import('react').CSSProperties = {
    border: '1px solid #B8860B',
    borderRadius: '16px',
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif' }}>
      {/* Hero */}
      <section style={{ padding: '80px 1.5rem', textAlign: 'center', maxWidth: '740px', margin: '0 auto' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '16px', letterSpacing: '0.3rem' }}>☥ 𓂀 ☥</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1B3A6B', marginBottom: '16px', lineHeight: 1.2, fontFamily: 'Georgia, serif' }}>
          Welcome to <span style={{ color: '#B8860B' }}>Daily Serenity</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#7A5C2E', marginBottom: '10px', lineHeight: 1.75, fontStyle: 'italic' }}>
          "As above, so below — as within, so without."
        </p>
        <p style={{ fontSize: '1rem', color: '#5C4020', marginBottom: '36px', lineHeight: 1.7 }}>
          Your sanctuary for mindfulness, healing, and ancient wisdom. Start each day with sacred intention,
          and end it with gratitude. Let the light of Kemet guide your path.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/auth')}>Enter the Temple</Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore the Path
          </Button>
        </div>
      </section>

      {/* Decorative divider */}
      <div style={{ textAlign: 'center', color: '#B8860B', fontSize: '1.4rem', letterSpacing: '1rem', marginBottom: '8px' }}>
        ─── ☥ ───
      </div>

      {/* Features */}
      <section id="features" style={{ padding: '60px 1.5rem', background: 'rgba(184,134,11,0.06)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.9rem', color: '#1B3A6B', marginBottom: '40px', fontFamily: 'Georgia, serif' }}>
            The Pillars of Your Sacred Practice
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {features.map((f) => (
              <div key={f.title} style={{ background: '#FFFDF5', padding: '28px', ...goldBorder, boxShadow: '0 4px 16px rgba(90,50,0,0.08)', textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '12px', color: '#B8860B' }}>{f.icon}</div>
                <h3 style={{ color: '#1B3A6B', marginBottom: '8px', fontFamily: 'Georgia, serif' }}>{f.title}</h3>
                <p style={{ color: '#7A5C2E', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative divider */}
      <div style={{ textAlign: 'center', color: '#B8860B', fontSize: '1.4rem', letterSpacing: '1rem', margin: '8px 0' }}>
        ─── 𓂀 ───
      </div>

      {/* Quotes */}
      <section style={{ padding: '60px 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', color: '#1B3A6B', marginBottom: '36px', fontFamily: 'Georgia, serif' }}>
            Words from the Ancients
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {quotes.map((q) => (
              <div key={q.author} style={{ background: 'rgba(184,134,11,0.07)', padding: '24px', borderRadius: '14px', borderLeft: '4px solid #B8860B' }}>
                <p style={{ color: '#2D1B00', fontStyle: 'italic', marginBottom: '12px', lineHeight: 1.7 }}>"{q.text}"</p>
                <p style={{ color: '#B8860B', fontWeight: 700, fontSize: '0.85rem', fontFamily: 'Georgia, serif' }}>— {q.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 1.5rem', background: 'linear-gradient(135deg, #1B3A6B, #0F2347)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', color: '#B8860B', marginBottom: '12px', letterSpacing: '0.4rem' }}>☥ 𓋹 ☥</div>
        <h2 style={{ color: '#DAA520', fontSize: '2rem', marginBottom: '12px', fontFamily: 'Georgia, serif' }}>Ready to walk the sacred path?</h2>
        <p style={{ color: 'rgba(218,165,32,0.8)', marginBottom: '28px', fontSize: '1.05rem', fontStyle: 'italic' }}>
          Join seekers building lives of peace, purpose, and ancient wisdom.
        </p>
        <button
          onClick={() => navigate('/auth')}
          style={{
            padding: '14px 34px',
            fontSize: '1.1rem',
            background: '#B8860B',
            color: '#FDF6E3',
            border: '2px solid #DAA520',
            borderRadius: '10px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.04em',
          }}
        >
          Begin Your Journey
        </button>
      </section>
    </div>
  );
};

export default HomePage;
