type Page = "home" | "privacy" | "terms" | "contact";

type FooterProps = {
  setPage: (page: Page) => void;
};

export default function Footer({ setPage }: FooterProps) {
  return (
    <footer className="relative z-50 border-t border-white/15 bg-black/40 backdrop-blur">
      <div className="w-full px-3 sm:px-6 lg:px-8 py-2 md:py-3">
        <div className="w-full flex flex-col md:flex-row items-center gap-3 md:gap-4 rounded-full border border-white/15 bg-white/5 backdrop-blur shadow-glass px-3 lg:px-6 py-2 md:py-3 text-slate-200/80">
          {/* Brand */}
          <div className="flex-1 flex items-center justify-start min-w-0">
            <button
              onClick={() => setPage("home")}
              className="text-lg font-extrabold tracking-tight text-white"
            >
              AutoDeploy
            </button>
          </div>

          {/* Center links bubble - vertically and horizontally aligned with navbar middle section */}
          <div className="flex items-center justify-center flex-none md:flex-1 min-w-0">
            <nav className="flex items-center gap-3 md:gap-4 text-sm font-medium rounded-full border border-white/15 bg-white/5 px-3 py-0.5 md:py-1 shadow-glass">
            <button
              onClick={() => setPage("privacy")}
              className="px-3 py-1.5 rounded-md transition-colors text-slate-200/80 hover:text-white hover:bg-white/10"
            >
              Privacy
            </button>
            <button
              onClick={() => setPage("terms")}
              className="px-3 py-1.5 rounded-md transition-colors text-slate-200/80 hover:text-white hover:bg-white/10"
            >
              Terms
            </button>
            <button
              onClick={() => setPage("contact")}
              className="px-3 py-1.5 rounded-md transition-colors text-slate-200/80 hover:text-white hover:bg-white/10"
            >
              Contact
            </button>
          </nav>
          </div>

          {/* Copyright */}
          <div className="flex-1 flex items-center justify-center md:justify-end min-w-0">
            <p className="text-sm text-slate-400 text-center md:text-right">
              © {new Date().getFullYear()} AutoDeploy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
