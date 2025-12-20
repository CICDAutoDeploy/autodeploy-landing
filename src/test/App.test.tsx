import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import App from '../App';

// Ensure the global window typing includes showToast for tests
declare global {
  interface Window {
    showToast?: (message: string, type?: 'success' | 'error') => void;
  }
}

describe('App toast wiring', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('defines window.showToast after mounting', () => {
    render(<App />);

    expect(typeof window.showToast).toBe('function');
  });

  it('shows a success toast when window.showToast is called', () => {
    render(<App />);

    // Call the globally exposed toast helper inside act so React can
    // flush the state update and render the toast
    act(() => {
      window.showToast?.("You're on the waitlist!", 'success');
    });

    // Toast message should appear in the document synchronously
    const toast = screen.getByText("You're on the waitlist!");
    expect(toast).toBeInTheDocument();
  });

  it('automatically hides the toast after the timeout', () => {
    render(<App />);

    act(() => {
      window.showToast?.('Temporary message', 'success');
    });

    // Toast should be visible immediately
    expect(screen.getByText('Temporary message')).toBeInTheDocument();

    // Advance timers past the 3000ms timeout in App.tsx inside act so the
    // scheduled state update is properly flushed
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Toast should be removed after the timeout (synchronously with fake timers)
    expect(screen.queryByText('Temporary message')).toBeNull();
  });
});
