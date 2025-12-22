export type CurrentUser = {
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Full name from GitHub (or other provider) */
  name: string | null;
  /** Primary email address */
  email: string | null;
};

/**
 * Temporary, static current user.
 *
 * Once GitHub OAuth is wired up, replace this with real auth state
 * (e.g. from context, a hook, or props) and populate from the backend.
 */
export const currentUser: CurrentUser = {
  isAuthenticated: false,
  name: null,
  email: null,
};
