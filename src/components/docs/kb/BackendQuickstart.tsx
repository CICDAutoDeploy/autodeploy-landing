
export default function BackendQuickstart() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Getting Started</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Backend Quickstart</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Backend Quickstart Guide
      </h1>

      <p className="text-slate-200/80 mb-4">
        This walkthrough covers the zero-to-first-pipeline flow from the backend&apos;s perspective.
      </p>

      <h2 id="backend-quickstart-env" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        1. Start Postgres and set environment variables
      </h2>
      <p className="text-slate-200/80 mb-4">
        Ensure at least <code>DATABASE_URL</code> and <code>JWT_SECRET</code> are set. If you plan
        to use MCP tools and GitHub OAuth in local dev, configure the MCP and OAuth variables too.
      </p>

      <h2 id="backend-quickstart-run" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        2. Run the backend server
      </h2>
      <p className="text-slate-200/80 mb-4">
        From the backend project root:
      </p>
      <pre className="bg-slate-950 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed border border-slate-800 mb-4">
        <code>{`npm run dev      # nodemon (recommended for local dev)
npm start        # plain node server/server.js`}</code>
      </pre>
      <p className="text-slate-200/80 mb-4">
        Express listens on <code>PORT</code> (default <code>3000</code>).
      </p>

      <h2 id="backend-quickstart-health" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        3. Health checks
      </h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <code>GET /health</code> &rarr; <code>{`{ ok: true, uptime }`}</code> &mdash; verifies the
          process is up.
        </li>
        <li>
          <code>GET /db/ping</code> &rarr; <code>{`{ ok: true }`}</code> &mdash; verifies Postgres
          connectivity via the backend health check.
        </li>
      </ul>

      <h2 id="backend-quickstart-auth" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        4. Authenticate a user
      </h2>
      <p className="text-slate-200/80 mb-4">
        Use either local email/password auth or GitHub OAuth:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          Local: <code>POST /auth/local/signup</code> then <code>POST /auth/local/login</code>.
        </li>
        <li>
          GitHub: redirect the browser to <code>/auth/github/start</code> and complete the flow.
        </li>
      </ul>
      <p className="text-slate-200/80 mb-4">
        Both flows result in an <code>mcp_session</code> cookie, which protected routes read via
        <code>requireSession</code> middleware.
      </p>

      <h2 id="backend-quickstart-connect" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        5. Connect GitHub &amp; MCP
      </h2>
      <p className="text-slate-200/80 mb-4">
        When users complete the GitHub OAuth flow, access tokens are stored in the
        <code>connections</code> table. MCP connectivity is configured via <code>MCP_URL</code> /
        <code>MCP_API_KEY</code> and is used by endpoints like <code>/agent/wizard</code> and
        <code>/mcp/v1/*</code>.
      </p>

      <h2 id="backend-quickstart-pipeline" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        6. Generate and commit a pipeline
      </h2>
      <p className="text-slate-200/80 mb-4">
        The frontend typically calls <code>/agent/wizard/ai</code> or
        <code>/mcp/v1/pipeline_generator</code> to generate YAML. Committing that YAML usually goes
        through <code>/mcp/v1/pipeline_commit</code>, which writes a workflow file via the GitHub
        adapter and records entries in <code>deployment_logs</code> and
        <code>pipeline_versions</code>.
      </p>

      <p className="text-slate-200/80">
        Once these steps succeed, the backend is fully wired to support the wizard UI and manage
        pipelines end-to-end.
      </p>
    </div>
  );
}
