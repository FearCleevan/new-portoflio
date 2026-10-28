# BACKEND_IMPLEMENTATION.md — Project Detail Gallery Data Layer & Contract

> **Source of Truth for Data Layer & Integration.**
> Execute strictly one phase at a time.
> After each phase, stop, verify (`npm run build` & `npx tsc --noEmit`), and report.
> Do NOT proceed to the next phase until explicit approval ("Yes, Proceed") is given.

---

## 1. Scope & Architecture

The portfolio uses a local typed content architecture in `data/projects.ts` consumed by Next.js Server Components.
To support the UI Gallery across all 15 projects without breaking existing dependencies (OG Image generator, RSS, sitemap, JSON-LD schemas), we update the data contract and seed all projects.

### Data Contract Requirements
1. Define `GalleryImage` interface:
   ```typescript
   export interface GalleryImage {
     src: string;
     alt: string;
     caption?: string;
   }
   ```
2. Extend `Project` interface with `gallery?: GalleryImage[]`.
3. Provide sample/placeholder gallery items across all 15 projects using each project's existing image assets and curated high-resolution UI screen placeholders, with descriptive captions.
4. Provide a helper `getProjectGallery(project: Project): GalleryImage[]` ensuring seamless fallback to `[ { src: project.heroImage, alt: project.title, caption: project.tagline } ]` if `gallery` is absent or empty.

---

## 2. Phase-by-Phase Plan

### Phase 1: Typed Schema & Gallery Data Population
- Update `Project` interface in `data/projects.ts` to include `gallery?: GalleryImage[]`.
- Add `getProjectGallery` helper in `data/projects.ts` or `lib/projects.ts`.
- Populate all 15 projects with structured gallery entries, captions, and proper semantic alt text.
- Verify `generateMetadata` in `app/projects/[id]/page.tsx` and OpenGraph generation continue to receive valid image URLs.
- **Verification Gate**: `npx tsc --noEmit` and `npm run build`.
