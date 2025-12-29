export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

// Optional dedicated URL for the AutoDeploy app / agent experience.
// Falls back to `${API_BASE_URL}/app` so local dev works without extra config.
export const AGENT_APP_URL =
  import.meta.env.VITE_AGENT_APP_URL ?? `${API_BASE_URL}/app`;

// Base for legacy MCP v1 endpoints (tools + pipeline_* routes)
export const MCP_V1_BASE_URL = `${API_BASE_URL}/mcp/v1`;

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

/** Toggle a user's Pro plan via POST /users/pro. */
export async function setUserPro(userId: string, makePro: boolean): Promise<AdminUser> {
  const res = await fetch(`${API_BASE_URL}/users/pro`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, make_pro: makePro }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`setUserPro failed: ${res.status} ${text}`);
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

// --- MCP v1 helpers -------------------------------------------------------

// Generic v1 envelopes for tool responses

type McpV1SuccessEnvelope<TData> = {
  success: true;
  data: TData;
  request_id: string | null;
};

type McpV1ErrorEnvelope = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  request_id: string | null;
};

// Generic v1 envelopes for pipeline_commit / history / rollback

type McpV1OkEnvelope<TData> = {
  ok: true;
  data?: TData;
  message?: string;
  request_id: string | null;
};

type McpV1OkErrorEnvelope = {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  request_id: string | null;
};

/**
 * Low-level helper for calling MCP tools via /mcp/v1/:tool_name.
 *
 * This matches the v1 envelope described in `MCP_v1_Endpoint_Contracts.md`:
 * `{ success: true, data, request_id }` on success and
 * `{ success: false, error, request_id }` on failure.
 */
async function callMcpToolInternal<TData = unknown>(
  toolName: string,
  input: Record<string, unknown> = {},
): Promise<TData> {
  const url = `${MCP_V1_BASE_URL}/${encodeURIComponent(toolName)}`;

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input ?? {}),
  });

  const payload = (await res.json().catch(() => ({}))) as
    | McpV1SuccessEnvelope<TData>
    | McpV1ErrorEnvelope
    | Record<string, unknown>;

  const successFlag = (payload as McpV1SuccessEnvelope<TData>).success;

  if (!res.ok || successFlag === false) {
    const err = payload as McpV1ErrorEnvelope | Record<string, unknown>;
    const errorObject = (err as McpV1ErrorEnvelope).error;
    const message =
      (errorObject && errorObject.message) ||
      (err as any).error?.message ||
      (err as any).error ||
      res.statusText ||
      "MCP tool error";

    throw new Error(message);
  }

  return (payload as McpV1SuccessEnvelope<TData>).data;
}

/**
 * Public, generic MCP v1 caller that higher-level docs or dashboards can use
 * when they need raw access to tools like `repo_reader`, `pipeline_generator`,
 * `oidc_adapter`, `gcp_adapter`, etc.
 */
export async function callMcpTool<TData = unknown, TInput extends Record<string, unknown> = Record<string, unknown>>(
  toolName: string,
  input: TInput,
): Promise<TData> {
  return callMcpToolInternal<TData>(toolName, input);
}

// --- Status ---------------------------------------------------------------

export type McpStatusPayload = {
  status: string;
  version: string;
  deprecated?: boolean;
  successor?: {
    base: string;
    status: string;
    tools: string;
  };
  tools_registered: string[];
  timestamp: string;
};

/**
 * Fetch MCP v1 status from GET /mcp/v1/status.
 * Returns `null` on any error so callers can treat MCP as optional.
 */
export async function fetchMcpStatus(): Promise<McpStatusPayload | null> {
  try {
    const res = await fetch(`${MCP_V1_BASE_URL}/status`, {
      credentials: "include",
    });

    if (!res.ok) {
      console.error("fetchMcpStatus failed", res.status, res.statusText);
      return null;
    }

    const payload = (await res.json().catch(() => null)) as
      | McpV1SuccessEnvelope<McpStatusPayload>
      | McpV1ErrorEnvelope
      | null;

    if (!payload || (payload as McpV1ErrorEnvelope).success === false) {
      return null;
    }

    return (payload as McpV1SuccessEnvelope<McpStatusPayload>).data;
  } catch (error) {
    console.error("fetchMcpStatus error", error);
    return null;
  }
}

// --- Pipeline history / rollback helpers ---------------------------------

export type PipelineVersion = {
  id: string;
  user_id: string;
  repo_full_name: string;
  branch: string;
  workflow_path: string;
  yaml: string;
  yaml_hash: string;
  source: string;
  created_at: string;
};

/**
 * Fetch stored pipeline versions for a given repo/branch/path via
 * GET /mcp/v1/pipeline_history.
 *
 * This is defensive against both the current implementation
 * `{ ok: true, data: { versions: { rows: [...] } } }` and an older
 * `{ ok: true, versions: { rows: [...] } }` shape.
 */
export async function fetchPipelineHistory(params: {
  repoFullName: string;
  branch?: string;
  path?: string;
  limit?: number;
}): Promise<PipelineVersion[]> {
  const { repoFullName, branch, path, limit } = params;

  const qs = new URLSearchParams();
  qs.set("repoFullName", repoFullName);
  if (branch) qs.set("branch", branch);
  if (path) qs.set("path", path);
  if (limit) qs.set("limit", String(limit));

  const res = await fetch(`${MCP_V1_BASE_URL}/pipeline_history?${qs.toString()}`, {
    method: "GET",
    credentials: "include",
  });

  const payload = (await res.json().catch(() => ({} as any))) as
    | (McpV1OkEnvelope<{ versions: { rows: PipelineVersion[] } | PipelineVersion[] }>
        & { versions?: { rows: PipelineVersion[] } | PipelineVersion[] })
    | McpV1OkErrorEnvelope
    | Record<string, unknown>;

  if (!res.ok || (payload as McpV1OkErrorEnvelope).ok === false) {
    const err = payload as McpV1OkErrorEnvelope | Record<string, unknown>;
    const message =
      (err as McpV1OkErrorEnvelope).error?.message ||
      (err as any).error ||
      res.statusText ||
      "Pipeline history failed";
    throw new Error(message);
  }

  // Support both { ok, data: { versions: { rows } } } and { ok, versions: { rows } }
  const dataContainer = (payload as any).data ?? payload;
  const versionsField = dataContainer.versions ?? {};

  const rows: PipelineVersion[] = Array.isArray(versionsField?.rows)
    ? (versionsField.rows as PipelineVersion[])
    : Array.isArray(versionsField)
    ? (versionsField as PipelineVersion[])
    : [];

  return rows;
}

/**
 * Roll back to a previous pipeline version via POST /mcp/v1/pipeline_rollback.
 * Returns the backend's `data` payload (GitHub + deployment log info).
 */
export async function rollbackPipeline(versionId: string): Promise<unknown> {
  const res = await fetch(`${MCP_V1_BASE_URL}/pipeline_rollback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ versionId }),
  });

  const payload = (await res.json().catch(() => ({} as any))) as
    | McpV1OkEnvelope<{ github: unknown; deployment: unknown }>
    | McpV1OkErrorEnvelope
    | Record<string, unknown>;

  if (!res.ok || (payload as McpV1OkErrorEnvelope).ok === false) {
    const err = payload as McpV1OkErrorEnvelope | Record<string, unknown>;
    const message =
      (err as McpV1OkErrorEnvelope).error?.message ||
      (err as any).error ||
      res.statusText ||
      "Pipeline rollback failed";
    throw new Error(message);
  }

  return (payload as McpV1OkEnvelope<{ github: unknown; deployment: unknown }>).data;
}

/**
 * Commit a pipeline YAML to GitHub via POST /mcp/v1/pipeline_commit.
 *
 * The backend normalizes `repoFullName | repoUrl`, computes a workflow path,
 * upserts the workflow file via the GitHub adapter, logs to deployment_logs,
 * and records a pipeline_versions entry.
 */
export async function commitPipeline(input: {
  repoFullName?: string;
  repoUrl?: string;
  branch?: string;
  yaml: string;
  path?: string;
  provider?: string;
  workflowName?: string;
  message?: string;
}): Promise<McpV1OkEnvelope<unknown>> {
  const res = await fetch(`${MCP_V1_BASE_URL}/pipeline_commit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  const payload = (await res.json().catch(() => ({} as any))) as
    | McpV1OkEnvelope<unknown>
    | McpV1OkErrorEnvelope
    | Record<string, unknown>;

  if (!res.ok || (payload as McpV1OkErrorEnvelope).ok === false) {
    const err = payload as McpV1OkErrorEnvelope | Record<string, unknown>;
    const message =
      (err as McpV1OkErrorEnvelope).error?.message ||
      (err as any).error ||
      res.statusText ||
      "Pipeline commit failed";
    throw new Error(message);
  }

  return payload as McpV1OkEnvelope<unknown>;
}

// --- Typed wrappers for common MCP tools ----------------------------------

// Repo reader ---------------------------------------------------------------

export type McpRepoSummary = {
  name: string;
  full_name: string;
  default_branch: string;
  private: boolean;
  language: string | null;
  html_url: string;
  branches?: string[];
};

type RepoReaderToolResult =
  | {
      success: true;
      data: {
        provider: string;
        user: string;
        repositories?: McpRepoSummary[];
        repository?: McpRepoSummary;
        fetched_at: string;
      };
    }
  | {
      success: false;
      data: null;
      error: string;
    };

/**
 * List GitHub repositories visible to the current session via the `repo_reader`
 * MCP tool. This is a thin, typed wrapper over `/mcp/v1/repo_reader`.
 */
export async function mcpListRepos(): Promise<McpRepoSummary[]> {
  const toolResult = await callMcpTool<RepoReaderToolResult>("repo_reader", {});

  if (!toolResult?.success || !toolResult.data) {
    throw new Error((toolResult as any)?.error || "repo_reader failed");
  }

  const { repositories, repository } = toolResult.data;

  if (Array.isArray(repositories) && repositories.length > 0) {
    return repositories;
  }

  if (repository) return [repository];
  return [];
}

/** Fetch a single repo summary by full name (e.g. "owner/repo"). */
export async function mcpGetRepo(repoFullName: string): Promise<McpRepoSummary | null> {
  const toolResult = await callMcpTool<RepoReaderToolResult>("repo_reader", {
    repo: repoFullName,
  } as Record<string, unknown>);

  if (!toolResult?.success || !toolResult.data) {
    throw new Error((toolResult as any)?.error || "repo_reader failed");
  }

  return toolResult.data.repository ?? null;
}

// Pipeline generator -------------------------------------------------------

export type PipelineTemplate = "node_app" | "python_app" | "container_service";
export type PipelineStage = "build" | "test" | "deploy";
export type PipelineProvider = "aws" | "jenkins" | "gcp";

export type PipelineGeneratorInput = {
  repo: string;
  branch?: string;
  provider?: PipelineProvider;
  template: PipelineTemplate;
  stages?: PipelineStage[];
  options?: {
    nodeVersion?: string;
    installCmd?: string;
    testCmd?: string;
    buildCmd?: string;
    awsRoleArn?: string;
    awsSessionName?: string;
    awsRegion?: string;
    gcpServiceAccountEmail?: string;
    stages?: PipelineStage[];
  };
};

export type PipelineGeneratorResult = {
  pipeline_name: string;
  repo: string;
  branch: string;
  provider: PipelineProvider;
  template: PipelineTemplate;
  options: Record<string, unknown>;
  stages: PipelineStage[];
  generated_yaml: string;
  created_at: string;
};

type PipelineGeneratorToolResult =
  | { success: true; data: PipelineGeneratorResult }
  | { success: false; error: string };

/**
 * Generate a CI/CD YAML proposal via the `pipeline_generator` MCP tool.
 */
export async function mcpGeneratePipeline(
  input: PipelineGeneratorInput,
): Promise<PipelineGeneratorResult> {
  const toolResult = await callMcpTool<PipelineGeneratorToolResult>(
    "pipeline_generator",
    input as Record<string, unknown>,
  );

  if (!toolResult?.success || !("data" in toolResult) || !toolResult.data) {
    throw new Error((toolResult as any)?.error || "pipeline_generator failed");
  }

  const result = toolResult.data;

  return {
    ...result,
    options: result.options ?? {},
    stages: (result.stages ?? []) as PipelineStage[],
  };
}

// OIDC adapter (AWS / Jenkins) --------------------------------------------

export type OidcAwsRole = { name: string; arn: string };

export type OidcAwsResult = {
  provider: "aws";
  roles: OidcAwsRole[];
  fetched_at: string;
};

export type OidcJenkinsJob = { name: string; url: string };

export type OidcJenkinsResult = {
  provider: "jenkins";
  jobs: OidcJenkinsJob[];
  fetched_at: string;
};

/** List available AWS IAM roles via the `oidc_adapter` MCP tool. */
export async function mcpListAwsRoles(): Promise<OidcAwsResult> {
  const result = await callMcpTool<OidcAwsResult>("oidc_adapter", {
    provider: "aws",
  } as Record<string, unknown>);
  return result;
}

/** List Jenkins jobs via the `oidc_adapter` MCP tool. */
export async function mcpListJenkinsJobs(): Promise<OidcJenkinsResult> {
  const result = await callMcpTool<OidcJenkinsResult>("oidc_adapter", {
    provider: "jenkins",
  } as Record<string, unknown>);
  return result;
}
