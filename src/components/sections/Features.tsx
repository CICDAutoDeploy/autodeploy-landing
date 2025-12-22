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
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Features that scale with your workflow
          </h2>
          <p className="text-lg text-slate-200/80 max-w-2xl mx-auto">
            AutoDeploy focuses on the hardest parts of CI/CD so your team can
            focus on shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-glass
                         transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/40"
            >
              <div className="flex items-center gap-3 mb-3">
                <feature.icon
                  className="h-6 w-6 text-emerald-300 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-slate-200/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
