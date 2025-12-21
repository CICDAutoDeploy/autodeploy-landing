
export function BackendGitlabCi() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Integrations</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">GitLab CI (Backend)</span>
      </nav>
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">GitLab CI (planned)</h1>
      <p className="text-slate-200/80 mb-4">
        GitLab CI is not yet implemented in this codebase. The intended design mirrors the GitHub
        adapter with an MCP tool, provider-specific connection storage, and deployment logs.
      </p>
    </div>
  );
}

export function BackendSlack() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Integrations</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Slack (Backend)</span>
      </nav>
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">Slack (planned)</h1>
      <p className="text-slate-200/80 mb-4">
        Slack integration is not present yet. A likely future design would send deployment events
        from <code>deployment_logs</code> into Slack channels via webhooks or a bot user, while the
        dashboard remains the historical view.
      </p>
    </div>
  );
}

export function BackendClouds() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Integrations</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">AWS &amp; Azure (Backend)</span>
      </nav>
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">AWS &amp; Azure</h1>
      <p className="text-slate-200/80 mb-4">
        AWS support centers around SSO/OIDC-based connections and the <code>oidc_adapter</code> MCP
        tool. Routes under <code>/auth/aws/*</code> manage SSO and device flows and persist
        credentials in <code>aws_connections</code>.
      </p>
      <p className="text-slate-200/80 mb-4">
        GCP is wired via <code>gcp_adapter</code> and workflow helpers that generate and commit Cloud
        Run-style workflows. Azure is not yet implemented but would likely follow the same pattern
        (MCP tool + connection tables + deployment logs).
      </p>
    </div>
  );
}

export function BackendAuthApi() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">API Reference</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Authentication API</span>
      </nav>
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">Authentication API</h1>
      <p className="text-slate-200/80 mb-4">
        Sessions are stored entirely in an <code>mcp_session</code> JWT cookie, validated by
        <code>requireSession</code>. Most sensitive routes mount this middleware.
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li><code>POST /auth/local/signup</code> &mdash; email/password signup.</li>
        <li><code>POST /auth/local/login</code> &mdash; email/password login.</li>
        <li><code>POST /auth/local/logout</code> &mdash; clears the <code>mcp_session</code> cookie.</li>
        <li><code>GET /api/me</code> &mdash; returns the current session user (requires
          <code>requireSession</code>).</li>
        <li><code>GET /auth/github/start</code>, <code>/auth/github/callback</code> &mdash; GitHub OAuth
          flow and token storage.</li>
        <li><code>GET /auth/google</code>, <code>/auth/google/callback</code> &mdash; Google OAuth
          (used for future GCP flows).</li>
        <li>AWS SSO helpers under <code>/auth/aws/*</code> &mdash; manage SSO/device authorization
          flows and connection storage.</li>
      </ul>
    </div>
  );
}

export function BackendDeploymentsApi() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">API Reference</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Deployments API</span>
      </nav>
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">Deployments API</h1>
      <p className="text-slate-200/80 mb-4">
        Deployment flows span both higher-level agent endpoints and lower-level deployment log
        endpoints in <code>routes/deployments.js</code>.
      </p>
      <h2 className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">Agent endpoints</h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li><code>POST /agent/wizard</code> &mdash; runs the MVP end-to-end wizard agent.</li>
        <li><code>POST /agent/wizard/ai</code> &mdash; chat-style orchestration endpoint.</li>
        <li><code>POST /agent/pipeline</code> &mdash; convenience wrapper for
          <code>pipeline_generator</code>.</li>
        <li><code>POST /agent/analyze</code> &mdash; calls <code>repo_reader</code> for repo metadata.</li>
        <li><code>POST /agent/deploy</code> &mdash; delegates to <code>oidc_adapter</code> for
          provider-specific deploy info.</li>
      </ul>
      <h2 className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">Deployment log endpoints</h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li><code>POST /deployments</code> &mdash; create a queued deployment entry.</li>
        <li><code>PATCH /deployments/:id/status</code> &mdash; update status and metadata.</li>
        <li><code>GET /deployments</code>, <code>GET /deployments/:id</code> &mdash; list/fetch
          deployments with filters.</li>
        <li><code>POST /deployments/:id/retry</code> &mdash; clone an existing deployment into a new
          queued one.</li>
        <li><code>POST /deployments/rollback</code>,
          <code>/deployments/rollback/last-success</code> &mdash; create rollback deployments.</li>
        <li><code>POST /deployments/dispatch</code> &mdash; dispatch a GitHub Actions workflow and log
          it.</li>
      </ul>
    </div>
  );
}

export function BackendLogsApi() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">API Reference</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Logs API</span>
      </nav>
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">Logs &amp; History</h1>
      <p className="text-slate-200/80 mb-4">
        AutoDeploy uses database tables instead of log files as the primary source of truth for
        operational history.
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <code>deployment_logs</code> &mdash; written by deployment and pipeline routes; stores
          provider, repo, environment, branch, status, timestamps, and JSON metadata.
        </li>
        <li>
          <code>pipeline_versions</code> &mdash; stores full YAML, hashes, and context for pipeline
          versions; powers history/rollback views.
        </li>
        <li>
          <code>pipeline_sessions</code> and <code>pipeline_events</code> &mdash; model multi-step
          wizard sessions entirely on the server.
        </li>
      </ul>
      <p className="text-slate-200/80">
        Together, these tables make it possible to reconstruct not just what is currently deployed,
        but also which user and which tools produced that state over time.
      </p>
    </div>
  );
}
