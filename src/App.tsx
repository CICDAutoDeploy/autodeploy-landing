import { useState, useEffect } from "react";
import Team from "./components/Team";
import Footer from "./components/Footer";
import { useWaitlist } from "./hooks/useWaitlist";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import ContactPage from "./pages/Contact";
import DocsPage from "./pages/Docs";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import ProblemSolution from "./components/ProblemSolution";
import BackToTop from "./components/BackToTop";

declare global {
  interface Window {
    showToast?: (message: string, type?: "success" | "error") => void;
    setPage?: (page: "home" | "privacy" | "terms" | "contact" | "docs") => void;
  }
}

export default function App() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [page, setPage] = useState<"home" | "privacy" | "terms" | "contact" | "docs">("home");
  const waitlist = useWaitlist();

  // Expose global helpers via effect and clean up on unmount
  useEffect(() => {
    window.showToast = (message: string, type: "success" | "error" = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 3000);
    };

    window.setPage = (nextPage) => {
      setPage(nextPage);
      // Scroll to top when switching top-level pages
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return () => {
      delete window.showToast;
      delete window.setPage;
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

      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg font-medium z-50 ${
            toast.type === "success"
              ? "bg-emerald-500 text-emerald-50"
              : "bg-red-500 text-red-50"
          }`}
        >
          {toast.message}
        </div>
      )}

      <Navbar page={page} setPage={setPage} />

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

      <Footer setPage={setPage} />
      <BackToTop enabled={page === "home"} />
    </div>
  );
}
