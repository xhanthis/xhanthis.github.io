"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface MediumArticle {
  title: string
  link: string
  pubDate: string
  description: string
  thumbnail: string
  guid: string
}

interface MediumArticlesProps {
  showLatest?: number
}

export default function MediumArticles({ showLatest }: MediumArticlesProps) {
  const [articles, setArticles] = useState<MediumArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/medium-articles")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles)
        } else {
          throw new Error("Invalid response format")
        }
      } catch (err) {
        console.error("Error fetching articles:", err)

        // Set fallback articles directly in the component as last resort
        const fallbackArticles: MediumArticle[] = [
          {
            title: "Building mobile apps for Bharat",
            link: "https://medium.com/@xhanthis",
            pubDate: "2024-05-12T00:00:00.000Z",
            description:
              "Exploring the unique challenges and opportunities in building mobile applications for the Indian market...",
            thumbnail: "/placeholder.svg?height=64&width=64",
            guid: "1",
          },
          {
            title: "India to Bharat: The Birth of India's Second Republic",
            link: "https://medium.com/@xhanthis",
            pubDate: "2024-01-21T00:00:00.000Z",
            description: "A deep dive into the transformation of India and the emergence of a new national identity...",
            thumbnail: "/placeholder.svg?height=64&width=64",
            guid: "2",
          },
          {
            title: "India's pandemic story",
            link: "https://medium.com/@xhanthis",
            pubDate: "2021-09-04T00:00:00.000Z",
            description:
              "As India completes sixty-three crore vaccines which are enough to vaccinate a quarter of our nation's population...",
            thumbnail: "/placeholder.svg?height=64&width=64",
            guid: "3",
          },
        ]

        setArticles(fallbackArticles)
        setError("Using cached articles")
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(showLatest || 3)].map((_, i) => (
          <div key={i} className="border-l border-gray-700 pl-6">
            <div className="animate-pulse">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gray-700 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded mb-1"></div>
                  <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {articles.slice(0, showLatest || articles.length).map((article) => (
        <div key={article.guid} className="border-l border-gray-700 pl-6">
          <Link
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:bg-gray-900/30 -ml-6 pl-6 py-3 rounded transition-colors group"
          >
            <div className="flex gap-4">
              {article.thumbnail && (
                <div className="w-16 h-16 flex-shrink-0 relative overflow-hidden rounded">
                  <Image
                    src={article.thumbnail || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=64&width=64"
                    }}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2 line-clamp-2">{article.description}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(article.pubDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
