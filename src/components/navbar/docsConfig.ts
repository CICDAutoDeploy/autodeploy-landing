import type { DocSlug } from "../docs/types";

export type DocsIndexItem = { slug: DocSlug; label: string };

export const docsSections: { title: string; items: DocsIndexItem[] }[] = [
  {
    title: "Getting Started",
    items: [
      { slug: "intro", label: "Introduction" },
      { slug: "installation", label: "Installation" },
      { slug: "configuration", label: "Pipeline configuration" },
      { slug: "quickstart", label: "Quickstart Guide" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { slug: "pipelines", label: "Pipelines" },
      { slug: "mcp", label: "MCP" },
      { slug: "environments", label: "Environments" },
      { slug: "secrets", label: "Environment variables" },
      { slug: "webhooks", label: "Webhooks" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { slug: "github-actions", label: "GitHub Actions Integration" },
      { slug: "gitlab-ci", label: "GitLab CI" },
      { slug: "slack", label: "Slack Notifications" },
      { slug: "clouds", label: "Deploying to AWS & GCP" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { slug: "auth-api", label: "Authentication" },
      { slug: "deployments-api", label: "Deployments" },
      { slug: "logs-api", label: "Logs" },
    ],
  },
];

export const FLAT_DOCS_INDEX: DocsIndexItem[] = docsSections.flatMap((section) =>
  section.items,
);

export const POPULAR_DOCS: DocsIndexItem[] = [
  { slug: "configuration", label: "Pipeline configuration" },
  { slug: "clouds", label: "Deploying to AWS & GCP" },
  { slug: "secrets", label: "Handling secrets" },
];

export const RECENT_STORAGE_KEY = "autodeploy-docs-recent";
