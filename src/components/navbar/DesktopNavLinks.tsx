import type { Page } from "../Navbar";

type DesktopNavLinksProps = {
  page: Page;
  activeSection: "home" | "features" | "how" | "team";
  setPage: (page: Page) => void;
  scrollToSection: (id: string) => void;
};

export function DesktopNavLinks({
  page,
  activeSection,
  setPage,
  scrollToSection,
}: DesktopNavLinksProps) {
  return (
    <div className="hidden lg:flex items-center gap-4 text-sm font-medium rounded-full border border-white/15 bg-white/5 px-3 py-1.5 shadow-glass">
      <button
        onClick={() => {
          if (page !== "home") {
            setPage("home");
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 0);
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className={`px-3 py-1.5 rounded-md transition-colors ${
          page === "home" && activeSection === "home"
            ? "text-white bg-white/20"
            : "text-slate-200/80 hover:text-white hover:bg-white/10"
        }`}
      >
        Home
      </button>

      <button
        onClick={() => {
          if (page !== "home") {
            setPage("home");
            setTimeout(() => scrollToSection("features"), 0);
          } else {
            scrollToSection("features");
          }
        }}
        className={`px-3 py-1.5 rounded-md transition-colors ${
          activeSection === "features"
            ? "text-white bg-white/20"
            : "text-slate-200/80 hover:text-white hover:bg-white/10"
        }`}
      >
        Features
      </button>

      <button
        onClick={() => {
          if (page === "home") {
            scrollToSection("how");
          } else if (page !== "docs") {
            setPage("docs");
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 0);
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className={`px-3 py-1.5 rounded-md transition-colors ${
          (page === "home" && activeSection === "how") || page === "docs"
            ? "text-white bg-white/20"
            : "text-slate-200/80 hover:text-white hover:bg-white/10"
        }`}
      >
        Docs
      </button>

      <button
        onClick={() => {
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
        onClick={() => setPage("contact")}
        className={`px-3 py-1.5 rounded-md transition-colors ${
          page === "contact"
            ? "text-white bg-white/20"
            : "text-slate-200/80 hover:text-white hover:bg-white/10"
        }`}
      >
        Contact
      </button>
    </div>
  );
}
