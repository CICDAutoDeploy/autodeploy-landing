import React, { useState } from "react";
import DocsSidebar from "../components/docs/DocsSidebar";
import DocsOnThisPage from "../components/docs/DocsOnThisPage";
import DocsContentIntro from "../components/docs/DocsContentIntro";
import type { DocSlug } from "../components/docs/types";

const DOC_COMPONENTS: Record<DocSlug, React.FC> = {
  intro: DocsContentIntro,
  installation: () => (
    <div className="prose prose-invert max-w-none">TODO: Installation docs</div>
  ),
  configuration: () => (
    <div className="prose prose-invert max-w-none">TODO: Configuration docs</div>
  ),
  quickstart: () => (
    <div className="prose prose-invert max-w-none">TODO: Quickstart docs</div>
  ),
  pipelines: () => (
    <div className="prose prose-invert max-w-none">TODO: Pipelines docs</div>
  ),
  environments: () => (
    <div className="prose prose-invert max-w-none">TODO: Environments docs</div>
  ),
  secrets: () => (
    <div className="prose prose-invert max-w-none">
      TODO: Variables &amp; Secrets docs
    </div>
  ),
  webhooks: () => (
    <div className="prose prose-invert max-w-none">TODO: Webhooks docs</div>
  ),
  "github-actions": () => (
    <div className="prose prose-invert max-w-none">TODO: GitHub Actions docs</div>
  ),
  "gitlab-ci": () => (
    <div className="prose prose-invert max-w-none">TODO: GitLab CI docs</div>
  ),
  slack: () => (
    <div className="prose prose-invert max-w-none">TODO: Slack docs</div>
  ),
  clouds: () => (
    <div className="prose prose-invert max-w-none">TODO: Cloud docs</div>
  ),
  "auth-api": () => (
    <div className="prose prose-invert max-w-none">TODO: Auth API docs</div>
  ),
  "deployments-api": () => (
    <div className="prose prose-invert max-w-none">
      TODO: Deployments API docs
    </div>
  ),
  "logs-api": () => (
    <div className="prose prose-invert max-w-none">TODO: Logs API docs</div>
  ),
};

export default function DocsPage() {
  const [doc, setDoc] = useState<DocSlug>("intro");
  const Content = DOC_COMPONENTS[doc];

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24">
      {/* Desktop layout: sidebars + scrollable center */}
      <div className="hidden lg:grid grid-cols-[16rem,minmax(0,1fr),16rem] gap-10 h-[calc(100vh-8rem)]">
        <div className="h-full">
          <DocsSidebar active={doc} onSelect={setDoc} />
        </div>

        <main
          id="docs-scroll"
          className="h-full overflow-y-auto pl-4 pr-6 lg:pl-6 lg:pr-8 scroll-smooth"
        >
          <Content />
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
