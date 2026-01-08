
export default function BackendSecrets() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Core Concepts</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Variables &amp; Secrets (Backend)</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Backend Variables &amp; Secrets
      </h1>

      <p className="text-slate-200/80 mb-4">
        Today, secret management is mostly mocked in the frontend and delegated to external
        providers. The backend focuses on long-lived credentials and connections used by agents
        and MCP tools.
      </p>

      <h2 id="backend-secrets-current" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Current behavior
      </h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          The Secrets page in the frontend uses local helper functions (for example in
          <code>client/src/lib/api.ts</code>) to simulate secret reads/writes in a local JSON store.
        </li>
        <li>
          The backend does not yet expose first-class <code>/secrets</code> routes.
        </li>
        <li>
          Real credentials live in backing stores such as the <code>connections</code> table for
          GitHub tokens and AWS-specific tables for SSO metadata.
        </li>
      </ul>

      <h2 id="backend-secrets-storage" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Where sensitive data is stored
      </h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <strong>GitHub access tokens</strong> are stored in <code>connections</code> rows tied to a
          user and provider.</li>
        <li>
          <strong>AWS SSO credentials and metadata</strong> are stored in tables owned by
          <code>auth.aws.js</code> and used by the <code>oidc_adapter</code> MCP tool.</li>
      </ul>

      <h2 id="backend-secrets-future" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Future extensions
      </h2>
      <p className="text-slate-200/80 mb-4">
        A production-ready version of AutoDeploy would likely add:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          First-class <code>/secrets</code> APIs for reading/writing deployment secrets via the
          backend.
        </li>
        <li>
          Provider-backed secret stores (for example GitHub Actions repo/org secrets, GitLab CI
          variables) as the ultimate source of truth.
        </li>
        <li>
          Audit trails that use <code>deployment_logs.metadata</code> to track which variables were
          required or present at deploy time.
        </li>
      </ul>

      <p className="text-slate-200/80">
        For now, treat the backend as the owner of connection-level secrets, and the CI providers as
        the owner of runtime environment variables and workflow secrets.
      </p>
    </div>
  );
}
