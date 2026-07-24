import type { ServiceOffering } from "@/types/content";

export const services: ServiceOffering[] = [
  {
    id: "custom-website",
    index: "01",
    title: "Custom Website",
    tagline: "Marketing sites built to convert and rank.",
    scope: [
      "Up to ~6 pages, fully responsive",
      "Next.js frontend + CMS — edit content without a developer",
      "On-page SEO baked in from day one",
    ],
    timeline: "2–4 weeks",
  },
  {
    id: "web-application",
    index: "02",
    title: "Web Application",
    tagline: "Custom internal tools, dashboards, and CRMs.",
    scope: [
      "Multi-role authentication and access control",
      "Database design and admin dashboards",
      "Built around your workflow, not a template's",
    ],
    timeline: "4–10+ weeks, scoped after discovery",
  },
  {
    id: "landing-page-sprint",
    index: "03",
    title: "Landing Page Sprint",
    tagline: "One high-conversion page, launched fast.",
    scope: [
      "Single page — hero, value proposition, CTA, form",
      "Conversion-focused copy structure and layout",
      "Live in about a week",
    ],
    timeline: "~1 week",
  },
  {
    id: "site-rescue",
    index: "04",
    title: "Site Rescue / Rebuild",
    tagline: "Take over a broken or outdated site.",
    scope: [
      "Audit of what's broken, slow, or outdated",
      "Fixed in place, or fully rebuilt on a modern stack",
      "Same content and SEO equity, none of the baggage",
    ],
    timeline: "1–4 weeks, depending on scope",
  },
];

export function getService(id: string): ServiceOffering | undefined {
  return services.find((s) => s.id === id);
}
