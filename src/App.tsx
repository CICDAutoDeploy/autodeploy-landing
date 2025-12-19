import { useState } from "react";
import { joinWaitlist } from "./lib/supabase";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import ContactPage from "./pages/Contact";

function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`fill-current ${className}`}
    >
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.57.1.78-.25.78-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.03 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.74.11 3.03.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18 0 1.57-.01 2.83-.01 3.21 0 .31.21.67.79.56 4.56-1.53 7.85-5.86 7.85-10.97C23.5 5.74 18.27.5 12 .5z"/>
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`fill-current ${className}`}
    >
      <path d="M4.98 3.5C3.33 3.5 2 4.84 2 6.48c0 1.63 1.33 2.98 2.98 2.98h.02C6.64 9.46 8 8.11 8 6.48 8 4.84 6.64 3.5 4.98 3.5zM2.4 21.5h5.17V9.98H2.4V21.5zM9.75 9.98V21.5h5.17v-6.45c0-3.6 4.65-3.89 4.65 0v6.45H24V13.3c0-6.22-6.71-5.99-9.08-2.93V9.98H9.75z"/>
    </svg>
  );
}

export default function App() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [page, setPage] = useState<"home" | "privacy" | "terms" | "contact">("home");

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
      <Navbar setPage={setPage} />
      {page === "home" && (
        <main className="flex flex-col gap-24 pb-16">
          <Hero />
          <ProblemSolution />
          <Features />
          <HowItWorks />
          <Team />
          <CTA />
        </main>
      )}
      {page === "privacy" && <PrivacyPage />}
      {page === "terms" && <TermsPage />}
      {page === "contact" && <ContactPage />}
      <Footer setPage={setPage} />
    </div>
  );
}

function Navbar({ setPage }: { setPage: (page: "home" | "privacy" | "terms" | "contact") => void }) {
  return (
    <header className="flex items-center justify-between border-b border-border-light dark:border-border-dark px-4 md:px-10 py-4">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setPage("home")}
      >
        <div className="size-6 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold">AutoDeploy</h2>
      </div>

      <div className="flex gap-3 md:gap-8 items-center">
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium">
            Features
          </a>
          <a href="#how" className="text-sm font-medium">
            How It Works
          </a>
          <a href="#team" className="text-sm font-medium">
            Team
          </a>
        </nav>

        <button
          className="h-10 px-4 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark font-bold text-sm"
          onClick={() => {
            // @ts-ignore
            window.showToast("The app isn't live yet. Please try again later!", "error");
          }}
        >
          Sign In
        </button>
        <button className="h-10 px-4 rounded-lg bg-primary text-white font-bold text-sm">
          Get Started
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleJoin = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const result = await joinWaitlist(email);
    if (result.success) {
      setEmail("");
      setError("");
      // @ts-ignore
      window.showToast("You're on the waitlist!", "success");
    } else {
      // @ts-ignore
      window.showToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <section className="px-4 md:px-10 mt-16 md:mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl font-black">
            AI-Powered CI/CD, Redefined.
          </h1>
          <p className="text-lg md:text-xl max-w-lg text-text-light/80 dark:text-text-dark/80">
            AutoDeploy generates, validates, and deploys CI/CD pipelines using MCP,
            GitHub OAuth, AWS OIDC, and natural-language automation. No YAML
            guesswork. No DevOps barriers. Just automation that works.
          </p>
          <div className="flex flex-col gap-3 max-w-xs">
            {error && (
              <div className="text-red-500 text-sm font-medium">
                {error}
              </div>
            )}
            <input
              className={`h-12 px-4 border rounded-lg bg-card-light dark:bg-card-dark ${
                error ? "border-red-500" : "border-border-light dark:border-border-dark"
              }`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="h-12 px-6 rounded-lg bg-primary text-white text-base font-bold"
              onClick={handleJoin}
            >
              Join the Waitlist
            </button>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-xl bg-card-light dark:bg-card-dark aspect-video flex items-center justify-center">
          <span className="text-primary font-semibold">
            Your Pipeline Demo Here
          </span>
        </div>
      </div>
    </section>
  );
}

function ProblemSolution() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 md:px-10 mt-20">
      <div className="flex flex-col gap-4">
        <span className="text-primary font-semibold">The Problem</span>
        <h2 className="text-3xl md:text-4xl font-bold">
          CI/CD Is Overwhelming for Most Teams.
        </h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80">
          YAML syntax errors, inconsistent pipelines, credential chaos, and complex
          deployment flows slow down developers. Most teams waste hours building
          pipelines instead of shipping code.
        </p>
      </div>

      <div className="p-8 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl flex flex-col gap-4">
        <span className="text-primary font-semibold">The Solution</span>
        <h2 className="text-3xl md:text-4xl font-bold">
          AutoDeploy Builds Pipelines For You.
        </h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80">
          Connect GitHub. Select a repo. Choose your deployment target. AutoDeploy
          generates production-ready CI/CD workflows using MCP, validates them, and
          deploys using secure AWS/GitHub OIDC — all automatically.
        </p>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: "dns",
      title: "MCP-Powered Automation",
      text: "Natural-language powered pipeline generation using Model Context Protocol.",
    },
    {
      icon: "key",
      title: "GitHub OAuth Integration",
      text: "Securely access repos, branches, workflows, commits, and metadata.",
    },
    {
      icon: "cloud",
      title: "AWS OIDC Deployments",
      text: "Configure AWS trust roles and deploy without storing access keys.",
    },
    {
      icon: "terminal",
      title: "Smart YAML Generation",
      text: "Auto-generate, validate, and patch GitHub Actions workflows.",
    },
    {
      icon: "hub",
      title: "Pipeline Commit + PR Flow",
      text: "Open pull requests with clean descriptions and versioned YAML updates.",
    },
    {
      icon: "security",
      title: "Enterprise-Grade Security",
      text: "Supabase-secured tokens, encrypted storage, OAuth best practices.",
    },
  ];

  return (
    <section id="features" className="px-4 md:px-10 mt-24 flex flex-col gap-10">
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-3xl md:text-4xl font-bold">Core Features</h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
          Built for developers. Powered by MCP. Backed by GitHub and AWS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="p-6 rounded-xl bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark flex flex-col gap-4"
          >
            <span className="material-symbols-outlined text-3xl text-primary">
              {item.icon}
            </span>
            <div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-text-light/70 dark:text-text-dark/70 mt-1">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      id="how"
      className="mt-24 px-4 md:px-10 flex flex-col items-center gap-10"
    >
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-3xl md:text-4xl font-bold">How AutoDeploy Works</h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
          A simple 3-step flow from repo → YAML → deployment.
        </p>
      </div>

      <div className="relative max-w-4xl w-full">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border-light dark:bg-border-dark -translate-y-1/2" />
        <div className="flex justify-between relative">
          <Step
            number="1"
            title="Connect GitHub"
            text="Authenticate via OAuth and choose your repository."
          />
          <Step
            number="2"
            title="Generate YAML"
            text="AutoDeploy builds your workflow automatically using MCP."
          />
          <Step
            number="3"
            title="Deploy"
            text="OIDC roles handle secure deployment to AWS — no secrets needed."
          />
        </div>
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string | number;
  title: string;
  text: string;
}) {
  return (
    <div className="w-1/3 flex flex-col items-center gap-4 text-center">
      <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center border-4 border-background-light dark:border-background-dark font-bold">
        {number}
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-text-light/70 dark:text-text-dark/70 px-2">
        {text}
      </p>
    </div>
  );
}

function Team() {
  const team = [
    {
      name: "Paython Veazie",
      role: "Founding Engineer",
      bio: "Contributes to MCP flows, AI Wizard design, API routing, session handling, and deployment automations across AWS.",
      image: "/team/paython.png",
      github: "https://github.com/PVeazie951",
      linkedin: "https://www.linkedin.com/in/pveazie",
    },
    {
      name: "Lorenc Dedaj",
      role: "Founding Engineer",
      bio: "Leads work on Supabase integration, GitHub OAuth flows, GitHub Actions generation, and Google Cloud deployment automation.",
      image: "/team/lorenc.png",
      github: "https://github.com/lorencDedaj",
      linkedin: "https://www.linkedin.com/in/lorenc-dedaj/",
    },
    {
      name: "Victoria Williams",
      role: "Founding Engineer",
      bio: "Drives UI architecture, front-end system design, state management strategy, and overall product polish.",
      image: "/team/victoria.png",
      github: "https://github.com/williams21v",
      linkedin: null,
    },
  ];

  return (
    <section
      id="team"
      className="mt-24 px-4 md:px-10 flex flex-col gap-10"
    >
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-3xl md:text-4xl font-bold">The AutoDeploy Team</h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80 max-w-2xl mx-auto">
          A group of engineers passionate about automation and developer experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mx-auto w-full max-w-6xl">
        {team.map((member) => (
          <div
            key={member.name}
            className="p-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl flex flex-col items-center text-center gap-4 transition-transform duration-200 hover:-translate-y-1"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden bg-border-light dark:bg-border-dark ring-2 ring-transparent hover:ring-primary transition-shadow duration-200">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary text-sm font-medium">{member.role}</p>
              <p className="text-sm text-text-light/70 dark:text-text-dark/70 mt-2">
                {member.bio}
              </p>
              <div className="flex gap-4 mt-3 text-primary justify-center">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary/80 transition-colors"
                    aria-label="GitHub profile"
                  >
                    <GitHubIcon className="w-5 h-5" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary/80 transition-colors"
                    aria-label="LinkedIn profile"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-4 md:px-10 mt-24">
      <div className="p-10 rounded-xl bg-primary/10 dark:bg-primary/20 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Automate Your Pipelines?
        </h2>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80 max-w-2xl">
          Join the waitlist and get early access to the MCP-powered CI/CD builder.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <input
            id="ctaEmailInput"
            className="h-12 flex-1 px-4 border rounded-lg bg-card-light dark:bg-card-dark border-border-light dark:border-border-dark"
            placeholder="Enter your email"
            type="email"
          />
          <button
            className="h-12 px-6 rounded-lg bg-primary text-white font-bold text-base whitespace-nowrap"
            onClick={async () => {
              const input = document.getElementById("ctaEmailInput") as HTMLInputElement | null;
              const email = input?.value ?? "";

              const isValid = /\S+@\S+\.\S+/.test(email);
              if (!isValid) {
                // @ts-ignore
                window.showToast("Please enter a valid email address.", "error");
                return;
              }

              const result = await joinWaitlist(email);
              if (result?.success) {
                if (input) input.value = "";
                // @ts-ignore
                window.showToast("You're on the waitlist!", "success");
              } else {
                // @ts-ignore
                window.showToast("Something went wrong. Please try again.", "error");
              }
            }}
          >
            Join
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer({ setPage }: { setPage: (page: "home" | "privacy" | "terms" | "contact") => void }) {
  return (
    <footer className="mt-16 border-t border-border-light dark:border-border-dark px-4 md:px-10 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="size-5 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p className="text-sm text-text-light/70 dark:text-text-dark/70">
            © 2025 AutoDeploy. All rights reserved.
          </p>
        </div>

        <div className="flex gap-6">
          <button
            onClick={() => setPage("terms")}
            className="text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary"
          >
            Terms
          </button>
          <button
            onClick={() => setPage("privacy")}
            className="text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary"
          >
            Privacy
          </button>
          <button
            onClick={() => setPage("contact")}
            className="text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}