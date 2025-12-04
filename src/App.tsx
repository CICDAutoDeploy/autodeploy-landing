import { useState } from "react";
import { joinWaitlist } from "./lib/supabase";

export default function App() {
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

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
      <Navbar />
      <main className="flex flex-col gap-24 pb-16">
        <Hero />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="flex items-center justify-between border-b border-border-light dark:border-border-dark px-4 md:px-10 py-4">
      <div className="flex items-center gap-3">
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
          onClick={() => (window.location.href = "https://app.autodeploy.dev")}
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
      role: "Lead Engineer",
      bio: "Architect of MCP flows, GitHub OAuth, and pipeline automation.",
    },
    {
      name: "Lorenc Dedaj",
      role: "Backend Engineer",
      bio: "Supabase, API routing, connection flows, and sessions.",
    },
    {
      name: "Victoria Williams",
      role: "UX / Frontend",
      bio: "UI architecture, wizard flow, state management, and polish.",
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
            className="p-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl flex flex-col items-center text-center gap-4"
          >
            <div className="w-32 h-32 rounded-full bg-border-light dark:bg-border-dark" />
            <div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary text-sm font-medium">{member.role}</p>
              <p className="text-sm text-text-light/70 dark:text-text-dark/70 mt-2">
                {member.bio}
              </p>
              <div className="flex flex-col gap-1 mt-3 text-sm text-primary">
                <a href="#" className="hover:underline">GitHub: username_here</a>
                <a href="#" className="hover:underline">LinkedIn: linkedin_here</a>
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

function Footer() {
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
          <a
            href="#"
            className="text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}