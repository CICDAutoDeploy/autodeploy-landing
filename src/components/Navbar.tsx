

type NavbarProps = {
  page: string;
  setPage: (page: string) => void;
};

export default function Navbar({ page, setPage }: NavbarProps) {
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
          <a
            href="#features"
            className="hover:text-primary"
          >
            Features
          </a>
          <a
            href="#team"
            className="hover:text-primary"
          >
            Team
          </a>
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