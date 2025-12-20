export default function ProblemSolution() {
  return (
    <section className="py-24 bg-bg-light dark:bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem card */}
          <div
            className="group p-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl
                       transition-all duration-200 ease-out
                       hover:-translate-y-1 hover:shadow-lg hover:border-primary/40"
          >
            <h2 className="text-3xl font-extrabold mb-3">The problem</h2>
            <p className="text-text-light/70 dark:text-text-dark/70">
              Setting up CI/CD pipelines is slow, error-prone, and frustrating.
              Teams copy YAML from old projects, fight cloud permissions, and
              spend hours debugging brittle workflows instead of shipping
              features.
            </p>
          </div>

          {/* Solution card */}
          <div
            className="group p-6 bg-card-light dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl
                       transition-all duration-200 ease-out
                       hover:-translate-y-1 hover:shadow-lg hover:border-primary/40"
          >
            <h2 className="text-3xl font-extrabold mb-3">The solution</h2>
            <p className="text-text-light/70 dark:text-text-dark/70">
              AutoDeploy analyzes your repository, understands your stack, and
              generates secure, production-ready pipelines tailored to your
              infrastructure — automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
