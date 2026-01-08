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
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow">
          Ship production-ready CI/CD pipelines in minutes
        </h1>
        <p className="text-lg text-slate-200/80">
          AutoDeploy generates secure, cloud-native pipelines from your repo —
          no YAML wrangling, no copy-paste, no guesswork.
        </p>
      </div>

      <div className="w-full max-w-xl flex flex-col gap-3">
        {error && (
          <div className="text-red-300 text-sm font-medium text-left">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-glass p-3 sm:p-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-11 sm:h-12 px-4 rounded-lg border border-white/20 bg-white/5 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
          />
          <button
            onClick={handleJoin}
            disabled={loading}
            className="h-11 sm:h-12 px-6 rounded-lg border border-emerald-300/50 bg-emerald-400/20 text-emerald-50 font-semibold hover:bg-emerald-400/30 hover:border-emerald-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Joining..." : "Join the waitlist"}
          </button>
        </div>
      </div>
    </section>
  );
}
