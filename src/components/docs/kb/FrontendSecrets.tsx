
export const secretsToc = [
  { id: "secrets-per-environment", label: "Secrets per environment" },
  { id: "secrets-adding-updating", label: "Adding or updating" },
  { id: "secrets-preflight", label: "Preflight checks" },
];

export default function FrontendSecrets() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Core Concepts</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Variables &amp; Secrets</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Variables &amp; Secrets
      </h1>

      <p className="text-slate-200/80 mb-4">
        Pipelines often need access to sensitive values—API keys, database URLs, cloud
        credentials—that you don&apos;t want to hard-code in your repository. AutoDeploy treats these as
        <strong>secrets</strong> and helps you verify they&apos;re configured before you deploy.
      </p>

      <h2
        id="secrets-per-environment"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Secrets per environment
      </h2>
      <p className="text-slate-200/80 mb-4">
        In the <strong>Secrets</strong> step, you choose an environment (dev, staging, prod) and see a
        checklist of required secrets for that environment. For example, production might require a
        different database URL or API token than staging.
      </p>

      <h2
        id="secrets-adding-updating"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Adding or updating a secret
      </h2>
      <ol className="list-decimal list-inside space-y-3 text-slate-200/80 marker:text-emerald-300 marker:font-bold mb-4">
        <li>Select an environment in the dropdown.</li>
        <li>Find a secret that&apos;s marked as missing or needs attention.</li>
        <li>Click <strong>Add</strong> (or <strong>Edit</strong>) to open the secret modal.</li>
        <li>Paste the value in the input field and save.</li>
      </ol>
      <p className="text-slate-200/80 mb-4">
        Values are never shown in plain text after you save them. The UI only indicates whether a
        secret is present or not.
      </p>

      <h2
        id="secrets-preflight"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Preflight checks
      </h2>
      <p className="text-slate-200/80 mb-4">
        When you click <strong>Run Preflight</strong>, AutoDeploy validates that your secrets and
        connections look healthy for the selected environment. The goal is to catch misconfigurations
        before you ship a broken deployment.
      </p>
      <p className="text-slate-200/80 mb-4">
        Once all preflight checks are green, you&apos;re ready to move on to the Dashboard and commit
        your pipeline.
      </p>

      <p className="text-slate-200/80">
        In the background, AutoDeploy works with your CI provider&apos;s secret storage so that
        credentials stay in the right place—close to your workflows, but out of your source code.
      </p>
    </div>
  );
}
