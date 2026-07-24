# Résumé Page — Implementation Plan

## Context

`sections/Profile.tsx` already renders a "Résumé ↗" link (in the `links`
array, alongside GitHub/LinkedIn) that points directly at `personal.cvUrl`
(`/LazanPeterPaul_CV.pdf`) and opens it in a new tab. The file does not
currently exist in `/public`, so the link is dead.

Goal: instead of linking straight to a raw PDF, route to a dedicated
`/resume` page that matches the site's existing monochrome/brutalist design
system (reusing `SectionLabel`, `Card`, etc. — see `sections/Profile.tsx` and
`sections/Services.tsx` for the established patterns), embeds the PDF for
in-browser viewing, and offers a "Download PDF" button.

## Frontend

### Phase 1 — Repoint the Résumé link

- In `sections/Profile.tsx`, change the `links` array entry for `"Résumé"` to
  point at `/resume` (internal route) instead of `personal.cvUrl`, and drop
  `target="_blank"` / `rel="noopener noreferrer"` for that one link (internal
  navigation, not an external link) — GitHub/LinkedIn keep their external
  behavior.
- No new files yet. Verify link renders and navigates to `/resume` (404 until
  Phase 2 exists — expected at this point).

### Phase 2 — Build the `/resume` page

- New file: `app/resume/page.tsx`.
- Follow the site's existing page conventions (see `app/services/[slug]/page.tsx`
  or `app/projects/[id]/page.tsx` for structural precedent: metadata export,
  `SectionLabel`, consistent spacing/typography tokens from `globals.css`).
- Content:
  - Page heading consistent with other detail pages ("Résumé" as the
    section label).
  - An embedded PDF viewer (`<iframe src="/resume.pdf" />` or `<object>`,
    styled within a bordered frame matching the site's hairline aesthetic)
    sized responsively — must be usable on mobile (no fixed pixel height
    that breaks small screens).
  - A prominent "Download PDF" button/link with the `download` attribute,
    same visual treatment as existing buttons (e.g. "Message Me" / "Start a
    Project" styles in `Profile.tsx` / `FloatingCta.tsx`).
  - Appropriate `metadata` (title/description) consistent with other pages'
    SEO metadata pattern.
- No backend/API route required — see Backend section below.

### Phase 3 — Add the real asset and verify

- Add the actual résumé PDF to `/public/resume.pdf` (file provided by user).
- Confirm `sections/Profile.tsx`'s link, the `/resume` page's embed, and the
  download button all reference the same real filename.
- Run `npm run build` and `npx tsc --noEmit` — zero errors required before
  marking complete (per global Definition of Done).
- Manually verify: link from Profile section → `/resume` page loads → PDF
  visibly renders in the embedded viewer → Download button actually
  downloads the file — on both desktop and mobile viewport widths.

## Backend

No backend work required. Next.js serves the PDF as a static asset directly
from `/public`; the "Download PDF" button uses the HTML `download` attribute
on a plain `<a>` tag — no API route or server logic needed.

## Out of scope

- No PDF generation/templating — the résumé is a static file the user
  supplies.
- No analytics/tracking on downloads (not requested).
