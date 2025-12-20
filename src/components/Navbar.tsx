import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

type Page = "home" | "privacy" | "terms" | "contact";

type NavbarProps = {
  page: Page;
  setPage: (page: Page) => void;
};

export default function Navbar({ page, setPage }: NavbarProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [activeSection, setActiveSection] = useState<
    "home" | "features" | "how" | "team"
  >("home");

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (page !== "home") {
      setTimeout(() => setActiveSection("home"), 0);
      return;
    }

    const sectionIds: Array<"features" | "how" | "team"> = [
      "features",
      "how",
      "team",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // If we're near the top of the page, prefer Home
            if (window.scrollY < 100) {
              setActiveSection("home");
            } else {
              setActiveSection(entry.target.id as any);
            }
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [page]);

  useEffect(() => {
    if (page !== "home") return;

    const handleScroll = () => {
      if (window.scrollY < 80) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  useEffect(() => {
    // Close the mobile menu when the page changes, if it's currently open.
    if (!mobileOpen) return;
    const t = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(t);
  }, [page]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
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
          className="text-xl font-extrabold tracking-tight text-text"
        >
          AutoDeploy
        </button>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
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
                ? "bg-blue-100 text-blue-600"
                : "text-text hover:bg-blue-100 hover:text-blue-600"
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
                ? "bg-blue-100 text-blue-600"
                : "text-text hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            Features
          </button>
          <button
            onClick={() => {
              if (page !== "home") {
                setPage("home");
                setTimeout(() => scrollToSection("how"), 0);
              } else {
                scrollToSection("how");
              }
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeSection === "how"
                ? "bg-blue-100 text-blue-600"
                : "text-text hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            How it works
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
              activeSection === "team"
                ? "bg-blue-100 text-blue-600"
                : "text-text hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            Team
          </button>
          <button
            onClick={() => setPage("contact")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              page === "contact"
                ? "bg-blue-100 text-blue-600"
                : "text-text hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            Contact
          </button>
        </div>
        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="md:hidden p-2 rounded-md hover:bg-surface-muted"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>
      {(
        <div
          className={`md:hidden fixed top-16 right-4 z-40 bg-white border border-border shadow-xl rounded-2xl w-fit min-w-[1rem] overflow-hidden transform transition-all duration-300 ease-out ${
            mobileOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-6 py-5 flex flex-col gap-4 text-sm font-medium items-end text-right text-text whitespace-nowrap">
            <button
              onClick={() => {
                setMobileOpen(false);
                if (page !== "home") {
                  setPage("home");
                  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeSection === "home" && page === "home"
                  ? "bg-blue-100 text-blue-600"
                  : "text-text hover:bg-blue-100 hover:text-blue-600"
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
                  ? "bg-blue-100 text-blue-600"
                  : "text-text hover:bg-blue-100 hover:text-blue-600"
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
                  ? "bg-blue-100 text-blue-600"
                  : "text-text hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              How it works
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
                  ? "bg-blue-100 text-blue-600"
                  : "text-text hover:bg-blue-100 hover:text-blue-600"
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
                  ? "bg-blue-100 text-blue-600"
                  : "text-text hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      )}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-white/80"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
}