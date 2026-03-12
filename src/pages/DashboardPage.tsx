import { useState, useEffect } from 'react';
import type { FC, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import QuestionnaireForm from '../components/features/QuestionnaireForm';
import MeditationCard from '../components/features/MeditationCard';
import BreathingExercise from '../components/features/BreathingExercise';
import MealCard from '../components/features/MealCard';
import ProgressBar from '../components/ui/ProgressBar';

const DashboardPage: FC = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { dailyGuide } = useApp();
  const navigate = useNavigate();

  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const showQuestionnaire = isAuthenticated && user != null && !user.hasCompletedQuestionnaire && !questionnaireCompleted;

  const handleQuestionnaireComplete = () => {
    updateUser({ hasCompletedQuestionnaire: true });
    setQuestionnaireCompleted(true);
  };

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const totalActivities = 2;
  const completedCount = dailyGuide?.completedActivities.length ?? 0;
  const progressPercent = Math.min(100, (completedCount / totalActivities) * 100);

  const sectionStyle: CSSProperties = {
    marginBottom: '32px',
  };

  const sectionTitleStyle: CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#1E293B',
    marginBottom: '16px',
  };

  if (!isAuthenticated || !user) return null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', color: '#1E293B' }}>
          {getGreeting()}, {user.name}! 🌿
        </h1>
        <p style={{ color: '#64748B', marginTop: '6px' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {showQuestionnaire && (
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ color: '#7C3AED', marginBottom: '16px' }}>Welcome! Let's personalize your experience 🌸</h2>
          <QuestionnaireForm onComplete={handleQuestionnaireComplete} />
        </div>
      )}

      {!showQuestionnaire && dailyGuide && (
        <>
          {/* Progress */}
          <div style={{ ...sectionStyle, background: '#fff', padding: '20px', borderRadius: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}>
            <ProgressBar
              value={progressPercent}
              label={`Daily Progress · ${completedCount} of ${totalActivities} activities`}
              height={10}
            />
          </div>

          {/* Meditation */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🧘 Today's Meditation</h2>
            <MeditationCard meditation={dailyGuide.meditation} />
          </div>

          {/* Breathing */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🌬️ Breathing Exercise</h2>
            <BreathingExercise exercise={dailyGuide.breathingExercise} />
          </div>

          {/* Meals */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>🥗 Today's Meals</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              <MealCard meal={dailyGuide.meals.breakfast} />
              <MealCard meal={dailyGuide.meals.lunch} />
              <MealCard meal={dailyGuide.meals.dinner} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
