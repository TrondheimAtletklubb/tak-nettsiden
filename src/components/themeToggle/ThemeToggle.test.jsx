import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from './ThemeToggle';

const mockToggleTheme = vi.fn();
vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn()
}));

import { useTheme } from '../../hooks/useTheme';

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with light theme (shows moon icon)', () => {
    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /switch to dark theme/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
  });

  it('renders with dark theme (shows sun icon)', () => {
    useTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /switch to light theme/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
  });

  it('calls toggleTheme when clicked', async () => {
    const user = userEvent.setup();

    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('has correct CSS class', () => {
    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button.className).toContain('theme-toggle');
  });
});
