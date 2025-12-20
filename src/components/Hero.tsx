type HeroProps = {
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  handleJoin: () => void;
  error: string;
};

export default function Hero({
  email,
  setEmail,
  loading,
  handleJoin,
  error,
}: HeroProps) {
  return (
    <section className="pt-32 pb-24 px-6 flex flex-col items-center text-center gap-10">
      <div className="max-w-3xl flex flex-col gap-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Ship production-ready CI/CD pipelines in minutes
        </h1>
        <p className="text-lg text-text-light/80 dark:text-text-dark/80">
          AutoDeploy generates secure, cloud-native pipelines from your repo —
          no YAML wrangling, no copy-paste, no guesswork.
        </p>
      </div>

      <div className="w-full max-w-xl flex flex-col gap-3">
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
    </section>
  );
}
