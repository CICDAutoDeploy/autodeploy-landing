type CTAProps = {
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  handleJoin: () => void;
  error: string;
};

export default function CTA({
  email,
  setEmail,
  loading,
  handleJoin,
  error,
}: CTAProps) {
  return (
    <section className="py-24 bg-bg-light dark:bg-bg-dark">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-extrabold">
            Ready to stop fighting your CI/CD?
          </h2>
          <p className="text-lg text-text-light/70 dark:text-text-dark/70">
            Join the waitlist and be the first to ship production-ready pipelines
            with AutoDeploy.
          </p>
        </div>

        <div className="w-full max-w-xl mx-auto flex flex-col gap-3">
          {error && (
            <div className="text-red-500 text-sm font-medium text-left">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 px-4 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleJoin}
              disabled={loading}
              className="h-12 px-6 rounded-lg bg-primary text-white font-bold disabled:opacity-50"
            >
              {loading ? "Joining..." : "Join the waitlist"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
