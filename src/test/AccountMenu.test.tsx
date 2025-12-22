import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AccountMenu } from '../components/navbar/AccountMenu';

// Ensure the global Window type includes showBanner for tests
declare global {
  interface Window {
    showBanner?: (message: string, tone?: string, options?: unknown) => void;
  }
}

describe('AccountMenu', () => {
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
