import { useState } from "react";
import { fetchPipelineHistory, type PipelineVersion } from "../../lib/api";

/**
 * Docs-only demo that lets a reader query pipeline history for a given repo
 * via the MCP v1 `/mcp/v1/pipeline_history` endpoint.
 */
export default function PipelineHistoryDemo() {
  const [repo, setRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [versions, setVersions] = useState<PipelineVersion[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!repo.trim()) return;

    setError(null);
    setVersions(null);
    setLoading(true);

    try {
      const rows = await fetchPipelineHistory({
        repoFullName: repo.trim(),
        limit: 5,
      });
      setVersions(rows);
    } catch (err) {
      console.error("PipelineHistoryDemo error", err);
      setError("Failed to load pipeline history.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="not-prose mt-4 mb-8">
      <div className="rounded-2xl border border-slate-600/80 bg-slate-900/60 px-4 py-3 text-xs text-slate-100 shadow-glass">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300 mb-2">
          Live example: pipeline_history
        </p>
        <p className="text-slate-300/80 mb-3">
          Enter a repository in <code className="text-[11px]">owner/repo</code> format and AutoDeploy
          will query stored pipeline versions via
          <code className="ml-1 text-[11px]">/mcp/v1/pipeline_history</code>.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-3">
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="owner/repo (must have at least one committed pipeline)"
            className="flex-1 rounded-md border border-white/15 bg-black/40 px-2 py-1.5 text-[11px] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
          />
          <button
            type="submit"
            disabled={loading || !repo.trim()}
            className="inline-flex items-center justify-center rounded-md border border-emerald-400/70 bg-emerald-500/20 px-3 py-1.5 text-[11px] font-semibold text-emerald-50 hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading…" : "Load history"}
          </button>
        </form>

        {error && (
          <p className="text-slate-300/80 mb-1">
            {error} This is expected if you&apos;re not signed in, GitHub access is missing, or no
            pipeline history exists yet for that repo.
          </p>
        )}

        {versions && (
          <div className="space-y-1.5">
            {versions.length === 0 ? (
              <p className="text-slate-300/80">
                No pipeline versions were found for this repo/branch/path combination.
              </p>
            ) : (
              <>
                <p className="text-slate-300/90">
                  Showing the {versions.length} most recent versions stored in
                  <code className="ml-1 text-[11px]">pipeline_versions</code>.
                </p>
                <ul className="space-y-1 max-h-40 overflow-y-auto pr-1">
                  {versions.map((v) => (
                    <li
                      key={v.id}
                      className="border border-white/5 rounded-md px-2 py-1 bg-black/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1 text-[11px]">
                          <span className="font-mono text-emerald-200 truncate max-w-[14rem]">
                            {v.workflow_path}
                          </span>
                          <span className="text-slate-400">on</span>
                          <span className="font-mono text-slate-200">{v.branch}</span>
                          <span className="text-slate-500">·</span>
                          <span className="text-slate-400">source:</span>
                          <span className="text-slate-200">{v.source}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 truncate">
                          {new Date(v.created_at).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
