
export const environmentsToc = [
  { id: "env-why-multiple", label: "Why multiple environments" },
  { id: "env-where-show-up", label: "Where they show up" },
  { id: "env-how-used", label: "How names are used" },
];

export default function FrontendEnvironments() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Core Concepts</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Environments</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">Environments</h1>

      <p className="text-slate-200/80 mb-4">
        Environments represent where your pipeline runs. Common examples are <code>dev</code>,
        <code>staging</code>, and <code>production</code>. AutoDeploy lets you target different
        environments without duplicating your entire pipeline.
      </p>

      <h2
        id="env-why-multiple"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Why use multiple environments?
      </h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <strong>Dev</strong> – safe place to experiment and validate changes.
        </li>
        <li>
          <strong>Staging</strong> – a pre-production environment that closely mirrors production.
        </li>
        <li>
          <strong>Production</strong> – where real users and traffic are served.
        </li>
      </ul>
      <p className="text-slate-200/80 mb-4">
        This separation lets you catch issues early without putting your live users at risk.
      </p>

      <h2
        id="env-where-show-up"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Where environments show up in AutoDeploy
      </h2>
      <p className="text-slate-200/80 mb-4">
        You&apos;ll interact with environments in two main places:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <strong>Secrets</strong> – choose an environment to see which secrets are required and
          whether they&apos;re set.
        </li>
        <li>
          <strong>Dashboard</strong> – review deployments and history for a specific environment.
        </li>
      </ul>

      <h2
        id="env-how-used"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        How AutoDeploy uses environment names
      </h2>
      <p className="text-slate-200/80 mb-4">
        Environment names are treated as labels that travel with your pipeline and deployments.
        When you run a deployment from the Dashboard, AutoDeploy records which environment you
        targeted so you can filter history later.
      </p>

      <p className="text-slate-200/80">
        You&apos;re free to use any naming scheme that fits your team (for example
        <code>preview</code> or <code>eu-prod</code>). AutoDeploy doesn&apos;t enforce a fixed list—it
        simply helps you keep deployments for each environment organized and easy to roll back.
      </p>
    </div>
  );
}
