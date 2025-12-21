import React from "react";

export const mcpToc = [
  { id: "mcp-overview", label: "What is MCP?" },
  { id: "mcp-how-it-helps", label: "How MCP helps you" },
  { id: "mcp-tools", label: "The tools MCP uses" },
  { id: "mcp-flow", label: "How a typical MCP run works" },
  { id: "mcp-safety", label: "Safety and control" },
];

export default function FrontendMcp() {
  return (
    <div className="prose prose-invert max-w-none">
      <nav
        aria-label="Breadcrumb"
        className="flex text-sm text-slate-400 mb-6 items-center gap-1"
      >
        <span className="hover:text-emerald-300 cursor-pointer">Docs</span>
        <span className="text-xs">/</span>
        <span className="hover:text-emerald-300 cursor-pointer">
          Core Concepts
        </span>
        <span className="text-xs">/</span>
        <span className="text-slate-100 font-medium">MCP</span>
      </nav>

      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-6">
        MCP: The Automation Engine Behind AutoDeploy
      </h1>

      <p className="text-slate-200/80 mb-4">
        MCP (Model Context Protocol) is the engine AutoDeploy uses behind the scenes to understand
        your repository, generate pipelines, and talk to cloud services. You don&apos;t have to interact
        with MCP directly, but it powers many of the smart features in the wizard.
      </p>

      <h2
        id="mcp-overview"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        What is MCP?
      </h2>
      <p className="text-slate-200/80 mb-4">
        At a high level, MCP is a way for AutoDeploy&apos;s AI and backend to call a set of trusted
        tools. Those tools can read your repositories, propose pipeline YAML, look up cloud deploy
        targets, and more—all while respecting your permissions.
      </p>

      <h2
        id="mcp-how-it-helps"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        How MCP helps you
      </h2>
      <p className="text-slate-200/80 mb-4">
        From your point of view, MCP makes AutoDeploy feel smart and context-aware:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          On <strong>Connect</strong>, it can discover your repositories and branches so you can pick
          from a curated list instead of typing URLs by hand.
        </li>
        <li>
          On <strong>Configure</strong>, it can propose a pipeline that matches your stack and
          provider instead of starting from a blank YAML file.
        </li>
        <li>
          When you use the <strong>AI wizard</strong>, it can actually run tools (like repo analysis
          or pipeline generation) instead of just guessing based on your prompt.
        </li>
      </ul>

      <h2
        id="mcp-tools"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        The tools MCP uses
      </h2>
      <p className="text-slate-200/80 mb-4">
        Internally, MCP works with a set of specialized tools. Some examples:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          <strong>Repo reader</strong> – lists your repos and branches and inspects basic metadata so
          AutoDeploy knows what it&apos;s working with.
        </li>
        <li>
          <strong>Pipeline generator</strong> – takes information about your repo, provider, and
          options and returns a structured pipeline plus YAML.
        </li>
        <li>
          <strong>Cloud &amp; identity helpers</strong> – for example, tools that list deployable AWS
          roles or GCP targets so you can pick them from a dropdown.
        </li>
        <li>
          <strong>GitHub helpers</strong> – create or update workflow files and trigger runs without
          exposing tokens to the browser.
        </li>
      </ul>

      <h2
        id="mcp-flow"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        How a typical MCP run works
      </h2>
      <ol className="list-decimal list-inside space-y-3 text-slate-200/80 marker:text-emerald-300 marker:font-bold mb-4">
        <li>
          You perform an action in the UI—such as asking the wizard to suggest a pipeline or clicking
          a button to list AWS roles.
        </li>
        <li>
          AutoDeploy sends a request to the backend, which chooses the right MCP tool (repo reader,
          pipeline generator, cloud helper, and so on).
        </li>
        <li>
          The tool runs with your current context (who you are, which repo you selected, which
          provider you chose) and returns structured data.
        </li>
        <li>
          The UI updates: maybe you see a generated YAML, a list of repos, or new deployment
          options—without having to configure any of those integrations yourself.
        </li>
      </ol>

      <h2
        id="mcp-safety"
        className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
      >
        Safety and control
      </h2>
      <p className="text-slate-200/80 mb-4">
        MCP calls always run on the server under your existing permissions. That means:
      </p>
      <ul className="list-disc list-inside space-y-2 text-slate-200/80 mb-4">
        <li>
          Only repositories and cloud resources you&apos;ve authorized are visible to the tools.
        </li>
        <li>
          Sensitive tokens stay on the backend or in your CI provider, not in the browser.
        </li>
        <li>
          You can still review and edit the resulting YAML or settings before committing anything.
        </li>
      </ul>

      <p className="text-slate-200/80">
        You can think of MCP as AutoDeploy&apos;s &quot;power user&quot; under the hood: it does the heavy lifting
        of talking to GitHub and your clouds so you can focus on choosing the right pipeline
        behavior.
      </p>
    </div>
  );
}
