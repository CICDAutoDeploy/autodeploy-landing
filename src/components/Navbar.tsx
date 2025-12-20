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

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur border-b border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <button
          onClick={() => setPage("home")}
          className="text-xl font-extrabold tracking-tight"
        >
          AutoDeploy
        </button>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setPage("home")}
            className={page === "home" ? "text-primary" : "hover:text-primary"}
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
            className="hover:text-primary"
          >
            Features
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
            className="hover:text-primary"
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