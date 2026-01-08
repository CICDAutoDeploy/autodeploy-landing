import { useEffect, useState } from "react";
import { fetchCurrentUser, IS_DEMO_MODE } from "./api";

export type CurrentUser = {
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Full name from GitHub (or other provider) */
  name: string | null;
  /** Primary email address */
  email: string | null;
  /** Whether this user should see pro features (plan/beta flags) */
  isPro: boolean;
  /** Whether this user is a system admin */
  isAdmin: boolean;
};

const ANONYMOUS_USER: CurrentUser = {
  isAuthenticated: false,
  name: null,
  email: null,
  isPro: false,
  isAdmin: false,
};

/**
 * React hook that hydrates the current user from the backend `/api/me` endpoint.
 *
 * On initial render it returns an anonymous user and then updates once the
 * request resolves. If the request fails or there is no active session, it
 * remains anonymous.
 */
export function useCurrentUser(): CurrentUser {
  const [user, setUser] = useState<CurrentUser>(ANONYMOUS_USER);

  useEffect(() => {
    // In demo mode we intentionally skip hitting `/api/me` and always present
    // an anonymous user. This keeps the marketing surface self-contained when
    // the backend or auth flows are not live yet.
    if (IS_DEMO_MODE) {
      return;
    }

    let cancelled = false;

    void (async () => {
      const result = await fetchCurrentUser();
      if (cancelled) return;

      setUser({
        isAuthenticated: result.isAuthenticated,
        name: result.name,
        email: result.email,
        isPro: result.isPro,
        isAdmin: result.isAdmin,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return user;
}
