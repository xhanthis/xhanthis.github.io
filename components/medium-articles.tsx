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

export default function MediumArticles({ showLatest = 3 }: MediumArticlesProps) {
  const [articles, setArticles] = useState<MediumArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMediumArticles()
  }, [])

  const fetchMediumArticles = async () => {
    try {
      // Use RSS2JSON service to fetch Medium RSS feed
      const response = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@xhanthis',
        { headers: { 'Accept': 'application/json' } }
      )

      if (!response.ok) throw new Error('RSS fetch failed')

      const data = await response.json()
      
      if (data.status === 'ok' && Array.isArray(data.items)) {
        const articles: MediumArticle[] = data.items.slice(0, 10).map((item: any, index: number) => {
          // Extract thumbnail from content or use default
          let thumbnail = '/placeholder.svg?height=64&width=64'
          
          // Try to extract image from content
          const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/i)
          if (imgMatch && imgMatch[1]) {
            thumbnail = imgMatch[1]
          } else if (item.thumbnail) {
            thumbnail = item.thumbnail
          }

          // Clean description from HTML
          const description = item.description
            ? item.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...'
            : item.content?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || 'No description available'

          return {
            title: item.title || 'Untitled',
            link: item.link || '#',
            pubDate: item.pubDate || new Date().toISOString(),
            description: description,
            thumbnail: thumbnail,
            guid: item.guid || `article-${index}`
          }
        })

        setArticles(articles)
      } else {
        throw new Error('Invalid RSS response')
      }
    } catch (err) {
      console.error('Medium RSS error:', err)
      setError('Using cached articles')
      loadFallbackArticles()
    } finally {
      setLoading(false)
    }
  }

  const loadFallbackArticles = () => {
    const fallbackArticles: MediumArticle[] = [
      {
        title: "Building mobile apps for Bharat",
        link: "https://medium.com/@xhanthis/building-mobile-apps-for-bharat-dd693e478d73",
        pubDate: "2024-05-12T00:00:00.000Z",
        description: "Exploring the unique challenges and opportunities in building mobile applications for the Indian market. Understanding user behavior, infrastructure constraints, and localization needs...",
        thumbnail: "https://miro.medium.com/v2/resize:fit:1400/1*Cwd0q7b_gBJLVu9nMO_-VA.jpeg",
        guid: "building-mobile-apps-bharat",
      },
      {
        title: "India to Bharat: The Birth of India's Second Republic",
        link: "https://medium.com/stynd/india-to-bharat-the-birth-of-indias-second-republic-76bf067a45fe",
        pubDate: "2024-01-21T00:00:00.000Z",
        description: "A deep dive into the transformation of India and the emergence of a new national identity. Examining the cultural, political, and social shifts that define modern India...",
        thumbnail: "https://miro.medium.com/v2/resize:fit:1400/1*YbEyeqI2BE4skpELnBzN2Q.jpeg",
        guid: "india-bharat-second-republic",
      },
      {
        title: "India's pandemic story",
        link: "https://medium.com/@xhanthis/indias-pandemic-story-42f501e410e5",
        pubDate: "2021-09-04T00:00:00.000Z",
        description: "As India completes sixty-three crore vaccines which are enough to vaccinate a quarter of our nation's 1.25 billion strong population, we reflect on the journey through the pandemic...",
        thumbnail: "https://miro.medium.com/v2/resize:fit:1400/0*tOG2VL_954Bcf7vH",
        guid: "indias-pandemic-story",
      },
    ]
    setArticles(fallbackArticles)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(showLatest)].map((_, i) => (
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
      {articles.slice(0, showLatest).map((article) => (
        <div key={article.guid} className="border-l border-gray-700 pl-6">
          <Link
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:bg-gray-900/30 -ml-6 pl-6 py-3 rounded transition-colors group"
          >
            <div className="flex gap-4">
              <div className="w-16 h-16 flex-shrink-0 relative overflow-hidden rounded">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=64&width=64"
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 text-xs">
                    {new Date(article.pubDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  {error && (
                    <span className="text-xs text-yellow-400" title={error}>
                      (cached)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
