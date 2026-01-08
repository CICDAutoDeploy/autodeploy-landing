
export default function BackendWebhooks() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Core Concepts</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Webhooks (Backend)</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Backend Webhooks
      </h1>

      <p className="text-slate-200/80 mb-4">
        The current backend favors explicit, API-driven flows over inbound webhooks. There is no
        dedicated <code>/webhooks</code> router yet.
      </p>

      <h2 id="backend-webhooks-today" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Today&apos;s model
      </h2>
      <p className="text-slate-200/80 mb-4">
        Instead of reacting to external webhook payloads, the backend expects the frontend or agents
        to call explicit APIs:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          Pipeline commits go through <code>/mcp/v1/pipeline_commit</code>.
        </li>
        <li>
          Rollbacks use <code>/mcp/v1/pipeline_rollback</code> or dedicated rollback endpoints.
        </li>
        <li>
          Deployments are queued and dispatched via routes under <code>/deployments</code>, such as
          <code>/deployments/dispatch</code>.
        </li>
      </ul>

      <p className="text-slate-200/80 mb-4">
        Status and history are reconstructed from database tables (for example
        <code>deployment_logs</code>) rather than from webhook deliveries.
      </p>

      <h2 id="backend-webhooks-future" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Future directions
      </h2>
      <p className="text-slate-200/80 mb-4">
        A future iteration of the backend could add:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          GitHub Actions or generic Git provider webhooks that update deployment status rows as
          workflows progress.
        </li>
        <li>
          CI failure/success webhooks that update <code>status</code> and <code>finished_at</code> on
          <code>deployment_logs</code> instead of relying solely on polling.
        </li>
        <li>
          Fan-out from webhook handlers into Slack or other notification channels.
        </li>
      </ul>

      <p className="text-slate-200/80">
        For now, think of the backend as the orchestrator of outbound CI/CD calls, with webhooks
        reserved for future enhancements.
      </p>
    </div>
  );
}
