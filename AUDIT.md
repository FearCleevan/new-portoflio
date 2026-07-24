# AUDIT — peterpaullazan.com Portfolio

Read-only discovery pass. No source files were modified to produce this document. `npx tsc --noEmit` and `npm run build` were run only to verify current health (both pass — see Known Issues for details).

---

## 1. Stack Inventory

| Layer | Detail |
|---|---|
| Framework | Next.js 15.5.19 (`^15.3.3` in package.json; lockfile resolved to 15.5.19) |
| Routing | App Router (`app/`) — no `pages/` directory in use |
| React | 19.0.0 |
| Language | TypeScript 5.8.3, `strict` presumed on (no TS errors in current tree) |
| Styling | Tailwind CSS **v3.4.17** (already on v3, matches project convention) + a hand-written CSS-variable token layer in `app/globals.css`. Heavy use of inline `style={{ }}` objects referencing `var(--step-N)` rather than Tailwind color utilities. |
| Component primitives | `components/ui/button.tsx` (CVA + Radix `Slot`), `components/ui/input.tsx`, `components/ui/tree.tsx` (`@headless-tree/react`) — a shadcn-style setup, but **only `Tree` is actually wired into a page**; `Button` and `Input` are defined but unused (see Known Issues) |
| Animation | `motion` (Framer Motion v12, imported as `motion/react`), custom `three` WebGL shader background, `lenis` for smooth scroll |
| Markdown | `react-markdown` + `remark-gfm`, syntax highlighting via `shiki` (used in the project case-study code preview) |
| State management | None (no Redux/Zustand/Context store) — all local `useState`/data-file constants |
| Forms | No form library. `ContactForm` is a hand-rolled controlled form with manual regex email validation |
| Data fetching | Native `fetch` to GitHub REST API (`lib/github.ts`, server-only) for the live code-preview feature, cached via `next: { revalidate: 3600 }` |
| Analytics | `@next/third-parties/google` `GoogleAnalytics`, gated on `NEXT_PUBLIC_GA_ID` env var |
| Deployment target | Vercel (`lazandev.vercel.app` is the project's literal production alias; see SEO section for the domain mismatch against `peterpaullazan.com`) |
| Fonts | `next/font/google`: Oswald (display), Nunito (body), JetBrains Mono (code) — all self-hosted via next/font, `display: swap` |
| Env vars in use | `NEXT_PUBLIC_CONTACT_SHEET_URL` (Google Apps Script endpoint for the contact form), `NEXT_PUBLIC_GA_ID`. Both live in `.env.local`, correctly git-ignored and never committed to history. |

---

## 2. Site Map

Only two routes exist. This is a true single-page portfolio with one detail-page template.

| Route | Type | Content |
|---|---|---|
| `/` | Static (ISR-less, fully static) | One long scrolling page assembled from 8 stacked sections, each with its own `id` anchor: `#home` (Hero), `#profile` (Profile/bio/headshot), `#summary` (positioning statement + stats), `#experience` (work history timeline), `#process` (5-step "how I work"), `#skills` (tech/professional/soft skill cards), `#projects` (project grid, links to `/projects/[id]`), `#contact` (contact cards + form + socials) |
| `/projects/[id]` | SSG, `generateStaticParams` over all 15 projects | Individual case-study page: hero image, tagline, tech stack, GitHub/live links, markdown-rendered long-form description, and a live in-browser file-tree code preview (fetches the real GitHub repo tree/contents for repos that have `repo: {owner, name}` set) |
| `/sitemap.xml` | Generated (`app/sitemap.ts`) | Home + all 15 project URLs |
| `/robots.txt` | Generated (`app/robots.ts`) | Allow-all, points to sitemap |
| `/opengraph-image` | Edge-runtime generated image | Dynamic OG card (1200×630) built with `ImageResponse`, pulls in `/profile.png` |
| `/not-found` | Static | Custom glitch-styled 404 with a "Return Home" CTA |
| `loading.tsx` | Static | Global route-level loading skeleton (boot-screen style) |
| `/api/repo/[owner]/[repo]` | Route handler (GET) | Backs the code-preview feature — fetches a GitHub repo's tree |
| `/api/repo/[owner]/[repo]/file` | Route handler (GET) | Fetches a single file's content for the code preview |

**Not currently a route, but exists as data:** `data/education.ts` defines one `EducationEntry` (BS Information Technology, Samson Polytechnic College of Davao) with a full `Education` type in `types/content.ts` — but there is no `Education` section component and it is never rendered anywhere on the site. Content exists, has no home.

There is no `/services` route, no `/blog`, no standalone `/contact` route — everything funnels through the single-page anchor sections.

---

## 3. Design System Inventory

Tokens are **already formalized** in two parallel places that agree with each other (Tailwind config extends the same values as the CSS custom properties):

**Color tokens** (`app/globals.css` `:root` + mirrored in `tailwind.config.ts` `theme.extend.colors`):

| Token | Hex | Tailwind class | Role |
|---|---|---|---|
| `--base` | `#121212` | `bg-base` | Page background |
| `--step-1` | `#1a1a1a` | `bg-card-bg` | Card background |
| `--step-2` | `#222222` | `bg-subtle` | Subtle background |
| `--step-3` | `#2a2a2a` | `border-card-border` | Hairline border (default) |
| `--step-4` | `#3a3a3a` | `border-card-border-light` | Hover/lighter border |
| `--step-5` | `#555555` | `text-muted` | Muted / disabled text, labels |
| `--step-6` | `#777777` | — (no Tailwind alias) | Secondary text |
| `--step-7` | `#999999` | — (no Tailwind alias) | Tertiary text (declared, rarely used) |
| `--mid-gray` | `#a6a6a6` | `text-mid-gray` | Emphasis gray (headings, "core skill" highlights) |
| `--off-white` | `#f5f5f5` | `text-off-white` | Primary text / inverted button surface |

Strictly monochrome — confirmed no color accents anywhere in components (the only non-gray color found is `#e05c5c`, a hardcoded red used once in `ContactForm.tsx` for the "Invalid email" validation message — the single deliberate exception to the monochrome rule).

**Typography:**
- `--font-oswald` → `font-display` (headings, uppercase, bold/light weight pairing is a recurring pattern: bold first name + light last name, bold "FULL STACK" + light "DEVELOPER")
- `--font-nunito` → `font-body` (paragraph text)
- `--font-mono` (JetBrains Mono) → `font-code`, used pervasively for labels, section tags (`... /section-name ...`), stat captions, nav-adjacent micro-copy — this mono-label pattern is a strong recurring signature of the design language
- Scale is expressed almost entirely via `clamp()` inline styles (e.g. hero `clamp(72px, 13vw, 176px)`) rather than a Tailwind `fontSize` scale — fluid type is hand-tuned per section, not tokenized

**Spacing:** No formal spacing scale token; sections consistently use `paddingTop/Bottom: 6rem`–`8rem` and `.section-px` (1.25rem mobile / 4rem desktop) utility class in `globals.css`. Card padding is `p-6` (Tailwind default scale).

**Radii:** Effectively zero — everything is hard-edged/square except `rounded-full` on small accent dots and the circular `CircleDecor` watermarks. This is intentional per the brutalist/technical aesthetic (confirmed appropriate to preserve).

**Borders/hairlines:** `.hairline*` utility classes + inline `border: 1px solid var(--step-3)` is the dominant motif — thin 1px dividers everywhere, no shadows used at all (no `box-shadow` found in any component).

**Motion:** `EASE = [0.22, 1, 0.36, 1]` cubic-bezier repeated as a local constant in multiple section files (not centralized) — e.g. `Hero.tsx`. `prefers-reduced-motion` is explicitly checked and respected in `Hero.tsx` and `ShaderBackground.tsx`; not verified in every motion component (see Known Issues).

**Verdict:** tokens are already formalized well enough that the proposal does not need a "extract tokens" line item — but two things are worth flagging as low-risk opportunities in the proposal: (1) `--step-6` and `--step-7` have no Tailwind color alias, forcing inline styles even when a utility class would do; (2) the `EASE` easing curve and the `.section-px`/spacing rhythm are duplicated as magic numbers across section files rather than imported from one place.

---

## 4. Content Inventory

**Personal/entity data** (`data/personal.ts`): full name, title, email, phone, location (Matina Aplaya, Davao City), Calendly URL, GitHub/LinkedIn/Instagram/Facebook, and a `cvUrl` pointing to `/LazanPeterPaul_CV.pdf` — **this file does not exist in `public/`** (confirmed via filesystem check). The Résumé link in the Profile section is a dead link today.

**Experience** (`data/experience.ts`): 5 real, detailed roles, most recent first — currently "Web Developer, SixEleven" (May 2026–Present, includes real Canadian-client e-commerce and Nova Scotia sign-company redesign work), back through IT Support/logistics roles in 2023. This is substantive, real, well-written copy — good raw material for GEO/E-E-A-T signals (already mentions Canadian client work, which is directly relevant to Goal 2's Canada/US geo-targeting ask).

**Education** (`data/education.ts`): one entry, BS IT, Samson Polytechnic College of Davao (2021–2025) — **exists in data but is not rendered anywhere on the site** (no `Education` section component, not imported in `page.tsx`).

**Skills** (`data/skills.ts`): a large real taxonomy (languages, frontend, backend, databases, cloud/deployment, tools) plus curated "core" subsets used for the UI's brighter/dimmer skill-tag treatment. Real, not placeholder.

**Projects** (`data/projects.ts`): 15 projects, real markdown case studies with Overview/Stack/Features/Architecture sections. Breakdown:
- **Live URLs (5):** HRIS SaaS (`hrisph.vercel.app`), HRIS Admin (`adminhrisph.vercel.app`), Internal Project Management (`projectmanagement-smoky.vercel.app`), The Launchpad landing page (`thelaunchpadteam.com`), Personal Portfolio v1 (`lazandev.vercel.app` — the *previous* portfolio, now serving as the domain alias for *this* one, worth double-checking for confusion)
- **GitHub link present but `live: null` (7):** AI Assistant, PayUp, Vyralyx, Gooey-Toast, Rent App
- **No public repo, `github: "#"` placeholder, `repo: null` (3):** Chat System, LP CRM, TechnoBuild V2, School Management, ScapeDBM — these are explicitly marked in their own markdown as "Repository is private — deployed for a live company," which is honest and fine, but the raw `github: "#"` value is a literal dead anchor link rendered on the page (see Known Issues)
- All 15 hero images are hotlinked to `images.unsplash.com` stock photography, not actual product screenshots — every single case study uses a generic stock photo rather than a real screenshot of the shipped product

**Images:** `public/` contains exactly 3 files: `profile.png` (4.4 MB, unoptimized — see Known Issues), `opengraph-image.png` (unused static OG image — the site actually uses the dynamic `app/opengraph-image.tsx` route instead), and `og-image old version.png` (dead asset, superseded, still shipped in the repo).

**Contact copy:** real email, real phone, real Calendly link (`calendly.com/fearcleevan/30min`). No lorem ipsum anywhere in the codebase.

---

## 5. SEO Baseline

**Metadata (`app/layout.tsx`):** Full `Metadata` object present — title template, meta description, keywords array, OpenGraph, Twitter card, robots directives, icons. This is a solid, deliberate baseline, not an afterthought.

**Critical finding — domain mismatch:** Every canonical/absolute URL in the codebase is hardcoded to `https://lazandev.vercel.app`:
- `app/layout.tsx` → `BASE_URL`, `metadataBase`, `alternates.canonical`, OpenGraph `url`, JSON-LD `Person.url`
- `app/sitemap.ts` → all sitemap entries
- `app/robots.ts` → `sitemap` and `host`
- `app/projects/[id]/page.tsx` → per-project canonical + OG url
- `app/opengraph-image.tsx` → literal `lazandev.vercel.app` text baked into the generated image, and fetches `/profile.png` from that same hardcoded origin

Since the user states the production domain is **peterpaullazan.com**, every canonical tag, sitemap entry, and structured-data `url` field currently asserts the Vercel subdomain as the authoritative URL instead of the custom domain. This actively works against SEO (canonical should point at the domain you want ranked) and is the single highest-leverage fix available — it should be a `const BASE_URL` sourced from one place (currently duplicated as a magic string in 5 separate files), pointed at the real domain.

**Structured data (JSON-LD):** `Person` schema on the root layout (name, jobTitle, address, sameAs socials, `knowsAbout`) — good foundation. `CreativeWork` schema per project page. **No `ProfessionalService` / `Organization` schema anywhere** — relevant since Goal 1 (productized services) will need it. No `FAQPage` schema (relevant to Goal 2's GEO ask for FAQ-shaped content — there is currently no FAQ content on the site at all).

**robots.txt / sitemap.xml:** Both generated correctly via Next's file conventions, both functional, both currently pointing at the wrong base domain (see above).

**Semantic HTML:** Sections use `<section id="...">` wrappers in `page.tsx` — good. Heading hierarchy: Hero uses `<h1>` (three lines, "Full"/"Stack"/"Developer" split across three separate `<h1>` elements — technically three `h1`s on one page, which most auditors/screen readers will flag; should be one `h1` with the visual line-break handled by CSS/markup, not three heading elements). Profile section uses `<h2>` for first/last name. Other sections (Summary, Contact, Process) use styled `<p>`/`<div>` for what read visually as headlines rather than actual heading tags — section landmark structure exists but heading-level semantics are inconsistent.

**Image alt text:** Present and descriptive on `Profile` (`"{name} — Full-Stack Developer"`) and project hero images (`project.title`) and project detail page. Reasonable coverage, no missing/empty `alt` found in the components reviewed.

**Open Graph image:** Dynamically generated per the root layout via `app/opengraph-image.tsx` (edge runtime) — well-crafted, on-brand. Per-project pages instead reuse the Unsplash stock hero image as their OG image rather than a branded card, which is inconsistent with the polish of the root OG image.

**Core Web Vitals risk:** `profile.png` is 4.4 MB and is used three times — as the `Profile` section headshot (via `next/image`, so at least resized/served responsively), as the root `icons.icon`/`shortcut`/`apple` favicon (a 4.4 MB source being used as a raw favicon reference, not pre-generated favicon sizes), and fetched again in full inside the edge `opengraph-image.tsx` route. The favicon usage in particular is unusual — `icons: { icon: "/profile.png" }` means browsers request a multi-megabyte PNG for a tab icon.

---

## 6. GEO Baseline (Generative Engine Optimization)

**`llms.txt`:** Does not exist. No `llms.txt` at the repo root or `public/`.

**Entity clarity:** Name, role, and location are stated as plain facts in multiple places (JSON-LD `Person`, meta description, Hero/Profile copy) — this is a genuine strength for LLM extraction; an LLM crawling this site can confidently answer "who is this person, what do they do, where are they based."

**Geo-targeting for Canada/US clients:** Currently **absent**. The only geographic signal anywhere on the site is "Davao City, Philippines" (the developer's own location) — there is no copy anywhere stating availability for, experience with, or targeting of Canadian/US small businesses. This is despite the fact that real, relevant proof exists in the data: `data/experience.ts` describes actual production work for a "Canadian antique lamp and vintage sign retailer" and a "42-year-old Nova Scotia sign company" — this is exactly the kind of concrete geo-relevant credibility Goal 2 is asking for, and it currently only lives inside one bullet point of the Experience timeline, not surfaced anywhere as a positioning statement.

**FAQ-shaped content:** None. No FAQ section, no `FAQPage` schema, no question-formatted headings anywhere in the copy that an AI Overview / ChatGPT browsing tool could lift a clean Q&A pair from.

**Named services with pricing bands:** None — there is no services offering on the site at all today (confirming the premise of Goal 1). Nothing to extract as "hire this person for X, starting at $Y."

**Clean factual statements LLMs could already surface today:** stack specialization (React/Next.js/TypeScript/Supabase/React Native), years of experience, availability status ("Open to Opportunities" / "Available for work"), contact channels. These exist as visual UI copy but not as crawlable plain-text sentences outside of the JSON-LD description field — most of the "quick facts" (role, location, experience, focus, status) are rendered as separate label/value pairs in a styled card rather than as a full sentence, which is a slightly weaker shape for an LLM to extract and quote than a plain descriptive paragraph would be.

---

## 7. Contact-Flow Baseline

Every path currently available to a visitor who wants to reach out, and the friction to get there:

| Path | From homepage top | Clicks/scrolls |
|---|---|---|
| Email link (`mailto:`) | Scroll to `#contact` (bottom of an 8-section single page) | 1 scroll (long) + 1 click |
| Phone link (`tel:`) | Same `#contact` section | 1 scroll (long) + 1 click |
| Calendly booking | Same `#contact` section, opens in new tab | 1 scroll (long) + 1 click |
| Contact form | Same `#contact` section | 1 scroll (long) + fill 3 fields + 1 click |
| "Message Me ↓" button | Present in the **Profile** section (`sections/Profile.tsx`), smooth-scrolls to `#contact` via Lenis if available | 1 scroll (shorter, Profile is section 2 of 8) + 1 click + then still need to act inside Contact section |
| Social links (GitHub/LinkedIn/Instagram/Facebook) | `#contact` section footer | 1 scroll (long) + 1 click, and these aren't really "contact," they're profile links |

**Key finding:** there is **no persistent/sticky way to reach Contact from anywhere else on the site**. The `Sidebar` component (`components/layout/Sidebar.tsx`) — the one element visible on every scroll position on desktop — contains only a decorative rotated wordmark and a static "2025" label. It has **zero navigation links, zero CTA, and zero anchor jump to Contact.** On mobile, the sidebar is hidden entirely (`hidden md:flex`), so mobile visitors have no persistent nav at all — the only way to contact is to scroll through all 8 sections. The lone shortcut is the "Message Me ↓" button in Profile (section 2 of 8), which still requires the user to scroll roughly 75% further down to actually reach the contact form/methods.

The contact form itself has a real bug worth flagging under Known Issues below (silent failure mode).

---

## 8. Known Issues

Ranked roughly by how much they matter:

1. **Contact form has a silent-failure mode.** In `ContactForm.tsx`, `handleSubmit` POSTs to the Google Apps Script `SHEET_URL` with `mode: "no-cors"`. With `no-cors`, the response is always opaque — `fetch` cannot know whether the request actually succeeded (network error aside, even a script-side failure or a misconfigured/expired Apps Script URL returns nothing readable). The code sets `status: "sent"` unconditionally after the `await fetch(...)` resolves, regardless of whether the message was actually received. A visitor could see "Thanks — I'll be in touch soon" while the message silently never arrives, with no error state ever shown. This directly undercuts Goal 3.
2. **Canonical domain mismatch.** As detailed in the SEO section — every canonical URL, sitemap entry, robots host, and JSON-LD `url` field is hardcoded to `lazandev.vercel.app` in 5 different files, not `peterpaullazan.com`. Should be consolidated into one constant/env var and corrected.
3. **Dead résumé link.** `personal.cvUrl` points to `/LazanPeterPaul_CV.pdf`, which does not exist in `public/`. Clicking "Résumé" in the Profile section 404s.
4. **Zero persistent navigation / no sticky contact CTA.** The always-visible `Sidebar` has no links at all (desktop-only, decorative). No sticky "Start a project" or "Contact" affordance exists anywhere outside the Profile section's single button and the Contact section itself. Directly relevant to Goal 3.
5. **Oversized, misused profile image.** `public/profile.png` is 4.4 MB and is set as the literal favicon (`icons.icon`/`shortcut`/`apple`) with no generated favicon sizes — browsers fetch a multi-megabyte file for a tab icon. It's also the image fetched inside the edge `opengraph-image.tsx` function on every OG image render.
6. **Dead/placeholder GitHub links.** Three projects (Chat System, LP CRM, TechnoBuild V2 — plus School Management and ScapeDBM) ship `github: "#"` — a literal `href="#"` anchor is rendered on their case-study pages as a "GitHub ↗" link that goes nowhere.
7. **Unused dependency: `zod`.** Listed in `package.json` dependencies but the only occurrence of the string "zod" in the codebase is inside a hardcoded mock file-content string in `data/repoTrees.ts` (fake demo code shown in the code-preview UI) — it is not actually imported or used for validation anywhere.
8. **Defined-but-unused UI primitives.** `components/ui/button.tsx` (Radix `Slot` + CVA variants) and `components/ui/input.tsx` are fully built shadcn-style components but are never imported anywhere — `ContactForm.tsx` instead hand-rolls its own inputs and submit button with inline styles and manual hover-state JS handlers. Any new form/CTA work should decide whether to adopt these existing primitives or formally retire them.
9. **`Education` data exists with no UI.** `data/education.ts` + `EducationEntry` type are fully defined but there's no `Education` section component and it's never rendered on the page.
10. **Stray dead asset.** `public/og-image old version.png` is a superseded file still committed and shipped in the repo; the live OG image is generated dynamically via `app/opengraph-image.tsx`, so both this file and the static `public/opengraph-image.png` appear to be unused leftovers (worth confirming before deleting).
11. **Triple `<h1>` on the homepage.** The Hero section renders "Full" / "Stack" / "Developer" as three separate `<h1>` elements (`HeroLine` component) instead of one semantic `<h1>` with the line breaks handled visually. Minor but real SEO/accessibility heading-hierarchy issue.
12. **Inconsistent heading semantics across sections.** Several sections (`Summary`, `Contact`, `Process`) render what are visually section headlines as plain `<p>` tags rather than `<h2>`/`<h3>`, while `Profile` and `Experience` do use real heading tags. Not broken, but not consistent.
13. **No `llms.txt`, no FAQ content, no Canada/US positioning statement anywhere in visible copy** — all three are prerequisites named directly in Goal 2 and currently sit at zero, despite real supporting facts (the Canadian client work) already existing in the Experience data.
14. **`reduced-motion` handling is inconsistent.** `Hero.tsx` and `ShaderBackground.tsx` both explicitly branch on `prefers-reduced-motion`. Other animated components (`ZoomReveal`, `StaggerReveal`, `ParallaxLayer` — not yet read in full during this pass) should be checked in the proposal/execution phase for the same treatment before any new animated CTA is added, per the "Rules That Override Anything Else" floor.

**Build/type health:** `npx tsc --noEmit` passes with zero errors. `npm run build` completes successfully — all 21 routes compile and prerender cleanly (one expected, harmless warning: "Using edge runtime on a page currently disables static generation for that page," referring to `/opengraph-image`, which is normal for `ImageResponse` routes). No TypeScript errors, no build failures currently exist in the codebase.

---

Audit complete. Ready to generate proposal — proceed?
