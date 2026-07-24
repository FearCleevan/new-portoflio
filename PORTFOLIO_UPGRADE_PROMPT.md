# Claude Code Prompt — Upgrade peterpaullazan.com (Portfolio → Portfolio + Services)

> Paste everything below the divider. This is a **modification** prompt, not a rebuild — the codebase already exists.

---

You are working on my existing portfolio codebase, deployed at **peterpaullazan.com** (also served at `lazandev.vercel.app`). The design already exists. **Do not redesign it. Do not rebuild it. Do not introduce a new design system.** Your job is to modify the current site to accomplish three goals:

1. **Add productized web development services** so visitors know what to hire me for (not just what I've built)
2. **Fix SEO and GEO** — traditional search (meta, sitemap, structured data, semantic HTML, Core Web Vitals) *and* Generative Engine Optimization (LLM-friendly content, `llms.txt`, clear entity descriptions, FAQ-shaped answers that ChatGPT/Claude/Perplexity/Google AI Overviews will surface). Geo also means geo-targeting: I'm targeting Canadian and US small-business clients from the Philippines, and the site should signal that clearly.
3. **Make it easy for clients to reach out** — reduce friction between "I want to hire this guy" and "I've made contact." Visible CTAs, low-friction form, plus at least one alternative contact method.

Do the work in three phases: **Discovery → Proposal → Execution.** Do not skip to code.

---

## Phase 0 — Discovery (read-only)

Before proposing anything, produce `AUDIT.md` in the repo root. Cover:

- **Stack inventory** — framework version, routing style (App Router vs Pages), styling system, component library, state management, form library, deployment target, existing dependencies
- **Site map** — every route/page that exists today, with a one-line description of what's on it
- **Design system inventory** — actual colors, fonts, spacing scale, radii, and shadows in use. Read from `tailwind.config`, CSS variables, and inline styles. State them as tokens. If tokens aren't formalized, extract them and propose formalization as a *separate* item in the proposal.
- **Content inventory** — what real copy, project case studies, images, and links currently exist. Note which case studies have live URLs.
- **SEO baseline** — current `<title>`, `<meta description>`, Open Graph tags, `robots.txt`, `sitemap.xml`, structured data (JSON-LD), semantic HTML use, image alt text coverage
- **GEO baseline** — is there an `llms.txt`? Is the copy structured in a way that LLM search would extract clean answers (i.e., named services, clear pricing bands, FAQ-shaped content)? Are entities (my name, location, services, tech stack) stated as plain facts anywhere on the page?
- **Contact-flow baseline** — every path a visitor has to contact me today, and how many clicks/scrolls it takes
- **Known issues** — anything you find that's broken, deprecated, or obviously suboptimal (dead links, unused deps, TypeScript errors, missing meta, layout shift, etc.)

Stop after `AUDIT.md`. Say: *"Audit complete. Ready to generate proposal — proceed?"*

---

## Phase 1 — Proposal (still read-only)

Once I say proceed, produce `PROPOSAL.md`. Structure it as a **numbered checklist grouped by goal**, so I can approve or reject items individually. Format:

```
### Goal 1: Add Services
- [ ] 1.1 Add a Services section to the home page — [brief description] — [effort: S/M/L] — [risk to existing design: low/med/high]
- [ ] 1.2 Create /services/[slug] pages for each offering — ...
...

### Goal 2: SEO + GEO
- [ ] 2.1 Add JSON-LD Person + ProfessionalService schema to layout — ...
- [ ] 2.2 Create llms.txt at the root — ...
...

### Goal 3: Reduce contact friction
- [ ] 3.1 Add sticky "Start a project" CTA to nav on scroll — ...
...
```

Rules for the proposal:

- **Every item must state whether it preserves the existing design or modifies it.** If it modifies, say what and why. Default should be preserve.
- **Group items with dependencies** — if 2.3 requires 2.1 done first, say so.
- **Include a "Do NOT change" list** at the top — things you looked at in the audit that are working and should be left alone. This is not filler; it's how I know you actually looked.
- **Explicitly propose the four productized services** for Goal 1, with fixed scope and price bands I can edit:
  - Custom Website (marketing sites, Next.js + CMS)
  - Web Application (custom internal tools, dashboards, CRMs)
  - Landing Page Sprint (single high-conversion page, ~1 week)
  - Site Rescue / Rebuild (take over broken/outdated site)
- **Contact channels to propose** — form (already exists?), direct email, and one lower-friction option. Suggest which lower-friction option fits best given the audience is Canadian/US small-business owners (Calendly, WhatsApp Business, and a plain "reply directly to this email" are all candidates — argue for one, not all three).
- **SEO and GEO fixes must be concrete**, not "improve SEO." Name the exact tag, the exact schema, the exact file.

Stop after `PROPOSAL.md`. Say: *"Proposal ready. Reply with the item numbers you want executed (e.g. '1.1, 1.2, 2.1, 2.3, 3.1') or 'all approved'."*

---

## Phase 2+ — Execution

Only after I approve specific items, execute them **one phase at a time**. A phase can be one item or a small dependent cluster — you decide, but state the phase scope up front.

At the end of every phase:

1. Run `npx tsc --noEmit`
2. Run `npm run build`
3. Fix all errors before reporting complete
4. Produce a Phase Report in this format:

```
### Phase [N] Complete — [What was addressed, referencing item numbers]

**What was built:**
- ...

**Files changed:**
| File | Action | Purpose |
|------|--------|---------|

**Decisions made:**
- ...

**Assumptions:**
- ...

**Known gaps / next phase dependency:**
- ...

**To verify this phase works:**
- ...

**Commit this phase? (y/n)**
```

Stop after the report. Do not proceed until I say "Yes, proceed" or "Continue."

---

## Rules That Override Anything Else

- **Preserve the existing visual identity.** If a change would alter the design language, flag it in the proposal as high-risk and let me decide.
- **No new dependencies without asking.** If a proposed item needs a new library, list it in the proposal item and I'll approve the library along with the item.
- **No lorem ipsum.** Use real copy or ask me for it.
- **No inventing case studies.** If a project needs more content, ask.
- **If something in the codebase is broken or blocks a proposed item**, that's a Blocker — stop and surface it, don't work around it silently.
- **All content additions must be TypeScript-typed.** No `any`. No JavaScript files.
- **Responsive to mobile, visible keyboard focus, `prefers-reduced-motion` respected** — build to this floor without being asked.

Begin with Phase 0. Produce `AUDIT.md`.
