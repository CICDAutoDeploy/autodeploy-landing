import {
  LinkIcon,
  QuestionMarkCircleIcon,
  DocumentMagnifyingGlassIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

type StepProps = {
  number: number;
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function Step({ number, title, description, Icon }: StepProps) {
  return (
    <div className="group flex gap-6 items-start transition-all duration-200 hover:translate-x-1">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="w-5 h-5 text-primary transition-transform duration-200 group-hover:scale-110" />
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-text-light/70 dark:text-text-dark/70">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="py-24 bg-bg-light dark:bg-bg-dark"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">
            How AutoDeploy works
          </h2>
          <p className="text-lg text-text-light/70 dark:text-text-dark/70 max-w-2xl mx-auto">
            From repository to production-ready pipeline in a few simple steps.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <Step
            number={1}
            Icon={LinkIcon}
            title="Connect your repository"
            description="Authenticate with GitHub and select the repository and branch you want to deploy."
          />
          <Step
            number={2}
            Icon={QuestionMarkCircleIcon}
            title="Answer a few questions"
            description="AutoDeploy analyzes your repo and asks only what it needs to generate the right pipeline."
          />
          <Step
            number={3}
            Icon={DocumentMagnifyingGlassIcon}
            title="Review the generated pipeline"
            description="Inspect the generated CI/CD workflow, including build, test, and deploy stages."
          />
          <Step
            number={4}
            Icon={RocketLaunchIcon}
            title="Merge and deploy"
            description="Approve the pull request and let AutoDeploy securely deploy using cloud-native credentials."
          />
        </div>
      </div>
    </section>
  );
}
