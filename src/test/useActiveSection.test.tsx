import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActiveSection } from '../components/navbar/useActiveSection';
import type { Page } from '../components/Navbar';

// Minimal IntersectionObserver mock so the hook can run in JSDOM
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  // Use fields instead of constructor parameters to avoid TS 'erasableSyntaxOnly' issues.
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

describe('useActiveSection', () => {
  beforeEach(() => {
    // @ts-expect-error assign mock to global
    global.IntersectionObserver = MockIntersectionObserver;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with home as the active section when on home page', () => {
    const { result } = renderHook(() => useActiveSection({ page: 'home' } as { page: Page }));

    expect(result.current.activeSection).toBe('home');
  });

  it('resets active section to home when page is not home', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useActiveSection({ page: 'contact' } as { page: Page }));

    // The hook uses a zero-delay timeout when page !== 'home'
    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.activeSection).toBe('home');
  });

  it('scrollToSection scrolls smoothly to the requested element when it exists', () => {
    const { result } = renderHook(() => useActiveSection({ page: 'home' } as { page: Page }));

    const target = document.createElement('div');
    target.id = 'features';
    const scrollIntoView = vi.fn();
    (target as any).scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    act(() => {
      result.current.scrollToSection('features');
    });

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it("scrollToSection is a no-op when the element doesn't exist", () => {
    const { result } = renderHook(() => useActiveSection({ page: 'home' } as { page: Page }));

    // Should not throw even if the element is missing
    act(() => {
      result.current.scrollToSection('does-not-exist');
    });
  });
});
