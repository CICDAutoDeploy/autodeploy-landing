
export const deploymentsToc = [
  { id: "deployments-triggering", label: "Triggering a deployment" },
  { id: "deployments-status", label: "Deployment status" },
  { id: "deployments-rollbacks-retries", label: "Rollbacks & retries" },
];

export default function FrontendDeployments() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">API Reference</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Deployments</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Deployments &amp; the Dashboard
      </h1>

      <p className="text-slate-200/80 mb-4">
        A deployment is a recorded attempt to run your pipeline against a specific repository,
        branch, and environment. The Dashboard is where you trigger deployments, monitor progress,
        and see what happened over time.
      </p>

      <h2
        id="deployments-triggering"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Triggering a deployment
      </h2>
      <p className="text-slate-200/80 mb-4">
        Once your pipeline and secrets are ready, you can use the
        <strong>Commit to GitHub</strong> button on the Dashboard to push your current YAML as a
        workflow file. This action creates a new deployment entry and kicks off a run in your CI
        provider.
      </p>

      <h2
        id="deployments-status"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Deployment status
      </h2>
      <p className="text-slate-200/80 mb-4">
        Each deployment has a status such as queued, running, succeeded, or failed. The Dashboard
        surfaces this information so you can quickly see whether your last change made it all the
        way to your target environment.
      </p>

      <h2
        id="deployments-rollbacks-retries"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Rollbacks and retries
      </h2>
      <p className="text-slate-200/80 mb-4">
        If a deployment causes issues, you can roll back to a previous pipeline version from the
        history panel. AutoDeploy will commit the older YAML again and record a new deployment entry
        representing that rollback.
      </p>
      <p className="text-slate-200/80 mb-4">
        Similarly, you can retry a failed deployment, which creates another entry so you can
        distinguish between attempts.
      </p>

      <p className="text-slate-200/80">
        Over time, the Dashboard becomes the source of truth for &quot;what was deployed where and when,&quot;
        making it easier to answer questions like &quot;which version is running in staging right now?&quot;
      </p>
    </div>
  );
}