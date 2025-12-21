import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { DocSlug } from "./docs/types";

const docsSections: { title: string; items: { slug: DocSlug; label: string }[] }[] = [
  {
    title: "Getting Started",
    items: [
      { slug: "intro", label: "Introduction" },
      { slug: "installation", label: "Installation" },
      { slug: "configuration", label: "Pipeline configuration" },
      { slug: "quickstart", label: "Quickstart Guide" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { slug: "pipelines", label: "Pipelines" },
      { slug: "mcp", label: "MCP" },
      { slug: "environments", label: "Environments" },
      { slug: "secrets", label: "Environment variables" },
      { slug: "webhooks", label: "Webhooks" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { slug: "github-actions", label: "GitHub Actions Integration" },
      { slug: "gitlab-ci", label: "GitLab CI" },
      { slug: "slack", label: "Slack Notifications" },
      { slug: "clouds", label: "Deploying to AWS & GCP" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { slug: "auth-api", label: "Authentication" },
      { slug: "deployments-api", label: "Deployments" },
      { slug: "logs-api", label: "Logs" },
    ],
  },
];

type DocsIndexItem = { slug: DocSlug; label: string };

const FLAT_DOCS_INDEX: DocsIndexItem[] = docsSections.flatMap((section) =>
  section.items
);

const POPULAR_DOCS: DocsIndexItem[] = [
  { slug: "configuration", label: "Pipeline configuration" },
  { slug: "clouds", label: "Deploying to AWS & GCP" },
  { slug: "secrets", label: "Handling secrets" },
];

const RECENT_STORAGE_KEY = "autodeploy-docs-recent";

function GitHubMarkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.05A9.28 9.28 0 0 1 12 6.07c.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

type Page = "home" | "privacy" | "terms" | "contact" | "docs";

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

  const [docsSearchOpen, setDocsSearchOpen] = useState(false);
  const [docsSearchQuery, setDocsSearchQuery] = useState("");
  const [recentDocs, setRecentDocs] = useState<DocsIndexItem[]>([]);

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

  // Hydrate recent docs search entries from localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(RECENT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DocsIndexItem[];
        const valid = parsed.filter((item) =>
          FLAT_DOCS_INDEX.some((d) => d.slug === item.slug)
        );
        setRecentDocs(valid.slice(0, 5));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const recordRecentDoc = (item: DocsIndexItem) => {
    setRecentDocs((prev) => {
      const deduped = [item, ...prev.filter((p) => p.slug !== item.slug)].slice(0, 5);
      try {
        window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(deduped));
      } catch {
        // ignore write errors
      }
      return deduped;
    });
  };

  const openDocsSearch = () => {
    setDocsSearchOpen(true);
    setTimeout(() => {
      const input = document.getElementById("docs-search-input") as
        | HTMLInputElement
        | null;
      input?.focus();
    }, 0);
  };

  const closeDocsSearch = () => {
    setDocsSearchOpen(false);
    setDocsSearchQuery("");
  };

  const navigateToDoc = (slug: DocSlug) => {
    const match = FLAT_DOCS_INDEX.find((d) => d.slug === slug);
    if (match) {
      recordRecentDoc(match);
    }
    if (page !== "docs") {
      setPage("docs");
      setTimeout(() => {
        window.setDocSlug?.(slug);
      }, 0);
    } else {
      window.setDocSlug?.(slug);
    }
    closeDocsSearch();
  };

  const filteredDocs = docsSearchQuery
    ? FLAT_DOCS_INDEX.filter((item) =>
        item.label.toLowerCase().includes(docsSearchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      const ctrlOrMeta = e.ctrlKey || e.metaKey;
      if (ctrlOrMeta && isK) {
        e.preventDefault();
        openDocsSearch();
      } else if (e.key === "Escape" && docsSearchOpen) {
        e.preventDefault();
        closeDocsSearch();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [docsSearchOpen]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/15 bg-white/5 backdrop-blur">
      <div className="w-full px-6 h-16 flex items-center gap-6">
        {/* Left: logo / brand */}
        <div className="flex-1 flex items-center">
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
            className="text-xl font-extrabold tracking-tight text-white"
          >
            AutoDeploy
          </button>
        </div>

        {/* Center: primary navigation (desktop) / search (mobile) */}
        <div className="flex items-center justify-center flex-none lg:flex-1">
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
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
                if (page !== "home") {
                  setPage("home");
                  setTimeout(() => scrollToSection("how"), 0);
                } else {
                  scrollToSection("how");
                }
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeSection === "how"
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
                activeSection === "team"
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

        {/* Right: docs search (desktop) + GitHub + mobile toggle */}
        <div className="flex-1 flex items-center justify-end gap-3">
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

          <button
            type="button"
            className="hidden lg:inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 p-2 text-slate-100 hover:bg-white/10"
            aria-label="Continue with GitHub"
          >
            <GitHubMarkIcon className="h-4 w-4" />
          </button>

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
      {/* Mobile / desktop docs search dialog */}
      {docsSearchOpen && (
        <div className="fixed inset-0 z-40 flex items-start justify-center pt-24 px-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeDocsSearch}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-slate-900/95 border border-white/25 shadow-glass overflow-hidden text-sm text-slate-100">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-slate-900">
              <MagnifyingGlassIcon className="h-4 w-4 text-slate-300" />
              <input
                id="docs-search-input"
                className="flex-1 bg-transparent outline-none text-sm text-slate-50 placeholder:text-slate-400"
                placeholder="Search docs..."
                value={docsSearchQuery}
                onChange={(e) => setDocsSearchQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={closeDocsSearch}
                className="text-slate-400 hover:text-slate-100 text-xs"
              >
                Esc
              </button>
            </div>

            <div className="max-h-[24rem] overflow-y-auto">
              {docsSearchQuery === "" ? (
                <>
                  {recentDocs.length > 0 && (
                    <div className="px-4 pt-3 pb-2">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-1">
                        Recent
                      </div>
                      <ul className="space-y-1">
                        {recentDocs.map((item) => (
                          <li key={item.slug}>
                            <button
                              type="button"
                              onClick={() => navigateToDoc(item.slug)}
                              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/5"
                            >
                              <span className="material-symbols-outlined text-xs text-slate-400">
                                history
                              </span>
                              <span className="text-sm text-slate-100">{item.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="px-4 pt-3 pb-4 border-t border-white/10">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-1">
                      Popular
                    </div>
                    <ul className="space-y-1">
                      {POPULAR_DOCS.map((item) => (
                        <li key={item.slug}>
                          <button
                            type="button"
                            onClick={() => navigateToDoc(item.slug)}
                            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/5"
                          >
                            <span className="material-symbols-outlined text-xs text-slate-400">
                              description
                            </span>
                            <span className="text-sm text-slate-100">{item.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                      <span>
                        Press <span className="font-semibold text-slate-300">Enter</span> to
                        select
                      </span>
                      <span>
                        Press <span className="font-semibold text-slate-300">Esc</span> to close
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-4 pt-3 pb-4">
                  {filteredDocs.length === 0 ? (
                    <p className="text-xs text-slate-400">No docs match your search.</p>
                  ) : (
                    <ul className="space-y-1">
                      {filteredDocs.map((item) => (
                        <li key={item.slug}>
                          <button
                            type="button"
                            onClick={() => navigateToDoc(item.slug)}
                            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/5"
                          >
                            <span className="material-symbols-outlined text-xs text-slate-400">
                              description
                            </span>
                            <span className="text-sm text-slate-100">{item.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {(
        <div
          className={`lg:hidden fixed top-16 right-4 z-40 bg-gradient-to-b from-slate-900/80 via-slate-800/75 to-slate-900/85 border border-white/25 rounded-2xl w-fit min-w-[1rem] overflow-hidden transform transition-all duration-300 ease-out shadow-glass backdrop-blur-xl ${
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
                    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
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
      )}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
}