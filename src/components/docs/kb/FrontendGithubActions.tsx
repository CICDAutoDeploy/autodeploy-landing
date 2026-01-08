
export const githubActionsToc = [
  {
    id: "github-actions-what-autodeploy-creates",
    label: "What AutoDeploy creates",
  },
  { id: "github-actions-authentication", label: "How authentication works" },
  { id: "github-actions-where-to-see-runs", label: "Where to see runs" },
];

export default function FrontendGithubActions() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Integrations</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">GitHub Actions</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        GitHub Actions Integration
      </h1>

      <p className="text-slate-200/80 mb-4">
        AutoDeploy uses GitHub Actions under the hood to run your pipelines. When you connect a
        repository and design a pipeline, AutoDeploy generates or updates a workflow file in your
        repo so GitHub can execute your build, test, and deploy steps.
      </p>

      <h2
        id="github-actions-what-autodeploy-creates"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        What AutoDeploy creates
      </h2>
      <p className="text-slate-200/80 mb-4">
        After you commit from the Dashboard, you&apos;ll see a workflow YAML file under
        <code>.github/workflows/</code> in your GitHub repository. That file is what GitHub Actions
        uses to run your jobs.
      </p>
      <p className="text-slate-200/80 mb-4">
        AutoDeploy keeps this file in sync with the settings you choose in the wizard. If you roll
        back to a previous version from the Dashboard, AutoDeploy updates the workflow file again so
        GitHub runs the older configuration.
      </p>

      <h2
        id="github-actions-authentication"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        How authentication works
      </h2>
      <p className="text-slate-200/80 mb-4">
        When you click <strong>Connect GitHub</strong>, you go through GitHub&apos;s standard OAuth flow.
        This grants AutoDeploy permission to read repositories and create or update workflow files on
        your behalf—without asking you to paste access tokens into the UI.
      </p>
      <p className="text-slate-200/80 mb-4">
        All sensitive tokens are stored securely on the server side and used only when AutoDeploy
        needs to talk to GitHub. The browser never sees your personal access tokens.
      </p>

      <h2
        id="github-actions-where-to-see-runs"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Where to see runs
      </h2>
      <p className="text-slate-200/80 mb-4">
        Each time you commit a pipeline or trigger a deployment, GitHub Actions runs the associated
        workflow. You can:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>Monitor high-level status from the AutoDeploy Dashboard.</li>
        <li>Drill into detailed logs in GitHub under the <strong>Actions</strong> tab.</li>
      </ul>

      <p className="text-slate-200/80">
        Think of AutoDeploy as the control panel for designing and evolving your workflows, and GitHub
        Actions as the engine that actually runs them.
      </p>
    </div>
  );
}
