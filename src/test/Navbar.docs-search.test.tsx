import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Navbar from '../components/Navbar';

const RECENT_STORAGE_KEY = 'autodeploy-docs-recent';

type Page = 'home' | 'privacy' | 'terms' | 'contact' | 'docs';

function renderNavbar(initialPage: Page = 'home') {
  const setPage = vi.fn();
  const utils = render(<Navbar page={initialPage} setPage={setPage} />);
  return { setPage, ...utils };
}

beforeEach(() => {
  window.localStorage.clear();
  // Stub the docs slug setter used by Navbar when navigating to docs pages.
  (window as any).setDocSlug = vi.fn();
});

describe('Navbar docs search', () => {
  it('filters documents based on the search query', async () => {
    renderNavbar('home');

    const user = userEvent.setup();

    // Open the docs search dialog via the search button.
    const openButtons = screen.getAllByRole('button', { name: /search docs/i });
    await user.click(openButtons[0]);

    const input = await screen.findByPlaceholderText(/search docs/i);

    // Type a query that should match only the Pipeline configuration doc.
    await user.type(input, 'pipeline');

    const match = await screen.findByRole('button', {
      name: /Pipeline configuration/i,
    });
    expect(match).toBeInTheDocument();

    // A non-matching document such as the clouds doc should not be shown.
    expect(screen.queryByText('Deploying to AWS & GCP')).not.toBeInTheDocument();
  });

  it('opens the docs search dialog when pressing Ctrl+K', async () => {
    renderNavbar('home');

    expect(screen.queryByPlaceholderText(/search docs/i)).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });

    const input = await screen.findByPlaceholderText(/search docs/i);
    expect(input).toBeInTheDocument();
  });

  it('opens the docs search dialog when pressing Cmd+K', async () => {
    renderNavbar('home');

    expect(screen.queryByPlaceholderText(/search docs/i)).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'k', metaKey: true });

    const input = await screen.findByPlaceholderText(/search docs/i);
    expect(input).toBeInTheDocument();
  });

  it('closes the docs search dialog when pressing Escape', async () => {
    renderNavbar('home');

    const user = userEvent.setup();

    const openButtons = screen.getAllByRole('button', { name: /search docs/i });
    await user.click(openButtons[0]);

    const input = await screen.findByPlaceholderText(/search docs/i);
    expect(input).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/search docs/i)).not.toBeInTheDocument();
    });
  });

  it('hydrates recent documents from localStorage when opening the search dialog', async () => {
    // Pre-populate localStorage with a mix of valid and invalid recent docs.
    window.localStorage.setItem(
      RECENT_STORAGE_KEY,
      JSON.stringify([
        { slug: 'configuration', label: 'Pipeline configuration' },
        // This slug does not exist in the docs index and should be filtered out.
        { slug: 'non-existent-slug', label: 'Unknown doc' },
      ]),
    );

    renderNavbar('home');

    const user = userEvent.setup();

    const openButtons = screen.getAllByRole('button', { name: /search docs/i });
    await user.click(openButtons[0]);

    // Recent section should be visible with the valid recent document.
    const recentHeading = await screen.findByText(/recent/i);
    const recentContainer = recentHeading.parentElement;
    expect(recentContainer).not.toBeNull();

    const recentButton = within(recentContainer as HTMLElement).getByRole('button', {
      name: /Pipeline configuration/i,
    });
    expect(recentButton).toBeInTheDocument();

    // The invalid recent item should have been discarded from the Recent section.
    expect(
      within(recentContainer as HTMLElement).queryByText('Unknown doc'),
    ).not.toBeInTheDocument();
  });

  it('navigating to a document from search adds it to recent documents and persists it', async () => {
    renderNavbar('home');

    const user = userEvent.setup();

    const openButtons = screen.getAllByRole('button', { name: /search docs/i });
    await user.click(openButtons[0]);

    const input = await screen.findByPlaceholderText(/search docs/i);

    // Filter down to the Logs API doc.
    await user.type(input, 'logs');

    const logsButton = await screen.findByRole('button', { name: /Logs/i });
    await user.click(logsButton);

    // The dialog should close after navigation.
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/search docs/i)).not.toBeInTheDocument();
    });

    // Recent docs should be written to localStorage.
    const stored = window.localStorage.getItem(RECENT_STORAGE_KEY);
    expect(stored).not.toBeNull();

    const parsed = JSON.parse(stored!);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0]).toMatchObject({ slug: 'logs-api', label: 'Logs' });

    // Re-open search to verify the Logs doc appears under Recent.
    await user.click(openButtons[0]);

    expect(await screen.findByText(/recent/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Logs/i })).toBeInTheDocument();
  });
});
