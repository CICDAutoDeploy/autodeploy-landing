export default function ProblemSolution() {
  return (
    <section className="py-24 bg-bg-light dark:bg-bg-dark">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Problem */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold">The problem</h2>
          <p className="text-text-light/70 dark:text-text-dark/70">
            Setting up CI/CD pipelines is slow, error-prone, and frustrating.
            Teams copy YAML from old projects, fight cloud permissions, and spend
            hours debugging brittle workflows instead of shipping features.
          </p>
        </div>

        {/* Solution */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold">The solution</h2>
          <p className="text-text-light/70 dark:text-text-dark/70">
            AutoDeploy analyzes your repository, understands your stack, and
            generates secure, production-ready pipelines tailored to your
            infrastructure — automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
