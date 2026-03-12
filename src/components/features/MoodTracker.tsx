import type { FC } from 'react';
import { useApp } from '../../contexts/AppContext';
import Card from '../ui/Card';

const MOODS: { value: number; emoji: string; label: string; color: string }[] = [
  { value: 1, emoji: '😢', label: 'Rough', color: '#EF4444' },
  { value: 2, emoji: '😕', label: 'Low', color: '#F97316' },
  { value: 3, emoji: '😐', label: 'Okay', color: '#EAB308' },
  { value: 4, emoji: '🙂', label: 'Good', color: '#22C55E' },
  { value: 5, emoji: '😄', label: 'Great', color: '#0D9488' },
];

const MoodTracker: FC = () => {
  const { currentMood, setMood } = useApp();

  return (
    <Card>
      <h3 style={{ color: '#1E293B', marginBottom: '4px' }}>How are you feeling today?</h3>
      <p style={{ color: '#64748B', fontSize: '0.88rem', marginBottom: '20px' }}>
        Check in with yourself — your mood matters 💜
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
        {MOODS.map((m) => {
          const isSelected = currentMood === m.value;
          return (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 4px',
                borderRadius: '12px',
                border: `2px solid ${isSelected ? m.color : '#E2E8F0'}`,
                background: isSelected ? m.color + '18' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{m.emoji}</span>
              <span style={{ fontSize: '0.72rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? m.color : '#94A3B8' }}>
                {m.label}
              </span>
            </button>
          );
        })}
      </div>
      {currentMood !== null && (
        <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.85rem', color: '#64748B' }}>
          Today's mood: <strong style={{ color: MOODS[currentMood - 1]?.color }}>{MOODS[currentMood - 1]?.label} {MOODS[currentMood - 1]?.emoji}</strong>
        </p>
      )}
    </Card>
  );
};

export default MoodTracker;
