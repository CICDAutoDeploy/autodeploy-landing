import type { DocSlug } from "./types";
import { introToc } from "./DocsContentIntro";
import { configureToc } from "./kb/FrontendConfigurePipeline";
import { quickstartToc } from "./kb/FrontendQuickstart";
import { pipelinesToc } from "./kb/FrontendPipelines";
import { mcpToc } from "./kb/FrontendMcp";
import { environmentsToc } from "./kb/FrontendEnvironments";
import { secretsToc } from "./kb/FrontendSecrets";
import { githubActionsToc } from "./kb/FrontendGithubActions";
import { cloudsToc } from "./kb/FrontendClouds";
import { logsToc } from "./kb/FrontendLogs";
import { authToc } from "./kb/FrontendAuth";
import { deploymentsToc } from "./kb/FrontendDeployments";

export type TocItem = { id: string; label: string };

// `docsToc` maps a DocSlug to the TOC exported from its page component.
export const docsToc: Record<DocSlug, TocItem[]> = {
  intro: introToc,
  installation: [],
  configuration: configureToc,
  quickstart: quickstartToc,
  pipelines: pipelinesToc,
  mcp: mcpToc,
  environments: environmentsToc,
  secrets: secretsToc,
  webhooks: [],
  "github-actions": githubActionsToc,
  "gitlab-ci": [],
  slack: [],
  clouds: cloudsToc,
  "auth-api": authToc,
  "deployments-api": deploymentsToc,
  "logs-api": logsToc,
};
