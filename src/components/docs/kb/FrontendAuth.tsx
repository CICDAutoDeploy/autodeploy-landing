
export const authToc = [
  { id: "auth-signing-in", label: "Signing in" },
  { id: "auth-connecting-github", label: "Connecting GitHub" },
  { id: "auth-other-providers", label: "Other providers" },
];

export default function FrontendAuth() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">API Reference</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Authentication</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Authentication &amp; Accounts
      </h1>

      <p className="text-slate-200/80 mb-4">
        AutoDeploy uses a standard sign-in flow so it knows who you are and which repositories you
        can work with. You can create a local account with email and password, and optionally
        connect external accounts like GitHub.
      </p>

      <h2
        id="auth-signing-in"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Signing in
      </h2>
      <p className="text-slate-200/80 mb-4">
        On the login screen you can either log in to an existing account or create a new one. After
        you&apos;re signed in, AutoDeploy keeps you logged in using a secure session cookie so you don&apos;t
        have to re-enter your credentials on every page.
      </p>

      <h2
        id="auth-connecting-github"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Connecting GitHub
      </h2>
      <p className="text-slate-200/80 mb-4">
        During the Connect step, you&apos;ll be asked to authorize AutoDeploy with GitHub. This happens
        through GitHub&apos;s normal OAuth flow and lets AutoDeploy read your repositories and create or
        update workflow files when you commit from the Dashboard.
      </p>
      <p className="text-slate-200/80 mb-4">
        You&apos;ll see a clear redirect to GitHub and back; you can revoke this access at any time from
        your GitHub account settings.
      </p>

      <h2
        id="auth-other-providers"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Other identity providers
      </h2>
      <p className="text-slate-200/80 mb-4">
        Depending on your setup, administrators may enable additional sign-in options such as Google
        or cloud-specific logins (for example AWS SSO). These give AutoDeploy enough information to
        talk to your cloud on your behalf without exposing long-lived credentials in the browser.
      </p>

      <p className="text-slate-200/80">
        In short, authentication is there so AutoDeploy can safely tie deployments back to a user
        account and keep your repositories and cloud resources protected.
      </p>
    </div>
  );
}