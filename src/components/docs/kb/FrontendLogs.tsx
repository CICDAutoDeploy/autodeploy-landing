
export const logsToc = [
  { id: "logs-pipeline-history", label: "Pipeline history" },
  { id: "logs-deployment-history", label: "Deployment history" },
];

export default function FrontendLogs() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">API Reference</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Logs &amp; History</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Logs &amp; History
      </h1>

      <p className="text-slate-200/80 mb-4">
        AutoDeploy keeps track of your pipeline versions and deployments so you have a clear history
        of what changed, when, and by whom. This history is what powers features like rollback and
        gives you confidence when shipping changes.
      </p>

      <h2
        id="logs-pipeline-history"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Pipeline history
      </h2>
      <p className="text-slate-200/80 mb-4">
        In the Dashboard you can see a list of past pipeline versions, each with a timestamp and
        associated commit. Selecting a version shows you the YAML that was deployed at that time.
      </p>
      <p className="text-slate-200/80 mb-4">
        When you generate a new pipeline or roll back to an older one, AutoDeploy records that as a
        new version, so the full story is always available.
      </p>

      <h2
        id="logs-deployment-history"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Deployment history
      </h2>
      <p className="text-slate-200/80 mb-4">
        Every deployment attempt—successful or not—is logged with key details like repository,
        branch, environment, and status. This makes it easy to answer questions like &quot;Did we deploy
        this change to production yet?&quot; or &quot;Which commit broke staging?&quot;
      </p>

      <p className="text-slate-200/80">
        Under the hood, AutoDeploy stores this information in structured records rather than plain
        log files. In the UI, you experience it as a clean timeline of versions and deployments that
        you can browse and act on.
      </p>
    </div>
  );
}