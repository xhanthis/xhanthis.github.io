import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-09-24")
  return [
    { url: "https://xhanthis.github.io/", lastModified: updated, changeFrequency: "monthly", priority: 1 },
    { url: "https://xhanthis.github.io/god-skills/", lastModified: updated, changeFrequency: "weekly", priority: 0.9 },
  ]
}
