# PROPOSAL — peterpaullazan.com Portfolio → Portfolio + Services

Built directly from `AUDIT.md`. Still read-only — nothing here has been implemented. Approve items by number; nothing executes until you reply.

No item in this proposal requires a new dependency. Everything is buildable with what's already in `package.json`.

---

## Do NOT change

Confirmed working in the audit — left alone unless an item below explicitly says otherwise:

- The monochrome token system (`--base`, `--step-1`…`--step-7`, `--mid-gray`, `--off-white`) and the Tailwind color aliases mirroring it
- The Oswald/Nunito/JetBrains Mono font pairing and the recurring bold-first-line / light-second-line heading treatment
- The `SectionLabel` "`... /section-name ...`" mono motif
- The flat, hairline-border, zero-shadow, near-zero-radius aesthetic
- `ShaderBackground` (Three.js noise shader) and `SmoothScroll` (Lenis)
- The existing order and content of all 8 homepage sections (Hero → Profile → Summary → Experience → Process → Skills → Projects → Contact) — nothing here gets reordered or rewritten
- The `/projects/[id]` case-study template and the live `CodePreview` GitHub file-tree feature
- All 15 existing project case studies and their markdown content
- `next/font` setup and the Google Analytics integration
- Tailwind v3 config

---

### Goal 1: Add Services

- [ ] **1.1** Add a new `Services` section component (`sections/Services.tsx`), inserted between the existing `Process` and `Skills` sections on the homepage. No existing section is reordered or rewritten — this is a pure insertion. Built from the same primitives already in the design system (`SectionLabel`, `Card`, `StaggerReveal`) so it looks native, not bolted on. Contains the four productized services defined below. — **Preserves design** (reuses existing components/tokens only) — Effort: **M** — Risk: **Low**
- [ ] **1.2** Add a "Services" anchor entry to the site navigation. *(Depends on 3.1 — there is no nav to add it to until the sidebar/mobile nav exists.)* — **Preserves design** — Effort: **S** — Risk: **Low**
- [ ] **1.3** Create individual `/services/[slug]` detail pages (one per service, using `generateStaticParams` the same way `/projects/[id]` already does) for deeper scope/FAQ/process content per service, linked from the homepage Services cards. *(Depends on 1.1.)* — **Preserves design** (same page template pattern as project pages) — Effort: **L** — Risk: **Low**
- [ ] **1.4** Add `Service`/`OfferCatalog` JSON-LD (nested under the `ProfessionalService` schema from item 2.2) describing the four services for SEO/GEO extraction. *(Depends on 1.1, 2.2.)* — **Preserves design** (invisible metadata) — Effort: **S** — Risk: **Low**

**Blocker to flag now:** real price bands. I don't know your actual rates, so the bands below are placeholder market-rate ranges for an offshore Next.js developer targeting North American SMB clients — reasonable starting points, not researched-to-the-dollar figures. Edit them before anything ships.

#### Service definitions (detail for 1.1)

| # | Service | Scope | Price band (USD, editable) | Timeline |
|---|---|---|---|---|
| A | **Custom Website** | Marketing site, Next.js + CMS (Sanity, matching your real SixEleven experience), up to ~6 pages, responsive, on-page SEO baked in | $1,800 – $4,500 | 2–4 weeks |
| B | **Web Application** | Custom internal tool / dashboard / CRM — auth, role-based access, database design, admin views | $4,500 – $12,000+ (scoped after discovery call) | 4–10+ weeks |
| C | **Landing Page Sprint** | Single high-conversion page, copy structure + CTA + form, launched fast | $700 – $1,400 | ~1 week |
| D | **Site Rescue / Rebuild** | Take over a broken/outdated/legacy site (WordPress, old React, etc.), audit + fix or full rebuild | $900 – $3,800 depending on audit findings | 1–4 weeks |

---

### Goal 2: SEO + GEO

- [ ] **2.1** Fix the canonical-domain mismatch. Replace the hardcoded `https://lazandev.vercel.app` in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/projects/[id]/page.tsx`, and `app/opengraph-image.tsx` with a single exported `SITE_URL` constant (new tiny file, e.g. `lib/constants.ts`), set to `https://peterpaullazan.com`. This fixes `metadataBase`, `alternates.canonical`, OpenGraph `url`, the sitemap entries, `robots.ts`'s `host`, and the JSON-LD `Person.url`/`@id` in one place instead of 5 duplicated strings. — **Preserves design** (no visual change) — Effort: **S** — Risk: **Low**
- [ ] **2.2** Add `ProfessionalService` JSON-LD to `app/layout.tsx`, alongside (not replacing) the existing `Person` schema — `name`, `areaServed: ["CA", "US"]`, `address` (Philippines), `priceRange`. *(Depends on 1.1 for real service names.)* — **Preserves design** — Effort: **S** — Risk: **Low**
- [ ] **2.3** Nest `Service`/`OfferCatalog` entries under 2.2's schema for the four productized services. *(Depends on 2.2, 1.1 — same as 1.4, listed here too since it's an SEO deliverable.)* — **Preserves design** — Effort: **S** — Risk: **Low**
- [ ] **2.4** Create `public/llms.txt` — a plain-text entity summary (who you are, location, services, tech stack, how to contact, links to key pages) written for LLM crawlers per the emerging `llms.txt` convention. *(Depends on 1.1 for service descriptions to include.)* — **Preserves design** (new static file, no UI) — Effort: **S** — Risk: **Low**
- [ ] **2.5** Add an FAQ section (new `sections/FAQ.tsx`, placed in Contact or as its own section before Contact) with `FAQPage` JSON-LD. Draft questions: *"Do you work with clients outside the Philippines?"*, *"What's your typical turnaround for a landing page vs. a full web app?"*, *"Do you take on contract work alongside full-time employment?"*, *"What's included in a Site Rescue engagement?"* — real answers need your sign-off before copy goes live (no invented claims). *(Depends on 1.1 for service-specific answers.)* — **Preserves design** (same Card/SectionLabel pattern) — Effort: **M** — Risk: **Low**
- [ ] **2.6** Fix heading semantics: change the Hero's three separate `<h1>` elements (`sections/Hero.tsx`) to one semantic `<h1>` (line breaks handled via CSS, not extra heading tags), and promote the visual headlines in `Summary.tsx`, `Contact.tsx`, and `Process.tsx` from plain `<p>` to `<h2>` — identical classes/styles, tag-only change. — **Preserves design exactly** (zero visual difference) — Effort: **S** — Risk: **Low**
- [ ] **2.7** Replace the favicon setup in `app/layout.tsx` (`icons: { icon: "/profile.png", ... }`, currently serving a raw 4.4MB file as a tab icon) with properly generated favicon sizes (16/32/180px) derived from the same photo. — **Preserves design** (same photo, correct format) — Effort: **S** — Risk: **Low**
- [ ] **2.8** Add explicit Canada/US geo-targeting copy. You already have the proof — the SixEleven role in `data/experience.ts` describes real production work for a Canadian antique-lamp retailer and a Nova Scotia sign company — but it's buried in one Experience bullet and never surfaced as a positioning statement. Proposed: one sentence added to the Hero subtitle or Summary section, e.g. *"Based in the Philippines, building for clients across Canada and the US."* Exact wording is yours to approve/edit — flagging as a **content decision, not a code decision**. *(No dependency — can ship independently.)* — **Modifies existing copy slightly**, same visual treatment/typography — Effort: **S** — Risk: **Low**
- [ ] **2.9** Generate a branded per-project OG image (reusing the existing `app/opengraph-image.tsx` edge-runtime pattern) instead of reusing the generic Unsplash stock hero image as the OG card for `/projects/[id]` pages. — **Preserves design** (matches the existing root OG card style) — Effort: **M** — Risk: **Low**

---

### Goal 3: Reduce contact friction

- [ ] **3.1** Add functional navigation to the desktop `Sidebar` (currently pure decoration — a rotated wordmark and a static "2025" label, zero links). Add compact anchor links (Home / Services / Projects / Contact) in the same vertical mono-label style already used for the wordmark, so it reads as an extension of the existing sidebar, not a redesign. — **Modifies an existing component** (adds function to something currently decorative-only) — flagging risk as **Medium** specifically because this is the one persistently-visible element on every scroll position and needs care to stay minimal — Effort: **M** — Risk: **Medium**
- [ ] **3.2** Add a persistent mobile contact affordance. Today, `Sidebar` is `hidden md:flex` — mobile visitors have **zero persistent navigation of any kind**. Proposed: a slim fixed bottom bar with a single "Start a Project" button (same off-white/base button treatment already used for "Message Me ↓" in `Profile.tsx`), visible only below `md` breakpoint. — **New UI surface on mobile that doesn't exist today** — Effort: **M** — Risk: **Medium**
- [ ] **3.3** Fix the contact form's silent-failure bug. `ContactForm.tsx` currently POSTs to the Google Apps Script URL with `mode: "no-cors"` and marks the message "sent" unconditionally — a real delivery failure (expired script URL, Apps Script error, etc.) is indistinguishable from success, and the visitor is told it worked either way. Proposed fix: route the submission through a new `app/api/contact/route.ts` server-side handler that POSTs to the Apps Script URL *without* `no-cors` (server-to-server has no CORS restriction), reads the real response, and returns an honest success/error to the client — so `ContactForm` can show a genuine error state instead of always showing success. No new dependency; same UI, same fields. — **Preserves design** (visual states unchanged, just made honest) — Effort: **M** — Risk: **Low**
- [ ] **3.4** Fix the dead Résumé link (`personal.cvUrl` → `/LazanPeterPaul_CV.pdf`, file doesn't exist in `public/`). **Blocker — needs you:** either supply the actual PDF to add to `public/`, or approve removing the Résumé link until one exists. — **Preserves design** — Effort: **S** — Risk: **Low**
- [ ] **3.5** Add one new lower-friction contact channel: **WhatsApp Business click-to-chat** (`wa.me/<number>` link). Arguing for this specifically over the other two candidates the brief raised: Calendly is *already* live in the Contact section (adding it again adds nothing), and "reply directly to this email" is functionally identical to the existing `mailto:` card — neither is actually new. WhatsApp is genuinely lower-friction than booking a 30-minute call slot (a Canadian/US small-business owner can send "hey, are you available for a quick project?" in 10 seconds, async, no calendar commitment) and is increasingly normal for SMB owners to use for vendor/contractor first contact. **Blocker — needs you:** a WhatsApp Business number to link. — **Modifies the Contact section's 3-card grid to 4 cards**, same visual card treatment — Effort: **S** — Risk: **Low**
- [ ] **3.6** Make the mobile CTA from 3.2 (and/or the desktop sidebar nav from 3.1) sticky/persistent while scrolling, so "start a project" is reachable from anywhere on the page, not just after scrolling through all 8 sections. *(Depends on 3.1 and/or 3.2.)* — **Modifies existing scroll experience** — Effort: **S** — Risk: **Medium**
- [ ] **3.7** Stop rendering dead `href="#"` GitHub links. Five projects (Chat System, LP CRM, TechnoBuild V2, School Management, ScapeDBM) have `github: "#"` as a placeholder for "repository is private," but `app/projects/[id]/page.tsx` renders it as a real, clickable, dead anchor. Fix: only render the GitHub link when `project.github !== "#"`, matching the pattern already used for the optional `live` link right next to it. — **Preserves design** (link simply doesn't render when there's nothing to link to) — Effort: **S** — Risk: **Low**

---

### Also flagged (optional cleanup, not required by any goal)

Small items surfaced in the audit that don't block any of the three goals above but are cheap to fix if you want them bundled in. Numbered separately so you can approve/reject independently.

- [ ] **0.1** Remove the unused `zod` dependency from `package.json` (not imported/used anywhere — the only occurrence is inside a hardcoded mock string in `data/repoTrees.ts`). — Effort: **S** — Risk: **Low**
- [ ] **0.2** Delete the two unused static OG image assets: `public/og-image old version.png` and `public/opengraph-image.png` (the live OG image is generated dynamically by `app/opengraph-image.tsx`; worth a final grep before deleting to be certain neither is referenced). — Effort: **S** — Risk: **Low**
- [ ] **0.3** Decide the fate of `data/education.ts` — either build a small `Education` section to render it, or remove the unused data/type if you don't want education on the site. Your call, not assumed either way. — Effort: **S** — Risk: **Low**
- [ ] **0.4** Adopt the existing but unused `components/ui/button.tsx` / `input.tsx` primitives for any new form/CTA work in this proposal (3.2's mobile CTA, 3.3's form, 1.1's service cards) instead of continuing the hand-rolled inline-style pattern — consolidates two parallel button styles into one. — Effort: **S** — Risk: **Low**

---

## Summary of blockers needing your input before execution

1. Real price bands for the four services (1.1) — placeholders given, need your numbers.
2. Résumé PDF (3.4) — supply the file, or approve removing the link.
3. WhatsApp Business number (3.5) — required to build the click-to-chat link.
4. Exact wording for the Canada/US positioning line (2.8) and the FAQ answers (2.5) — drafts offered, need your sign-off (no invented claims).

---

Proposal ready. Reply with the item numbers you want executed (e.g. '1.1, 1.2, 2.1, 2.3, 3.1') or 'all approved'.
