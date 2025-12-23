import { useEffect, useState } from "react";
import { mcpListRepos, type McpRepoSummary } from "../../lib/api";

/**
 * Small interactive panel that calls the `repo_reader` MCP v1 tool via
 * mcpListRepos() and shows a few repositories for the current session.
 *
 * This is a docs-only demo and is safe to render even when the backend or
 * session is not available; it will simply show an explanatory message.
 */
export default function McpRepoListDemo() {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<McpRepoSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const list = await mcpListRepos();
        if (cancelled) return;
        setRepos(list);
      } catch (err) {
        if (cancelled) return;
        console.error("McpRepoListDemo error", err);
        setError("Could not list repos via MCP.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="not-prose mt-4 mb-8">
      <div className="rounded-2xl border border-slate-600/80 bg-slate-900/60 px-4 py-3 text-xs text-slate-100 shadow-glass">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-200 text-[11px] font-semibold">
            MCP
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">
              Live example: repo_reader
            </p>

            {loading && (
              <p className="text-slate-300/80">
                Calling <code className="text-[11px]">/mcp/v1/repo_reader</code> to list repos for
                your current session…
              </p>
            )}

            {!loading && error && (
              <p className="text-slate-300/80">
                {error} This is expected if the backend is not running, you&apos;re not signed in, or
                GitHub is not connected.
              </p>
            )}

            {!loading && !error && repos.length === 0 && (
              <p className="text-slate-300/80">
                No repositories were returned. Make sure you&apos;re logged in to AutoDeploy with a GitHub
                connection, then refresh this page to see results.
              </p>
            )}

            {!loading && !error && repos.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-slate-300/90">
                  Showing up to three repositories returned by the <code className="text-[11px]">repo_reader</code>{" "}
                  MCP tool:
                </p>
                <ul className="space-y-1">
                  {repos.slice(0, 3).map((r) => (
                    <li
                      key={r.full_name}
                      className="flex items-center justify-between gap-2 border border-white/5 rounded-md px-2 py-1 bg-black/30"
                    >
                      <span className="truncate text-[11px]">
                        <span className="font-mono text-emerald-200">{r.full_name}</span>
                        <span className="ml-1 text-slate-400">
                          ({r.default_branch})
                        </span>
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                        {r.private ? "private" : "public"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
