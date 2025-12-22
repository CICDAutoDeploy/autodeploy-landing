import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDocsSearch } from '../components/navbar/useDocsSearch';
import { FLAT_DOCS_INDEX, RECENT_STORAGE_KEY } from '../components/navbar/docsConfig';
import type { Page } from '../components/Navbar';

declare global {
  interface Window {
    setDocSlug?: (slug: import('../components/docs/types').DocSlug) => void;
  }
}

describe('useDocsSearch', () => {
  const setPage = vi.fn();

  beforeEach(() => {
    window.localStorage.clear();
    window.setDocSlug = vi.fn();
    setPage.mockClear();
    document.documentElement.className = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('initializes with dialog closed and empty query and recents', () => {
    const { result } = renderHook(() =>
      useDocsSearch({ page: 'home', setPage } as { page: Page; setPage: (p: Page) => void }),
    );

    expect(result.current.docsSearchOpen).toBe(false);
    expect(result.current.docsSearchQuery).toBe('');
    expect(result.current.recentDocs).toEqual([]);
  });

  it('hydrates recent docs from localStorage on mount', () => {
    const recent = FLAT_DOCS_INDEX.slice(0, 1);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recent));

    const { result } = renderHook(() =>
      useDocsSearch({ page: 'home', setPage } as { page: Page; setPage: (p: Page) => void }),
    );

    expect(result.current.recentDocs[0]).toMatchObject(recent[0]);
  });

  it('openDocsSearch opens dialog and adds global class, closeDocsSearch closes and clears query', () => {
    const { result } = renderHook(() =>
      useDocsSearch({ page: 'home', setPage } as { page: Page; setPage: (p: Page) => void }),
    );

    act(() => {
      result.current.openDocsSearch();
    });

    expect(result.current.docsSearchOpen).toBe(true);
    expect(document.documentElement.classList.contains('docs-search-open')).toBe(true);

    act(() => {
      result.current.setDocsSearchQuery('logs');
    });

    act(() => {
      result.current.closeDocsSearch();
    });

    expect(result.current.docsSearchOpen).toBe(false);
    expect(result.current.docsSearchQuery).toBe('');
    expect(document.documentElement.classList.contains('docs-search-open')).toBe(false);
  });

  it('navigateToDoc navigates to docs page, sets slug, closes search, and records recent', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() =>
      useDocsSearch({ page: 'home', setPage } as { page: Page; setPage: (p: Page) => void }),
    );

    const target = FLAT_DOCS_INDEX.find((d) => d.slug === 'logs-api') ?? FLAT_DOCS_INDEX[0];

    act(() => {
      result.current.openDocsSearch();
    });

    act(() => {
      result.current.navigateToDoc(target.slug as any);
    });

    // Flush the zero-delay timeout used when changing pages
    act(() => {
      vi.runAllTimers();
    });

    expect(setPage).toHaveBeenCalledWith('docs');
    expect(window.setDocSlug).toHaveBeenCalledWith(target.slug);
    expect(result.current.docsSearchOpen).toBe(false);

    const stored = window.localStorage.getItem(RECENT_STORAGE_KEY);
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed[0]).toMatchObject({ slug: target.slug });
  });
});
