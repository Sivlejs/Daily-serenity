import { useEffect } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { questions } from '../data/questionnaire';
import { removeItem } from '../utils/storage';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const ProfilePage: FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { questionnaireAnswers } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth', { replace: true });
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleResetProgress = () => {
    removeItem('ds_daily_progress');
    removeItem('ds_questionnaire_answers');
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ color: '#1E293B', marginBottom: '24px' }}>Your Profile 👤</h1>

      {/* User Info */}
      <Card padding="lg" shadow>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED, #0D9488)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', color: '#fff', fontWeight: 700,
          }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ color: '#1E293B', marginBottom: '2px' }}>{user.name}</h2>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>{user.email}</p>
            <p style={{ color: '#64748B', fontSize: '0.85rem' }}>Member since {memberSince}</p>
          </div>
        </div>
      </Card>

      {/* Questionnaire Answers */}
      {Object.keys(questionnaireAnswers).length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h2 style={{ color: '#1E293B', marginBottom: '16px' }}>Your Wellness Profile 🌿</h2>
          <Card padding="md">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {questions.map((q) => {
                const answer = questionnaireAnswers[q.id];
                if (!answer) return null;
                return (
                  <div key={q.id} style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '10px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '2px' }}>{q.text}</p>
                    <p style={{ fontWeight: 600, color: '#1E293B' }}>{answer}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Actions */}
      <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button variant="outline" fullWidth onClick={handleResetProgress}>
          Reset Daily Progress
        </Button>
        <Button variant="ghost" fullWidth onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
