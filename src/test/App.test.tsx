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
  let originalMatchMedia: typeof window.matchMedia | undefined;

  beforeEach(() => {
    vi.useFakeTimers();

    // Mock matchMedia used by Navbar so App can render in JSDOM.
    originalMatchMedia = window.matchMedia;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).matchMedia = (query: string) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      } as MediaQueryList;
    };
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();

    if (originalMatchMedia) {
      window.matchMedia = originalMatchMedia;
    }
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
