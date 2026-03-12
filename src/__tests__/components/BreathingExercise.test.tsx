import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BreathingExercise from '../../components/features/BreathingExercise';
import type { BreathingExercise as BreathingExerciseType } from '../../data/breathing';

vi.mock('../../utils/audioService', () => ({
  speak: vi.fn(),
  stopSpeech: vi.fn(),
  isSpeechSupported: () => true,
}));

const mockMarkComplete = vi.fn();
let mockCompleted = false;

vi.mock('../../contexts/AppContext', () => ({
  useApp: () => ({
    markActivityComplete: mockMarkComplete,
    isActivityComplete: () => mockCompleted,
  }),
}));

const exercise: BreathingExerciseType = {
  id: 'test-b1',
  name: 'Test Breathing',
  description: 'A test breathing exercise.',
  inhale: 4,
  hold: 4,
  exhale: 4,
  cycles: 4,
  benefit: 'Reduces stress',
  prompts: {
    inhale: 'Breathe in',
    hold: 'Hold',
    exhale: 'Breathe out',
  },
};

describe('BreathingExercise', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCompleted = false;
  });

  it('renders the exercise name and description', () => {
    render(<BreathingExercise exercise={exercise} />);
    expect(screen.getByText('Test Breathing')).toBeInTheDocument();
    expect(screen.getByText('A test breathing exercise.')).toBeInTheDocument();
  });

  it('displays the benefit', () => {
    render(<BreathingExercise exercise={exercise} />);
    expect(screen.getByText(/Reduces stress/)).toBeInTheDocument();
  });

  it('shows Start Exercise button when not running', () => {
    render(<BreathingExercise exercise={exercise} />);
    expect(screen.getByText('Start Exercise')).toBeInTheDocument();
  });

  it('shows Stop button after starting', () => {
    render(<BreathingExercise exercise={exercise} />);
    fireEvent.click(screen.getByText('Start Exercise'));
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  it('shows voice toggle button', () => {
    render(<BreathingExercise exercise={exercise} />);
    expect(screen.getByText(/Voice/)).toBeInTheDocument();
  });

  it('shows completed state when done', () => {
    mockCompleted = true;
    render(<BreathingExercise exercise={exercise} />);
    expect(screen.getByText(/Done/)).toBeInTheDocument();
    expect(screen.queryByText('Start Exercise')).not.toBeInTheDocument();
  });

  it('shows inhale/hold/exhale info', () => {
    render(<BreathingExercise exercise={exercise} />);
    expect(screen.getByText(/In: 4s/)).toBeInTheDocument();
    expect(screen.getByText(/Hold: 4s/)).toBeInTheDocument();
    expect(screen.getByText(/Out: 4s/)).toBeInTheDocument();
  });
});
