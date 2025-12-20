import {
  SparklesIcon,
  ShieldCheckIcon,
  CloudIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const features: Feature[] = [
  {
    title: "AI‑Generated Pipelines",
    description:
      "Generate production‑ready CI/CD pipelines directly from your repository using natural language and MCP‑powered analysis.",
    icon: SparklesIcon,
  },
  {
    title: "Secure by Default",
    description:
      "Built‑in GitHub OAuth, AWS OIDC, and least‑privilege IAM ensure your deployments follow security best practices from day one.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Multi‑Cloud Ready",
    description:
      "Deploy seamlessly to AWS, GCP, and beyond with provider‑aware pipeline generation and environment‑specific configuration.",
    icon: CloudIcon,
  },
  {
    title: "No YAML Guesswork",
    description:
      "Stop copy‑pasting fragile YAML. AutoDeploy generates, validates, and maintains pipelines for you.",
    icon: CodeBracketIcon,
  },
  {
    title: "Fast Setup",
    description:
      "Connect your repo, answer a few questions, and ship a working pipeline in minutes — not days.",
    icon: RocketLaunchIcon,
  },
  {
    title: "Built for Teams",
    description:
      "Designed to support real‑world workflows with reviewable PRs, clear diffs, and predictable automation.",
    icon: UsersIcon,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-bg-light dark:bg-bg-dark"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">
            Features that scale with your workflow
          </h2>
          <p className="text-lg text-text-light/70 dark:text-text-dark/70 max-w-2xl mx-auto">
            AutoDeploy focuses on the hardest parts of CI/CD so your team can
            focus on shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl
                         transition-all duration-200 ease-out
                         hover:-translate-y-1 hover:shadow-lg hover:border-primary/40"
            >
              <div className="flex items-center gap-3 mb-3">
                <feature.icon
                  className="h-6 w-6 text-primary flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold">
                  {feature.title}
                </h3>
              </div>
              <p className="text-text-light/70 dark:text-text-dark/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
