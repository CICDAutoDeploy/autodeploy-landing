import { useState } from "react";

const BASIC_PIPELINE_YAML = `name: basic-ci\n\non:\n  push:\n    branches: [ main ]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n      - run: npm install\n      - run: npm test\n`;

const AUTODEPLOY_PIPELINE_YAML = `name: autodeploy-ci\n\non:\n  push:\n    branches: [ main ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    timeout-minutes: 15\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n          cache: 'npm'\n      - run: npm ci\n      - run: npm test\n\n  deploy:\n    if: github.ref == 'refs/heads/main' && github.event_name == 'push'\n    needs: test\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Deploy with AutoDeploy\n        run: ./scripts/deploy.sh\n`;

type ChecklistItem = {
  label: string;
  status: "good" | "warn" | "missing";
};

const BEFORE_CHECKLIST: ChecklistItem[] = [
  {
    label: "Runs tests on main branch only",
    status: "good",
  },
  {
    label: "No pull request validation",
    status: "missing",
  },
  {
    label: "No dependency caching",
    status: "missing",
  },
  {
    label: "No explicit deploy step or rollback story",
    status: "missing",
  },
];

const AFTER_CHECKLIST: ChecklistItem[] = [
  {
    label: "Tests run on pushes and pull requests",
    status: "good",
  },
  {
    label: "Node version + npm cache configured for faster builds",
    status: "good",
  },
  {
    label: "Deploy job gated on green tests on main",
    status: "good",
  },
  {
    label: "Structured deploy step ready for rollback hooks",
    status: "warn",
  },
];

function ChecklistBadge({ status }: { status: ChecklistItem["status"] }) {
  if (status === "good") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Good
      </span>
    );
  }

  if (status === "warn") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Needs attention
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-200">
      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
      Missing
    </span>
  );
}

export default function PipelineHistoryDemo() {
  const [view, setView] = useState<"before" | "after">("before");

  const yaml = view === "before" ? BASIC_PIPELINE_YAML : AUTODEPLOY_PIPELINE_YAML;
  const checklist = view === "before" ? BEFORE_CHECKLIST : AFTER_CHECKLIST;

  return (
    <div className="not-prose mt-4 mb-8">
      <div className="rounded-2xl border border-slate-600/80 bg-slate-900/60 px-4 py-3 text-xs text-slate-100 shadow-glass">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300 mb-2">
          Example: pipeline health & before/after
        </p>
        <p className="text-slate-300/80 mb-3">
          Instead of calling live <code className="text-[11px]">/mcp/v1/pipeline_history</code>, this
          mock demo compares a basic pipeline with an AutoDeploy-tuned version and highlights best
          practices.
        </p>

        <div className="inline-flex rounded-full border border-white/10 bg-black/40 p-0.5 text-[11px] mb-3">
          <button
            type="button"
            onClick={() => setView("before")}
            className={`px-3 py-1 rounded-full transition-colors ${
              view === "before"
                ? "bg-white/10 text-slate-100"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            Basic pipeline
          </button>
          <button
            type="button"
            onClick={() => setView("after")}
            className={`px-3 py-1 rounded-full transition-colors ${
              view === "after"
                ? "bg-white/10 text-slate-100"
                : "text-slate-400 hover:text-slate-100"
            }`}
          >
            AutoDeploy tuned
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-2 items-start">
          <div className="rounded-md border border-slate-700/80 bg-black/50 max-h-64 overflow-auto">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700/80">
              <p className="text-[10px] font-semibold text-slate-200">
                {view === "before" ? "Basic GitHub Actions workflow" : "Improved workflow"}
              </p>
              <span className="text-[10px] text-slate-500">YAML preview</span>
            </div>
            <pre className="text-[10px] leading-snug whitespace-pre px-3 py-2 font-mono text-slate-100">
              {yaml}
            </pre>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-semibold text-slate-200">
              Pipeline health checklist
            </p>
            <ul className="space-y-1.5">
              {checklist.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start justify-between gap-2 rounded-md border border-white/5 bg-black/30 px-2 py-1.5"
                >
                  <p className="text-[10px] text-slate-100 pr-2">{item.label}</p>
                  <ChecklistBadge status={item.status} />
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-slate-500">
              AutoDeploy starts from your existing workflow and incrementally adds checks, caching,
              and safer deploy steps4without forcing a full rewrite.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
