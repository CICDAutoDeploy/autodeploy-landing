import type { DocsIndexItem } from "./docsConfig";
import { DocsSearchMenu } from "./DocsSearchMenu";

type DocsSearchDialogProps = {
  open: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  recentDocs: DocsIndexItem[];
  popularDocs: DocsIndexItem[];
  filteredDocs: DocsIndexItem[];
  onSelectDoc: (slug: DocsIndexItem["slug"]) => void;
  onClose: () => void;
  wrapperClassName?: string;
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
  wrapperClassName,
}: DocsSearchDialogProps) {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-40 flex items-start justify-center px-4 ${wrapperClassName ?? ""}`}
    >
      <div className="w-full max-w-md">
        <DocsSearchMenu
          query={query}
          onQueryChange={onQueryChange}
          recentDocs={recentDocs}
          popularDocs={popularDocs}
          filteredDocs={filteredDocs}
          onSelectDoc={onSelectDoc}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
