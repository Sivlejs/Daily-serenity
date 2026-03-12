import { useState } from 'react';
import type { FC } from 'react';
import { questions } from '../../data/questionnaire';
import { useApp } from '../../contexts/AppContext';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import Card from '../ui/Card';

interface QuestionnaireFormProps {
  onComplete: () => void;
}

const QuestionnaireForm: FC<QuestionnaireFormProps> = ({ onComplete }) => {
  const { saveQuestionnaireAnswers } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const question = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: option }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleSubmit = () => {
    saveQuestionnaireAnswers(answers);
    onComplete();
  };

  return (
    <Card padding="lg">
      <div style={{ marginBottom: '20px' }}>
        <ProgressBar value={progress} label={`Question ${currentIndex + 1} of ${questions.length}`} />
      </div>
      <div style={{ marginBottom: '8px' }}>
        <span style={{ fontSize: '0.8rem', background: '#EDE9FE', color: '#7C3AED', padding: '2px 10px', borderRadius: '999px', textTransform: 'capitalize' }}>
          {question.category}
        </span>
      </div>
      <h2 style={{ fontSize: '1.3rem', color: '#1E293B', marginBottom: '24px' }}>{question.text}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
        {question.options.map((option) => {
          const selected = answers[question.id] === option;
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: selected ? '2px solid #7C3AED' : '2px solid #E2E8F0',
                background: selected ? '#EDE9FE' : '#fff',
                color: '#1E293B',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: selected ? 600 : 400,
                transition: 'all 0.2s ease',
                fontSize: '0.95rem',
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
        <Button variant="outline" onClick={handleBack} disabled={currentIndex === 0}>Back</Button>
        {isLast ? (
          <Button variant="primary" onClick={handleSubmit} disabled={!answers[question.id]}>
            Complete
          </Button>
        ) : (
          <Button variant="primary" onClick={handleNext} disabled={!answers[question.id]}>
            Next
          </Button>
        )}
      </div>
    </Card>
  );
};

export default QuestionnaireForm;
