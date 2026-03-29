# Indiana Choice Scholarship Program Annual Report

## Overview

Full-stack web application replicating the Indiana Choice Scholarship Program Annual Report (2024-2025). Displays all report content (text, tables, statistics) publicly, with a PDF download link and an admin portal for team members to update content dynamically.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS + shadcn/ui + wouter (routing) + React Query
- **API framework**: Express 5 (API server at `/api`)
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Replit Auth (OIDC/PKCE) via cookie session
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (API), Vite (frontend)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server (port 8080, routes at /api)
│   └── choice-report/      # React+Vite frontend (port 19220, served at /)
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks + fetch client
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   ├── db/                 # Drizzle ORM schema + DB connection
│   └── replit-auth-web/    # useAuth() hook for Replit Auth
├── scripts/
│   └── src/seed-report.ts  # Seeds DB with all report content from PDF
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## Database Schema

Tables in PostgreSQL:
- `sessions` — cookie session storage (sid, sess JSON, expire)
- `users` — OIDC users (id=replitUserId, email, firstName, lastName, profileImageUrl)
- `admin_users` — who has admin access (replitUserId, username, addedAt)
- `report_metadata` — single row (title, year, description, publishedDate)
- `report_sections` — content sections (key, title, content, sectionOrder)
- `report_tables` — data tables (key, sectionKey, title, description, headers[], rows[][], footnote, tableOrder)
- `report_stats` — stat callout cards (key, sectionKey, label, value, description, statOrder)

Seed: `pnpm --filter @workspace/scripts run seed-report`

## Authentication & Admin

- Unauthenticated users see the full public report
- `/api/login` → Replit OIDC → `/api/callback` → sets `sid` cookie
- `/api/auth/user` → returns `{ isAuthenticated, user? }` (includes `isAdmin` flag)
- `isAdmin` is checked per-request against the `admin_users` table
- To add an admin: insert into `admin_users` (replitUserId, username) — or use Admin UI once logged in as admin
- First admin must be added directly to the DB

## Admin Portal

- Route: `/admin`
- Redirects unauthenticated users to `/api/login?returnTo=/admin`
- Shows "Access Denied" to authenticated non-admins
- Full CRUD for: report sections, tables, stats, report metadata
- Admin user management (add/remove by Replit user ID)
- All changes reflect live on the public site

## Key Files

- `artifacts/choice-report/src/App.tsx` — React router (/, /admin)
- `artifacts/choice-report/src/pages/Home.tsx` — Public report page
- `artifacts/choice-report/src/pages/Admin.tsx` — Admin dashboard
- `artifacts/api-server/src/routes/report.ts` — GET /api/report/* (public)
- `artifacts/api-server/src/routes/admin.ts` — PUT /api/admin/* (admin only)
- `artifacts/api-server/src/routes/auth.ts` — Auth routes (/api/login, /api/callback, /api/logout, /api/auth/user)
- `artifacts/api-server/src/middlewares/authMiddleware.ts` — Session + admin check
- `lib/api-spec/openapi.yaml` — API spec (source of truth)
- `lib/db/src/schema/report.ts` — DB schema

## API Routes

**Public:**
- `GET /api/report/metadata`
- `GET /api/report/sections`
- `GET /api/report/sections/:key`
- `GET /api/report/tables`
- `GET /api/report/tables/:key`
- `GET /api/report/stats`

**Admin (requires isAdmin):**
- `PUT /api/admin/sections/:id`
- `PUT /api/admin/tables/:id`
- `PUT /api/admin/stats/:id`
- `PUT /api/admin/metadata`
- `GET /api/admin/users`
- `POST /api/admin/users`
- `DELETE /api/admin/users/:id`

**Auth:**
- `GET /api/login` — initiates OIDC flow
- `GET /api/callback` — OIDC callback
- `GET /api/logout` — ends session
- `GET /api/auth/user` — current user info

## TypeScript & Composite Projects

Every lib extends `tsconfig.base.json` with `composite: true`. Run `pnpm run typecheck:libs` to build lib declarations before typechecking artifacts.

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

## Development

- API server: `pnpm --filter @workspace/api-server run dev` (or via workflow)
- Frontend: `pnpm --filter @workspace/choice-report run dev` (or via workflow)
- DB push: `pnpm --filter @workspace/db run push`
- Seed: `pnpm --filter @workspace/scripts run seed-report`
