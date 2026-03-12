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
    { icon: '🧘', title: 'Mindfulness', desc: 'Guided meditations tailored to your mood and schedule.' },
    { icon: '🌬️', title: 'Breathing', desc: 'Science-backed breathing exercises to calm or energize.' },
    { icon: '🥗', title: 'Nutrition', desc: 'Mood-boosting meal suggestions for every time of day.' },
    { icon: '📈', title: 'Progress', desc: 'Track your daily activities and build healthy habits.' },
  ];

  const quotes = [
    { text: 'Peace comes from within. Do not seek it without.', author: 'Buddha' },
    { text: 'Almost everything will work again if you unplug it for a few minutes.', author: 'Anne Lamott' },
    { text: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '80px 1.5rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🌸</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#1E293B', marginBottom: '16px', lineHeight: 1.2 }}>
          Welcome to <span style={{ color: '#7C3AED' }}>Daily Serenity</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#64748B', marginBottom: '32px', lineHeight: 1.7 }}>
          Your all-in-one companion for mindfulness, healthy nutrition, and breathing exercises.
          Start each day with intention and end it with gratitude.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/auth')}>Get Started Free</Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '60px 1.5rem', background: 'rgba(255,255,255,0.7)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#1E293B', marginBottom: '40px' }}>
            Everything you need for daily well-being
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {features.map((f) => (
              <div key={f.title} style={{ background: '#fff', padding: '28px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{ color: '#1E293B', marginBottom: '8px' }}>{f.title}</h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section style={{ padding: '60px 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.8rem', color: '#1E293B', marginBottom: '36px' }}>
            Words of Wisdom
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {quotes.map((q) => (
              <div key={q.author} style={{ background: 'rgba(124, 58, 237, 0.06)', padding: '24px', borderRadius: '14px', borderLeft: '4px solid #7C3AED' }}>
                <p style={{ color: '#1E293B', fontStyle: 'italic', marginBottom: '12px', lineHeight: 1.6 }}>"{q.text}"</p>
                <p style={{ color: '#7C3AED', fontWeight: 600, fontSize: '0.9rem' }}>— {q.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 1.5rem', background: 'linear-gradient(135deg, #7C3AED, #0D9488)', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '12px' }}>Ready to find your serenity?</h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '28px', fontSize: '1.05rem' }}>
          Join thousands building healthier, more mindful lives.
        </p>
        <button
          onClick={() => navigate('/auth')}
          style={{
            padding: '14px 30px',
            fontSize: '1.1rem',
            background: '#fff',
            color: '#7C3AED',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Start Your Journey
        </button>
      </section>
    </div>
  );
};

export default HomePage;
