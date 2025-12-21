export default function DocsContentIntro() {
  return (
    <div className="prose prose-invert max-w-none">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex text-sm text-slate-400 mb-6 items-center gap-1"
      >
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">
          Getting Started
        </span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Introduction</span>
      </nav>

      <h1
        id="intro"
        className="text-4xl font-extrabold tracking-tight text-white mb-6"
      >
        Introduction to AutoDeploy
      </h1>
      <p className="text-lg text-slate-200/90 mb-8 leading-relaxed">
        Welcome to the AutoDeploy documentation. AutoDeploy connects your git
        repository to secure CI/CD pipelines in minutes, not days. Learn how to
        configure, automate, and scale your deployment workflows effortlessly.
      </p>

      {/* Beta callout */}
      <div className="bg-emerald-500/10 border-l-4 border-emerald-400 p-4 mb-8 rounded-r-md">
        <div className="flex gap-3">
          <div className="mt-0.5 text-emerald-300">
            <span className="material-symbols-outlined text-base">info</span>
          </div>
          <p className="text-sm text-emerald-50">
            <strong>Public Beta:</strong> AutoDeploy is currently in public
            beta. If you encounter any issues, please contact support at
            <span className="underline"> team@autodeploy.app</span>.
          </p>
        </div>
      </div>

      <h2
        id="what-is-autodeploy"
        className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24"
      >
        What is AutoDeploy?
      </h2>
      <p className="text-slate-200/80 mb-4">
        AutoDeploy is an automation platform designed to simplify the
        complexity of modern DevOps. It acts as a bridge between your source
        code and your cloud infrastructure, handling the heavy lifting of
        containerization, testing, and deployment.
      </p>
      <p className="text-slate-200/80 mb-6">
        Unlike traditional CI/CD tools that require verbose YAML configuration
        from scratch, AutoDeploy intelligently analyzes your repository to
        suggest optimal pipeline configurations.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
        <div className="p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-glass transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/40">
          <div className="w-10 h-10 rounded-full bg-emerald-400/15 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-emerald-300 text-xl">
              bolt
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Zero-Config Start
          </h3>
          <p className="text-sm text-slate-200/80">
            Connect a repo and we&apos;ll detect your stack (Node, Python, Go,
            etc.) automatically.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-glass transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/40">
          <div className="w-10 h-10 rounded-full bg-emerald-400/10 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-emerald-200 text-xl">
              security
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Secure by Default
          </h3>
          <p className="text-sm text-slate-200/80">
            Secrets management and role-based access control are built right
            into the platform.
          </p>
        </div>
      </div>

      <h2
        id="getting-started"
        className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24"
      >
        Getting Started Workflow
      </h2>
      <p className="text-slate-200/80 mb-4">
        The typical workflow for a new user involves four simple steps:
      </p>
      <ol className="list-decimal list-inside space-y-3 text-slate-200/80 marker:text-emerald-300 marker:font-bold">
        <li className="pl-2">
          <strong>Join the waitlist</strong> from the homepage and confirm your
          email to get access keys.
        </li>
        <li className="pl-2">
          <strong>Connect your GitHub account</strong> and select a repository
          you want to deploy.
        </li>
        <li className="pl-2">
          <strong>Answer a few questions</strong> so AutoDeploy can understand
          your specific environment needs (staging vs production).
        </li>
        <li className="pl-2">
          <strong>Review the generated pipeline</strong>. We will open a pull
          request with the generated YAML configuration.
        </li>
      </ol>

      <h2
        id="example-config"
        className="text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24"
      >
        Example Configuration
      </h2>
      <p className="text-slate-200/80 mb-4">
        Below is a sample of the configuration file generated by AutoDeploy for
        a Node.js application.
      </p>

      <div className="relative group not-prose">
        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-slate-900/80 hover:bg-slate-900 text-slate-50 text-xs px-2 py-1 rounded">
            Copy
          </button>
        </div>
        <pre className="bg-slate-950 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed border border-slate-800">
          <code>
{`version: 1.2
project: my-node-app
pipeline:
  build:
    image: node:18-alpine
    commands:
      - npm install
      - npm run build
  test:
    image: node:18-alpine
    commands:
      - npm test
  deploy:
    when:
      branch: main
    target: production
    strategy: rolling`}
          </code>
        </pre>
      </div>
    </div>
  );
}
