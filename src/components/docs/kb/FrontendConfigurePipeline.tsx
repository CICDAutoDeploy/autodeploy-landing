
/**
 * User-facing explanation of the Configure step: how to choose a template,
 * stages, provider, and optionally use the AI wizard.
 */
export const configureToc = [
  { id: "configure-choosing-template", label: "Choosing a template" },
  { id: "configure-enabling-stages", label: "Enabling stages" },
  { id: "configure-selecting-provider", label: "Selecting a provider" },
  { id: "configure-generating-workflow", label: "Generating the workflow" },
  { id: "configure-ai-wizard", label: "Using the AI wizard" },
  { id: "configure-ready-to-move-on", label: "When you’re ready to move on" },
];

export default function FrontendConfigurePipeline() {
  return (
    <div className="prose prose-invert max-w-none">
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
        <span className="text-slate-100 font-medium">Configure</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Configure: Designing Your Pipeline
      </h1>

      <p className="text-slate-200/80 mb-6">
        After you&apos;ve connected a repository and branch, the
        <strong>Configure</strong> step is where you tell AutoDeploy what your
        pipeline should do. You choose a template, enable stages like build,
        test, and deploy, and generate a GitHub Actions workflow file.
      </p>

      <h2
        id="configure-choosing-template"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Choosing a template
      </h2>
      <p className="text-slate-200/80 mb-4">
        Templates give you sensible defaults for common stacks (such as Node or
        Python) so you don&apos;t have to start from an empty YAML file.
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          Pick the template that matches your application type.
        </li>
        <li>
          Review the suggested install, test, and build commands; you can adjust
          them at any time.
        </li>
      </ul>

      <h2
        id="configure-enabling-stages"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Enabling stages
      </h2>
      <p className="text-slate-200/80 mb-4">
        Pipelines in AutoDeploy are broken into stages. The most common are:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <strong>Build</strong> – compile or bundle your code.
        </li>
        <li>
          <strong>Test</strong> – run unit or integration tests.
        </li>
        <li>
          <strong>Deploy</strong> – ship your build to an environment.
        </li>
      </ul>
      <p className="text-slate-200/80 mb-4">
        Use the toggles or checkboxes in the UI to decide which stages you want
        to include. For example, you might start with just build and test while
        you&apos;re iterating, then add deploy once you&apos;re confident.
      </p>

      <h2
        id="configure-selecting-provider"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Selecting a provider
      </h2>
      <p className="text-slate-200/80 mb-4">
        AutoDeploy can target different backends like AWS, GCP, or Jenkins. On
        the Configure screen you&apos;ll pick a <strong>provider</strong> and fill
        in any extra details that provider needs (such as regions, services, or
        deployment targets).
      </p>
      <p className="text-slate-200/80 mb-4">
        If you choose AWS, AutoDeploy can help discover roles that are
        available to deploy with. For many users, leaving the defaults in place
        is enough to get started.
      </p>

      <h2
        id="configure-generating-workflow"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Generating the workflow
      </h2>
      <p className="text-slate-200/80 mb-4">
        Once your template, stages, and provider look correct, click
        <strong>Generate</strong>. AutoDeploy will:
      </p>
      <ol className="list-decimal list-inside space-y-3 text-slate-200/80 marker:text-emerald-300 marker:font-bold mb-4">
        <li>Create a draft GitHub Actions YAML file based on your inputs.</li>
        <li>Show you the generated pipeline in a readable preview.</li>
        <li>
          Keep the pipeline attached to the repo and branch you chose in the
          Connect step.
        </li>
      </ol>
      <p className="text-slate-200/80 mb-4">
        At this point you haven&apos;t committed anything to GitHub yet—you&apos;re
        still just working with a draft that can be regenerated or edited.
      </p>

      <h2
        id="configure-ai-wizard"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Using the AI wizard (optional)
      </h2>
      <p className="text-slate-200/80 mb-4">
        If you&apos;re not sure exactly how your pipeline should look, the
        <strong>AI wizard</strong> can help. You describe what you&apos;re trying to
        do in plain language and let AutoDeploy make suggestions.
      </p>
      <ol className="list-decimal list-inside space-y-3 text-slate-200/80 marker:text-emerald-300 marker:font-bold mb-4">
        <li>
          Type a message like &quot;Run tests on every push, but only deploy from
          main&quot; into the chat box.
        </li>
        <li>
          The wizard proposes changes to stages and pipeline options behind the
          scenes.
        </li>
        <li>
          It updates the draft YAML so you can see the final effect.
        </li>
      </ol>
      <p className="text-slate-200/80 mb-4">
        You remain in control: you can always tweak options manually or
        regenerate from scratch if the suggestion doesn&apos;t match what you want.
      </p>

      <h2
        id="configure-ready-to-move-on"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        When you&apos;re ready to move on
      </h2>
      <p className="text-slate-200/80 mb-4">
        Before heading to the <strong>Secrets</strong> step, make sure you&apos;re
        comfortable with the draft YAML and the stages you&apos;ve chosen. You can
        always return to Configure later to refine your pipeline, but having a
        good initial setup will make preflight checks and deployments smoother.
      </p>
    </div>
  );
}
