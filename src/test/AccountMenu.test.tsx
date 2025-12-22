import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AccountMenu } from '../components/navbar/AccountMenu';

describe('AccountMenu', () => {
  it('renders initials and opens/closes the dropdown', () => {
    const onOpenDocs = vi.fn();

    render(
      <AccountMenu
        displayName="Test User"
        displayEmail="test@example.com"
        initials="TU"
        isAuthenticated={true}
        onOpenDocs={onOpenDocs}
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

    // Authenticated case
    const { unmount } = render(
      <AccountMenu
        displayName="User"
        displayEmail="user@example.com"
        initials="U"
        isAuthenticated={true}
        onOpenDocs={onOpenDocs}
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
        onOpenDocs={onOpenDocs}
      />,
    );

    fireEvent.click(screen.getByLabelText('Open account menu'));
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });
});
