import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useCurrentUser } from "../lib/currentUser";
import { openAgentApp } from "../lib/api";
import { DocsSearchDialog } from "./navbar/DocsSearchDialog";
import { DocsSearchMenu } from "./navbar/DocsSearchMenu";
import { DesktopNavLinks } from "./navbar/DesktopNavLinks";
import { MobileMenu } from "./navbar/MobileMenu";
import { docsSections, POPULAR_DOCS } from "./navbar/docsConfig";
import { useActiveSection } from "./navbar/useActiveSection";
import { useDocsSearch } from "./navbar/useDocsSearch";
import { getUserDisplay } from "./navbar/userDisplay";
import { BrandButton } from "./navbar/BrandButton";
import { AccountMenu } from "./navbar/AccountMenu";


export type Page = "home" | "privacy" | "terms" | "contact" | "docs" | "admin";
type NavbarProps = {
  page: Page;
  setPage: (page: Page) => void;
  /**
   * When true, the navbar is offset to sit below the global banner.
   */
  hasBanner?: boolean;
};

export default function Navbar({ page, setPage, hasBanner = false }: NavbarProps) {
  const user = useCurrentUser();
  const { isAuthenticated, displayName, displayEmail, initials, isPro, isAdmin } =
    getUserDisplay(user);

  const { activeSection, scrollToSection } = useActiveSection({ page });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false,
  );
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const {
    docsSearchOpen,
    docsSearchQuery,
    setDocsSearchQuery,
    recentDocs,
    filteredDocs,
    openDocsSearch,
    closeDocsSearch,
    navigateToDoc,
  } = useDocsSearch({ page, setPage });
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    setIsDesktop(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!docsSearchOpen || !isDesktop) return;
    const handleClickAway = (e: MouseEvent) => {
      if (!popoverRef.current) return;
      if (popoverRef.current.contains(e.target as Node)) return;
      closeDocsSearch();
    };
    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [docsSearchOpen, isDesktop, closeDocsSearch]);


  useEffect(() => {
    // Close the mobile menu when the page changes, if it's currently open.
    if (!mobileOpen) return;
    const t = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(t);
  }, [page]);


  return (
    <nav
      className={`fixed inset-x-0 border-b border-white/15 bg-black/40 backdrop-blur z-40 ${
        hasBanner ? "top-10" : "top-0"
      }`}
    >
      <div className="w-full px-3 sm:px-4 lg:px-8 py-1 md:py-2">
        <div className="w-full flex items-center gap-3 md:gap-4 rounded-full border border-white/15 bg-white/5 backdrop-blur shadow-glass px-3 lg:px-6 py-1 md:py-1.5">
          {/* Left: logo / brand */}
          <div className="flex-1 flex items-center min-w-0">
            <BrandButton page={page} setPage={setPage} />
          </div>

        {/* Center: primary navigation (desktop) / search (mobile) */}
        <div className="flex items-center justify-center flex-none lg:flex-1 min-w-0">
          <DesktopNavLinks
            page={page}
            activeSection={activeSection}
            setPage={setPage}
            scrollToSection={scrollToSection}
          />

          {/* Mobile search pill */}
            <button
              type="button"
              onClick={openDocsSearch}
              className="lg:hidden inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-200/80 shadow-sm"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-slate-200">
                <MagnifyingGlassIcon className="h-3.5 w-3.5" />
              </span>
              <span className="whitespace-nowrap">Search docs...</span>
            </button>
          </div>

          {/* Right: docs search (desktop) + account menu + mobile toggle */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3 relative">
            <div className="hidden lg:block relative" ref={popoverRef}>
              <button
                type="button"
                onClick={() => {
                  if (docsSearchOpen) {
                    closeDocsSearch();
                  } else {
                    openDocsSearch();
                  }
                }}
                aria-haspopup="dialog"
                aria-expanded={docsSearchOpen}
                className={`inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs shadow-sm hover:bg-white/10 ${
                  docsSearchOpen ? "bg-white/10 text-slate-100" : "bg-white/5 text-slate-200/80"
                }`}
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-slate-200">
                  <MagnifyingGlassIcon className="h-3.5 w-3.5" />
                </span>
                <span className="whitespace-nowrap">Search docs...</span>
              </button>

              {docsSearchOpen && isDesktop && (
                <div className="absolute right-0 mt-2 w-[420px] z-50">
                  <DocsSearchMenu
                    query={docsSearchQuery}
                    onQueryChange={setDocsSearchQuery}
                    recentDocs={recentDocs}
                    popularDocs={POPULAR_DOCS}
                    filteredDocs={filteredDocs}
                    onSelectDoc={navigateToDoc}
                    onClose={closeDocsSearch}
                    inputId="docs-search-inline-input"
                  />
                </div>
              )}
            </div>

            <a
              href="https://github.com/oslabs-beta/AutoDeploy"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="View AutoDeploy on GitHub"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-1.5 text-slate-200/80 hover:text-white hover:bg-white/10 shadow-sm"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path
                  fill="currentColor"
                  d="M12 .297a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.21.69.82.57A12 12 0 0 0 12 .297z"
                />
              </svg>
            </a>

            <AccountMenu
              displayName={displayName}
              displayEmail={displayEmail}
              initials={initials}
              isAuthenticated={isAuthenticated}
              isPro={isPro}
              isAdmin={isAdmin}
              onOpenDocs={() => setPage("docs")}
              onOpenAgent={openAgentApp}
              onOpenAdmin={isAdmin ? () => setPage("admin") : undefined}
            />

            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="lg:hidden p-2 rounded-md hover:bg-white/10 text-slate-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile / desktop docs search dialog */}
      <DocsSearchDialog
        open={docsSearchOpen && !isDesktop}
        query={docsSearchQuery}
        onQueryChange={setDocsSearchQuery}
        recentDocs={recentDocs}
        popularDocs={POPULAR_DOCS}
        filteredDocs={filteredDocs}
        onSelectDoc={navigateToDoc}
        onClose={closeDocsSearch}
      />

      <MobileMenu
        page={page}
        mobileOpen={mobileOpen}
        activeSection={activeSection}
        setPage={setPage}
        scrollToSection={scrollToSection}
        docsSections={docsSections}
        setMobileOpen={setMobileOpen}
      />
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

    </nav>
  );
}
