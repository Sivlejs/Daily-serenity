import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GrievingSupport from '../../components/features/GrievingSupport';
import type { GrievingSession } from '../../data/grieving';

vi.mock('../../utils/audioService', () => ({
  speakGrieving: vi.fn(),
  stopSpeech: vi.fn(),
  startTone: vi.fn(),
  stopTone: vi.fn(),
  isSpeechSupported: () => true,
  isAudioContextSupported: () => true,
}));

const session: GrievingSession = {
  id: 'g-test',
  title: 'Finding Comfort Test',
  description: 'A test grieving support session.',
  duration: 8,
  type: 'comfort',
  guidedScript: 'You are not alone in this pain.',
  musicTone: 'comfort',
};

describe('GrievingSupport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the session title and description', () => {
    render(<GrievingSupport session={session} />);
    expect(screen.getByText('Finding Comfort Test')).toBeInTheDocument();
    expect(screen.getByText('A test grieving support session.')).toBeInTheDocument();
  });

  it('shows type badge and duration', () => {
    render(<GrievingSupport session={session} />);
    expect(screen.getByText(/comfort/)).toBeInTheDocument();
    expect(screen.getByText(/8 min/)).toBeInTheDocument();
  });

  it('shows guided script preview', () => {
    render(<GrievingSupport session={session} />);
    expect(screen.getByText(/You are not alone in this pain/)).toBeInTheDocument();
  });

  it('shows narration and music toggle buttons', () => {
    render(<GrievingSupport session={session} />);
    expect(screen.getByText(/Narration/)).toBeInTheDocument();
    expect(screen.getByText(/Music/)).toBeInTheDocument();
  });

  it('shows Begin Session button by default', () => {
    render(<GrievingSupport session={session} />);
    expect(screen.getByText(/Begin Session/)).toBeInTheDocument();
  });

  it('switches to Stop button when playing', () => {
    render(<GrievingSupport session={session} />);
    fireEvent.click(screen.getByText(/Begin Session/));
    expect(screen.getByText(/Stop/)).toBeInTheDocument();
  });

  it('toggles narration off and on', () => {
    render(<GrievingSupport session={session} />);
    const btn = screen.getByText(/Narration On/);
    fireEvent.click(btn);
    expect(screen.getByText(/Narration Off/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Narration Off/));
    expect(screen.getByText(/Narration On/)).toBeInTheDocument();
  });

  it('toggles music off and on', () => {
    render(<GrievingSupport session={session} />);
    const btn = screen.getByText(/Music On/);
    fireEvent.click(btn);
    expect(screen.getByText(/Music Off/)).toBeInTheDocument();
  });
});
