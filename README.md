# 🚀 AutoDeploy Landing Page


A modern, responsive marketing site for **AutoDeploy** — an AI‑powered CI/CD automation platform that helps teams ship production‑ready pipelines faster.

[![Live Site](https://img.shields.io/badge/Live%20Site-autodeploy.app-0ea5e9?logo=cloudflare&logoColor=white)](https://autodeploy.app)

![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)
![Language](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)
![Build](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white)
![Styling](https://img.shields.io/badge/Styling-TailwindCSS-38BDF8?logo=tailwindcss&logoColor=white)
![Hosting](https://img.shields.io/badge/Hosting-Cloudflare%20Pages-F38020?logo=cloudflare&logoColor=white)
[![Deploy](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-success?logo=cloudflare&logoColor=white)](https://autodeploy-landing.pages.dev)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 💡 Why this exists

Setting up CI/CD pipelines is often slow, error‑prone, and inconsistent across teams. AutoDeploy exists to remove that friction by analyzing repositories and generating secure, production‑ready pipelines automatically — so engineers can focus on shipping features instead of debugging YAML.

## 🚀 Features
- Clean, responsive UI
- Hero section, feature breakdown, team section, and CTA
- Configurable branding for AutoDeploy
- “Join the Waitlist” button routing to `/waitlist` (Supabase‑backed form coming next)
- Auth-aware navbar showing account state, Pro/Admin badges, and a `Launch AutoDeploy` entry point
- Navbar overlay polish:
  - Account menu dropdown is anchored to the avatar, closes on click-away / `Esc`, and focuses the first item on open
  - Desktop docs search pill stays visible while the inline search menu is open
- Top-of-page banner system for Pro upsell and system-wide notices
- Admin Console page for managing system banners, user roles, and Pro access
- Mock, self-contained demos on the home page “How AutoDeploy works” section (sample repos + template picker, before/after pipeline comparison) that no longer depend on live MCP calls

---

## 📁 Project Structure
```
autodeploy-landing/
├─ public/
│  └─ team/                 # Team headshots
├─ src/
│  ├─ components/
│  │  ├─ Footer.tsx          # Global footer
│  │  ├─ Navbar.tsx          # Top-level navbar that wires subcomponents/hooks
│  │  ├─ navbar/             # Extracted navbar components & hooks (DocsSearchDialog, MobileMenu, etc.)
│  │  └─ sections/           # Marketing sections (Hero, Features, ProblemSolution, HowItWorks, CTA, Team, BackToTop)
│  ├─ hooks/
│  │  └─ useWaitlist.ts      # Shared waitlist logic
│  ├─ pages/
│  │  ├─ Contact.tsx
│  │  ├─ Privacy.tsx
│  │  ├─ Terms.tsx
│  │  └─ Admin.tsx           # Admin console for system banners and user management
│  ├─ lib/
│  │  ├─ supabase.ts         # Supabase client for waitlist
│  │  ├─ api.ts              # Lightweight REST + auth/admin helpers (health, OAuth, current user, banners, users)
│  │  └─ currentUser.ts      # useCurrentUser() hook hydrated from backend /api/me
│  ├─ App.tsx                # App orchestration / routing
│  ├─ main.tsx              # Entry point
│  └─ index.css
├─ index.html
├─ vite.config.ts
├─ package.json
└─ README.md
```

---

## 🧩 Architecture (high level)

```
User Browser
     |
     | HTTPS
     v
Cloudflare Pages
 (Static Hosting)
     |
     | Serves
     v
React + TypeScript SPA (Vite)
     |
     | Waitlist submit
     v
Waitlist API
     |
     v
Supabase / Postgres
```

Notes:
- The marketing site is a static SPA deployed on Cloudflare Pages.
- CI runs on pull requests and main branch merges.
- The waitlist flow is backed by Supabase/Postgres.

---

## 🛠️ Development
Start the dev server:
```bash
npm install
npm run dev
```
Open the site at:
```
http://localhost:5173
```

---

## 🧪 Testing
Run the test suite (Vitest + Testing Library):
```bash
npm test
```

This covers:
- Navbar behavior (desktop + mobile + docs search)
- Extracted navbar hooks (`useActiveSection`, `useDocsSearch`)
- Account menu and brand button
- Waitlist flow and global toast wiring

---

## 🔧 Build for Production
```bash
npm run build
```
Output goes to `dist/`.

To preview the production build:
```bash
npm run preview
```

---

## 🌐 Deployment
This repo will be deployed to:
```
https://autodeploy.app
```

Hosting on:
- Cloudflare Pages

---

## 🔗 Links

- 🌍 **Live Site:** https://autodeploy.app
- 🧠 **AutoDeploy Org:** https://github.com/CICDAutoDeploy
- 📄 **Repository:** https://github.com/CICDAutoDeploy/autodeploy-landing


## 🔐 Auth, Roles, and Admin Surface

The landing SPA integrates with the AutoDeploy backend's authentication system to show account state and pro/admin status in the navbar and expose a minimal admin surface.

- Backend sets an HTTP-only `mcp_session` cookie after local or GitHub OAuth login.
- Frontend calls `GET ${VITE_API_BASE_URL}/api/me` (via `fetchCurrentUser()`) to hydrate:
  - `isAuthenticated`
  - `name`, `email`
  - `isPro` – based on backend `plan` and `beta_pro_granted` flags.
  - `isAdmin` – based on backend `role` (`SYSTEM_ADMIN`).
- The navbar account menu uses this to:
  - Swap between "Log in" and "Log out" actions.
  - Show initials/email for authenticated users.
  - Render "Pro" / "Admin" badges when applicable.
  - Provide a `Launch AutoDeploy` entry point (Pro-only) and an **Admin Console** link for admins.
- The Admin Console page exposes:
  - A **Users & roles** table powered by `GET /users` and `POST /users/promote`.
  - A **System banner** editor powered by `GET/POST/DELETE /api/system-banner`.

For more detail, see the docs under `readme/` in this repo and `AUTH.md` / `BACKEND_FLOWS.md` in the backend repo.

## 🔐 Environment Variables

This project requires a Vite environment file to configure Supabase access.

### Required variables

Create a file named `.env` in the **root directory** of the project with the following variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=http://localhost:3000   # URL of the AutoDeploy backend (for /health, /api/me, OAuth)
```

### Setup notes

- An `env-template` file is provided as a starting point
- Rename `env-template` → `.env`
- These variables are required for the waitlist flow to function correctly
- Do **not** commit `.env` files to source control
---

## 🧑‍💻 Local Setup (Checklist)

Use this checklist to get the project running locally from scratch.

### ✅ Prerequisites
- Node.js (v18+ recommended)
- npm

### ✅ Steps

1. Install dependencies
   ```bash
   npm install
   ```

2. Configure environment variables
   - Copy the template:
     ```bash
     cp env-template .env
     ```
   - Update `.env` with your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open the app
   ```
   http://localhost:5173
   ```

### ❗ Common issues
- Restart the dev server after editing `.env`
- If the waitlist does not submit, verify your Supabase keys
---

## 👥 Team

- **Paython Veazie**  
  Founding Engineer  
  GitHub: https://github.com/PVeazie951

- **Lorenc Dedaj**  
  Founding Engineer  
  GitHub: https://github.com/lorencDedaj

- **Victoria Williams**  
  Founding Engineer  
  GitHub: https://github.com/williams21v

---

## 📌 Next Steps
- Add analytics (Umami, Plausible, or Cloudflare analytics)
- Add SEO metadata and OpenGraph banners

---

If you are contributing to this repo, feel free to open PRs under the `autodeploy-app` organization.
