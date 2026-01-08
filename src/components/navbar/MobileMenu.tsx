import type { Page } from "../Navbar";
import type { DocSlug } from "../docs/types";

type Section = {
  title: string;
  items: { slug: DocSlug; label: string }[];
};

type MobileMenuProps = {
  page: Page;
  mobileOpen: boolean;
  activeSection: "home" | "features" | "how" | "team";
  setPage: (page: Page) => void;
  scrollToSection: (id: string) => void;
  docsSections: Section[];
  setMobileOpen: (open: boolean) => void;
};

export function MobileMenu({
  page,
  mobileOpen,
  activeSection,
  setPage,
  scrollToSection,
  docsSections,
  setMobileOpen,
}: MobileMenuProps) {
  return (
    <div
      className={`lg:hidden fixed top-16 right-4 z-40 rounded-2xl w-fit min-w-[1rem] overflow-hidden border border-white/15 bg-black/60 shadow-glass backdrop-blur transform transition-all duration-300 ease-out ${
        mobileOpen
          ? "translate-x-0 opacity-100"
          : "translate-x-8 opacity-0 pointer-events-none"
      }`}
    >
      {page === "docs" ? (
        <div className="px-6 py-5 flex flex-col gap-5 text-sm font-medium items-end text-right text-slate-100 bg-white/5">
          {docsSections.map((section) => (
            <div key={section.title} className="w-full">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        window.setDocSlug?.(item.slug);
                      }}
                      className="block w-full text-right px-2 py-1.5 rounded-md text-slate-200/90 hover:text-white hover:bg-slate-800/80"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 py-5 flex flex-col gap-4 text-sm font-medium items-end text-right text-slate-100 whitespace-nowrap">
          <button
            onClick={() => {
              setMobileOpen(false);
              if (page !== "home") {
                setPage("home");
                setTimeout(
                  () => window.scrollTo({ top: 0, behavior: "smooth" }),
                  0,
                );
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeSection === "home" && page === "home"
                ? "text-white bg-white/20"
                : "text-slate-200/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => {
              setMobileOpen(false);
              if (page !== "home") {
                setPage("home");
                setTimeout(() => scrollToSection("features"), 0);
              } else {
                scrollToSection("features");
              }
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeSection === "features" && page === "home"
                ? "text-white bg-white/20"
                : "text-slate-200/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Features
          </button>

          <button
            onClick={() => {
              setMobileOpen(false);
              if (page !== "home") {
                setPage("home");
                setTimeout(() => scrollToSection("how"), 0);
              } else {
                scrollToSection("how");
              }
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeSection === "how" && page === "home"
                ? "text-white bg-white/20"
                : "text-slate-200/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Docs
          </button>

          <button
            onClick={() => {
              setMobileOpen(false);
              if (page !== "home") {
                setPage("home");
                setTimeout(() => scrollToSection("team"), 0);
              } else {
                scrollToSection("team");
              }
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeSection === "team" && page === "home"
                ? "text-white bg-white/20"
                : "text-slate-200/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Team
          </button>

          <button
            onClick={() => {
              setMobileOpen(false);
              setPage("contact");
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              page === "contact"
                ? "text-white bg-white/20"
                : "text-slate-200/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Contact
          </button>
        </div>
      )}
    </div>
  );
}
