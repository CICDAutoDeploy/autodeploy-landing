export default function ProblemSolution() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem card */}
          <div
            className="group p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-glass
                       transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/40"
          >
            <h2 className="text-3xl font-extrabold mb-3 text-white">The problem</h2>
            <p className="text-slate-200/80">
              Setting up CI/CD pipelines is slow, error-prone, and frustrating.
              Teams copy YAML from old projects, fight cloud permissions, and
              spend hours debugging brittle workflows instead of shipping
              features.
            </p>
          </div>

          {/* Solution card */}
          <div
            className="group p-6 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-glass
                       transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/40"
          >
            <h2 className="text-3xl font-extrabold mb-3 text-white">The solution</h2>
            <p className="text-slate-200/80">
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
