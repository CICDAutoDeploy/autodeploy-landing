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

---

## Additional: Navbar Refactor & Tests

This branch also includes a follow-up refactor of the navbar itself to make it more modular and testable without changing the outward UX.

### What changed in the navbar

- `Navbar.tsx` now delegates most markup and side-effects to `src/components/navbar/`:
  - `DocsSearchDialog.tsx` – docs search overlay (recent/popular docs + filtered results).
  - `DesktopNavLinks.tsx` – desktop navigation buttons.
  - `MobileMenu.tsx` – mobile drawer for marketing nav and docs TOC.
  - `BrandButton.tsx` – logo button that navigates home and scrolls to the top.
  - `AccountMenu.tsx` – account avatar + dropdown with profile/settings/resources/auth actions.
  - `docsConfig.ts` – shared docs index/sections used by search and mobile docs nav.
  - `useActiveSection.ts` – hook for tracking the active marketing section via scroll + IntersectionObserver.
  - `useDocsSearch.ts` – hook for docs search state, localStorage-backed recents, and keyboard shortcuts.
  - `userDisplay.ts` – helper for deriving display name/email/initials from `currentUser`.

### Behavior (unchanged, but now encapsulated)

- Marketing nav items (`Home`, `Features`, `Docs`, `Team`, `Contact`) behave exactly as before, but logic is centralized in `DesktopNavLinks` and `MobileMenu`.
- `useActiveSection` continues to:
  - Highlight `Features` / `Docs` / `Team` as you scroll the home page.
  - Bias towards `Home` when near the top of the page.
- `useDocsSearch` continues to:
  - Open docs search on `Ctrl+K` / `Cmd+K` and close on `Esc`.
  - Hydrate and persist recent docs in `localStorage`.
  - Navigate to the docs page and call `window.setDocSlug` when a result is selected.
- `AccountMenu` still uses the temporary `currentUser` model but now encapsulates its own open/close state and markup.

### Tests added/updated

- New unit tests:
  - `src/test/useActiveSection.test.tsx` – validates default state, reset behavior when `page` changes, and `scrollToSection`.
  - `src/test/useDocsSearch.test.tsx` – covers hydration from `localStorage`, open/close behavior, and `navigateToDoc` side effects.
  - `src/test/AccountMenu.test.tsx` – ensures dropdown open/close and `Log in`/`Log out` labels are correct.
  - `src/test/BrandButton.test.tsx` – checks navigation + scroll behavior from home vs non-home.
- Existing suites (`Navbar.test.tsx`, `Navbar.docs-search.test.tsx`, `App.test.tsx`) have been kept passing against the refactored implementation.

Reviewers can skim the new files under `src/components/navbar/` and the four new test files to understand how the navbar is now composed.

---

## Additional: OAuth + Current User Wiring

As part of the navbar work, the account menu is now backed by the real backend session rather than a hard-coded stub.

### Frontend changes

- `src/lib/api.ts`:
  - Exposes `API_BASE_URL` (from `VITE_API_BASE_URL`).
  - Adds `startGithubLogin()` which redirects to `${API_BASE_URL}/auth/github/start` to initiate GitHub OAuth.
  - Adds `logoutSession()` which calls `POST ${API_BASE_URL}/auth/local/logout` and reloads the page.
  - Adds `fetchCurrentUser()` which calls `GET ${API_BASE_URL}/api/me` with `credentials: 'include'` and normalizes the nested `{ ok, user: { github_username, email, ... } }` payload into `{ isAuthenticated, name, email }`.
- `src/lib/currentUser.ts`:
  - Replaces the static `currentUser` with a `useCurrentUser()` hook.
  - On mount, `useCurrentUser()` calls `fetchCurrentUser()` and updates local state; failures or 401/403 responses fall back to an anonymous user.
- `src/components/Navbar.tsx`:
  - Uses `useCurrentUser()` and `getUserDisplay()` to derive `displayName`, `displayEmail`, and initials for the account menu.
- `src/components/navbar/AccountMenu.tsx`:
  - The bottom button now calls `startGithubLogin()` when unauthenticated and `logoutSession()` when authenticated.

### Behavior

- Logging in via GitHub OAuth now results in:
  - A backend-set `mcp_session` cookie.
  - `/api/me` returning the authenticated user (including `github_username` and `email`).
  - The navbar avatar showing the user initials and account menu showing the GitHub username/email, with a **Log out** action.
- Logging out clears the session cookie on the backend and reloads the SPA; subsequent `/api/me` calls return anonymous and the account menu reverts to the unauthenticated state.

---

## Additional: Roles, Plans, and Beta Pro Access

This branch also wires the frontend to the backend's role/plan/beta model so we can cleanly separate regular, pro, and system (admin) users and progressively roll out pro features.

### Backend model (summarized)

- `users.role` (enum):
  - `USER` – regular authenticated user.
  - `SYSTEM_ADMIN` – admin/system user in a separate trust zone.
- `users.plan` (enum):
  - `free` – default plan.
  - `pro` – paid/advanced plan.
- `users.beta_pro_granted` (boolean):
  - Per-user flag used to treat early adopters as pro even if their plan is `free`.

Global env flags:

- `BETA_TREAT_ALL_AS_PRO=true` → treat **all** authenticated users as pro at the authz layer.
- `BETA_AUTO_BETA_PRO=true` → automatically set `beta_pro_granted=true` for new signups (local or GitHub OAuth).

### Frontend integration

- `fetchCurrentUser()` (in `src/lib/api.ts`) now returns:
  - `isAuthenticated`
  - `name`, `email`
  - `isPro` – derived from `plan === 'pro'` or `beta_pro_granted === true` (mirroring backend rules).
  - `isAdmin` – derived from `role === 'SYSTEM_ADMIN'`.
- `useCurrentUser()` (in `src/lib/currentUser.ts`) exposes these flags throughout the SPA.
- `getUserDisplay()` now passes through `isPro` / `isAdmin` to the navbar.
- `AccountMenu` renders small "Pro" and "Admin" badges next to the display name when appropriate.

### Behavior

- Pro/beta users see a "Pro" pill in the account menu and have access to agent-related features (gated server-side by `USE_AGENT`).
- System admins see an "Admin" pill and can hit admin-only backend routes (e.g., `/users`, `/users/promote`, gated by `MANAGE_USERS`).
- Free users with no beta flags see no badge and are rejected by pro-only backend endpoints once global beta is turned off.

---

## Update: Auth-Aware Navbar, System Banners, and Admin Console (Follow-up)

This follow-up change builds on the existing navbar/docs work to wire the SPA to the real backend auth model and expose a minimal admin surface.

### What’s new in this update

- **Auth-aware navbar & account menu**
  - `fetchCurrentUser()` now derives `isPro` and `isAdmin` from backend `plan`, `beta_pro_granted`, and `role`.
  - `useCurrentUser()` hydrates the navbar and account menu from `/api/me`.
  - `AccountMenu` shows initials/email plus "Pro" and "Admin" badges when applicable.

- **Agent entry point + Pro gating**
  - Adds a `Launch AutoDeploy` button under the account menu **Product** section.
  - Only Pro users can actually open the agent; non-Pro users see `Launch AutoDeploy (Pro)`.
  - Non-Pro clicks trigger a short-lived top-of-page banner explaining that the deployment agent is a Pro feature and how to request access.

- **Top-of-page banner system**
  - Global `window.showBanner(message, tone, options)` helper for client-side UX banners.
  - System banners hydrated from `GET /api/system-banner` and rendered above the navbar; navbar is offset when a banner is present.
  - Backend exposes `GET/POST/DELETE /api/system-banner` and a `system_banners` table, documented in `server/src/BACKEND_FLOWS.md`.

- **Admin Console**
  - New `AdminPage` reachable via an **Admin Console** item in the account menu for `SYSTEM_ADMIN` users.
  - Section 1: **Users & roles** – lists recent users via `GET /users` and allows promoting/demoting `SYSTEM_ADMIN` via `POST /users/promote`.
  - Section 2: **System banner** – shows the current banner, allows clearing it, and provides a form to set a new message/tone/sticky flag.

### Testing

- Ran `npm test` to validate navbar, account menu, and app wiring.
- Manually verified end-to-end flows:
  - `/api/me` hydration into the navbar account menu.
  - Pro / Admin badges rendering based on backend state.
  - `Launch AutoDeploy` behavior for Pro vs non-Pro users (including banner upsell).
  - System banner showing on page load when configured via the Admin Console.
  - Admin Console user list and promote/demote buttons updating roles correctly.

### Navbar polish (follow-up)

A small UX follow-up was made to polish the navbar overlays:

- **Account menu**: the dropdown is now anchored to the avatar button (no hard-coded top offset), supports click-away + `Esc` to close, and focuses the first item when opened.
- **Docs search (desktop)**: the `Search docs...` pill no longer disappears when the inline search menu opens; it stays visible and toggles open/close.

---

### Update: MCP v1 Demos and Typed Helpers (Marketing Site)

This follow-up originally added a thin but functional bridge between the marketing/docs SPA and the AutoDeploy backend’s MCP v1 surface. The latest iteration keeps the typed helpers but replaces the live home-page demos with mock, self-contained experiences.

### What’s new

- **Live MCP status callout in docs**
  - New `McpStatusCallout` component under `src/components/docs/McpStatusCallout.tsx`.
  - Calls `GET /mcp/v1/status` via a typed `fetchMcpStatus()` helper in `src/lib/api.ts`.
  - Shows current v1 status, version, and the list of registered MCP tools, with a deprecation note pointing at v2 when present.
  - Renders on the "MCP" frontend docs page (`FrontendMcp`) so readers can see a "live" reflection of the backend.

- **Typed MCP v1 helpers in the landing SPA**
  - Extended `src/lib/api.ts` with:
    - `MCP_V1_BASE_URL` – shared base for `/mcp/v1` calls.
    - Envelope types for v1 tool responses (`success`) and pipeline routes (`ok`).
    - `callMcpTool()` – generic helper for `/mcp/v1/:tool_name`.
    - `fetchPipelineHistory()`, `rollbackPipeline()`, and `commitPipeline()` – wrappers around `/mcp/v1/pipeline_history`, `/mcp/v1/pipeline_rollback`, and `/mcp/v1/pipeline_commit` using the v1 envelopes.
    - Typed wrappers: `mcpListRepos()` / `mcpGetRepo()` (repo_reader), `mcpGeneratePipeline()` (pipeline_generator), `mcpListAwsRoles()` / `mcpListJenkinsJobs()` (oidc_adapter).

- **Home page MCP demo panel (now mock-only)**
  - The “How AutoDeploy works” section still includes a **Demo** button, but the content is now static:
    - `McpRepoListDemo` renders a **sample org overview** and a **pipeline template picker** backed by static data instead of calling `repo_reader`.
    - `PipelineHistoryDemo` shows a **basic vs AutoDeploy-tuned pipeline** diff plus a checklist of best practices, without calling `pipeline_history`.
  - This keeps the UX illustrative while avoiding flaky or slow live calls from the marketing surface.

- **Backend GitHub Actions docs integration**
  - The backend docs page for GitHub Actions (`BackendGithubActions`) still embeds the same `McpRepoListDemo` and `PipelineHistoryDemo` components beneath the MCP adapter and workflow sections.
  - Those embeds now show the same mock data, so docs remain useful even when the backend or MCP stack isn’t available.

### Notes for reviewers

- The marketing SPA no longer depends on `mcpListRepos` / `fetchPipelineHistory` for the home-page demos; all interactions in that panel are driven by static data.
- The typed MCP helpers remain available for future in-app dashboards or more advanced docs pages that need real backend data.
