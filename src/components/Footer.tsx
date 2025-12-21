type Page = "home" | "privacy" | "terms" | "contact";

type FooterProps = {
  setPage: (page: Page) => void;
};

export default function Footer({ setPage }: FooterProps) {
  return (
    <footer className="relative z-50 border-t border-white/15 bg-black/40 backdrop-blur">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 rounded-full border border-white/15 bg-white/5 backdrop-blur shadow-glass px-4 lg:px-6 py-4 text-slate-200/80">
          {/* Brand */}
          <button
            onClick={() => setPage("home")}
            className="text-lg font-extrabold tracking-tight text-white"
          >
            AutoDeploy
          </button>

          {/* Links */}
          <nav className="flex gap-6 text-sm font-medium">
            <button
              onClick={() => setPage("privacy")}
              className="hover:text-white"
            >
              Privacy
            </button>
            <button
              onClick={() => setPage("terms")}
              className="hover:text-white"
            >
              Terms
            </button>
            <button
              onClick={() => setPage("contact")}
              className="hover:text-white"
            >
              Contact
            </button>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} AutoDeploy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
