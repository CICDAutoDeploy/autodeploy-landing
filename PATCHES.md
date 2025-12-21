# PATCHES

## Docs TOC refactor (2025-12-21)

- Introduced `src/components/docs/docsToc.ts` as a single source of truth for docs table-of-contents metadata.
- Each docs page now co-locates its TOC with content by exporting a `*Toc` array (e.g. `configureToc`, `quickstartToc`).
- `DocsOnThisPage` now imports `docsToc` and no longer hard-codes per-doc TOC entries, reducing duplication when adding new docs.

## DRY patterns

- **Co-located metadata**: Section IDs (`id="..."`) and their labels live next to the content in each docs component, avoiding separate, hand-maintained maps.
- **Central registry**: `docsToc` re-exports these `*Toc` arrays and exposes a `Record<DocSlug, TocItem[]>` used by navigation/TOC components.
- **Consistent IDs**: All headings used in the TOC follow a predictable naming scheme (e.g. `configure-...`, `quickstart-...`, `pipelines-...`), making it easy to grep and refactor.
- **Future additions**: To add a new doc with TOC support you only:
  - Add `id` attributes to headings.
  - Export a `myDocToc` array from that doc component.
  - Register it once in `docsToc.ts` under the appropriate `DocSlug`.