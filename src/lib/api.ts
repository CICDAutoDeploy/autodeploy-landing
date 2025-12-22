export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export async function getHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) {
      throw new Error(`Health check failed with status ${res.status}`);
    }
    return (await res.json()) as { ok: boolean; uptime?: number };
  } catch (error) {
    console.error("Health check error", error);
    throw error;
  }
}

/**
 * Initiate GitHub OAuth by redirecting the browser to the backend.
 *
 * The backend is responsible for setting the mcp_session cookie and
 * redirecting back to the configured FRONTEND_URL after login.
 */
export function startGithubLogin() {
  // Full page redirect so cookies are properly set on the API origin.
  window.location.href = `${API_BASE_URL}/auth/github/start`;
}

/**
 * Log out the current session by calling the backend and then reloading
 * the page to clear any client-side state.
 */
export async function logoutSession() {
  try {
    await fetch(`${API_BASE_URL}/auth/local/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Logout error", error);
  } finally {
    window.location.reload();
  }
}

export type ApiSessionUser = {
  user_id?: string;
  id?: string;
  name?: string | null;
  email?: string | null;
  github_username?: string | null;

  // New fields coming from backend /api/me
  role?: 'USER' | 'SYSTEM_ADMIN';
  plan?: 'free' | 'pro';
  beta_pro_granted?: boolean;
  created_at?: string;
};

/**
 * Fetch the current authenticated user from the backend.
 *
 * Returns an object normalized to the front-end's CurrentUser shape.
 * If the request fails or there is no active session, this falls back
 * to an anonymous user.
 */
export async function fetchCurrentUser(): Promise<{
  isAuthenticated: boolean;
  name: string | null;
  email: string | null;
  isPro: boolean;
  isAdmin: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      // 401/403 → treat as unauthenticated without throwing.
      if (res.status === 401 || res.status === 403) {
        return {
          isAuthenticated: false,
          name: null,
          email: null,
          isPro: false,
          isAdmin: false,
        };
      }
      throw new Error(`fetchCurrentUser failed with status ${res.status}`);
    }

    const payload = (await res.json()) as { ok: boolean; user?: ApiSessionUser };
    const data = payload.user ?? {};

    // Prefer a real name if backend ever adds it; otherwise use GitHub username.
    const name = (data.name ?? data.github_username ?? null) ?? null;
    const email = data.email ?? null;

    const isAdmin = data.role === 'SYSTEM_ADMIN';
    const isPro = !!data && (data.plan === 'pro' || data.beta_pro_granted === true);

    if (!name && !email) {
      // Session exists but we don't have any identifying info; still treat as authed.
      return {
        isAuthenticated: true,
        name: null,
        email: null,
        isPro,
        isAdmin,
      };
    }

    return {
      isAuthenticated: true,
      name,
      email,
      isPro,
      isAdmin,
    };
  } catch (error) {
    console.error("fetchCurrentUser error", error);
    return {
      isAuthenticated: false,
      name: null,
      email: null,
      isPro: false,
      isAdmin: false,
    };
  }
}
