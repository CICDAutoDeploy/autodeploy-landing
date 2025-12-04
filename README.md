# AutoDeploy Landing Page

A modern, responsive marketing site for **AutoDeploy** — the AI‑powered CI/CD automation platform.

Built with:
- **React + TypeScript**
- **Vite**
- **TailwindCSS (via CDN)**

This is a standalone marketing website that will be deployed to `autodeploy.app` and linked to the main MCP dashboard.

---

## 🚀 Features
- Clean, responsive UI
- Hero section, feature breakdown, team section, and CTA
- Configurable branding for AutoDeploy
- “Sign In” button linking to the live dashboard (`https://app.autodeploy.dev`)
- “Join the Waitlist” button routing to `/waitlist` (Supabase‑backed form coming next)

---

## 📁 Project Structure
```
autodeploy-landing/
 ├─ src/
 │   ├─ App.tsx        # Main landing page
 │   ├─ main.tsx       # Entry point
 │   └─ assets/        # Images, icons (optional)
 ├─ index.html         # Tailwind config + root mount
 ├─ package.json
 ├─ vite.config.ts
 └─ README.md
```

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

Supports hosting on:
- Vercel
- Netlify
- Cloudflare Pages (recommended since the domain is on Cloudflare)

---

## 🔗 Environment / Links
- Dashboard: `https://app.autodeploy.dev`
- Waitlist route (to be implemented): `/waitlist`

---

## 👥 Team
- **Paython Veazie** – Lead Engineer
- **Lorenc Dedaj** – Backend Engineer
- **Victoria Williams** – UX / Frontend Engineer

---

## 📌 Next Steps
- Add `/waitlist` page
- Integrate Supabase waitlist table
- Add analytics (Umami, Plausible, or Cloudflare analytics)
- Add SEO metadata and OpenGraph banners

---

If you are contributing to this repo, feel free to open PRs under the `autodeploy-app` organization.
