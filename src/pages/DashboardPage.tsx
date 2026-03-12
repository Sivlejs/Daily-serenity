import { useState, useEffect } from 'react';
import type { FC, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import QuestionnaireForm from '../components/features/QuestionnaireForm';
import MeditationCard from '../components/features/MeditationCard';
import BreathingExercise from '../components/features/BreathingExercise';
import MealCard from '../components/features/MealCard';
import MoodTracker from '../components/features/MoodTracker';
import JournalEntry from '../components/features/JournalEntry';
import AffirmationCard from '../components/features/AffirmationCard';
import ProgressBar from '../components/ui/ProgressBar';

const DashboardPage: FC = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { dailyGuide, streak } = useApp();
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
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: '#1E293B' }}>
            {getGreeting()}, {user.name}! 🌿
          </h1>
          <p style={{ color: '#64748B', marginTop: '6px' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {streak > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'linear-gradient(135deg, #F59E0B20, #EF444420)',
            border: '1.5px solid #F59E0B',
            borderRadius: '12px', padding: '8px 16px',
          }}>
            <span style={{ fontSize: '1.4rem' }}>🔥</span>
            <div>
              <p style={{ fontWeight: 700, color: '#92400E', fontSize: '1.1rem', lineHeight: 1 }}>{streak}</p>
              <p style={{ fontSize: '0.72rem', color: '#B45309' }}>day streak</p>
            </div>
          </div>
        )}
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

          {/* Mood Check-in */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>💜 Mood Check-In</h2>
            <MoodTracker />
          </div>

          {/* Daily Affirmations */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>✨ Daily Affirmations</h2>
            <AffirmationCard affirmations={dailyGuide.affirmations} />
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <MealCard meal={dailyGuide.meals.breakfast} />
              <MealCard meal={dailyGuide.meals.lunch} />
              <MealCard meal={dailyGuide.meals.dinner} />
              <MealCard meal={dailyGuide.meals.snack} />
            </div>
          </div>

          {/* Daily Journal */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>📝 Daily Journal</h2>
            <JournalEntry />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
