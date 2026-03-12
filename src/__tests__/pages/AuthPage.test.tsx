import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthPage from '../../pages/AuthPage';

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: vi.fn(),
    register: vi.fn(),
    isLoading: false,
    error: null,
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

describe('AuthPage', () => {
  it('shows login tab by default', () => {
    render(<MemoryRouter><AuthPage /></MemoryRouter>);
    const loginTab = screen.getByRole('tab', { name: /login/i });
    expect(loginTab).toHaveAttribute('aria-selected', 'true');
  });

  it('can switch to register tab', () => {
    render(<MemoryRouter><AuthPage /></MemoryRouter>);
    fireEvent.click(screen.getByRole('tab', { name: /register/i }));
    expect(screen.getByRole('tab', { name: /register/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('shows validation error when submitting empty login form', async () => {
    render(<MemoryRouter><AuthPage /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    render(<MemoryRouter><AuthPage /></MemoryRouter>);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'notanemail' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });
});
