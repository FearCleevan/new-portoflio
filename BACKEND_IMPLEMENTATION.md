# BACKEND_IMPLEMENTATION.md

> **Source of truth for the backend build.** Execute one Phase at a time. After each Phase, stop and report. Do not bundle phases. **This backend integrates ONLY after the frontend (FRONTEND_IMPLEMENTATION.md) is complete.** It plugs into the seam the frontend already defined — it does not change UI, motion, or layout.

---

## 1. Project Overview

### What "backend" actually means for this portfolio

This is a **content + integration layer**, not a database app. The portfolio data is static and developer-owned (no auth, no writes, no user accounts, no DB). The only genuinely dynamic, server-side concern is the **live GitHub code tree** that powers the VS Code preview.

So the backend has exactly two responsibilities:

1. **Typed content layer** — the uploaded JSON/JS (personal details, experience, education, skills, projects) imported as strongly-typed, validated local data modules consumed by Server Components.
2. **GitHub integration layer** — a server-side service + Next.js Route Handlers that fetch a public repo's file structure and file contents, transform them into the **`RepoTree` contract** (defined in FRONTEND_IMPLEMENTATION.md §2), and serve them to the frontend with caching to respect the **60 req/hr unauthenticated** limit.

### Decisions locked (from prior discussion)

- **GitHub:** public repos, **no token**, unauthenticated. Fetch server-side with Next.js `fetch` + `revalidate` caching so the client never hits GitHub directly and the rate limit is shared/cached.
- **Data source for tree:** **live from GitHub**, swapped into the frontend's existing `useRepoTree(repoId)` hook — the frontend's mock implementation is replaced, UI untouched.
- **No database.** If a future contact form or analytics is wanted, that's out of scope here (noted in §5 as optional).

### Tech (backend)

- **Next.js App Router** — Route Handlers (`app/api/...`) and/or Server Components with `fetch` caching.
- **TypeScript** throughout.
- **Zod** (recommended) to validate the content modules at build/runtime.
- No new heavy dependencies; GitHub is hit with native `fetch`.

```bash
npm i zod
```

---

## 2. The Data Contract (unchanged — shared with frontend)

The backend's GitHub transform MUST output **exactly** this shape (already defined frontend-side):

```ts
// types/repo.ts  (shared)
export interface RepoFileNode {
  name: string;
  path: string;            // also the node id
  type: "file" | "folder";
  children?: string[];     // child paths (folders only)
  language?: string;       // inferred from extension
  content?: string;        // lazy-loaded on file open
}
export type RepoTree = Record<string, RepoFileNode>;
```

The frontend hook the backend fills in:

```ts
useRepoTree(repoId): {
  tree: RepoTree;
  getFileContent(path: string): Promise<string>;
}
```

---

## 3. Content Data Model (from your uploaded files)

The backend types and validates your existing data. Final typed modules:

- `data/personal.ts` — from `personalDetails.json` (name, title, summary, contact, social links, CV/Calendly URLs).
- `data/experience.ts` — from `experience.json` (5 roles, with `current`, `responsibilities[]`, `tags[]`).
- `data/education.ts` — from `education.json`.
- `data/skills.ts` — from `skills.json` (`technical` grouped, `professional[]`, `soft[]`) → maps to the frontend's three skill panels.
- `data/projects.ts` — from `projects.js`, **rewritten** (see §3.1).

### 3.1 Projects: required cleanup (flagged)

`projects.js` needs three fixes before it can drive live code trees:

1. **Add a `repo` field** per project: `{ owner: "FearCleevan", name: "..." }` parsed from the GitHub link. This is what `useRepoTree` consumes. Projects with **no GitHub repo** (e.g. proj-9, 10, 11, 12, 13, several with empty `links`) get `repo: null` → the code-preview panel hides gracefully for those.
2. **Fix duplicate/wrong links:** `proj-5` (Gooey-Toast) and `proj-6` (Rent App) both point to `github.com/FearCleevan/rentapp`. Gooey-Toast almost certainly has its own repo — **confirm the correct URL** before wiring. Until confirmed, mark `proj-5.repo = null` so it doesn't pull the wrong code.
3. **Decouple image imports:** the `import x from '../assets/...'` pattern is Vite-specific. In Next.js, move images to `/public/projectImages/...` and reference by string path, or keep them in `/assets` and import via Next's static handling. The frontend phase already handles rendering; the backend just supplies correct path strings.

---

## 4. Phase-by-Phase Execution Plan

> Each phase ends with a stop + report + "Continue with the next Phase?" Wait for "Yes, Proceed". **Begin only after the frontend build is complete.**

### Phase 1 — Typed Content Layer
- Create `types/` interfaces for personal, experience, education, skills, projects.
- Port the uploaded data into `data/*.ts` modules, typed.
- Add **Zod** schemas + a validation pass so malformed data fails loudly at build.
- Replace the frontend's Phase-4 mock content with these real modules (Server Components import directly — no API needed for static content).
- **Deliverable:** every non-project section renders from real, typed, validated data.

### Phase 2 — Projects Data + Repo Mapping
- Rewrite `data/projects.ts` with the `repo` field and cleanup from §3.1.
- Wire real project data into the frontend's Phase-5 projects showcase (hero, MD description, tech stack).
- Handle the image-path migration (§3.1.3).
- Projects with `repo: null` flagged so the code panel knows to hide.
- **Deliverable:** projects render from real data; each knows its repo (or that it has none).

### Phase 3 — GitHub Service Layer
- Build `lib/github.ts` (server-only):
  - `fetchRepoTree(owner, repo, branch?)` → calls `GET /repos/{owner}/{repo}/git/trees/{branch}?recursive=1`, then **transforms the flat path list into the `RepoTree` record** (build folder nodes, assign `children[]`, infer `language` from extension).
  - `fetchFileContent(owner, repo, path)` → `GET /repos/{owner}/{repo}/contents/{path}`, base64-decode.
  - Default branch resolution (`GET /repos/{owner}/{repo}` → `default_branch`) since not all repos are `main`.
- Add caching: Next.js `fetch(..., { next: { revalidate: 3600 } })` so the 60 req/hr limit is comfortably respected.
- Graceful handling of rate-limit (403) and missing-repo (404) responses.
- **Deliverable:** a tested server function that turns any public repo into a valid `RepoTree`.

### Phase 4 — Route Handlers (API)
- `app/api/repo/[owner]/[repo]/route.ts` → returns the `RepoTree` (tree structure, no file bodies).
- `app/api/repo/[owner]/[repo]/file/route.ts?path=...` → returns a single file's `content`.
- Both server-side, cached, with proper error JSON + status codes.
- **Deliverable:** working cached endpoints producing the exact contract shape.

### Phase 5 — Swap `useRepoTree` to Live
- Replace the frontend's **mock** `useRepoTree` body (from frontend Phase 6) with calls to the Phase-4 endpoints. The hook signature and `RepoTree` shape are unchanged, so **no UI changes**.
- Lazy-load `getFileContent(path)` on file selection (don't fetch all files upfront — protects rate limit).
- Loading / error / empty states in the code panel (repo unreachable, rate-limited, `repo: null`).
- **Deliverable:** the VS Code preview now shows the developer's REAL repo files, live.

### Phase 6 — Caching, Resilience & Polish
- Add a lightweight in-memory/edge cache or rely on `revalidate`; optionally pre-warm featured projects' trees.
- Fallback: if GitHub is rate-limited, serve last-cached tree or a friendly "code preview temporarily unavailable" state.
- Optional: ISR/static generation of featured project trees at build time so the most-viewed projects never hit the live limit.
- Final contract audit: confirm backend output === frontend's mock shape byte-for-byte.
- **Deliverable:** resilient, cached, production-ready integration.

---

## 5. Out of Scope (optional future work)
- Contact form submission (would need an email service or a serverless function + spam protection).
- Analytics / view tracking.
- GitHub token auth (only needed if private repos or >60 req/hr become necessary — would require the server-side token pattern, not client).

---

## 6. Integration Checklist (the only frontend touch-points)
1. Phase 1–2: swap mock content modules → real `data/*.ts` (Server Component imports).
2. Phase 5: swap mock `useRepoTree` body → live endpoints. Signature + `RepoTree` shape unchanged.

Nothing else in the frontend (UI, shader, parallax, zoom, layout) is modified by the backend.
