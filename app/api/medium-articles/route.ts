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
    // Use a CORS proxy to fetch Medium RSS feed
    const response = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@xhanthis", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RSS Reader)",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch Medium RSS feed")
    }

    const data = await response.json()

    if (data.status !== "ok") {
      throw new Error("RSS feed parsing failed")
    }

    const articles: MediumArticle[] = data.items.slice(0, 10).map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
      thumbnail: item.thumbnail || "",
      guid: item.guid,
    }))

    return NextResponse.json({ articles })
  } catch (error) {
    console.error("Error fetching Medium articles:", error)

    // Fallback data based on the screenshot
    const fallbackArticles: MediumArticle[] = [
      {
        title: "Building mobile apps for Bharat",
        link: "https://medium.com/@xhanthis/building-mobile-apps-for-bharat",
        pubDate: "May 12, 2024",
        description:
          "Exploring the unique challenges and opportunities in building mobile applications for the Indian market...",
        thumbnail: "/placeholder.svg?height=64&width=64",
        guid: "1",
      },
      {
        title: "India to Bharat: The Birth of India's Second Republic",
        link: "https://medium.com/@xhanthis/india-to-bharat-the-birth-of-indias-second-republic",
        pubDate: "Jan 21, 2024",
        description: "A deep dive into the transformation of India and the emergence of a new national identity...",
        thumbnail: "/placeholder.svg?height=64&width=64",
        guid: "2",
      },
      {
        title: "India's pandemic story",
        link: "https://medium.com/@xhanthis/indias-pandemic-story",
        pubDate: "Sep 4, 2021",
        description:
          "As India completes sixty-three crore vaccines which are enough to vaccinate a quarter of our nation's 1.25 billion strong...",
        thumbnail: "/placeholder.svg?height=64&width=64",
        guid: "3",
      },
    ]

    return NextResponse.json({ articles: fallbackArticles })
  }
}
