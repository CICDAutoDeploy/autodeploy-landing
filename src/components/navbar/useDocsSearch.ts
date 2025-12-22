import { useEffect, useState } from "react";
import type { Page } from "../Navbar";
import type { DocSlug } from "../docs/types";
import {
  FLAT_DOCS_INDEX,
  RECENT_STORAGE_KEY,
  type DocsIndexItem,
} from "./docsConfig";

type UseDocsSearchArgs = {
  page: Page;
  setPage: (page: Page) => void;
};

export function useDocsSearch({ page, setPage }: UseDocsSearchArgs) {
  const [docsSearchOpen, setDocsSearchOpen] = useState(false);
  const [docsSearchQuery, setDocsSearchQuery] = useState("");
  const [recentDocs, setRecentDocs] = useState<DocsIndexItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(RECENT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DocsIndexItem[];
        const valid = parsed.filter((item) =>
          FLAT_DOCS_INDEX.some((d) => d.slug === item.slug),
        );
        setRecentDocs(valid.slice(0, 5));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const recordRecentDoc = (item: DocsIndexItem) => {
    setRecentDocs((prev) => {
      const deduped = [item, ...prev.filter((p) => p.slug !== item.slug)].slice(
        0,
        5,
      );
      try {
        window.localStorage.setItem(
          RECENT_STORAGE_KEY,
          JSON.stringify(deduped),
        );
      } catch {
        // ignore write errors
      }
      return deduped;
    });
  };

  const openDocsSearch = () => {
    setDocsSearchOpen(true);
    document.documentElement.classList.add("docs-search-open");

    setTimeout(() => {
      const input = document.getElementById("docs-search-input") as
        | HTMLInputElement
        | null;
      input?.focus();
    }, 0);
  };

  const closeDocsSearch = () => {
    setDocsSearchOpen(false);
    setDocsSearchQuery("");
    document.documentElement.classList.remove("docs-search-open");
  };

  const navigateToDoc = (slug: DocSlug) => {
    const match = FLAT_DOCS_INDEX.find((d) => d.slug === slug);
    if (match) {
      recordRecentDoc(match);
    }
    if (page !== "docs") {
      setPage("docs");
      setTimeout(() => {
        window.setDocSlug?.(slug);
      }, 0);
    } else {
      window.setDocSlug?.(slug);
    }
    closeDocsSearch();
  };

  const filteredDocs: DocsIndexItem[] = docsSearchQuery
    ? FLAT_DOCS_INDEX.filter((item) =>
        item.label.toLowerCase().includes(docsSearchQuery.toLowerCase()),
      )
    : [];

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("docs-search-open");
    };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      const ctrlOrMeta = e.ctrlKey || e.metaKey;
      if (ctrlOrMeta && isK) {
        e.preventDefault();
        openDocsSearch();
      } else if (e.key === "Escape" && docsSearchOpen) {
        e.preventDefault();
        closeDocsSearch();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [docsSearchOpen]);

  return {
    docsSearchOpen,
    docsSearchQuery,
    setDocsSearchQuery,
    recentDocs,
    filteredDocs,
    openDocsSearch,
    closeDocsSearch,
    navigateToDoc,
  };
}
