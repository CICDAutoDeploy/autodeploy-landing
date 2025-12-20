import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Basic stub for IntersectionObserver used in Navbar section tracking.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    private callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit,
  ) {}

  observe(_target: Element) {}
  unobserve(_target: Element) {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (!('IntersectionObserver' in window)) {
  // @ts-expect-error - assigning stub to window
  window.IntersectionObserver = IntersectionObserverStub;
}

// Silence jsdom "not implemented" errors when components call window.scrollTo.
if (!('scrollTo' in window)) {
  // @ts-expect-error - defining scrollTo stub
  window.scrollTo = vi.fn();
}
