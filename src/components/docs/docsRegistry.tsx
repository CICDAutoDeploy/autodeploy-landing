import React from "react";
import DocsContentIntro from "./DocsContentIntro";
import FrontendQuickstart from "./kb/FrontendQuickstart";
import FrontendConfigurePipeline from "./kb/FrontendConfigurePipeline";
import FrontendPipelines from "./kb/FrontendPipelines";
import FrontendMcp from "./kb/FrontendMcp";
import FrontendEnvironments from "./kb/FrontendEnvironments";
import FrontendSecrets from "./kb/FrontendSecrets";
import FrontendGithubActions from "./kb/FrontendGithubActions";
import FrontendClouds from "./kb/FrontendClouds";
import FrontendAuth from "./kb/FrontendAuth";
import FrontendDeployments from "./kb/FrontendDeployments";
import FrontendLogs from "./kb/FrontendLogs";
import type { DocSlug } from "./types";

export const DOC_COMPONENTS: Record<DocSlug, React.FC> = {
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

// Published docs: shown in nav/search. Future/placeholder pages stay hidden until content is ready.
export const PUBLISHED_DOC_SLUGS = new Set<DocSlug>([
  "intro",
  "installation",
  "configuration",
  "quickstart",
  "pipelines",
  "mcp",
  "environments",
  "secrets",
  "github-actions",
  "clouds",
  "auth-api",
  "deployments-api",
  "logs-api",
]);

