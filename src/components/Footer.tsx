type Page = "home" | "privacy" | "terms" | "contact";

type FooterProps = {
  setPage: (page: Page) => void;
};

export default function Footer({ setPage }: FooterProps) {
  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <button
          onClick={() => setPage("home")}
          className="text-lg font-extrabold tracking-tight"
        >
          AutoDeploy
        </button>

        {/* Links */}
        <nav className="flex gap-6 text-sm font-medium">
          <button
            onClick={() => setPage("privacy")}
            className="hover:text-primary"
          >
            Privacy
          </button>
          <button
            onClick={() => setPage("terms")}
            className="hover:text-primary"
          >
            Terms
          </button>
          <button
            onClick={() => setPage("contact")}
            className="hover:text-primary"
          >
            Contact
          </button>
        </nav>

        {/* Copyright */}
        <p className="text-sm text-text-light/70 dark:text-text-dark/70">
          © {new Date().getFullYear()} AutoDeploy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
