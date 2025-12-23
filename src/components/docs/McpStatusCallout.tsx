import { useEffect, useState } from "react";
import { fetchMcpStatus, type McpStatusPayload } from "../../lib/api";

/**
 * Small, live callout used in docs to show the current MCP v1 status
 * as implemented by the backend under /mcp/v1.
 *
 * This is read-only and degrades gracefully when MCP is unavailable
 * (for example, when the backend is not running locally).
 */
export default function McpStatusCallout() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<McpStatusPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const result = await fetchMcpStatus();
        if (cancelled) return;

        if (!result) {
          setError("MCP v1 status is not available.");
        } else {
          setStatus(result);
        }
      } catch (err) {
        if (cancelled) return;
        console.error("McpStatusCallout error", err);
        setError("Failed to load MCP status.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="not-prose mb-8">
      <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 shadow-glass">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200 text-sm font-semibold">
            MCP
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-semibold text-emerald-50">
                Live MCP v1 status
              </p>
              {status?.deprecated && (
                <span className="inline-flex items-center rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-100">
                  Deprecated
                </span>
              )}
            </div>

            {loading && (
              <p className="text-xs text-emerald-100/80">
                Checking /mcp/v1/status on the backend...
              </p>
            )}

            {!loading && error && (
              <p className="text-xs text-emerald-100/80">
                {error} This is expected if the AutoDeploy backend is not running or you&apos;re
                viewing the static marketing site without a session.
              </p>
            )}

            {!loading && !error && status && (
              <div className="space-y-1 text-xs text-emerald-50/90">
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="uppercase tracking-wide">{status.status}</span>{" "}
                  <span className="opacity-70">(version {status.version})</span>
                </p>
                <p>
                  <span className="font-semibold">Registered tools:</span>{" "}
                  {status.tools_registered.length === 0 ? (
                    <span className="opacity-80">none</span>
                  ) : (
                    <span className="opacity-90">
                      {status.tools_registered.slice(0, 4).join(", ")}
                      {status.tools_registered.length > 4 && (
                        <span>
                          {" "}+ and {status.tools_registered.length - 4} more
                        </span>
                      )}
                    </span>
                  )}
                </p>
                {status.deprecated && status.successor && (
                  <p className="opacity-80">
                    v1 is kept for backwards compatibility. The backend also exposes v2 under
                    <code className="ml-1 text-[11px] bg-emerald-900/40 px-1.5 py-0.5 rounded">
                      {status.successor.base}
                    </code>
                    .
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
