
export const cloudsToc = [
  { id: "clouds-choosing-provider", label: "Choosing a provider" },
  { id: "clouds-connecting-accounts", label: "Connecting accounts" },
  { id: "clouds-per-environment-targets", label: "Per-environment targets" },
];

export default function FrontendClouds() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Integrations</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">AWS &amp; GCP</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        AWS &amp; GCP Deployments
      </h1>

      <p className="text-slate-200/80 mb-4">
        AutoDeploy can target cloud providers like AWS and Google Cloud Platform (GCP). You choose a
        provider in the Configure step, and AutoDeploy generates a pipeline that knows how to build
        and deploy to that cloud.
      </p>

      <h2
        id="clouds-choosing-provider"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Choosing a provider
      </h2>
      <p className="text-slate-200/80 mb-4">
        When configuring your pipeline, you&apos;ll pick a provider such as <strong>AWS</strong> or
        <strong>GCP</strong>. This choice affects which options you see (for example, regions or
        services) and how the generated workflow deploys your application.
      </p>

      <h2
        id="clouds-connecting-accounts"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Connecting cloud accounts
      </h2>
      <p className="text-slate-200/80 mb-4">
        Cloud access is typically set up once by an administrator. AutoDeploy integrates with
        identity mechanisms like AWS SSO or GCP service accounts so your pipelines can deploy without
        hard-coding long-lived keys.
      </p>
      <p className="text-slate-200/80 mb-4">
        In the UI you&apos;ll mostly see this as &quot;select a role&quot; or &quot;select a project/region&quot;
        rather than dealing directly with credentials.
      </p>

      <h2
        id="clouds-per-environment-targets"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Per-environment targets
      </h2>
      <p className="text-slate-200/80 mb-4">
        It&apos;s common to have different cloud targets per environment—for example, separate AWS
        accounts or GCP projects for dev and production. AutoDeploy lets you represent those
        differences via environment-specific secrets and options while keeping a single logical
        pipeline.
      </p>

      <p className="text-slate-200/80">
        Over time you can evolve from a simple single-environment setup to a multi-environment
        deployment strategy without having to rewrite your workflows from scratch.
      </p>
    </div>
  );
}