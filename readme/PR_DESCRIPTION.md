# PR: Dark Glass Docs Layout + DRY TOC + Navbar Refinements

## Summary

This PR modernizes the AutoDeploy marketing site and in-app docs with a unified dark glassmorphism aesthetic, a highly-usable documentation experience, and a DRY implementation for the docs table of contents.

At a high level, it:
- Applies a dark gradient + glassmorphism theme across the landing page and docs shell.
- Introduces a docs layout with sticky sidebars, a scrollable center content column, and smooth TOC navigation.
- Refines the navbar in both desktop and mobile views (including a docs-style search pill and GitHub icon).
- DRYs up the docs TOC wiring so adding new docs only requires touching the doc file and a single central registry.

## Related Commits / Areas

Some notable pieces of work included in this branch:

- **Dark docs layout + sticky sidebars**  
  - New `DocsPage` with three-column layout (left sidebar nav, scrollable middle content, right "On this page" TOC).
  - Sticky left/right sidebars that stay fixed while the center column scrolls.
  - Smooth internal navigation via TOC links.
  - IntersectionObserver-based active section highlighting as the user scrolls.
  - Custom sleek scrollbar styling for the center column only.

- **Dark glassmorphism theme**  
  - Dark gradient background shell and transparent body background.
  - Glassy panels using `bg-white/10`, `border-white/20`, `backdrop-blur-md`, and `shadow-glass`.
  - Consistent slate/emerald text and button styling.
  - Updated navbar, hero, feature sections, CTA, footer, and legal pages.

- **Navbar + footer refinements**  
  - Center-aligned desktop nav with `Home / Features / Docs / Team / Contact`.
  - Dynamic-island style dark glass navbar pill with matching footer bar.
  - Docs-style search pill (`Search docs…` + `Ctrl K`) and GitHub/account menu on the right.
  - Keyboard shortcut handling for `Ctrl+K` / `Cmd+K` and `Esc` to open/close the docs search dialog.
  - Recent + popular docs surfaced inside the search dialog with localStorage-backed "recent" history.
  - Desktop/mobile docs search overlay that subtly blurs the docs content column while keeping sidebars legible, now tuned to follow the visible docs viewport and align with the middle column. The click-away backdrop is now constrained to *below* the navbar so it no longer blocks interaction or inspection of the top bar.
  - Back-to-top button behavior refined to match the new dark glass shell and avoid conflicting with the docs search dialog.
  - Mobile breakpoint moved to `lg` so the hamburger mode kicks in when docs sidebars collapse.
  - When on the docs page in mobile view, the drawer shows the docs TOC instead of just top-level nav.
  - Vitest coverage for docs search behavior (filtering, keyboard shortcuts, recent docs, and navigation side effects).

- **Account menu + health wiring**  
  - Replaced the static GitHub icon in the navbar with an account avatar + dropdown menu (View Profile, Settings, Resources, and auth action).  
  - Introduced an anonymous `currentUser` model that renders a generic avatar and label when signed out, and initials/name/email when GitHub OAuth is wired in.  
  - Added a small `api.ts` helper and `/health` call used for wiring future settings/debug UI, while keeping that control hidden from the main marketing surface.

- **Docs content + MCP**  
  - Added user-facing KB pages for pipelines, environments, secrets, GitHub Actions, AWS & GCP, authentication, deployments, and logs.
  - Introduced an MCP core-concepts page explaining how AutoDeploy uses MCP behind the scenes, with full TOC integration.
  - Refined the MCP docs content and examples (`FrontendMcp`) to better match the current product behavior.

## Implementation Details

### Docs Layout

- `DocsPage` implements a **three-column responsive grid**:
  - **Left:** `DocsSidebar` listing sections such as Getting Started, Core Concepts, Integrations.
  - **Center:** `#docs-scroll` container, vertically scrollable, housing the main docs content.
  - **Right:** `DocsOnThisPage` component rendering an in-page TOC.
- Sidebars are sticky so navigation and TOC remain visible while reading.
- The center column content is horizontally centered (`max-w-3xl`) to reduce drift toward the right edge while keeping ample whitespace.
- On mobile (`lg:hidden`), the layout collapses to a single column content view; sidebars are hidden.
- Left and right columns use compact, content-based widths so the docs text has more horizontal breathing room.

### TOC + Scrolling Behavior

- Clicking a TOC item scrolls the middle column (`#docs-scroll`) smoothly to the corresponding heading.
- An `IntersectionObserver` watches headings inside the center column and updates the active TOC entry as the user scrolls.
- Active TOC item is styled to match the rest of the dark/glass system (accent bar + color).

### DRY Docs TOC Wiring

- Introduced `src/components/docs/docsToc.ts` as the central map from `DocSlug` to `TocItem[]`.
- Each docs page exports a small `*Toc` array (e.g., `introToc`, `configureToc`, `quickstartToc`, `pipelinesToc`, `secretsToc`, etc.) co-located with its headings and `id`s.
- `DocsOnThisPage` now imports `docsToc` and does **not** maintain its own hard-coded TOC map.
- To add a new doc with TOC support you:
  - Add `id` attributes to the headings you care about.
  - Export a `myDocToc` array from that doc component.
  - Register it once in `docsToc.ts` under the appropriate `DocSlug`.

### Theming / Visual Polish

- Dark gradient background is provided by the app shell; the body background was updated to be transparent so the gradient shows through.
- Glass panels and cards use consistent Tailwind utility combinations:
  - `bg-white/10`, `border-white/20`, `backdrop-blur-md`, `shadow-glass`, rounded corners.
- Typography:
  - Headings use white text with strong weights.
  - Body text uses `text-slate-200/80–90` for contrast on dark backgrounds.
  - Links and accents use emerald tones (`text-emerald-300`, `border-emerald-400`, etc.).
- Scrollbar styling (scoped to `#docs-scroll` only):
  - Thin thumb in slate hues.
  - Transparent track.
  - Fully rounded for a subtle, modern feel.

### Layout Refinements

- Reduced the left docs sidebar width to shrink the visual left margin and better center the main copy between sidebars.
- Right-hand "On this page" column now matches the compact sizing of the left sidebar.
- Ensured the root app container uses `overflow-x-hidden` instead of `overflow-hidden` so sticky positioning for the docs sidebars works correctly.
- Footer padding/gap adjusted so links and copyright are legible and not cramped.

## User Experience

- Landing page now consistently communicates the product via a high-contrast dark glass aesthetic with refined cards, nav, and CTAs.
- Docs page offers an **app-like reading experience**:
  - Quick section jumping from both sidebar nav and TOC.
  - Always-visible context via sticky sidebars.
  - Smooth scroll + active section tracking to orient the reader.

## Testing & Verification

- Ran `npm run build` to verify the TypeScript build and Vite bundling succeed.
- Manually verified in the browser:
  - Navigation between landing page, docs, and legal/contact pages.
  - Sticky behavior of left/right docs sidebars.
  - TOC click behavior and active-state updates while scrolling.
  - Scrollbar appearance scoped to docs center column.

## Notes for Reviewers

- This PR is primarily **UI/UX and layout** focused; there are no breaking backend/API changes.
- Docs KB content is non-destructive and meant to be iterated on, but the structure (headings + IDs + TOCs) is now stable.
- Please pay extra attention to:
  - Responsive behavior at `lg` breakpoint boundaries (including navbar switching to mobile mode when sidebars collapse).
  - Any unexpected scroll/overflow behavior in non-Chromium browsers.
  - TOC highlighting / scrolling across all docs pages (intro, quickstart, pipelines, environments, secrets, integrations, and API reference docs).
