import type { FC } from 'react';
import type { Meditation } from '../../data/meditations';
import { useApp } from '../../contexts/AppContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface MeditationCardProps {
  meditation: Meditation;
}

const categoryColors: Record<string, string> = {
  morning: '#F59E0B',
  evening: '#8B5CF6',
  focus: '#0D9488',
  sleep: '#3B82F6',
};

const MeditationCard: FC<MeditationCardProps> = ({ meditation }) => {
  const { markActivityComplete, isActivityComplete } = useApp();
  const completed = isActivityComplete(meditation.id);

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{ fontSize: '0.8rem', background: categoryColors[meditation.category] + '20', color: categoryColors[meditation.category], padding: '3px 10px', borderRadius: '999px', fontWeight: 600, textTransform: 'capitalize' }}>
          {meditation.category}
        </span>
        <span style={{ fontSize: '0.85rem', color: '#64748B' }}>⏱ {meditation.duration} min</span>
      </div>
      <h3 style={{ color: '#1E293B', marginBottom: '8px' }}>{meditation.title}</h3>
      <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.6 }}>{meditation.description}</p>
      {completed ? (
        <div style={{ color: '#0D9488', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          ✓ Completed
        </div>
      ) : (
        <Button variant="primary" onClick={() => markActivityComplete(meditation.id)}>
          Start Meditation
        </Button>
      )}
    </Card>
  );
};

export default MeditationCard;
