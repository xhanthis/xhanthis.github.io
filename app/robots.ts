import type { MetadataRoute } from "next"

export const dynamic = "force-static"

// Search engines and the AI crawlers that feed answer engines are all welcome.
const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: "https://xhanthis.github.io/sitemap.xml",
    host: "https://xhanthis.github.io",
  }
}
