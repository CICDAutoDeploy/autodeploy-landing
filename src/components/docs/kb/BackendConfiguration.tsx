
export default function BackendConfiguration() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Getting Started</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Backend Configuration</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Backend Configuration
      </h1>

      <p className="text-slate-200/80 mb-4">
        Backend behavior is controlled primarily via environment variables consumed in
        <code>server/db.js</code>, <code>server/src/config/env.js</code>, and the auth and cloud
        integration routes.
      </p>

      <h2 id="backend-config-core" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Core backend / database
      </h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80">
        <li>
          <code>DATABASE_URL</code> &mdash; Postgres connection string used by the shared
          <code>pg.Pool</code> in <code>server/db.js</code>.
        </li>
        <li>
          <code>DB_POOL_MAX</code> &mdash; optional pool size (default <code>8</code>).
        </li>
      </ul>

      <h2 id="backend-config-mcp" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        MCP agent / mock MCP
      </h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80">
        <li>
          <code>MCP_URL</code> &mdash; URL of the MCP core or mock server (for example
          <code>http://localhost:7070</code>).
        </li>
        <li>
          <code>MCP_API_KEY</code> &mdash; bearer token the agent sends to MCP.
        </li>
        <li>
          <code>NODE_ENV</code> &mdash; standard Node environment flag (affects logging and other
          behavior).
        </li>
      </ul>

      <h2 id="backend-config-auth" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Auth &amp; sessions
      </h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80">
        <li>
          <code>JWT_SECRET</code> &mdash; secret used by auth routes to sign the <code>mcp_session</code>
          JWT cookie.
        </li>
        <li>
          <code>GITHUB_CLIENT_ID</code>, <code>GITHUB_CLIENT_SECRET</code> &mdash; GitHub OAuth
          application credentials.
        </li>
        <li>
          <code>GITHUB_OAUTH_REDIRECT_URI</code> &mdash; callback URL GitHub redirects to; must match
          the GitHub app configuration.
        </li>
        <li>
          <code>GITHUB_OAUTH_SCOPES</code> &mdash; scopes requested from GitHub (defaults to
          <code>repo workflow read:user user:email</code>).
        </li>
        <li>
          <code>FRONTEND_URL</code> &mdash; URL to redirect to after successful GitHub OAuth (defaults
          to <code>http://localhost:5173/connect</code>).
        </li>
      </ul>

      <h2 id="backend-config-cloud" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Cloud providers
      </h2>
      <p className="text-slate-200/80 mb-4">
        Cloud-specific configuration is used by adapters like <code>auth.aws.js</code>,
        <code>oidc_adapter</code>, and <code>gcp_adapter</code>.
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-6">
        <li>
          AWS &mdash; values such as <code>AWS_REGION</code> and SSO configuration
          (<code>AWS_SSO_START_URL</code>, etc.) are required for AWS SSO / OIDC flows.
        </li>
        <li>
          GCP &mdash; project and regional settings (for example <code>projectId</code>,
          <code>region</code>, <code>artifactRepo</code>) are often provided in request bodies and
          have sane defaults in <code>gcp_adapter</code>.
        </li>
      </ul>

      <p className="text-slate-200/80">
        Once these variables are set, the backend will start with a working database connection,
        GitHub OAuth, and MCP integration ready for the wizard to use.
      </p>
    </div>
  );
}
