import { useEffect, useState } from "react";
import type { DocSlug } from "./types";
import { docsToc } from "./docsToc";

export default function DocsOnThisPage({ doc }: { doc: DocSlug }) {
  const items = docsToc[doc] ?? [];
  const [activeId, setActiveId] = useState<string | null>(
    items.length > 0 ? items[0].id : null
  );

  // Keep activeId in sync with scroll position inside the docs center column
  useEffect(() => {
    if (items.length === 0) return;

    const container = document.getElementById("docs-scroll");
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry whose section is mostly in view
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));

        if (visible.length > 0) {
          const id = visible[0].target.id;
          if (items.some((i) => i.id === id)) {
            setActiveId(id);
          }
        }
      },
      {
        root: container,
        threshold: [0.3, 0.6],
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [doc]);

  return (
    <aside className="hidden lg:block w-[11rem] flex-shrink-0 py-2 pl-6">
      <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
        <h4 className="text-sm font-semibold text-slate-100 mb-4 uppercase tracking-wider">
          On this page
        </h4>
        <ul className="space-y-3 text-sm border-l border-white/10">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById(item.id);
                  const container = document.getElementById("docs-scroll");

                  if (el && container) {
                    const containerRect = container.getBoundingClientRect();
                    const elRect = el.getBoundingClientRect();
                    const offset =
                      elRect.top - containerRect.top + container.scrollTop - 16;

                    container.scrollTo({ top: offset, behavior: "smooth" });
                  }

                  setActiveId(item.id);
                }}
                className={`block w-full text-left pl-4 -ml-[1px] border-l-2 transition-colors ${
                  activeId === item.id
                    ? "text-emerald-300 border-emerald-400"
                    : "text-slate-300/80 hover:text-white border-transparent hover:border-white/30"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 p-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-glass text-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/40">
          <h5 className="text-sm font-semibold text-white mb-2">Need help?</h5>
          <p className="text-xs text-slate-200/80 mb-3">
            Can&apos;t find what you&apos;re looking for? Reach out to our support
            team.
          </p>
          <a
            className="text-xs font-medium text-emerald-300 hover:text-emerald-200 flex items-center gap-1"
            href="mailto:team@autodeploy.app"
          >
            Contact Support
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
