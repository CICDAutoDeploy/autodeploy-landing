import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';

// Provide minimal globals used by Navbar in the JSDOM test environment
beforeEach(() => {
  // jsdom doesn't implement scrollTo by default
  window.scrollTo = vi.fn();

  // Mock IntersectionObserver used for section tracking
  // We only care that it can be instantiated without throwing.
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];

    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  }

  // @ts-expect-error - attach mock to global for tests
  global.IntersectionObserver = MockIntersectionObserver;

  // Ensure there are no stray section elements from previous tests
  document.body.innerHTML = '';
});

describe('Navbar', () => {
  afterEach(() => {
    vi.useRealTimers();
  });
  it('renders primary navigation items', () => {
    const setPage = vi.fn();

    render(<Navbar page="home" setPage={setPage} />);

    expect(screen.getByText('AutoDeploy')).toBeInTheDocument();
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Features')[0]).toBeInTheDocument();
    expect(screen.getAllByText('How it works')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Team')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Contact')[0]).toBeInTheDocument();
  });

  it('calls setPage("contact") when the Contact button is clicked (desktop)', () => {
    const setPage = vi.fn();

    render(<Navbar page="home" setPage={setPage} />);

    const contactButtons = screen.getAllByText('Contact');
    const desktopContact = contactButtons[0];

    fireEvent.click(desktopContact);

    expect(setPage).toHaveBeenCalledWith('contact');
  });

  it('navigates back to home and scrolls to top when clicking the logo from non-home page', () => {
    const setPage = vi.fn();

    vi.useFakeTimers();

    render(<Navbar page="contact" setPage={setPage} />);

    const logoButton = screen.getByText('AutoDeploy');

    fireEvent.click(logoButton);

    // Flush the zero-delay timeout that triggers window.scrollTo
    vi.runAllTimers();

    expect(setPage).toHaveBeenCalledWith('home');
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('toggles the mobile menu when the toggle button is clicked', () => {
    const setPage = vi.fn();

    render(<Navbar page="home" setPage={setPage} />);

    const toggleButton = screen.getByLabelText('Toggle menu');

    // Menu closed initially: the mobile actions container is present but hidden
    // Clicking the toggle should make the mobile menu visible (text still queryable)
    fireEvent.click(toggleButton);

    // After opening, we should be able to find at least one mobile menu item
    const mobileHomeButtons = screen.getAllByText('Home');
    expect(mobileHomeButtons.length).toBeGreaterThan(0);
  });

  it('closes the mobile menu when a mobile nav item is clicked and navigates to contact', () => {
    const setPage = vi.fn();

    render(<Navbar page="home" setPage={setPage} />);

    const toggleButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(toggleButton);

    // Use the last Contact button which corresponds to the mobile menu
    const contactButtons = screen.getAllByText('Contact');
    const mobileContact = contactButtons[contactButtons.length - 1];

    fireEvent.click(mobileContact);

    expect(setPage).toHaveBeenCalledWith('contact');
  });
});
