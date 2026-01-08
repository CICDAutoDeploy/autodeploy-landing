
export const pipelinesToc = [
  { id: "pipelines-how-used", label: "How pipelines are used" },
  { id: "pipelines-stages", label: "Stages: build, test, deploy" },
  { id: "pipelines-behind-the-scenes", label: "Behind the scenes" },
];

export default function FrontendPipelines() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Core Concepts</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Pipelines</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">Pipelines</h1>

      <p className="text-slate-200/80 mb-4">
        A pipeline is a series of automated steps that run on your code. In AutoDeploy, those steps
        usually include building your app, running tests, and optionally deploying to an
        environment like dev, staging, or production.
      </p>

      <h2
        id="pipelines-how-used"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        How pipelines are used
      </h2>
      <p className="text-slate-200/80 mb-4">
        When you complete the Configure step, AutoDeploy turns your choices into a GitHub Actions
        workflow in your repository. That workflow defines what should happen when you commit or
        trigger a deployment from the Dashboard.
      </p>

      <h2
        id="pipelines-stages"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Stages: build, test, deploy
      </h2>
      <p className="text-slate-200/80 mb-4">
        Pipelines are broken into stages so you can control how far your code goes:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <strong>Build</strong> – compile, bundle, or otherwise prepare your code for running.
        </li>
        <li>
          <strong>Test</strong> – run automated checks like unit or integration tests.
        </li>
        <li>
          <strong>Deploy</strong> – ship the built artifact to an environment.
        </li>
      </ul>
      <p className="text-slate-200/80 mb-4">
        In the UI you can enable or disable these stages and adjust commands without writing YAML
        by hand. AutoDeploy keeps the underlying workflow in sync for you.
      </p>

      <h2
        id="pipelines-behind-the-scenes"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Behind the scenes
      </h2>
      <p className="text-slate-200/80 mb-4">
        Internally, AutoDeploy analyzes your repository and uses templates to generate a workflow
        that matches your stack and provider. It also keeps track of previous versions so you can
        roll back from the Dashboard if something goes wrong.
      </p>

      <p className="text-slate-200/80">
        You don&apos;t need to learn every detail of GitHub Actions to be effective: think of pipelines
        as reusable recipes. Configure them once in the wizard, then reuse and refine them over
        time.
      </p>
    </div>
  );
}
