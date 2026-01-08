import { useEffect, useId, useRef, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { startGithubLogin, logoutSession, IS_DEMO_MODE } from "../../lib/api";

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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onMouseDown = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (rootRef.current.contains(e.target as Node)) return;
      setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // Make keyboard navigation sane: put focus into the menu.
    firstItemRef.current?.focus();
  }, [open]);

  const menuItemClass =
    "w-full px-4 py-2 text-sm text-slate-200 hover:bg-white/5 text-left";

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-0.5 text-slate-100 shadow-sm hover:bg-white/10"
        aria-label="Open account menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
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
        <div
          id={menuId}
          role="menu"
          aria-label="Account menu"
          className="absolute right-0 top-full mt-2 z-50 w-72 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-white/15 bg-black/80 text-slate-100 shadow-glass backdrop-blur overflow-hidden"
        >
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
                {!IS_DEMO_MODE && isPro && (
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-emerald-200">
                    Pro
                  </span>
                )}
                {!IS_DEMO_MODE && isAdmin && (
                  <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-indigo-200">
                    Admin
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 truncate">
                {IS_DEMO_MODE ? "App access coming soon" : displayEmail}
              </div>
            </div>
          </div>

          {IS_DEMO_MODE ? (
            <div className="px-4 py-3 space-y-2 text-sm text-slate-200">
              <p>The full AutoDeploy app isn&apos;t live yet.</p>
              <p className="text-xs text-slate-400">
                In demo mode you can explore the docs and marketing experience, but login and
                account actions are disabled.
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-emerald-400/70 bg-emerald-500/20 px-3 py-1.5 text-[11px] font-semibold text-emerald-50 hover:bg-emerald-500/30"
                onClick={() => {
                  onOpenDocs();
                  setOpen(false);
                }}
              >
                View docs
              </button>
            </div>
          ) : (
            <>
          {isAuthenticated && (
            <div className="border-b border-white/10">
              <div className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Product
              </div>
              <div className="py-1">
                <button
                  ref={firstItemRef}
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    if (!isPro) {
                      window.showBanner?.(
                        "The deployment agent is a Pro feature. During beta you may be granted access; contact the AutoDeploy team or upgrade when available.",
                        "warning",
                      );
                      setOpen(false);
                      return;
                    }
                    onOpenAgent();
                    setOpen(false);
                  }}
                  className={menuItemClass}
                >
                  {isPro ? "Launch AutoDeploy" : "Launch AutoDeploy (Pro)"}
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            role="menuitem"
            className="w-full px-4 py-2.5 text-sm font-medium text-slate-100 hover:bg-white/5 text-left border-b border-white/10"
            onClick={() => setOpen(false)}
            ref={!isAuthenticated ? firstItemRef : undefined}
          >
            View Profile
          </button>

          <div className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Settings &amp; Security
          </div>
          <div className="py-1">
            <button
              type="button"
              role="menuitem"
              className={menuItemClass}
              onClick={() => setOpen(false)}
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
                role="menuitem"
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
              role="menuitem"
              className={menuItemClass}
              onClick={() => setOpen(false)}
            >
              What's New
            </button>
            <button
              type="button"
              role="menuitem"
              className={menuItemClass}
              onClick={() => {
                onOpenDocs();
                setOpen(false);
              }}
            >
              Documentation
            </button>
            <button
              type="button"
              role="menuitem"
              className={menuItemClass}
              onClick={() => setOpen(false)}
            >
              Help &amp; Support
            </button>
          </div>

          <button
            type="button"
            role="menuitem"
            className="w-full px-4 py-2.5 text-sm font-medium text-left text-red-400 hover:bg-red-500/10 border-t border-white/10"
            onClick={() => {
              setOpen(false);
              if (IS_DEMO_MODE) {
                // In demo mode we do not expose real auth flows.
                return;
              }
              if (isAuthenticated) {
                void logoutSession();
              } else {
                startGithubLogin();
              }
            }}
          >
            {IS_DEMO_MODE ? "Sign-in disabled (demo)" : isAuthenticated ? "Log out" : "Log in"}
          </button>
            </>
          )}
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
    </div>
  );
}
