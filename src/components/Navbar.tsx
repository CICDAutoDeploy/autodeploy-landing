import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (page !== "home") {
      setActiveSection("home");
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

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur border-b border-border-light dark:border-border-dark">
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
          className="text-xl font-extrabold tracking-tight"
        >
          AutoDeploy
        </button>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium">
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
            className={
              page === "home" && activeSection === "home"
                ? "text-primary"
                : "hover:text-primary"
            }
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
            className={activeSection === "features" ? "text-primary" : "hover:text-primary"}
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
            className={activeSection === "how" ? "text-primary" : "hover:text-primary"}
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
            className={activeSection === "team" ? "text-primary" : "hover:text-primary"}
          >
            Team
          </button>
          <button
            onClick={() => setPage("contact")}
            className={page === "contact" ? "text-primary" : "hover:text-primary"}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}