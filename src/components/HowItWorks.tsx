type StepProps = {
  number: number;
  title: string;
  description: string;
};

function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
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
            title="Connect your repository"
            description="Authenticate with GitHub and select the repository and branch you want to deploy."
          />
          <Step
            number={2}
            title="Answer a few questions"
            description="AutoDeploy analyzes your repo and asks only what it needs to generate the right pipeline."
          />
          <Step
            number={3}
            title="Review the generated pipeline"
            description="Inspect the generated CI/CD workflow, including build, test, and deploy stages."
          />
          <Step
            number={4}
            title="Merge and deploy"
            description="Approve the pull request and let AutoDeploy securely deploy using cloud-native credentials."
          />
        </div>
      </div>
    </section>
  );
}
