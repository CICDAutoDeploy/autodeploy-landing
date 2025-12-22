import { useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { startGithubLogin, logoutSession } from "../../lib/api";

type AccountMenuProps = {
  displayName: string;
  displayEmail: string;
  initials: string;
  isAuthenticated: boolean;
  isPro: boolean;
  isAdmin: boolean;
  onOpenDocs: () => void;
  onOpenAgent: () => void;
  onOpenAdmin?: () => void;
};

export function AccountMenu({
  displayName,
  displayEmail,
  initials,
  isAuthenticated,
  isPro,
  isAdmin,
  onOpenDocs,
  onOpenAgent,
  onOpenAdmin,
}: AccountMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-0.5 text-slate-100 shadow-sm hover:bg-white/10"
        aria-label="Open account menu"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-slate-50">
          {initials ? (
            <span className="text-xs font-semibold leading-none">{initials}</span>
          ) : (
            <UserIcon className="h-5 w-5" />
          )}
        </span>
      </button>

      {open && (
        <div className="absolute right-3 top-[4.70rem] z-50 w-72 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-white/15 bg-black/80 text-slate-100 shadow-glass backdrop-blur overflow-hidden">
          <div className="px-4 pt-4 pb-3 flex items-center gap-3 border-b border-white/10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-slate-50">
              {initials ? (
                <span className="text-xs font-semibold leading-none">{initials}</span>
              ) : (
                <UserIcon className="h-6 w-6" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate flex items-center gap-2">
                <span>{displayName}</span>
                {isPro && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-200">
                    Pro
                  </span>
                )}
                {isAdmin && (
                  <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-indigo-200">
                    Admin
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 truncate">{displayEmail}</div>
            </div>
          </div>

          {isAuthenticated && (
            <div className="border-b border-white/10">
              <div className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Product
              </div>
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    if (!isPro) {
                      window.showBanner?.(
                        "The deployment agent is a Pro feature. During beta you may be granted access; contact the AutoDeploy team or upgrade when available.",
                        "warning",
                      );
                      return;
                    }
                    onOpenAgent();
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-slate-200 hover:bg-white/5 text-left"
                >
                  {isPro ? "Launch AutoDeploy" : "Launch AutoDeploy (Pro)"}
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            className="w-full px-4 py-2.5 text-sm font-medium text-slate-100 hover:bg-white/5 text-left border-b border-white/10"
          >
            View Profile
          </button>

          <div className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Settings &amp; Security
          </div>
          <div className="py-1">
            <button
              type="button"
              className="w-full px-4 py-2 text-sm text-slate-200 hover:bg-white/5 text-left"
            >
              Settings
            </button>
          </div>

          <div className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Resources
          </div>
          <div className="py-1">
            {isAdmin && onOpenAdmin && (
              <button
                type="button"
                className="w-full px-4 py-2 text-sm text-amber-200 hover:bg-amber-500/10 text-left flex items-center justify-between"
                onClick={() => {
                  onOpenAdmin();
                  setOpen(false);
                }}
              >
                <span>Admin Console</span>
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-amber-200">
                  Admin
                </span>
              </button>
            )}
            <button
              type="button"
              className="w-full px-4 py-2 text-sm text-slate-200 hover:bg-white/5 text-left"
            >
              What's New
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-sm text-slate-200 hover:bg-white/5 text-left"
              onClick={() => {
                onOpenDocs();
                setOpen(false);
              }}
            >
              Documentation
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-sm text-slate-200 hover:bg-white/5 text-left"
            >
              Help &amp; Support
            </button>
          </div>

          <button
            type="button"
            className="w-full px-4 py-2.5 text-sm font-medium text-left text-red-400 hover:bg-red-500/10 border-t border-white/10"
            onClick={() => {
              if (isAuthenticated) {
                void logoutSession();
              } else {
                startGithubLogin();
              }
            }}
          >
            {isAuthenticated ? "Log out" : "Log in"}
          </button>
        </div>
      )}

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
