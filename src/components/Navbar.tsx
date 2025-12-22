import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useCurrentUser } from "../lib/currentUser";
import { DocsSearchDialog } from "./navbar/DocsSearchDialog";
import { DesktopNavLinks } from "./navbar/DesktopNavLinks";
import { MobileMenu } from "./navbar/MobileMenu";
import { docsSections, POPULAR_DOCS } from "./navbar/docsConfig";
import { useActiveSection } from "./navbar/useActiveSection";
import { useDocsSearch } from "./navbar/useDocsSearch";
import { getUserDisplay } from "./navbar/userDisplay";
import { BrandButton } from "./navbar/BrandButton";
import { AccountMenu } from "./navbar/AccountMenu";


export type Page = "home" | "privacy" | "terms" | "contact" | "docs";
type NavbarProps = {
  page: Page;
  setPage: (page: Page) => void;
};

export default function Navbar({ page, setPage }: NavbarProps) {
  const user = useCurrentUser();
  const { isAuthenticated, displayName, displayEmail, initials, isPro, isAdmin } =
    getUserDisplay(user);

  const { activeSection, scrollToSection } = useActiveSection({ page });

  const [mobileOpen, setMobileOpen] = useState(false);

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
    // Close the mobile menu when the page changes, if it's currently open.
    if (!mobileOpen) return;
    const t = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(t);
  }, [page]);


  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/15 bg-black/40 backdrop-blur">
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
            <button
              type="button"
              onClick={openDocsSearch}
              className="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-200/80 shadow-sm hover:bg-white/10"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-slate-200">
                <MagnifyingGlassIcon className="h-3.5 w-3.5" />
              </span>
              <span className="whitespace-nowrap">Search docs...</span>
              <span className="ml-1 rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-slate-300">
                Ctrl K
              </span>
            </button>

            <AccountMenu
              displayName={displayName}
              displayEmail={displayEmail}
              initials={initials}
              isAuthenticated={isAuthenticated}
              isPro={isPro}
              isAdmin={isAdmin}
              onOpenDocs={() => setPage("docs")}
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
        open={docsSearchOpen}
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
