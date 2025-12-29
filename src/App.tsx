import { useState, useEffect } from "react";
import Team from "./components/sections/Team";
import Footer from "./components/Footer";
import { useWaitlist } from "./hooks/useWaitlist";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import ContactPage from "./pages/Contact";
import DocsPage from "./pages/Docs";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import AdminPage from "./pages/Admin";
import { fetchSystemBanner, type BannerTone } from "./lib/api";
import Features from "./components/sections/Features";
import HowItWorks from "./components/sections/HowItWorks";
import CTA from "./components/sections/CTA";
import ProblemSolution from "./components/sections/ProblemSolution";
import BackToTop from "./components/sections/BackToTop";
import type { DocSlug } from "./components/docs/types";

type BannerTone = "info" | "success" | "warning" | "error";

type BannerState = {
  message: string;
  tone: BannerTone;
  /** If true, do not auto-dismiss; used for future system-wide banners. */
  sticky?: boolean;
} | null;

type Page = "home" | "privacy" | "terms" | "contact" | "docs" | "admin";

declare global {
  interface Window {
    showToast?: (message: string, type?: "success" | "error") => void;
    /**
     * Show a short-lived or sticky banner at the top of the page.
     *
     * Example:
     * window.showBanner?.("The deployment agent is a Pro feature...", "warning");
     */
    showBanner?: (
      message: string,
      tone?: BannerTone,
      options?: { durationMs?: number; sticky?: boolean },
    ) => void;
    setPage?: (page: Page) => void;
    setDocSlug?: (slug: DocSlug) => void;
  }
}

export default function App() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [banner, setBanner] = useState<BannerState>(null);
  const [page, setPage] = useState<Page>("home");
  const waitlist = useWaitlist();

  // Expose global helpers via effect and clean up on unmount
  useEffect(() => {
    window.showToast = (message: string, type: "success" | "error" = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    };

    window.showBanner = (
      message: string,
      tone: BannerTone = "info",
      options?: { durationMs?: number; sticky?: boolean },
    ) => {
      const sticky = options?.sticky ?? false;
      const durationMs = options?.durationMs ?? 5000;

      setBanner({ message, tone, sticky });

      if (!sticky) {
        window.setTimeout(() => {
          setBanner((current) => (current?.message === message ? null : current));
        }, durationMs);
      }
    };

    window.setPage = (nextPage) => {
      setPage(nextPage);
      // Scroll to top when switching top-level pages
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return () => {
      delete window.showToast;
      delete window.showBanner;
      delete window.setPage;
    };
  }, []);

  // On initial load, ask the backend if there is an active system banner and
  // show it as a sticky banner if present.
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const systemBanner = await fetchSystemBanner();
      if (cancelled || !systemBanner || !systemBanner.message) return;

      setBanner({
        message: systemBanner.message,
        tone: systemBanner.tone ?? "info",
        sticky: true,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full text-slate-100 overflow-x-hidden">
      {/* Gradient base */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900" />

      {/* Dark veil for contrast */}
      <div className="fixed inset-0 -z-10 bg-black/20" />

      {/* Frosted glass shimmer */}
      <div className="fixed inset-0 -z-10 bg-white/10 backdrop-blur-3xl pointer-events-none" />

      {/* System / UX banners anchored to the very top of the viewport. */}
      {banner && (
        <div
          className={`fixed top-0 inset-x-0 z-50 border-b px-4 py-2 text-sm flex items-center justify-between shadow-sm ${
            banner.tone === "success"
              ? "bg-emerald-600/95 border-emerald-400 text-emerald-50"
              : banner.tone === "warning"
              ? "bg-amber-500/95 border-amber-300 text-amber-50"
              : banner.tone === "error"
              ? "bg-red-600/95 border-red-400 text-red-50"
              : "bg-slate-800/95 border-slate-600 text-slate-100"
          }`}
        >
          <span className="truncate mr-4">{banner.message}</span>
          <button
            type="button"
            onClick={() => setBanner(null)}
            className="text-xs font-semibold uppercase tracking-wide hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <Navbar page={page} setPage={setPage} hasBanner={!!banner} />

      {page === "home" && (
        <main className="relative z-0 flex flex-col gap-24 pb-16 pt-24">
          <Hero {...waitlist} />
          <ProblemSolution />
          <Features />
          <HowItWorks />
          <Team />
          <CTA {...waitlist} />
        </main>
      )}

      {page === "privacy" && <PrivacyPage />}
      {page === "terms" && <TermsPage />}
      {page === "contact" && <ContactPage />}
      {page === "docs" && <DocsPage />}
      {page === "admin" && <AdminPage />}

      <Footer setPage={setPage} />
      {/* Global back-to-top for the marketing home page (window scroll). */}
      <BackToTop enabled={page === "home"} />
      {/* Docs-specific back-to-top that targets the middle scrollable column. */}
      <BackToTop enabled={page === "docs"} targetId="docs-scroll" />

      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg font-medium z-[9999] ${
            toast.type === "success"
              ? "bg-emerald-500 text-emerald-50"
              : "bg-red-500 text-red-50"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
