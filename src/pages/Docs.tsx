import React, { useEffect, useState } from "react";
import DocsSidebar from "../components/docs/DocsSidebar";
import DocsOnThisPage from "../components/docs/DocsOnThisPage";
import { DOC_COMPONENTS } from "../components/docs/docsRegistry";
import type { DocSlug } from "../components/docs/types";

export default function DocsPage() {
  const [doc, setDoc] = useState<DocSlug>("intro");
  const Content = DOC_COMPONENTS[doc];

  // Expose a global helper so the mobile navbar drawer can change docs
  useEffect(() => {
    window.setDocSlug = (slug: DocSlug) => {
      setDoc(slug);
      // Ensure we scroll to the top of the docs content when switching
      const el = document.getElementById("docs-scroll");
      if (el) {
        el.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    return () => {
      delete window.setDocSlug;
    };
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      {/* Desktop layout: sidebars + scrollable center */}
      <div className="hidden lg:grid grid-cols-[minmax(11rem,max-content),minmax(0,1fr),minmax(11rem,max-content)] gap-8 h-[calc(100vh-8rem)]">
        <div className="h-full">
          <DocsSidebar active={doc} onSelect={setDoc} />
        </div>

        <main
          id="docs-scroll"
          className="h-full overflow-y-auto pl-4 pr-6 lg:pl-6 lg:pr-8 scroll-smooth docs-scrollbar"
        >
          <div className="w-full max-w-3xl">
            <Content />
          </div>
        </main>

        <div className="h-full">
          <DocsOnThisPage doc={doc} />
        </div>
      </div>

      {/* Mobile layout: just render content; sidebars hidden via their own breakpoints */}
      <div className="lg:hidden">
        <Content />
      </div>
    </div>
  );
}
