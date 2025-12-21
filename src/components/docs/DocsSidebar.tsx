import type { DocSlug } from "./types";

const sections: { title: string; items: { slug: DocSlug; label: string }[] }[] = [
  {
    title: "Getting Started",
    items: [
      { slug: "intro", label: "Introduction" },
      { slug: "installation", label: "Installation" },
      { slug: "configuration", label: "Configuration" },
      { slug: "quickstart", label: "Quickstart Guide" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { slug: "pipelines", label: "Pipelines" },
      { slug: "environments", label: "Environments" },
      { slug: "secrets", label: "Variables & Secrets" },
      { slug: "webhooks", label: "Webhooks" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { slug: "github-actions", label: "GitHub Actions" },
      { slug: "gitlab-ci", label: "GitLab CI" },
      { slug: "slack", label: "Slack Notifications" },
      { slug: "clouds", label: "AWS & Azure" },
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

export default function DocsSidebar({
  active,
  onSelect,
}: {
  active: DocSlug;
  onSelect: (slug: DocSlug) => void;
}) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-white/10 py-2 pr-6">
      <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 space-y-8 text-sm">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold uppercase tracking-wider text-slate-100 mb-3 text-xs">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item) => {
                const isActive = item.slug === active;
                return (
                  <li key={item.slug}>
                    <button
                      type="button"
                      onClick={() => onSelect(item.slug)}
                      className={`block w-full text-left text-sm pl-4 border-l-2 -ml-px transition-colors ${
                        isActive
                          ? "text-emerald-300 font-medium border-emerald-400"
                          : "text-slate-300/80 hover:text-white border-transparent hover:border-white/30"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
