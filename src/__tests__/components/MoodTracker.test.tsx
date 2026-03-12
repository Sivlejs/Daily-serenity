import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MoodTracker from '../../components/features/MoodTracker';

const mockSetMood = vi.fn();
let mockCurrentMood: number | null = null;

vi.mock('../../contexts/AppContext', () => ({
  useApp: () => ({
    currentMood: mockCurrentMood,
    setMood: mockSetMood,
  }),
}));

describe('MoodTracker component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCurrentMood = null;
  });

  it('renders all 5 mood options', () => {
    render(<MoodTracker />);
    expect(screen.getByText('Rough')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('Okay')).toBeInTheDocument();
    expect(screen.getByText('Good')).toBeInTheDocument();
    expect(screen.getByText('Great')).toBeInTheDocument();
  });

  it('calls setMood with the correct value when a mood is clicked', () => {
    render(<MoodTracker />);
    fireEvent.click(screen.getByText('Good'));
    expect(mockSetMood).toHaveBeenCalledWith(4);
  });

  it('shows selected mood label when currentMood is set', () => {
    mockCurrentMood = 5;
    render(<MoodTracker />);
    expect(screen.getByText(/Today's mood:/)).toBeInTheDocument();
    expect(screen.getAllByText(/Great/).length).toBeGreaterThan(0);
  });

  it('does not show mood label when no mood selected', () => {
    render(<MoodTracker />);
    expect(screen.queryByText(/Today's mood:/)).not.toBeInTheDocument();
  });
});
