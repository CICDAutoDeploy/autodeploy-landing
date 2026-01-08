import { useEffect, useState } from "react";
import {
  fetchSystemBanner,
  setSystemBanner,
  clearSystemBanner,
  fetchAdminUsers,
  setUserPro,
  type BannerTone,
  type SystemBannerPayload,
  type AdminUser,
} from "../lib/api";

const TONES: BannerTone[] = ["info", "success", "warning", "error"];

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentBanner, setCurrentBanner] = useState<SystemBannerPayload | null>(null);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<BannerTone>("info");
  const [sticky, setSticky] = useState(true);

  // Load current system banner on mount
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const banner = await fetchSystemBanner();
        if (cancelled) return;
        setCurrentBanner(banner);
        if (banner?.message) {
          setMessage(banner.message);
        }
        if (banner?.tone) {
          setTone(banner.tone);
        }
        if (typeof banner?.sticky === "boolean") {
          setSticky(banner.sticky);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("AdminPage fetchSystemBanner error", err);
          setError("Failed to load current banner.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Load admin user list on mount
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const list = await fetchAdminUsers();
        if (cancelled) return;
        setUsers(list);
      } catch (err) {
        if (!cancelled) {
          console.error("AdminPage fetchAdminUsers error", err);
          setUsersError("Failed to load users.");
        }
      } finally {
        if (!cancelled) setUsersLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const banner = await setSystemBanner({ message, tone, sticky });
      setCurrentBanner(banner);
      window.showToast?.("System banner updated", "success");
    } catch (err) {
      console.error("setSystemBanner error", err);
      setError("Failed to update system banner.");
      window.showToast?.("Failed to update banner", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleClear() {
    setError(null);
    setClearing(true);
    try {
      await clearSystemBanner();
      setCurrentBanner(null);
      window.showToast?.("System banner cleared", "success");
    } catch (err) {
      console.error("clearSystemBanner error", err);
      setError("Failed to clear system banner.");
      window.showToast?.("Failed to clear banner", "error");
    } finally {
      setClearing(false);
    }
  }

  async function handleTogglePro(user: AdminUser) {
    setUsersError(null);
    setUpdatingUserId(user.id);

    const willBePro = !(user.plan === "pro" || user.beta_pro_granted === true);

    try {
      const updated = await setUserPro(user.id, willBePro);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      window.showToast?.(
        willBePro ? "User upgraded to Pro" : "Pro access removed",
        "success",
      );
    } catch (err) {
      console.error("setUserPro error", err);
      setUsersError("Failed to update Pro status.");
      window.showToast?.("Failed to update Pro status", "error");
    } finally {
      setUpdatingUserId(null);
    }
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-24 pb-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-extrabold text-white mb-2">Admin Console</h1>
          <p className="text-sm text-slate-300/80">
            Manage system-wide banners that appear at the top of the AutoDeploy marketing site and app
            shell.
          </p>
        </header>

        {error && (
          <div className="rounded-md border border-red-400/60 bg-red-500/10 px-4 py-2 text-sm text-red-100">
            {error}
          </div>
        )}

        {/* Users & roles */}
        <section className="rounded-2xl border border-white/15 bg-black/40 shadow-glass p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Users &amp; roles</h2>
              <p className="text-xs text-slate-400">
                View recent users and manage Pro access.
              </p>
            </div>
            {usersLoading && (
              <span className="text-xs text-slate-400">Loading…</span>
            )}
          </div>

          {usersError && (
            <div className="rounded-md border border-red-400/60 bg-red-500/10 px-3 py-2 text-xs text-red-100">
              {usersError}
            </div>
          )}

          {!usersLoading && users.length === 0 ? (
            <div className="rounded-md border border-dashed border-slate-600/80 bg-slate-900/40 px-3 py-3 text-sm text-slate-400">
              No users returned. Ensure you are logged in as a system admin.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
              <table className="min-w-full text-left text-xs text-slate-300">
                <thead className="bg-white/5 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  <tr>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">GitHub</th>
                    <th className="px-3 py-2">Role</th>
                    <th className="px-3 py-2">Plan</th>
                    <th className="px-3 py-2">Pro</th>
                    <th className="px-3 py-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const isAdmin = user.role === "SYSTEM_ADMIN";
                    const isPro = user.plan === "pro" || user.beta_pro_granted === true;
                    const isUpdating = updatingUserId === user.id;
                    return (
                      <tr key={user.id} className="border-t border-white/5">
                        <td className="px-3 py-2 whitespace-nowrap text-slate-100">
                          {user.email ?? "—"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-slate-300/80">
                          {user.github_username ?? "—"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {isAdmin ? (
                            <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-200">
                              Admin
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-300">User</span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-[11px] text-slate-300">
                          {user.plan ?? "free"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {isPro ? (
                            <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">
                              Pro
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">Free</span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-right">
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleTogglePro(user)}
                            className={`inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-[11px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                              isPro
                                ? "border-slate-500/70 bg-slate-700/40 text-slate-100 hover:bg-slate-700/70"
                                : "border-amber-400/70 bg-amber-500/10 text-amber-100 hover:bg-amber-500/20"
                            }`}
                          >
                            {isUpdating
                              ? "Updating…"
                              : isPro
                              ? "Remove pro"
                              : "Make pro"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* System banner */}
        <section className="rounded-2xl border border-white/15 bg-black/40 shadow-glass p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Current banner</h2>
              <p className="text-xs text-slate-400">
                This is what users see at the very top of the page when they load the site.
              </p>
            </div>
            {loading && (
              <span className="text-xs text-slate-400">Loading…</span>
            )}
          </div>

          {currentBanner && currentBanner.message ? (
            <div
              className={`rounded-md border px-3 py-2 text-sm flex items-center justify-between ${
                currentBanner.tone === "success"
                  ? "bg-emerald-600/40 border-emerald-400 text-emerald-50"
                  : currentBanner.tone === "warning"
                  ? "bg-amber-500/30 border-amber-300 text-amber-50"
                  : currentBanner.tone === "error"
                  ? "bg-red-600/40 border-red-400 text-red-50"
                  : "bg-slate-800/70 border-slate-500 text-slate-100"
              }`}
            >
              <span className="truncate mr-4">{currentBanner.message}</span>
              <span className="text-[10px] uppercase tracking-wide opacity-80">
                {currentBanner.tone ?? "info"}
              </span>
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-slate-600/80 bg-slate-900/40 px-3 py-3 text-sm text-slate-400">
              No active system banner.
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleClear}
              disabled={clearing || !currentBanner}
              className="inline-flex items-center justify-center rounded-md border border-red-400/60 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-100 hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {clearing ? "Clearing…" : "Clear banner"}
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-white/15 bg-black/40 shadow-glass p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Set system banner</h2>
          <p className="text-xs text-slate-400 mb-4">
            Updating the banner will immediately affect all users on next page load.
          </p>

          <form className="space-y-4" onSubmit={handleSave}>
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
                placeholder="We are currently investigating a technical issue."
                required
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as BannerTone)}
                  className="rounded-md border border-white/15 bg-black/60 px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-400/70"
                >
                  {TONES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <label className="inline-flex items-center gap-2 text-xs text-slate-300 mt-4">
                <input
                  type="checkbox"
                  checked={sticky}
                  onChange={(e) => setSticky(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-slate-500 bg-black/60 text-emerald-400 focus:ring-emerald-400/70"
                />
                <span>Sticky (requires manual dismiss)</span>
              </label>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={saving || !message.trim()}
                className="inline-flex items-center justify-center rounded-md border border-emerald-400/70 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-50 hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving…" : "Save banner"}
              </button>
              <p className="text-[11px] text-slate-400">
                Changes apply globally on the next page load for users.
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
