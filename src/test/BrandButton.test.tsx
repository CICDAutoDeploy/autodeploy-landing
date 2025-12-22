import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrandButton } from '../components/navbar/BrandButton';
import type { Page } from '../components/Navbar';

describe('BrandButton', () => {
  beforeEach(() => {
    // jsdom doesn't implement scrollTo by default
    // @ts-expect-error override for test
    window.scrollTo = vi.fn();
  });

  it('navigates to home and scrolls to top when not already on home', () => {
    const setPage = vi.fn();

    vi.useFakeTimers();

    render(<BrandButton page={"contact" as Page} setPage={setPage} />);

    const button = screen.getByText('AutoDeploy');

    fireEvent.click(button);

    // Flush the zero-delay timeout used in BrandButton
    vi.runAllTimers();

    expect(setPage).toHaveBeenCalledWith('home');
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('only scrolls to top when already on home', () => {
    const setPage = vi.fn();

    render(<BrandButton page={"home" as Page} setPage={setPage} />);

    const button = screen.getByText('AutoDeploy');

    fireEvent.click(button);

    expect(setPage).not.toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
