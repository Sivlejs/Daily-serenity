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
    { icon: '☥', title: 'Mindfulness', desc: 'Guided meditations drawing on ancient and timeless wisdom, tailored to your mood and schedule.' },
    { icon: '𓂀', title: 'Breathing', desc: 'Sacred breathing exercises — inhale through the nose, exhale through the mouth — to calm or energize.' },
    { icon: '𓃒', title: 'Nutrition', desc: 'Nourishing meal suggestions to elevate your energy and balance your spirit.' },
    { icon: '𓅃', title: 'Progress', desc: 'Track your daily practices and cultivate lasting habits with the wisdom of the ancients.' },
  ];

  const quotes = [
    { text: 'Know thyself and thou shalt know the gods.', author: 'Ancient Kemetic Proverb' },
    { text: 'Peace comes from within. Do not seek it without.', author: 'Buddha' },
    { text: 'The soul that rejoices in wisdom, in the good that it does, is indestructible.', author: 'Ptah-hotep' },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '80px 1.5rem', textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px', letterSpacing: '0.5rem' }} aria-label="Kemetic symbols">
          ☥
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1B3A6B', marginBottom: '16px', lineHeight: 1.2, textShadow: '0 2px 8px rgba(200,151,10,0.15)' }}>
          Welcome to{' '}
          <span style={{ color: '#C8970A', fontStyle: 'italic' }}>Daily Serenity</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#5C4A2A', marginBottom: '10px', lineHeight: 1.7 }}>
          Draw upon the ancient wisdom of the Kemetic tradition to cultivate mindfulness,
          inner peace, and holistic well-being.
        </p>
        <p style={{ fontSize: '0.95rem', color: '#8B7355', marginBottom: '36px', fontStyle: 'italic' }}>
          𓂀 &nbsp; As above, so below — as within, so without &nbsp; 𓂀
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/auth')}>Begin Your Journey ☥</Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '60px 1.5rem', background: 'rgba(253,246,227,0.85)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#1B3A6B', marginBottom: '8px' }}>
            Sacred Pillars of Daily Well-Being
          </h2>
          <p style={{ textAlign: 'center', color: '#8B7355', marginBottom: '40px', fontStyle: 'italic' }}>
            𓅃 Rooted in ancient wisdom, built for modern life 𓅃
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: 'linear-gradient(160deg, #FDF6E3 0%, #F5E6C8 100%)',
                padding: '28px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(200,151,10,0.12)',
                textAlign: 'center',
                border: '1px solid #D4B896',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px', color: '#C8970A' }}>{f.icon}</div>
                <h3 style={{ color: '#1B3A6B', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ color: '#5C4A2A', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section style={{ padding: '60px 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', color: '#1B3A6B', marginBottom: '8px' }}>
            Words of Ancient Wisdom
          </h2>
          <p style={{ textAlign: 'center', color: '#8B7355', marginBottom: '36px', fontStyle: 'italic' }}>
            𓂀 Timeless truths from the Kemetic tradition 𓂀
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {quotes.map((q) => (
              <div key={q.author} style={{
                background: 'rgba(200,151,10,0.07)',
                padding: '24px',
                borderRadius: '14px',
                borderLeft: '4px solid #C8970A',
                backdropFilter: 'blur(4px)',
              }}>
                <p style={{ color: '#1A1A0E', fontStyle: 'italic', marginBottom: '12px', lineHeight: 1.6 }}>"{q.text}"</p>
                <p style={{ color: '#C8970A', fontWeight: 600, fontSize: '0.9rem' }}>— {q.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 1.5rem', background: 'linear-gradient(135deg, #0F1A2E 0%, #1B3A6B 50%, #C8970A 100%)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '12px', letterSpacing: '0.5rem' }}>☥ 𓅃 ☥</div>
        <h2 style={{ color: '#E8B84B', fontSize: '2rem', marginBottom: '12px' }}>Ready to find your serenity?</h2>
        <p style={{ color: 'rgba(228,208,168,0.9)', marginBottom: '28px', fontSize: '1.05rem' }}>
          Join a community building mindful, balanced lives rooted in timeless wisdom.
        </p>
        <button
          onClick={() => navigate('/auth')}
          style={{
            padding: '14px 34px',
            fontSize: '1.1rem',
            background: '#C8970A',
            color: '#0F1A2E',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 4px 16px rgba(200,151,10,0.4)',
          }}
        >
          ☥ Start Your Journey
        </button>
      </section>
    </div>
  );
};

export default HomePage;
