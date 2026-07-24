import { personal } from "@/data/personal";
import { services } from "@/data/services";
import { SITE_URL } from "@/lib/constants";

export function GET() {
  const [aboutLine] = personal.summary.split("\n\n");

  const lines = [
    `# ${personal.name}`,
    "",
    `> Full-Stack Developer based in Davao City, Philippines, building production web and mobile applications for clients in Canada, the United States, and worldwide.`,
    "",
    aboutLine,
    "",
    "## Services",
    "",
    ...services.map((s) => `- ${s.title} — ${s.tagline} (${s.timeline})`),
    "",
    "## Contact",
    "",
    `- Email: ${personal.email}`,
    `- Phone: ${personal.phone}`,
    `- Book a call: ${personal.calendlyUrl}`,
    `- Portfolio: ${SITE_URL}`,
    "",
    "## Links",
    "",
    `- GitHub: ${personal.githubUrl}`,
    `- LinkedIn: ${personal.linkedinUrl}`,
    "",
    "## Pages",
    "",
    `- Homepage: ${SITE_URL}/ — bio, experience, skills, services, projects, contact`,
    `- Project case studies: ${SITE_URL}/projects/{project-id} (see ${SITE_URL}/sitemap.xml for the full list)`,
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
