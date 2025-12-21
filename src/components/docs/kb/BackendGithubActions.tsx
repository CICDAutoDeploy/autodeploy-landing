
export default function BackendGithubActions() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Integrations</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">GitHub Actions (Backend)</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        GitHub Actions Backend Integration
      </h1>

      <p className="text-slate-200/80 mb-4">
        GitHub is the primary CI/CD provider in the current backend implementation. OAuth, MCP
        tools, and deployment routes all come together to manage workflows and deployments.
      </p>

      <h2 id="backend-github-auth" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        OAuth &amp; tokens
      </h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <code>/auth/github/start</code> and <code>/auth/github/callback</code> perform the OAuth
          code exchange, upsert users, and store personal access tokens in the <code>connections</code>
          table.
        </li>
        <li>
          Successful flows issue an <code>mcp_session</code> JWT cookie that contains
          <code>user_id</code>, <code>github_username</code>, and email.
        </li>
      </ul>

      <h2 id="backend-github-mcp" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        MCP GitHub adapter
      </h2>
      <p className="text-slate-200/80 mb-4">
        The GitHub MCP adapter (registered as <code>github_adapter</code> in
        <code>server/tools/index.js</code>) is exposed via <code>/mcp/v1/github/:action</code>.
      </p>
      <p className="text-slate-200/80 mb-4">
        It handles sub-commands like listing repos and branches, dispatching workflows, and writing
        workflow files via the GitHub REST API, always using tokens from <code>connections</code>.
      </p>

      <h2 id="backend-github-workflows" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Workflow commits &amp; history
      </h2>
      <p className="text-slate-200/80 mb-4">
        Higher-level pipeline endpoints wrap the GitHub adapter to manage workflow files over time:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <code>/mcp/v1/pipeline_commit</code> &mdash; creates or updates workflow files (for example
          under <code>.github/workflows/</code>) and records entries in <code>deployment_logs</code>
          and <code>pipeline_versions</code>.
        </li>
        <li>
          <code>/mcp/v1/pipeline_history</code> &mdash; returns previous versions from
          <code>pipeline_versions</code>.
        </li>
        <li>
          <code>/mcp/v1/pipeline_rollback</code> &mdash; restores an earlier version and logs the
          rollback.
        </li>
      </ul>

      <h2 id="backend-github-deployments" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Deployments API
      </h2>
      <p className="text-slate-200/80 mb-4">
        <code>routes/deployments.js</code> includes a <code>/deployments/dispatch</code> endpoint that
        dispatches a GitHub Actions workflow and logs a deployment record. The rest of the
        <code>/deployments</code> API manages status, retries, and rollbacks.
      </p>

      <p className="text-slate-200/80">
        In practice, the frontend uses these surfaces to list repos, generate workflows, commit
        them, and orchestrate deployments while the backend keeps all GitHub credentials and history
        server-side.
      </p>
    </div>
  );
}
