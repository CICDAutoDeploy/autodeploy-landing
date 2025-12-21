import React, { useEffect, useState } from "react";
import DocsSidebar from "../components/docs/DocsSidebar";
import DocsOnThisPage from "../components/docs/DocsOnThisPage";
import DocsContentIntro from "../components/docs/DocsContentIntro";
import FrontendQuickstart from "../components/docs/kb/FrontendQuickstart";
import FrontendConfigurePipeline from "../components/docs/kb/FrontendConfigurePipeline";
import FrontendPipelines from "../components/docs/kb/FrontendPipelines";
import FrontendMcp from "../components/docs/kb/FrontendMcp";
import FrontendEnvironments from "../components/docs/kb/FrontendEnvironments";
import FrontendSecrets from "../components/docs/kb/FrontendSecrets";
import FrontendGithubActions from "../components/docs/kb/FrontendGithubActions";
import FrontendClouds from "../components/docs/kb/FrontendClouds";
import FrontendAuth from "../components/docs/kb/FrontendAuth";
import FrontendDeployments from "../components/docs/kb/FrontendDeployments";
import FrontendLogs from "../components/docs/kb/FrontendLogs";
import type { DocSlug } from "../components/docs/types";

const DOC_COMPONENTS: Record<DocSlug, React.FC> = {
  // Intro remains the general landing page for docs
  intro: DocsContentIntro,

  // Getting Started: end-user focused (currently a simple placeholder)
  installation: () => (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold text-white mb-4">Getting Started</h1>
      <p className="text-slate-200/80">
        Learn what AutoDeploy is, what you need before starting, and how the wizard flows from
        Connect → Configure → Secrets → Dashboard. Detailed end-user getting started docs will
        appear here.
      </p>
    </div>
  ),

  // Configure & Quickstart use the new frontend, user-facing KB components
  configuration: FrontendConfigurePipeline,
  quickstart: FrontendQuickstart,

  // Conceptual pipelines & environments now use dedicated frontend KB components
  pipelines: FrontendPipelines,
  mcp: FrontendMcp,
  environments: FrontendEnvironments,

  // Variables & secrets step
  secrets: FrontendSecrets,

  webhooks: () => (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold text-white mb-4">Webhooks</h1>
      <p className="text-slate-200/80 mb-4">
        AutoDeploy focuses on API-driven deployments today. Future versions may let you plug in
        webhooks from CI providers or Git platforms; this page will explain those options in
        end-user terms when they are available.
      </p>
    </div>
  ),

  "github-actions": FrontendGithubActions,

  "gitlab-ci": () => (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold text-white mb-4">GitLab CI</h1>
      <p className="text-slate-200/80 mb-4">
        GitLab CI support is on the roadmap. When available, this page will describe how to connect
        a GitLab project and run similar pipelines there.
      </p>
    </div>
  ),

  slack: () => (
    <div className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold text-white mb-4">Slack</h1>
      <p className="text-slate-200/80 mb-4">
        In the future, AutoDeploy will be able to send deployment notifications directly to Slack
        channels. This page will cover how to connect Slack and what types of messages you can
        expect.
      </p>
    </div>
  ),

  clouds: FrontendClouds,

  "auth-api": FrontendAuth,
  "deployments-api": FrontendDeployments,
  "logs-api": FrontendLogs,
};

export default function DocsPage() {
  const [doc, setDoc] = useState<DocSlug>("intro");
  const Content = DOC_COMPONENTS[doc];

  // Expose a global helper so the mobile navbar drawer can change docs
  useEffect(() => {
    window.setDocSlug = (slug: DocSlug) => {
      setDoc(slug);
      // Ensure we scroll to the top of the docs content when switching
      const el = document.getElementById("docs-scroll");
      if (el) {
        el.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    return () => {
      delete window.setDocSlug;
    };
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      {/* Desktop layout: sidebars + scrollable center */}
      <div className="hidden lg:grid grid-cols-[minmax(11rem,max-content),minmax(0,1fr),minmax(11rem,max-content)] gap-8 h-[calc(100vh-8rem)]">
        <div className="h-full">
          <DocsSidebar active={doc} onSelect={setDoc} />
        </div>

        <main
          id="docs-scroll"
          className="h-full overflow-y-auto pl-4 pr-6 lg:pl-6 lg:pr-8 scroll-smooth docs-scrollbar"
        >
          <div className="w-full max-w-3xl">
            <Content />
          </div>
        </main>

        <div className="h-full">
          <DocsOnThisPage doc={doc} />
        </div>
      </div>

      {/* Mobile layout: just render content; sidebars hidden via their own breakpoints */}
      <div className="lg:hidden">
        <Content />
      </div>
    </div>
  );
}
