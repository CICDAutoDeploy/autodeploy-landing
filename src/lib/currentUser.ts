import { useEffect, useState } from "react";
import { fetchCurrentUser } from "./api";

export type CurrentUser = {
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Full name from GitHub (or other provider) */
  name: string | null;
  /** Primary email address */
  email: string | null;
};

const ANONYMOUS_USER: CurrentUser = {
  isAuthenticated: false,
  name: null,
  email: null,
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
    let cancelled = false;

    void (async () => {
      const result = await fetchCurrentUser();
      if (cancelled) return;

      setUser({
        isAuthenticated: result.isAuthenticated,
        name: result.name,
        email: result.email,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return user;
}
