import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import JournalEntry from '../../components/features/JournalEntry';

const mockSetJournalEntry = vi.fn();
let mockJournalEntry = '';

vi.mock('../../contexts/AppContext', () => ({
  useApp: () => ({
    journalEntry: mockJournalEntry,
    setJournalEntry: mockSetJournalEntry,
  }),
}));

describe('JournalEntry component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockJournalEntry = '';
  });

  it('renders the textarea', () => {
    render(<JournalEntry />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows the placeholder text', () => {
    render(<JournalEntry />);
    expect(screen.getByPlaceholderText(/Write freely/)).toBeInTheDocument();
  });

  it('calls setJournalEntry when text is typed', () => {
    render(<JournalEntry />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Today was a good day.' } });
    expect(mockSetJournalEntry).toHaveBeenCalledWith('Today was a good day.');
  });

  it('shows "Entry saved" confirmation when entry is non-empty', () => {
    mockJournalEntry = 'Some reflection';
    render(<JournalEntry />);
    expect(screen.getByText(/Entry saved/)).toBeInTheDocument();
  });

  it('does not show "Entry saved" when entry is empty', () => {
    render(<JournalEntry />);
    expect(screen.queryByText(/Entry saved/)).not.toBeInTheDocument();
  });

  it('shows character count', () => {
    mockJournalEntry = 'Hello';
    render(<JournalEntry />);
    expect(screen.getByText('5/1000')).toBeInTheDocument();
  });
});
