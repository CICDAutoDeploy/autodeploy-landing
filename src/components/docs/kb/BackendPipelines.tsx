
export default function BackendPipelines() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Core Concepts</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Pipelines (Backend)</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Backend Pipeline Flows
      </h1>

      <p className="text-slate-200/80 mb-4">
        Pipelines sit at the center of backend behavior. They are implemented as MCP tools exposed
        under <code>/mcp/v1</code> and tracked in Postgres via pipeline and deployment tables.
      </p>

      <h2 id="backend-pipelines-mcp" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        MCP layer
      </h2>
      <p className="text-slate-200/80 mb-4">
        <code>server/tools/index.js</code> registers tools such as
        <code>repo_reader</code>, <code>pipeline_generator</code>,
        <code>oidc_adapter</code>, <code>github_adapter</code>, and <code>gcp_adapter</code>. The
        routes in <code>routes/mcp.js</code> expose them as HTTP endpoints behind
        <code>requireSession</code>.
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <code>GET /mcp/v1/status</code> &mdash; lists registered tools and basic health info.
        </li>
        <li>
          <code>ALL /mcp/v1/github/:action</code> &mdash; dispatches to the GitHub adapter
          (<code>repos</code>, <code>branches</code>, workflow dispatch, etc.).
        </li>
        <li>
          <code>ALL /mcp/v1/:tool_name</code> &mdash; generic dispatcher that merges query/body,
          injects user context, validates via Zod, and calls the tool handler.
        </li>
      </ul>

      <h2 id="backend-pipelines-generation" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        1. Generation
      </h2>
      <p className="text-slate-200/80 mb-4">
        Generation flows start from endpoints like <code>POST /agent/pipeline</code>,
        <code>POST /mcp/v1/pipeline_generator</code>, or <code>POST /agent/wizard/ai</code>.
      </p>
      <ol className="list-decimal list-inside space-y-2 text-slate-200/80 marker:text-emerald-300 marker:font-bold mb-4">
        <li>
          Requests hit <code>server/server.js</code> and are dispatched to <code>routes/agent.js</code>
          or <code>routes/mcp.js</code>.
        </li>
        <li>
          <code>requireSession</code> validates the <code>mcp_session</code> cookie and hydrates
          <code>req.user</code>.
        </li>
        <li>
          The agent or route normalizes repo input to <code>owner/repo</code> where needed.
        </li>
        <li>
          <code>pipeline_generator.handler</code> receives validated input (via Zod schemas) and
          returns structured YAML + metadata.
        </li>
      </ol>

      <h2 id="backend-pipelines-commit" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        2. Commit &amp; history
      </h2>
      <p className="text-slate-200/80 mb-4">
        Commit and history flows are implemented via endpoints such as
        <code>/mcp/v1/pipeline_commit</code>, <code>/mcp/v1/pipeline_history</code>, and
        <code>/mcp/v1/pipeline_rollback</code>.
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          Commits call the GitHub adapter&apos;s workflow helpers to create or update workflow files and
          then write rows to <code>deployment_logs</code> and <code>pipeline_versions</code>.
        </li>
        <li>
          History queries <code>pipeline_versions</code> for a given repo/branch/workflow path.
        </li>
        <li>
          Rollbacks load a previous version, upsert the workflow file again, and log the rollback.
        </li>
      </ul>

      <h2 id="backend-pipelines-execution" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        3. Execution / deployments
      </h2>
      <p className="text-slate-200/80 mb-4">
        Execution is modeled through two tables:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <code>pipeline_versions</code> &mdash; declarative history of pipeline YAML.
        </li>
        <li>
          <code>deployment_logs</code> &mdash; runtime view of what deployments have been queued,
          dispatched, or rolled back.
        </li>
      </ul>
      <p className="text-slate-200/80 mb-4">
        <code>routes/deployments.js</code> exposes REST APIs for creating deployments, updating
        status, querying by repo/environment/status, retrying, rolling back, and dispatching workflows
        against GitHub Actions.
      </p>

      <p className="text-slate-200/80">
        Together, these flows give the frontend enough power to generate, commit, and operate
        pipelines while the backend remains the source of truth for history and runtime events.
      </p>
    </div>
  );
}
