# FRONTEND_IMPLEMENTATION.md — Project Detail Gallery & UI Showcase

> **Source of Truth for Frontend Execution.**
> Execute strictly one phase at a time.
> After each phase, stop, verify (`npm run build` & `npx tsc --noEmit`), and report.
> Do NOT proceed to the next phase until explicit approval ("Yes, Proceed") is given.

---

## 1. Feature Overview & Objectives

Transform the project detail page (`app/projects/[id]/page.tsx`) from having a generic, grayscale Unsplash cover photo into a **high-end, interactive UI Screenshot Gallery** placed below the project header (Title, Tagline, Tech stack badges, Links) and above the Overview markdown section.

### Key Capabilities
1. **Header Reorganization**: Status badge (e.g. `in progress` / `shipped`) and year moved cleanly into the header eyebrow above the oversized project title.
2. **`ProjectGallery` Component**:
   - Primary featured screenshot viewer (`aspect-[16/9]` or proportional display) with subtle double-border styling, dark backdrop (`var(--step-1)`), and zoom/fade transitions.
   - Interactive thumbnail carousel/strip with active state highlight (`border-[var(--off-white)]`), smooth hover micro-interactions, and horizontal scrolling on mobile viewports.
   - Captions with monospaced typography (`font-mono text-[11px] text-[var(--step-6)]`).
3. **Full-screen Lightbox**:
   - Opens on clicking the featured image or expand button.
   - Smooth backdrop blur (`backdrop-blur-md bg-black/85`), keyboard controls (`Esc` to close, `ArrowLeft` / `ArrowRight` for navigation), touch/swipe-friendly, caption display, and index counter (`01 / 04`).
4. **Design System & Taste Adherence**:
   - Strict monochrome palette: `--base` (`#121212`), `--step-1` (`#1a1a1a`), `--step-3` (`#2a2a2a`), `--step-5` (`#555555`), `--off-white` (`#f5f5f5`).
   - Hairline borders (1px solid `var(--step-3)`).
   - Zero rounded corners (`rounded-none`), matching brutalist-editorial theme.
   - Motion with `motion/react` and `ZoomReveal` matching `[0.22, 1, 0.36, 1]` cubic-bezier.

---

## 2. Phase-by-Phase Plan

### Phase 1: Gallery Component & Lightbox Implementation
- Create `components/projects/ProjectGallery.tsx` ("use client").
- Implement the featured display with crossfade/slide animation (`AnimatePresence` / `motion`).
- Implement the thumbnail strip with selection state, keyboard accessibility, and overflow scroll for mobile.
- Implement the modal Lightbox with navigation arrows, close button, image counter, caption, and `Escape`/arrow keyboard listeners.
- Include fallback handling: if a project only has `heroImage`, render it as a single full-width showcase without unnecessary thumbnail navigation.
- **Verification Gate**: `npx tsc --noEmit` and `npm run build`.

### Phase 2: Page Layout Refactor (`app/projects/[id]/page.tsx`)
- Remove the top 45vh Unsplash cover hero image and its grayscale contrast filter.
- Move the status (`shipped` / `in progress`) and `year` badge to the top of the project header, right below the back navigation hairline.
- Position the `<ProjectGallery>` inside a `ZoomReveal` section directly after the tech stack and links, preceded by a subtle `... /gallery ...` section divider.
- Ensure seamless visual flow into `MarkdownRenderer` and `CodePreview`.
- Maintain SEO JSON-LD and OpenGraph metadata integrity using the project's hero/primary image.
- **Verification Gate**: `npx tsc --noEmit` and `npm run build`.

### Phase 3: Visual Polish & Responsive Audit
- Audit all viewport sizes (mobile 375px, tablet 768px, desktop 1280px+).
- Verify mobile thumbnail touch scrolling and tap targets (minimum 44px).
- Verify Lightbox z-index stacking context does not clash with sidebar (`--sidebar-w`) or floating CTA button.
- Smooth scroll integration check (ensure Lenis does not conflict with Lightbox scroll-lock).
- **Verification Gate**: `npx tsc --noEmit` and `npm run build`.
