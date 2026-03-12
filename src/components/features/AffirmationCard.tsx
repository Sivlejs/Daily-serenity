import { useState } from 'react';
import type { FC } from 'react';
import type { Affirmation } from '../../data/affirmations';
import Card from '../ui/Card';

interface AffirmationCardProps {
  affirmations: Affirmation[];
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  confidence: { bg: '#F59E0B20', text: '#F59E0B' },
  gratitude: { bg: '#22C55E20', text: '#22C55E' },
  peace: { bg: '#3B82F620', text: '#3B82F6' },
  growth: { bg: '#8B5CF620', text: '#8B5CF6' },
  'self-love': { bg: '#EC489920', text: '#EC4899' },
};

const AffirmationCard: FC<AffirmationCardProps> = ({ affirmations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = affirmations[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % affirmations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + affirmations.length) % affirmations.length);
  };

  const colors = categoryColors[current.category] ?? { bg: '#E2E8F0', text: '#64748B' };

  return (
    <Card>
      <div style={{ textAlign: 'center', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.75rem',
            background: colors.bg,
            color: colors.text,
            padding: '4px 12px',
            borderRadius: '999px',
            fontWeight: 600,
            textTransform: 'capitalize',
            marginBottom: '16px',
          }}
        >
          {current.category}
        </span>
        <p
          style={{
            fontSize: '1.25rem',
            color: '#1E293B',
            fontStyle: 'italic',
            lineHeight: 1.6,
            margin: '0 auto',
            maxWidth: '400px',
          }}
        >
          "{current.text}"
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '20px' }}>
        <button
          onClick={handlePrev}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1.5px solid #E2E8F0',
            background: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Previous affirmation"
        >
          ←
        </button>
        <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
          {currentIndex + 1} / {affirmations.length}
        </span>
        <button
          onClick={handleNext}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1.5px solid #E2E8F0',
            background: 'white',
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Next affirmation"
        >
          →
        </button>
      </div>
    </Card>
  );
};

export default AffirmationCard;
