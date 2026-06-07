# FRONTEND_IMPLEMENTATION.md

> **Source of truth for the frontend build.** Execute one Phase at a time. After each Phase, stop and report. Do not bundle phases. The backend does not exist yet — every Phase below runs entirely on **mock / sample data** with zero backend dependency.

---

## 1. Project Overview

A **monochrome, editorial-brutalist dark portfolio** for a full-stack developer. The signature feature is a **VS Code–style code preview** inside each project, powered by the existing `tree.tsx` component repurposed from an org-chart into a real file explorer.

### What we are building (frontend scope)

A single-page (scroll-based) Next.js + React portfolio with these sections in order:

1. **Hero** — oversized condensed display type, vertical sidebar wordmark, terminal-prompt accents.
2. **Profile** — who I am, headshot, quick facts.
3. **Summary** — short positioning statement.
4. **Experience** — work history timeline.
5. **How I Develop (Process)** — my development workflow, step-driven.
6. **Skills** — three grouped panels: **Technical**, **Soft**, **Professional**.
7. **Projects (Showcase)** — the centerpiece. Each project card expands into a detail view with:
   - **Hero / preview image**
   - **Description** rendered from **Markdown**
   - **Tech stack** badges
   - **Code Preview** — VS Code-style panel: `tree.tsx` file explorer (left) + syntax-highlighted file viewer (right). *In the frontend phase this reads a **mock repo JSON**; the backend later swaps in live GitHub data using the identical data shape.*

### Visual / motion direction (locked)

- **Palette (strict monochrome — NO color accents, NO neon, NO gold/yellow):**
  - Base: `#121212`
  - Mid gray: `#a6a6a6`
  - Off-white: `#f5f5f5`
  - Plus tonal steps derived from these (e.g. `#1a1a1a`, `#2a2a2a`, `#3a3a3a` for cards/borders).
- **Type:** **Oswald** (condensed, uppercase, large vertical/display headings) + **Nunito** (humanist body, "code-like" readability). Mono font (e.g. **JetBrains Mono** or **Geist Mono**) for the `>_` / `... /section ...` labels and code viewer.
- **Motion (all required):**
  - **Parallax scrolling** between layers.
  - **Scroll-driven zoom-in** reveals on sections/cards.
  - **Animated grayscale shader background** — Three.js + custom GLSL fragment shader, domain-warped FBM noise in dark grays only. Fullscreen, `pointer-events: none`, behind all content, throttled, `prefers-reduced-motion`-aware.
- **Structural signatures:** hairline (1px) borders boxing content into cards, big faint circular outlines bleeding off-edge, `... /Section ...` mono labels, selective italic emphasis on keywords in headlines, generous negative space.

### Tech stack (frontend)

- **Next.js (App Router) + React + TypeScript** (primary stack).
- **Tailwind CSS** + shadcn/ui structure (`/components/ui`).
- **Three.js** for the shader background.
- **Motion** (Framer Motion) for parallax + scroll-zoom + reveals.
- **react-markdown** + **remark-gfm** for project descriptions.
- **shiki** (or `react-syntax-highlighter`) for the code viewer.
- Existing components reused as-is: `tree.tsx`, `button.tsx`, `input.tsx` (already provided).

### Dependencies to install

```bash
# tree.tsx already requires:
npm i radix-ui lucide-react @headless-tree/core @radix-ui/react-slot class-variance-authority
# new for this build:
npm i three motion react-markdown remark-gfm shiki
npm i -D @types/three
```

---

## 2. The Data Contract (critical — shared seam with backend)

`tree.tsx`'s `dataLoader` requires a **flat record** keyed by id:

```ts
// types/repo.ts
export interface RepoFileNode {
  name: string;            // display name, e.g. "Button.tsx"
  path: string;            // full path, e.g. "src/components/Button.tsx"
  type: "file" | "folder";
  children?: string[];     // ids of child nodes (folders only)
  language?: string;       // for syntax highlight, e.g. "tsx"
  content?: string;        // file source (mock now; lazy-fetched live later)
}

export type RepoTree = Record<string, RepoFileNode>;
// id convention: the node's `path` IS its id. Root id = "" or repo name.
```

**Why this matters:** GitHub's `git/trees?recursive=1` returns a *flat path list*. The backend will transform that into **exactly this `RepoTree` shape**. The frontend builds against a mock `RepoTree` so the swap is seamless. Both files MUST agree on this contract — do not change it without updating both.

---

## 3. Phase-by-Phase Execution Plan

> Each phase ends with a stop + report + "Continue with the next Phase?" Wait for "Yes, Proceed".

### Phase 1 — Foundation, Design System & Layout Shell
- Init/confirm Next.js App Router + TS + Tailwind + shadcn structure.
- Install all dependencies.
- Define CSS variables for the monochrome palette + tonal steps in `globals.css`.
- Wire **Oswald + Nunito + mono** via `next/font`.
- Build the **layout shell**: full-height scroll container, fixed vertical sidebar wordmark, section anchors, mono section-label component (`<SectionLabel>… /Profile …</SectionLabel>`), reusable hairline `Card` and faint off-edge circle decorations.
- Static placeholder content only (no motion yet).
- **Deliverable:** scrollable skeleton with correct type + palette + structure.

### Phase 2 — Shader Background
- Build `<ShaderBackground>` as a fixed, full-viewport Three.js canvas behind content (`-z-10`, `pointer-events:none`).
- Custom GLSL fragment shader: domain-warped FBM, **grayscale only**, slow drift.
- `prefers-reduced-motion` → freeze to a static frame. Pause on tab blur. Cap DPR for perf.
- **Deliverable:** living grayscale texture behind the Phase 1 skeleton.

### Phase 3 — Scroll Motion System (Parallax + Zoom-in)
- Add Motion-based scroll system: parallax layer offsets, scroll-triggered **zoom-in** reveals (scale + opacity) per section/card, staggered children.
- Centralize into reusable wrappers (`<ParallaxLayer>`, `<ZoomReveal>`) so content phases just wrap.
- Respect `prefers-reduced-motion`.
- **Deliverable:** the skeleton now animates on scroll exactly as the inspiration implies.

### Phase 4 — Content Sections (Profile → Summary → Experience → Process → Skills)
- Build each non-project section with **sample/mock data** and the motion wrappers:
  - Profile (headshot via Unsplash placeholder, quick facts table).
  - Summary (editorial statement, italic keyword emphasis).
  - Experience (timeline / dated entries — see inspiration board 2).
  - How I Develop (numbered process steps).
  - Skills ×3 panels (Technical / Soft / Professional) as hairline cards.
- **Deliverable:** full upper portfolio complete on mock data.

### Phase 5 — Projects Showcase (cards + detail view, NO code panel yet)
- Project grid/list from mock data; each project: hero image, title, short blurb, tech-stack badges.
- Expand/route to a **project detail view**: full hero, **Markdown** description (react-markdown + remark-gfm), tech stack.
- **Deliverable:** projects browsable with everything *except* the VS Code panel.

### Phase 6 — VS Code Code Preview (tree.tsx + viewer, MOCK repo)
- Build `<CodePreview>`: two-pane VS Code-style panel.
  - Left: `tree.tsx` wired to a **mock `RepoTree`** (per the Data Contract), file/folder icons, expand/collapse, selection.
  - Right: file viewer with **shiki** syntax highlighting, filename tab bar, line numbers, "open on GitHub" link placeholder.
  - Fix the known `dataLoader` stale-closure with a `ref` (as discussed); guard `getChildren` with `?.`.
- Loader is abstracted behind a `useRepoTree(repoId)` hook returning `{ tree, getFileContent }` — **mock implementation now**, backend swaps the hook body later with zero UI changes.
- **Deliverable:** fully working VS Code preview on mock files — the seam the backend plugs into.

### Phase 7 — Polish & Responsive Pass
- Responsive behavior (mobile: sidebar collapses, code panel stacks tree-over-viewer).
- Micro-interactions, focus states, scroll-snap tuning, loading skeletons for the code panel.
- Accessibility: keyboard nav on tree, reduced-motion audit, contrast check.
- **Deliverable:** production-grade frontend, fully functional on mock data, ready for backend integration.

---

## 4. Frontend ⇄ Backend Integration Seam (for reference)

The only two functions the backend replaces:

```ts
// hooks/useRepoTree.ts  — Phase 6 ships the MOCK version of this
useRepoTree(repoId): {
  tree: RepoTree;                              // backend builds from git/trees
  getFileContent(path: string): Promise<string>; // backend hits contents/{path}
}
```

Everything else (UI, motion, layout) is backend-agnostic.
