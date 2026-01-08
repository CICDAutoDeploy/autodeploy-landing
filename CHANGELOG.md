# Changelog

## 2025-12-29 – Admin console "Make Pro" action

Summary:
- Repurposed the Admin console Actions button to toggle the "Pro" plan instead of the SYSTEM_ADMIN role.

Frontend changes (autodeploy-landing):
- `src/lib/api.ts`: Added `setUserPro(userId, makePro)` that calls `POST /users/pro` and returns the updated `AdminUser`.
- `src/pages/Admin.tsx`:
  - Actions button now uses `isPro` to determine label and styling ("Make pro" / "Remove pro").
  - Calls `setUserPro` instead of `setUserAdmin` and shows Pro-specific toast messages.

Backend changes (AutoDeploy/server):
- `routes/usersRoutes.js`:
  - Added `POST /users/pro` which updates `users.plan` (`'free' | 'pro'`) and `users.beta_pro_granted` based on `make_pro`.
  - Returns the same `user` shape as `/users/promote` (`id, email, github_username, role, plan, beta_pro_granted, created_at`).

Notes / Requirements:
- Database schema must include `users.plan` (text/enum, e.g. `'free' | 'pro'`) and `users.beta_pro_granted` (boolean).
- The frontend currently treats a user as Pro when `plan === 'pro' || beta_pro_granted === true`. If you want admin toggles to be the single source of truth, update that logic accordingly.
- Only sessions with the `MANAGE_USERS` capability can call `/users/pro` (enforced via `requireCapability(Actions.MANAGE_USERS)`).

---

## 2025-12-29 – Mock MCP demos for repos and pipelines

Summary:
- Replaced live MCP demos on the marketing/docs surface with static, deterministic demos that illustrate how AutoDeploy works without making real backend calls.

Frontend changes (autodeploy-landing):
- `src/components/docs/McpRepoListDemo.tsx`:
  - Now renders a **sample org overview** from a static `SAMPLE_REPOS` list instead of calling `repo_reader`.
  - Adds a **pipeline template picker** backed by `DEMO_TEMPLATES` so users can preview example YAML for common app/provider combinations (Node API on GHA, Next.js app, Python service on GCP).
- `src/components/docs/PipelineHistoryDemo.tsx`:
  - Replaced the `pipeline_history` API form with a **before/after pipeline comparison** (`BASIC_PIPELINE_YAML` vs `AUTODEPLOY_PIPELINE_YAML`).
  - Adds a **pipeline health checklist** with badges (Good / Needs attention / Missing) to communicate best practices.

Notes / Rationale:
- These demos are intentionally mock-only and no longer depend on `mcpListRepos` or `fetchPipelineHistory`.
- The layout and copy still highlight what AutoDeploy does (repo understanding, template generation, pipeline hardening) while avoiding live API flakiness in the docs/marketing experience.

---

## 2025-12-29 – Landing demo mode flag + test hardening

Summary:
- Introduced a `VITE_LANDING_MODE` flag so the marketing SPA can run in **demo** mode (no real login/app access) before launch, and ensured the test suite runs cleanly with `matchMedia` mocked.

Frontend changes (autodeploy-landing):
- `src/lib/api.ts`:
  - Added `LandingMode`, `LANDING_MODE`, and `IS_DEMO_MODE` derived from `import.meta.env.VITE_LANDING_MODE` (defaults to `'demo'`).
- `src/lib/currentUser.ts`:
  - In demo mode, skips calling `/api/me` and always returns the anonymous user.
- `src/components/navbar/AccountMenu.tsx`:
  - In demo mode, keeps the avatar icon but replaces the menu with a short "app isn’t live yet" message and a **View docs** button.
  - Disables real auth actions and changes the bottom button label to `Sign-in disabled (demo)`.
- `src/test/*.test.tsx`:
  - Added lightweight `window.matchMedia` mocks for Navbar- and App-related tests.
  - Aligned `showBanner` typings in `AccountMenu.test.tsx` with the global declaration and skip AccountMenu "live" tests when `IS_DEMO_MODE` is true.

Notes:
- The README env section documents `VITE_LANDING_MODE=demo` as the default, with `live` to be used on real launch.
- `npm run build` and `npm test` both pass with the new wiring.
