import type { DocSlug } from "./types";
import { docsSections } from "../navbar/docsConfig";
import { PUBLISHED_DOC_SLUGS } from "./docsRegistry";

export default function DocsSidebar({
  active,
  onSelect,
}: {
  active: DocSlug;
  onSelect: (slug: DocSlug) => void;
}) {
  const filteredSections = docsSections
    .map((section) => ({
      title: section.title,
      items: section.items.filter((item) => PUBLISHED_DOC_SLUGS.has(item.slug)),
    }))
    .filter((section) => section.items.length > 0);
  return (
    <aside className="hidden lg:block flex-shrink-0 border-r border-white/10 py-2 pr-6 min-w-[11rem]">
      <nav className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 space-y-8 text-sm docs-scrollbar">
        {filteredSections.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold uppercase tracking-wider text-slate-100 mb-3 text-xs">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item) => {
                const isActive = item.slug === active;
                return (
                  <li key={item.slug}>
                    <button
                      type="button"
                      onClick={() => onSelect(item.slug)}
                      className={`block w-full text-left text-sm pl-4 border-l-2 -ml-px transition-colors ${
                        isActive
                          ? "text-emerald-300 font-medium border-emerald-400"
                          : "text-slate-300/80 hover:text-white border-transparent hover:border-white/30"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
