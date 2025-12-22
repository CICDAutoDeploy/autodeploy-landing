import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { DocsIndexItem } from "./docsConfig";

type DocsSearchDialogProps = {
  open: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  recentDocs: DocsIndexItem[];
  popularDocs: DocsIndexItem[];
  filteredDocs: DocsIndexItem[];
  onSelectDoc: (slug: DocsIndexItem["slug"]) => void;
  onClose: () => void;
};

export function DocsSearchDialog({
  open,
  query,
  onQueryChange,
  recentDocs,
  popularDocs,
  filteredDocs,
  onSelectDoc,
  onClose,
}: DocsSearchDialogProps) {
  if (!open) return null;

  const showDefaultState = query === "";

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center pt-24 px-4">
      <div
        className="absolute inset-x-0 bottom-0 top-[4.5rem] bg-transparent"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/15 bg-black/60 shadow-glass backdrop-blur overflow-hidden text-sm text-slate-100 flex flex-col max-h-[calc(100vh-6rem)]">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-transparent flex-none">
          <MagnifyingGlassIcon className="h-4 w-4 text-slate-300" />
          <input
            id="docs-search-input"
            className="flex-1 bg-transparent outline-none text-sm text-slate-50 placeholder:text-slate-400"
            placeholder="Search docs..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-100 text-xs"
          >
            Esc
          </button>
        </div>

        <div className="flex-1 min-h-[3.5rem] overflow-y-auto">
          {showDefaultState ? (
            <>
              {recentDocs.length > 0 && (
                <div className="px-4 pt-3 pb-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-1">
                    Recent
                  </div>
                  <ul className="space-y-1">
                    {recentDocs.map((item) => (
                      <li key={item.slug}>
                        <button
                          type="button"
                          onClick={() => onSelectDoc(item.slug)}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/5"
                        >
                          <span className="material-symbols-outlined text-xs text-slate-400">
                            history
                          </span>
                          <span className="text-sm text-slate-100">
                            {item.label}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="px-4 pt-3 pb-4 border-t border-white/10">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-1">
                  Popular
                </div>
                <ul className="space-y-1">
                  {popularDocs.map((item) => (
                    <li key={item.slug}>
                      <button
                        type="button"
                        onClick={() => onSelectDoc(item.slug)}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/5"
                      >
                        <span className="material-symbols-outlined text-xs text-slate-400">
                          description
                        </span>
                        <span className="text-sm text-slate-100">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    Press <span className="font-semibold text-slate-300">Enter</span> to
                    select
                  </span>
                  <span>
                    Press <span className="font-semibold text-slate-300">Esc</span> to close
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="px-4 pt-3 pb-4">
              {filteredDocs.length === 0 ? (
                <p className="text-xs text-slate-400">No docs match your search.</p>
              ) : (
                <ul className="space-y-1">
                  {filteredDocs.map((item) => (
                    <li key={item.slug}>
                      <button
                        type="button"
                        onClick={() => onSelectDoc(item.slug)}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-white/5"
                      >
                        <span className="material-symbols-outlined text-xs text-slate-400">
                          description
                        </span>
                        <span className="text-sm text-slate-100">
                          {item.label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
