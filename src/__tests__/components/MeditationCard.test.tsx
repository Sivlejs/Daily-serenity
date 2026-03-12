import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MeditationCard from '../../components/features/MeditationCard';
import type { Meditation } from '../../data/meditations';

vi.mock('../../utils/audioService', () => ({
  speak: vi.fn(),
  stopSpeech: vi.fn(),
  startTone: vi.fn(),
  stopTone: vi.fn(),
  isSpeechSupported: () => true,
  isAudioContextSupported: () => true,
}));

const mockMarkComplete = vi.fn();
let mockCompleted = false;

vi.mock('../../contexts/AppContext', () => ({
  useApp: () => ({
    markActivityComplete: mockMarkComplete,
    isActivityComplete: () => mockCompleted,
  }),
}));

const meditation: Meditation = {
  id: 'test-med',
  title: 'Test Meditation',
  description: 'A test meditation description.',
  duration: 5,
  category: 'morning',
  guidedScript: 'Take a deep breath.',
  musicTone: 'calm',
};

describe('MeditationCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCompleted = false;
  });

  it('renders the title and description', () => {
    render(<MeditationCard meditation={meditation} />);
    expect(screen.getByText('Test Meditation')).toBeInTheDocument();
    expect(screen.getByText('A test meditation description.')).toBeInTheDocument();
  });

  it('shows category badge and duration', () => {
    render(<MeditationCard meditation={meditation} />);
    expect(screen.getByText('morning')).toBeInTheDocument();
    expect(screen.getByText(/5 min/)).toBeInTheDocument();
  });

  it('shows start button when not completed', () => {
    render(<MeditationCard meditation={meditation} />);
    expect(screen.getByText('Start Meditation')).toBeInTheDocument();
  });

  it('shows completed state when activity is complete', () => {
    mockCompleted = true;
    render(<MeditationCard meditation={meditation} />);
    expect(screen.getByText(/Completed/)).toBeInTheDocument();
  });

  it('shows narration and music toggle buttons', () => {
    render(<MeditationCard meditation={meditation} />);
    expect(screen.getByText(/Narration/)).toBeInTheDocument();
    expect(screen.getByText(/Music/)).toBeInTheDocument();
  });

  it('calls skip handler when Skip is clicked', () => {
    render(<MeditationCard meditation={meditation} />);
    fireEvent.click(screen.getByText('Skip'));
    expect(mockMarkComplete).toHaveBeenCalledWith('test-med');
  });
});
