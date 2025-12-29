import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AccountMenu } from '../components/navbar/AccountMenu';
import { IS_DEMO_MODE } from '../lib/api';

// In tests we want to exercise the "live" behavior rather than demo gating so
// that the AccountMenu flows (login/logout, Launch AutoDeploy, banner wiring)
// remain covered. If the app is built in demo mode, short-circuit these tests.
const SKIP_DEMO_MODE = IS_DEMO_MODE;

// Ensure the global Window type includes showBanner for tests, matching
// the declaration in App.tsx.
declare global {
  interface Window {
    showBanner?: (
      message: string,
      tone?: import('../lib/api').BannerTone,
      options?: { durationMs?: number; sticky?: boolean },
    ) => void;
  }
}

describe('AccountMenu', () => {
  if (SKIP_DEMO_MODE) {
    it('skips AccountMenu live-mode tests in demo mode', () => {
      expect(true).toBe(true);
    });
    return;
  }

  it('renders initials and opens/closes the dropdown', () => {
    const onOpenDocs = vi.fn();
    const onOpenAgent = vi.fn();
    const onOpenAdmin = vi.fn();

    render(
      <AccountMenu
        displayName="Test User"
        displayEmail="test@example.com"
        initials="TU"
        isAuthenticated={true}
        isPro={true}
        isAdmin={false}
        onOpenDocs={onOpenDocs}
        onOpenAgent={onOpenAgent}
        onOpenAdmin={onOpenAdmin}
      />,
    );

    const trigger = screen.getByLabelText('Open account menu');
    expect(trigger).toBeInTheDocument();

    fireEvent.click(trigger);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Documentation'));

    expect(onOpenDocs).toHaveBeenCalledTimes(1);
    // Menu should close after clicking Documentation
    expect(screen.queryByText('Documentation')).not.toBeInTheDocument();
  });

  it('shows correct auth action label based on isAuthenticated', () => {
    const onOpenDocs = vi.fn();
    const onOpenAgent = vi.fn();
    const onOpenAdmin = vi.fn();

    // Authenticated case
    const { unmount } = render(
      <AccountMenu
        displayName="User"
        displayEmail="user@example.com"
        initials="U"
        isAuthenticated={true}
        isPro={true}
        isAdmin={false}
        onOpenDocs={onOpenDocs}
        onOpenAgent={onOpenAgent}
        onOpenAdmin={onOpenAdmin}
      />,
    );

    fireEvent.click(screen.getByLabelText('Open account menu'));
    expect(screen.getByText('Log out')).toBeInTheDocument();

    unmount();

    // Unauthenticated case
    render(
      <AccountMenu
        displayName="User"
        displayEmail="user@example.com"
        initials="U"
        isAuthenticated={false}
        isPro={false}
        isAdmin={false}
        onOpenDocs={onOpenDocs}
        onOpenAgent={onOpenAgent}
        onOpenAdmin={onOpenAdmin}
      />,
    );

    fireEvent.click(screen.getByLabelText('Open account menu'));
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  it('triggers a warning banner instead of launching the agent for non-pro users', () => {
    const onOpenDocs = vi.fn();
    const onOpenAgent = vi.fn();
    const onOpenAdmin = vi.fn();
    const showBanner = vi.fn();
    const originalShowBanner = window.showBanner;
    window.showBanner = showBanner;

    try {
      render(
        <AccountMenu
          displayName="Free User"
          displayEmail="free@example.com"
          initials="FU"
          isAuthenticated={true}
          isPro={false}
          isAdmin={false}
          onOpenDocs={onOpenDocs}
          onOpenAgent={onOpenAgent}
          onOpenAdmin={onOpenAdmin}
        />,
      );

      fireEvent.click(screen.getByLabelText('Open account menu'));

      const proButton = screen.getByText('Launch AutoDeploy (Pro)');
      fireEvent.click(proButton);

      expect(onOpenAgent).not.toHaveBeenCalled();
      expect(showBanner).toHaveBeenCalledTimes(1);
      expect(showBanner.mock.calls[0][1]).toBe('warning');
    } finally {
      window.showBanner = originalShowBanner;
    }
  });

  it('launches the agent without showing a banner for pro users', () => {
    const onOpenDocs = vi.fn();
    const onOpenAgent = vi.fn();
    const onOpenAdmin = vi.fn();
    const showBanner = vi.fn();
    const originalShowBanner = window.showBanner;
    window.showBanner = showBanner;

    try {
      render(
        <AccountMenu
          displayName="Pro User"
          displayEmail="pro@example.com"
          initials="PU"
          isAuthenticated={true}
          isPro={true}
          isAdmin={false}
          onOpenDocs={onOpenDocs}
          onOpenAgent={onOpenAgent}
          onOpenAdmin={onOpenAdmin}
        />,
      );

      fireEvent.click(screen.getByLabelText('Open account menu'));

      const launchButton = screen.getByText('Launch AutoDeploy');
      fireEvent.click(launchButton);

      expect(onOpenAgent).toHaveBeenCalledTimes(1);
      expect(showBanner).not.toHaveBeenCalled();
    } finally {
      window.showBanner = originalShowBanner;
    }
  });
});
