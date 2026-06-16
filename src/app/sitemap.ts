import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/seo/tool-meta";

const SITE_URL = "https://onylogy.studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/color`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/font`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
  const toolRoutes: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));
  return [...staticRoutes, ...toolRoutes];
}
