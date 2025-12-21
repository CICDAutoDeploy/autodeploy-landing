
/**
 * Frontend-focused, user-facing quickstart that walks through the full
 * wizard from login to first deployment.
 */
export const quickstartToc = [
  { id: "quickstart-sign-in", label: "Sign in or create an account" },
  { id: "quickstart-connect-github", label: "Connect GitHub & pick a repo" },
  { id: "quickstart-design-pipeline", label: "Design your pipeline" },
  { id: "quickstart-secrets-preflight", label: "Secrets & preflight checks" },
  { id: "quickstart-review-history", label: "Review history & deploy" },
  { id: "quickstart-whats-next", label: "What’s next?" },
];

export default function FrontendQuickstart() {
  return (
    <div className="prose prose-invert max-w-none">
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
        <span className="text-slate-100 font-medium">Quickstart</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Quickstart: From Sign-in to First Deployment
      </h1>

      <p className="text-slate-200/80 mb-6">
        This guide walks you through the full AutoDeploy wizard as an end user:
        logging in, connecting GitHub, designing a pipeline, validating
        secrets, and shipping your first deployment.
      </p>

      <h2
        id="quickstart-sign-in"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        1. Sign in or create an account
      </h2>
      <p className="text-slate-200/80 mb-4">
        Start at the <strong>Login</strong> screen. Enter your email and
        password, then either:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <strong>Log in</strong> if you already have an account, or
        </li>
        <li>
          <strong>Create account</strong> to sign up with a new email address.
        </li>
      </ul>
      <p className="text-slate-200/80 mb-4">
        After a successful login or signup you&apos;ll be taken directly to the
        <strong>Connect</strong> step.
      </p>

      <h2
        id="quickstart-connect-github"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        2. Connect GitHub and pick a repository
      </h2>
      <p className="text-slate-200/80 mb-4">
        On the <strong>Connect</strong> screen you link your GitHub account and
        choose which repository and branch AutoDeploy should work with.
      </p>
      <ol className="list-decimal list-inside space-y-3 text-slate-200/80 marker:text-emerald-300 marker:font-bold mb-4">
        <li>
          Click <strong>Connect GitHub</strong> and complete the GitHub OAuth
          flow in a new tab.
        </li>
        <li>
          Back on the Connect screen, click <strong>Re-sync Repos</strong> to
          pull in your latest repositories.
        </li>
        <li>
          Use the dropdowns to pick the repository and branch you want to
          deploy from (for example, <code>main</code> or <code>staging</code>).
        </li>
      </ol>
      <p className="text-slate-200/80 mb-4">
        Once both a repo and branch are selected, the
        <strong>Continue → Configure</strong> button becomes active. Click it to
        move on to pipeline design.
      </p>

      <h2
        id="quickstart-design-pipeline"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        3. Design your pipeline
      </h2>
      <p className="text-slate-200/80 mb-4">
        The <strong>Configure</strong> screen lets you choose a template,
        adjust stages like <em>build</em>, <em>test</em>, and
        <em>deploy</em>, and generate a GitHub Actions workflow.
      </p>
      <ol className="list-decimal list-inside space-y-3 text-slate-200/80 marker:text-emerald-300 marker:font-bold mb-4">
        <li>
          Pick a <strong>template</strong> that matches your app stack (e.g.
          Node, Python).
        </li>
        <li>
          Decide which <strong>stages</strong> you want to run
          (build/test/deploy).
        </li>
        <li>
          Choose a deployment <strong>provider</strong> (AWS, GCP, or Jenkins)
          and fill in any required options.
        </li>
        <li>
          Click <strong>Generate</strong> to have AutoDeploy create a suggested
          GitHub Actions YAML for your selections.
        </li>
      </ol>
      <p className="text-slate-200/80 mb-4">
        You&apos;ll see the generated pipeline in a preview on this page. You can
        keep iterating with the AI assistant (see below) until the YAML looks
        right for your project.
      </p>

      <h3 className="text-xl font-semibold text-white mt-8 mb-3">
        Optional: refine with AI chat
      </h3>
      <p className="text-slate-200/80 mb-4">
        The built-in assistant can help you tweak your pipeline in natural
        language—for example, asking it to &quot;add a Jest test step&quot; or &quot;skip the
        deploy stage for now&quot;. The UI will keep stages and options in sync as
        you chat.
      </p>

      <h2
        id="quickstart-secrets-preflight"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        4. Set up secrets and run preflight checks
      </h2>
      <p className="text-slate-200/80 mb-4">
        Next, move to the <strong>Secrets</strong> step. Here you make sure
        everything your pipeline needs—API keys, cloud roles, and so on—is in
        place before you try to deploy.
      </p>
      <ol className="list-decimal list-inside space-y-3 text-slate-200/80 marker:text-emerald-300 marker:font-bold mb-4">
        <li>
          Select an <strong>environment</strong> such as <code>dev</code>,
          <code>staging</code>, or <code>prod</code>.
        </li>
        <li>
          Review the list of <strong>required secrets</strong>; any missing ones
          will be highlighted.
        </li>
        <li>
          Use the <strong>Add</strong> buttons to enter any missing secret
          values.
        </li>
        <li>
          Click <strong>Run Preflight</strong> to have AutoDeploy verify
          connections and secret presence for the chosen environment.
        </li>
      </ol>
      <p className="text-slate-200/80 mb-4">
        When everything shows as green, the
        <strong>Continue → Dashboard</strong> button becomes available.
      </p>

      <h2
        id="quickstart-review-history"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        5. Review history and ship your first deploy
      </h2>
      <p className="text-slate-200/80 mb-4">
        The <strong>Dashboard</strong> gives you a full view of your pipeline
        and deployment history.
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          Inspect the current YAML and previous versions.
        </li>
        <li>
          Roll back to an older version if you discover a bad change.
        </li>
        <li>
          When you&apos;re ready, click <strong>Commit to GitHub</strong> to open or
          update a workflow file in your repo.
        </li>
      </ul>
      <p className="text-slate-200/80 mb-4">
        AutoDeploy will stream status updates for the deployment so you can see
        progress and any errors in real time.
      </p>

      <h2
        id="quickstart-whats-next"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        What&apos;s next?
      </h2>
      <p className="text-slate-200/80">
        Once your first pipeline is up and running, you can add more
        environments, refine stages, or connect additional repositories. The
        rest of this docs section dives into each step in more detail.
      </p>
    </div>
  );
}
