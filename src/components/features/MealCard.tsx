import type { FC } from 'react';
import type { MealSuggestion } from '../../data/meals';
import Card from '../ui/Card';

interface MealCardProps {
  meal: MealSuggestion;
}

const categoryColors: Record<string, string> = {
  breakfast: '#F59E0B',
  lunch: '#0D9488',
  dinner: '#7C3AED',
  snack: '#86EFAC',
};

const MealCard: FC<MealCardProps> = ({ meal }) => {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{
          fontSize: '0.8rem',
          background: categoryColors[meal.category] + '20',
          color: categoryColors[meal.category],
          padding: '3px 10px',
          borderRadius: '999px',
          fontWeight: 600,
          textTransform: 'capitalize',
        }}>
          {meal.category}
        </span>
        <span style={{ fontSize: '0.8rem', color: '#64748B' }}>⏱ {meal.prepTime} min</span>
      </div>
      <h4 style={{ color: '#1E293B', marginBottom: '6px' }}>{meal.name}</h4>
      <p style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '12px', lineHeight: 1.5 }}>{meal.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {meal.mood.map((tag) => (
          <span key={tag} style={{ fontSize: '0.75rem', background: '#EDE9FE', color: '#7C3AED', padding: '2px 8px', borderRadius: '999px' }}>
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default MealCard;
