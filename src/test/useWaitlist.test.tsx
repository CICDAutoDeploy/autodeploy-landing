import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWaitlist } from '../hooks/useWaitlist';

declare global {
  interface Window {
    joinWaitlist?: (email: string) => Promise<{ success: boolean } | { success: boolean; error?: string }>;
    showToast?: (message: string, type?: 'success' | 'error') => void;
  }
}

describe('useWaitlist', () => {
  beforeEach(() => {
    window.joinWaitlist = vi.fn().mockResolvedValue({ success: true });
    window.showToast = vi.fn();
  });

  it('initializes with empty email, no error, and not loading', () => {
    const { result } = renderHook(() => useWaitlist());

    expect(result.current.email).toBe('');
    expect(result.current.error).toBe('');
    expect(result.current.loading).toBe(false);
  });

  it('sets an error when email is empty and does not call joinWaitlist', async () => {
    const { result } = renderHook(() => useWaitlist());

    await act(async () => {
      await result.current.handleJoin();
    });

    expect(result.current.error).toBe('Please enter your email address.');
    expect(window.joinWaitlist).not.toHaveBeenCalled();
  });

  it('validates email format before calling joinWaitlist', async () => {
    const { result } = renderHook(() => useWaitlist());

    act(() => {
      result.current.setEmail('not-an-email');
    });

    await act(async () => {
      await result.current.handleJoin();
    });

    expect(result.current.error).toBe('Please enter a valid email address.');
    expect(window.joinWaitlist).not.toHaveBeenCalled();
  });

  it('calls joinWaitlist and shows success toast for valid email', async () => {
    const { result } = renderHook(() => useWaitlist());

    act(() => {
      result.current.setEmail('test@example.com');
    });

    await act(async () => {
      await result.current.handleJoin();
    });

    expect(window.joinWaitlist).toHaveBeenCalledWith('test@example.com');
    expect(window.showToast).toHaveBeenCalledWith("You're on the waitlist!", 'success');
    expect(result.current.email).toBe('');
    expect(result.current.loading).toBe(false);
  });
});
