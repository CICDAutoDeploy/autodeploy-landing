
export default function BackendFlows() {
  return (
    <div className="prose prose-invert max-w-none">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex text-sm text-slate-400 mb-6 items-center gap-1"
      >
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">
          Core Concepts
        </span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Backend Flows</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        AutoDeploy Backend Operational Flows
      </h1>

      <p className="text-lg text-slate-200/90 mb-4 leading-relaxed">
        This page mirrors the frontend flows documentation, but from the
        backend&apos;s point of view. It traces how incoming HTTP requests move
        through the Express app, MCP tools, database, and external providers.
      </p>

      <p className="text-slate-200/80 mb-8">
        The sections roughly track the left-hand docs sidebar: Getting Started,
        Core Concepts, Integrations, and API Reference.
      </p>

      {/* Getting Started */}
      <h2 id="backend-getting-started" className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24">
        Getting Started
      </h2>

      <h3 id="backend-intro" className="text-xl font-semibold text-white mt-8 mb-3">
        Introduction
      </h3>
      <p className="text-slate-200/80 mb-4">
        The backend under <code>server/</code> is an Express + Postgres + MCP
        service that powers the AutoDeploy wizard.
      </p>
      <p className="text-slate-200/80 mb-4">
        At a high level:
      </p>
      <ol className="list-decimal list-inside space-y-2 text-slate-200/80 marker:text-emerald-300 marker:font-bold">
        <li>
          The frontend calls REST and MCP endpoints on <code>server/server.js</code>.
        </li>
        <li>
          Express routes requests to feature-specific routers under
          <code>server/routes/</code>.
        </li>
        <li>
          Routers use shared helpers in <code>server/lib/</code>, database access
          via <code>server/db.js</code>, and automation units registered as MCP
          tools under <code>server/tools/</code>.
        </li>
        <li>
          Some flows also call the MCP agent
          (<code>server/src/agents/mcpAgent.js</code> and
          <code>server/agent/wizardAgent.js</code>) or external APIs (GitHub,
          AWS, GCP).
        </li>
      </ol>

      <p className="text-slate-200/80 mt-4 mb-6">
        The backend is responsible for authentication, exposing MCP tools,
        managing deployment and pipeline history in Postgres, and acting as the
        trusted bridge between the wizard UI and GitHub Actions / cloud
        providers.
      </p>

      <h3 id="backend-installation" className="text-xl font-semibold text-white mt-10 mb-3">
        Installation
      </h3>
      <p className="text-slate-200/80 mb-4">
        From the monorepo root (for example <code>AutoDeploy/</code>):
      </p>
      <ol className="list-decimal list-inside space-y-3 text-slate-200/80 marker:text-emerald-300 marker:font-bold">
        <li>
          <strong>Install dependencies</strong>
          <pre className="mt-2 bg-slate-950 text-slate-100 rounded-lg p-3 overflow-x-auto text-xs font-mono border border-slate-800">
            <code>npm install</code>
          </pre>
        </li>
        <li>
          <strong>Optional: install client deps</strong> if you plan to run the
          frontend alongside the backend.
          <pre className="mt-2 bg-slate-950 text-slate-100 rounded-lg p-3 overflow-x-auto text-xs font-mono border border-slate-800">
            <code>{`cd client
npm install`}</code>
          </pre>
        </li>
        <li>
          <strong>Database</strong> &mdash; provision Postgres (local or hosted,
          e.g. Supabase) and set <code>DATABASE_URL</code> in your environment.
        </li>
      </ol>

      <h3 id="backend-configuration" className="text-xl font-semibold text-white mt-10 mb-3">
        Configuration
      </h3>
      <p className="text-slate-200/80 mb-4">
        Backend behavior is controlled via environment variables, primarily read
        in <code>server/db.js</code>, <code>server/src/config/env.js</code>, and
        the auth routes.
      </p>

      <h4 className="text-lg font-semibold text-white mt-6 mb-2">
        Core backend / database
      </h4>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80">
        <li>
          <code>DATABASE_URL</code> &mdash; Postgres connection string used by the
          shared <code>pg.Pool</code>.
        </li>
        <li>
          <code>DB_POOL_MAX</code> &mdash; optional connection pool size (default
          8).
        </li>
      </ul>

      <h4 className="text-lg font-semibold text-white mt-6 mb-2">
        MCP agent / mock MCP
      </h4>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80">
        <li>
          <code>MCP_URL</code> &mdash; URL of the MCP core or mock server.
        </li>
        <li>
          <code>MCP_API_KEY</code> &mdash; bearer token the agent sends to MCP.
        </li>
        <li>
          <code>NODE_ENV</code> &mdash; standard Node environment flag that also
          controls things like verbose SQL logging.
        </li>
      </ul>

      <h4 className="text-lg font-semibold text-white mt-6 mb-2">
        Auth &amp; sessions
      </h4>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80">
        <li>
          <code>JWT_SECRET</code> &mdash; used to sign the <code>mcp_session</code>
          JWT cookie.
        </li>
        <li>
          <code>GITHUB_CLIENT_ID</code>, <code>GITHUB_CLIENT_SECRET</code>,
          <code>GITHUB_OAUTH_REDIRECT_URI</code>,
          <code>GITHUB_OAUTH_SCOPES</code> for GitHub OAuth.
        </li>
        <li>
          <code>FRONTEND_URL</code> &mdash; URL to redirect to after successful
          OAuth.
        </li>
      </ul>

      <h4 className="text-lg font-semibold text-white mt-6 mb-2">
        Cloud providers
      </h4>
      <p className="text-slate-200/80 mb-4">
        AWS and GCP settings (for example <code>AWS_REGION</code>, SSO start
        URLs, or GCP <code>projectId</code> / <code>region</code>) are used by
        adapters like <code>auth.aws.js</code> and <code>gcp_adapter</code> to
        talk to cloud providers.
      </p>

      <h3 id="backend-quickstart" className="text-xl font-semibold text-white mt-10 mb-3">
        Quickstart Guide
      </h3>
      <p className="text-slate-200/80 mb-4">
        This is the zero-to-first-pipeline flow from the backend&apos;s
        perspective.
      </p>
      <ol className="list-decimal list-inside space-y-3 text-slate-200/80 marker:text-emerald-300 marker:font-bold">
        <li>
          Start Postgres and set core env vars (<code>DATABASE_URL</code>,
          <code>JWT_SECRET</code>, and optional MCP/GitHub OAuth values).
        </li>
        <li>
          Run the backend server with <code>npm run dev</code> (nodemon) or
          <code>npm start</code>. Express listens on <code>PORT</code> (default
          3000).
        </li>
        <li>
          Hit <code>/health</code> and <code>/db/ping</code> to verify the
          process and database connectivity.
        </li>
        <li>
          Authenticate a user via local auth or GitHub OAuth; both flows issue
          an <code>mcp_session</code> cookie.
        </li>
        <li>
          Connect GitHub and MCP so the wizard can read repos and generate
          pipelines.
        </li>
        <li>
          Generate and commit a pipeline via
          <code>/agent/wizard/ai</code> or
          <code>/mcp/v1/pipeline_generator</code> and
          <code>/mcp/v1/pipeline_commit</code>.
        </li>
      </ol>

      {/* Core Concepts: Pipelines */}
      <h2 id="backend-pipelines" className="text-2xl font-bold text-white mt-14 mb-4 scroll-mt-24">
        Pipelines
      </h2>
      <p className="text-slate-200/80 mb-4">
        Pipelines are at the center of backend behavior. They are powered by
        MCP tools exposed under <code>/mcp/v1</code> and tracked in Postgres via
        pipeline and deployment tables.
      </p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">
        MCP layer
      </h3>
      <p className="text-slate-200/80 mb-4">
        <code>server/tools/index.js</code> registers tools such as
        <code>repo_reader</code>, <code>pipeline_generator</code>,
        <code>github_adapter</code>, <code>oidc_adapter</code>, and
        <code>gcp_adapter</code>. <code>routes/mcp.js</code> exposes them over
        HTTP, mostly behind <code>requireSession</code>.
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <code>GET /mcp/v1/status</code> lists registered tools and version
          info.
        </li>
        <li>
          <code>ALL /mcp/v1/github/:action</code> delegates to the GitHub MCP
          adapter.
        </li>
        <li>
          <code>ALL /mcp/v1/:tool_name</code> is a generic dispatcher that
          merges inputs, injects user context, validates via Zod, and calls the
          tool handler.
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">
        1. Generation
      </h3>
      <p className="text-slate-200/80 mb-4">
        Generation flows start from endpoints like
        <code>POST /agent/pipeline</code>,
        <code>POST /mcp/v1/pipeline_generator</code>, or
        <code>POST /agent/wizard/ai</code>. They validate the session, normalize
        repo input, then call <code>pipeline_generator.handler</code> to produce
        YAML and metadata.
      </p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">
        2. Commit &amp; history
      </h3>
      <p className="text-slate-200/80 mb-4">
        Commit and history flows are handled by endpoints like
        <code>/mcp/v1/pipeline_commit</code>,
        <code>/mcp/v1/pipeline_history</code>, and
        <code>/mcp/v1/pipeline_rollback</code>. They orchestrate writes to
        GitHub via the GitHub adapter and persist versions and logs to
        <code>pipeline_versions</code> and <code>deployment_logs</code>.
      </p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">
        3. Execution / deployments
      </h3>
      <p className="text-slate-200/80 mb-4">
        Execution is modeled through declarative pipeline history
        (<code>pipeline_versions</code>) and runtime deployment logs
        (<code>deployment_logs</code>). <code>routes/deployments.js</code>
        exposes endpoints to create deployments, update status, query, retry,
        roll back, and dispatch workflows.
      </p>

      {/* Core Concepts: Environments */}
      <h2 id="backend-environments" className="text-2xl font-bold text-white mt-14 mb-4 scroll-mt-24">
        Environments
      </h2>
      <p className="text-slate-200/80 mb-4">
        Environments (for example <code>dev</code>, <code>staging</code>,
        <code>prod</code>) are modeled as simple strings attached to
        deployments. The backend does not enforce a fixed set; it persists what
        the client sends and uses it to filter history.
      </p>

      {/* Core Concepts: Variables & Secrets */}
      <h2 id="backend-secrets" className="text-2xl font-bold text-white mt-14 mb-4 scroll-mt-24">
        Variables &amp; Secrets
      </h2>
      <p className="text-slate-200/80 mb-4">
        Today, most secret management is front-end mocked or delegated to
        providers. The backend primarily stores long-lived credentials such as
        GitHub tokens in <code>connections</code> and AWS SSO metadata in
        <code>aws_connections</code>. A production implementation would extend
        this with first-class secret routes and provider-backed secret storage.
      </p>

      {/* Core Concepts: Webhooks */}
      <h2 id="backend-webhooks" className="text-2xl font-bold text-white mt-14 mb-4 scroll-mt-24">
        Webhooks
      </h2>
      <p className="text-slate-200/80 mb-4">
        There is currently no dedicated <code>/webhooks</code> router. Instead,
        deployments are initiated via explicit API calls such as
        <code>/deployments/dispatch</code> or
        <code>/mcp/v1/pipeline_commit</code>, and status is tracked through
        database tables rather than webhook payloads.
      </p>

      {/* Integrations */}
      <h2 id="backend-integrations" className="text-2xl font-bold text-white mt-14 mb-4 scroll-mt-24">
        Integrations
      </h2>

      <h3 id="backend-github-actions" className="text-xl font-semibold text-white mt-8 mb-3">
        GitHub Actions
      </h3>
      <p className="text-slate-200/80 mb-4">
        GitHub is the primary CI/CD provider today. OAuth flows under
        <code>/auth/github/*</code> create users, store personal access tokens in
        <code>connections</code>, and issue <code>mcp_session</code> cookies.
        The GitHub MCP adapter, exposed via
        <code>/mcp/v1/github/:action</code>, handles repo listing, branches,
        workflow dispatch, and file writes.
      </p>

      <h3 id="backend-gitlab-ci" className="text-xl font-semibold text-white mt-8 mb-3">
        GitLab CI (planned)
      </h3>
      <p className="text-slate-200/80 mb-4">
        GitLab is not yet implemented, but the intended design is to mirror the
        GitHub adapter: an MCP tool, provider-specific connections, and
        deployment logs.
      </p>

      <h3 id="backend-slack" className="text-xl font-semibold text-white mt-8 mb-3">
        Slack (planned)
      </h3>
      <p className="text-slate-200/80 mb-4">
        Slack integration is also a placeholder. A typical future flow would
        emit deployment events from <code>deployment_logs</code> into Slack via
        webhooks or a bot.
      </p>

      <h3 id="backend-clouds" className="text-xl font-semibold text-white mt-8 mb-3">
        AWS &amp; Azure
      </h3>
      <p className="text-slate-200/80 mb-4">
        AWS support today revolves around SSO/OIDC-based connections and the
        <code>oidc_adapter</code> tool. Routes like <code>/auth/aws/*</code>
        manage SSO/device flows and persist credentials in
        <code>aws_connections</code>. GCP is supported via
        <code>gcp_adapter</code> and Cloud Run workflow helpers; Azure would
        follow a similar adapter-plus-connections model.
      </p>

      {/* API Reference */}
      <h2 id="backend-api" className="text-2xl font-bold text-white mt-14 mb-4 scroll-mt-24">
        API Reference (Backend Surface)
      </h2>

      <h3 id="backend-auth-api" className="text-xl font-semibold text-white mt-8 mb-3">
        Authentication
      </h3>
      <p className="text-slate-200/80 mb-4">
        Sessions are stored in an <code>mcp_session</code> JWT cookie validated
        by <code>requireSession</code>. Auth endpoints support email/password,
        GitHub OAuth, Google OAuth (for future GCP use cases), and AWS SSO
        flows.
      </p>

      <h3 id="backend-deployments-api" className="text-xl font-semibold text-white mt-8 mb-3">
        Deployments
      </h3>
      <p className="text-slate-200/80 mb-4">
        Deployment APIs span agent endpoints (for example
        <code>/agent/wizard</code>, <code>/agent/wizard/ai</code>,
        <code>/agent/pipeline</code>) and low-level
        <code>/deployments</code> routes for creating, updating, querying,
        retrying, rolling back, and dispatching deployments.
      </p>

      <h3 id="backend-logs-api" className="text-xl font-semibold text-white mt-8 mb-3">
        Logs &amp; History
      </h3>
      <p className="text-slate-200/80 mb-4">
        Instead of log files, AutoDeploy uses database tables like
        <code>deployment_logs</code>, <code>pipeline_versions</code>, and
        <code>pipeline_sessions</code> / <code>pipeline_events</code> as the
        primary source of truth. These tables let you reconstruct what is
        deployed and how you got there (user, tool, and agent path).
      </p>
    </div>
  );
}
