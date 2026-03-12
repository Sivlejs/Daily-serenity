import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../../components/ui/ProgressBar';

describe('ProgressBar component', () => {
  it('renders with a value', () => {
    render(<ProgressBar value={50} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute('aria-valuenow', '50');
  });

  it('renders with a label', () => {
    render(<ProgressBar value={75} label="Progress" />);
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('clamps value to 100 when above 100', () => {
    render(<ProgressBar value={150} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps value to 0 when below 0', () => {
    render(<ProgressBar value={-20} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '0');
  });
});
