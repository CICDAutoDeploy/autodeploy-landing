import { useState } from "react";
import Team from "./components/Team";
import Footer from "./components/Footer";
import { useWaitlist } from "./hooks/useWaitlist";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import ContactPage from "./pages/Contact";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import CTA from "./components/CTA";
import ProblemSolution from "./components/ProblemSolution";


export default function App() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [page, setPage] = useState<"home" | "privacy" | "terms" | "contact">("home");
  const waitlist = useWaitlist();

  // Expose global toast trigger
  // @ts-ignore
  window.showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {toast && (
        <div
          className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium z-50 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}
      <Navbar page={page} setPage={setPage} />
      {page === "home" && (
        <main className="flex flex-col gap-24 pb-16">
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
      <Footer setPage={setPage} />
    </div>
  );
}
