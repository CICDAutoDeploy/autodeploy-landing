
export default function BackendInstallation() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav aria-label="Breadcrumb" className="flex text-sm text-slate-400 mb-6 items-center gap-1">
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">Getting Started</span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">Backend Installation</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        Backend Installation
      </h1>

      <p className="text-slate-200/80 mb-4">
        The backend under <code>server/</code> is an Express + Postgres + MCP service that powers
        the AutoDeploy wizard. This page focuses on how to get that backend running locally.
      </p>

      <h2 id="backend-installation" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Install dependencies
      </h2>
      <p className="text-slate-200/80 mb-4">
        From the monorepo root (for example <code>AutoDeploy/</code>):
      </p>
      <pre className="bg-slate-950 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed border border-slate-800">
        <code>npm install</code>
      </pre>

      <h2 id="backend-client-install" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Optional: install client deps
      </h2>
      <p className="text-slate-200/80 mb-4">
        If you also want to run the React client in the same repo, install its dependencies too:
      </p>
      <pre className="bg-slate-950 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed border border-slate-800">
        <code>{`cd client
npm install`}</code>
      </pre>

      <h2 id="backend-db-setup" className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-24">
        Database setup
      </h2>
      <p className="text-slate-200/80 mb-4">
        Provision a Postgres instance (local Docker, cloud provider, or services like Supabase) and
        create a database for AutoDeploy. Then set the <code>DATABASE_URL</code> environment
        variable so <code>server/db.js</code> can connect using a shared <code>pg.Pool</code>.
      </p>

      <p className="text-slate-200/80 mb-2 font-semibold">Example:</p>
      <pre className="bg-slate-950 text-slate-100 rounded-lg p-4 overflow-x-auto text-sm font-mono leading-relaxed border border-slate-800 mb-6">
        <code>{`export DATABASE_URL=postgres://user:password@localhost:5432/autodeploy`}</code>
      </pre>

      <p className="text-slate-200/80">
        With dependencies installed and Postgres reachable via <code>DATABASE_URL</code>, you&apos;re
        ready to configure and run the backend server.
      </p>
    </div>
  );
}
