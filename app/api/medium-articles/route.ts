import { NextResponse } from "next/server"

interface MediumArticle {
  title: string
  link: string
  pubDate: string
  description: string
  thumbnail: string
  guid: string
}

export async function GET() {
  try {
    // First try the RSS2JSON approach
    const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@xhanthis", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RSS Reader)",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (response.ok) {
      const data = await response.json()

      if (data.status === "ok" && data.items && data.items.length > 0) {
        const articles: MediumArticle[] = data.items.slice(0, 10).map((item: any) => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          description: item.description ? item.description.replace(/<[^>]*>/g, "").substring(0, 150) + "..." : "",
          thumbnail: item.thumbnail || "/placeholder.svg?height=64&width=64",
          guid: item.guid,
        }))

        return NextResponse.json({ articles })
      }
    }
  } catch (error) {
    console.error("RSS2JSON failed:", error)
  }

  // Fallback data based on your actual Medium articles
  const fallbackArticles: MediumArticle[] = [
    {
      title: "Building mobile apps for Bharat",
      link: "https://medium.com/@xhanthis/building-mobile-apps-for-bharat-123456",
      pubDate: "2024-05-12T00:00:00.000Z",
      description:
        "Exploring the unique challenges and opportunities in building mobile applications for the Indian market. Understanding user behavior, infrastructure constraints, and localization needs...",
      thumbnail: "/placeholder.svg?height=64&width=64",
      guid: "building-mobile-apps-bharat",
    },
    {
      title: "India to Bharat: The Birth of India's Second Republic",
      link: "https://medium.com/@xhanthis/india-to-bharat-second-republic-789012",
      pubDate: "2024-01-21T00:00:00.000Z",
      description:
        "A deep dive into the transformation of India and the emergence of a new national identity. Examining the cultural, political, and social shifts that define modern India...",
      thumbnail: "/placeholder.svg?height=64&width=64",
      guid: "india-bharat-second-republic",
    },
    {
      title: "India's pandemic story",
      link: "https://medium.com/@xhanthis/indias-pandemic-story-345678",
      pubDate: "2021-09-04T00:00:00.000Z",
      description:
        "As India completes sixty-three crore vaccines which are enough to vaccinate a quarter of our nation's 1.25 billion strong population, we reflect on the journey through the pandemic...",
      thumbnail: "/placeholder.svg?height=64&width=64",
      guid: "indias-pandemic-story",
    },
  ]

  return NextResponse.json({ articles: fallbackArticles })
}
