"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface MediumArticle {
  title: string
  link: string
  pubDate: string
  guid: string
}

interface MediumArticlesProps {
  showLatest?: number
}

const FALLBACK_ARTICLES: MediumArticle[] = [
  {
    title: "Building mobile apps for Bharat",
    link: "https://medium.com/@xhanthis/building-mobile-apps-for-bharat-dd693e478d73",
    pubDate: "2024-05-12T00:00:00.000Z",
    guid: "building-mobile-apps-bharat",
  },
  {
    title: "India to Bharat: the birth of India's second republic",
    link: "https://medium.com/stynd/india-to-bharat-the-birth-of-indias-second-republic-76bf067a45fe",
    pubDate: "2024-01-21T00:00:00.000Z",
    guid: "india-bharat-second-republic",
  },
  {
    title: "India's pandemic story",
    link: "https://medium.com/@xhanthis/indias-pandemic-story-42f501e410e5",
    pubDate: "2021-09-04T00:00:00.000Z",
    guid: "indias-pandemic-story",
  },
]

export default function MediumArticles({ showLatest = 3 }: MediumArticlesProps) {
  const [articles, setArticles] = useState<MediumArticle[]>(FALLBACK_ARTICLES)

  useEffect(() => {
    let cancelled = false
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@xhanthis", {
      headers: { Accept: "application/json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (cancelled || data.status !== "ok" || !Array.isArray(data.items)) return
        const live: MediumArticle[] = data.items.slice(0, showLatest).map((item: any, i: number) => ({
          title: item.title || "Untitled",
          link: item.link || "#",
          pubDate: item.pubDate || new Date().toISOString(),
          guid: item.guid || `article-${i}`,
        }))
        if (live.length) setArticles(live)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [showLatest])

  return (
    <ul>
      {articles.slice(0, showLatest).map((article) => (
        <li key={article.guid}>
          <span className="d">
            {new Date(article.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
          </span>
          <Link href={article.link} target="_blank" rel="noopener noreferrer">
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
