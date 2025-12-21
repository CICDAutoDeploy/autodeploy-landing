
export default function BackendEnvironments() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Core Concepts</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Environments (Backend)</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Backend Environments
      </h1>

      <p className="text-slate-200/80 mb-4">
        Environments model where a pipeline is meant to run (for example <code>dev</code>,
        <code>staging</code>, <code>prod</code>). On the backend, environments are simple labels
        attached to deployments and pipeline history.
      </p>

      <h2 id="backend-env-fields" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        How environments are stored
      </h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <code>deployment_logs.environment</code> captures the logical environment for each
          deployment or rollback.
        </li>
        <li>
          <code>/deployments/dispatch</code> may infer an environment from inputs, defaulting to
          something like <code>dev</code> when not specified.
        </li>
      </ul>

      <h2 id="backend-env-workflows" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Workflow paths and environments
      </h2>
      <p className="text-slate-200/80 mb-4">
        The backend treats the workflow path as opaque text. Repos can choose their own naming
        conventions, such as <code>.github/workflows/dev-deploy.yml</code> vs
        <code>.github/workflows/prod-deploy.yml</code>, but the server simply stores whatever path
        the client and adapters provide.
      </p>

      <h2 id="backend-env-flexibility" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        No fixed environment list
      </h2>
      <p className="text-slate-200/80">
        The backend does not enforce a fixed set of environment names. Instead, it records whatever
        the client sends and relies on those values when filtering deployment history or deciding
        which pipelines to roll back.
      </p>
    </div>
  );
}
