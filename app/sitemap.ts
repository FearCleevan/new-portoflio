import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/constants";

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectEntries,
  ];
}
