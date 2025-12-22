export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

// Optional dedicated URL for the AutoDeploy app / agent experience.
// Falls back to `${API_BASE_URL}/app` so local dev works without extra config.
export const AGENT_APP_URL =
  import.meta.env.VITE_AGENT_APP_URL ?? `${API_BASE_URL}/app`;

export type BannerTone = 'info' | 'success' | 'warning' | 'error';

export type SystemBannerPayload = {
  id?: string;
  message?: string | null;
  tone?: BannerTone | null;
  /** Optional flag from backend; frontend still treats missing as active. */
  active?: boolean | null;
  /** If true, backend expects the banner to remain visible until dismissed. */
  sticky?: boolean | null;
};

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
 * Open the primary AutoDeploy app / agent experience in this tab.
 *
 * In production this should point at the main application UI (e.g. dashboard
 * or wizard). Locally it defaults to `${API_BASE_URL}/app`.
 */
export function openAgentApp() {
  window.location.href = AGENT_APP_URL;
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

/**
 * Fetch the current active system banner, if any.
 *
 * The backend is expected to expose a lightweight endpoint at
 * `GET ${API_BASE_URL}/api/system-banner` that returns either:
 *   - `{ ok: boolean; banner?: SystemBannerPayload | null }`, or
 *   - `SystemBannerPayload | null` directly.
 *
 * This helper is defensive and will return `null` on 404 or any error so the
 * marketing site never hard-fails if the endpoint is missing.
 */
export async function fetchSystemBanner(): Promise<SystemBannerPayload | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/system-banner`, {
      credentials: "include",
    });

    if (res.status === 404) {
      // Endpoint not wired up yet; treat as "no banner".
      return null;
    }

    if (!res.ok) {
      console.error("fetchSystemBanner failed", res.status, res.statusText);
      return null;
    }

    const raw = (await res.json()) as
      | { ok?: boolean; banner?: SystemBannerPayload | null }
      | SystemBannerPayload
      | null;

    if (!raw) return null;

    const banner: SystemBannerPayload | null =
      (raw as { banner?: SystemBannerPayload | null }).banner ??
      (raw as SystemBannerPayload);

    if (!banner || !banner.message || banner.active === false) {
      return null;
    }

    return banner;
  } catch (error) {
    console.error("fetchSystemBanner error", error);
    return null;
  }
}

/**
 * Admin-only helper used by the Admin Console to set/replace the active
 * system banner. This maps to POST /api/system-banner on the backend.
 */
export async function setSystemBanner(input: {
  message: string;
  tone: BannerTone;
  sticky?: boolean;
}): Promise<SystemBannerPayload> {
  const res = await fetch(`${API_BASE_URL}/api/system-banner`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`setSystemBanner failed: ${res.status} ${text}`);
  }

  const payload = (await res.json()) as
    | { ok?: boolean; banner?: SystemBannerPayload | null }
    | SystemBannerPayload;

  const banner = (payload as { banner?: SystemBannerPayload | null }).banner ??
    (payload as SystemBannerPayload);

  if (!banner || !banner.message) {
    throw new Error("setSystemBanner returned no banner payload");
  }

  return banner;
}

/**
 * Admin-only helper used by the Admin Console to clear any active banner.
 * Maps to DELETE /api/system-banner on the backend.
 */
export async function clearSystemBanner(): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/system-banner`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok && res.status !== 204) {
    const text = await res.text();
    throw new Error(`clearSystemBanner failed: ${res.status} ${text}`);
  }
}

// --- Admin user management helpers ---

export type AdminUser = {
  id: string;
  email: string | null;
  github_username: string | null;
  role?: 'USER' | 'SYSTEM_ADMIN' | null;
  plan?: 'free' | 'pro' | null;
  beta_pro_granted?: boolean | null;
  created_at?: string | null;
};

/** Fetch the admin view of users (limited list) from GET /users. */
export async function fetchAdminUsers(): Promise<AdminUser[]> {
  const res = await fetch(`${API_BASE_URL}/users`, {
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`fetchAdminUsers failed: ${res.status} ${text}`);
  }

  const payload = (await res.json()) as
    | { users?: unknown }
    | AdminUser[];

  // Support a few shapes:
  // 1) { users: AdminUser[] }
  // 2) AdminUser[] directly
  // 3) { users: { rows: AdminUser[] } } (pg Result object forwarded from backend)
  let usersUnknown: unknown = (payload as { users?: unknown }).users ?? payload;

  if (
    usersUnknown &&
    typeof usersUnknown === "object" &&
    !Array.isArray(usersUnknown) &&
    Array.isArray((usersUnknown as { rows?: unknown }).rows)
  ) {
    usersUnknown = (usersUnknown as { rows: unknown }).rows;
  }

  return Array.isArray(usersUnknown) ? (usersUnknown as AdminUser[]) : [];
}

/** Toggle a user's SYSTEM_ADMIN role via POST /users/promote. */
export async function setUserAdmin(userId: string, makeAdmin: boolean): Promise<AdminUser> {
  const res = await fetch(`${API_BASE_URL}/users/promote`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, make_admin: makeAdmin }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`setUserAdmin failed: ${res.status} ${text}`);
  }

  const payload = (await res.json()) as { user: AdminUser } | AdminUser;
  const user = (payload as { user: AdminUser }).user ?? (payload as AdminUser);
  return user;
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
      // 401/403  treat as unauthenticated without throwing.
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
