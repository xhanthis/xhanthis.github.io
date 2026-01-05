"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface GitHubContributionsProps {
  className?: string
}

export default function GitHubContributions({ className = "" }: GitHubContributionsProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGitHubContributions()
  }, [])

  const fetchGitHubContributions = async () => {
    try {
      // Use the Jogruber proxy which mimics the GitHub contribution graph (last 365 days)
      const response = await fetch('https://github-contributions-api.jogruber.de/v4/xhanthis?y=last')
      
      if (!response.ok) {
        throw new Error('Failed to fetch contributions')
      }

      const data = await response.json()
      
      if (data.contributions) {
        // Jogruber returns an entire year's worth of data
        // We calculate the total from this data to be accurate for the displayed period
        const total = data.contributions.reduce((sum: number, day: any) => sum + day.count, 0)
        setTotalContributions(total)

        const contributionDays: ContributionDay[] = data.contributions.map((day: any) => ({
          date: day.date,
          count: day.count,
          level: day.level
        }))

        setContributions(contributionDays)
      } else {
        throw new Error('Invalid data format')
      }
    } catch (err) {
      console.error('GitHub API error:', err)
      setError('Could not load GitHub data')
    } finally {
      setLoading(false)
    }
  }

  const getLevelColor = (level: number) => {
    // GitHub dark mode colors
    const colors = [
      "bg-[#161b22]",    // 0 - empty
      "bg-[#0e4429]",    // 1
      "bg-[#006d32]",    // 2
      "bg-[#26a641]",    // 3
      "bg-[#39d353]"     // 4
    ]
    return colors[level] || colors[0]
  }

  const getMonthLabels = () => {
    // Generate static month labels for the last year
    // This is an approximation. A perfect solution maps exact weeks.
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const today = new Date()
    const labels = []

    for (let i = 0; i < 12; i++) {
      const monthIndex = (today.getMonth() - 11 + i + 12) % 12
      labels.push(months[monthIndex])
    }
    return labels
  }

  if (loading) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-4 bg-gray-800 rounded w-1/3 mx-auto mb-4"></div>
        <div className="grid grid-cols-53 gap-1 h-24 overflow-hidden">
          {Array.from({ length: 365 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-800 rounded-sm"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full text-center ${className}`}>
      <h3 className="text-xl font-semibold mb-2 text-white">I like coding</h3>
      
      <div className="mb-8">
        <p className="text-gray-400 text-sm leading-relaxed">
          I love python, and I'm getting better at Go.
        </p>
      </div>

      <div className="bg-[#0d1117] rounded-xl p-6 border border-gray-800 text-left relative group hover:border-gray-700 transition-colors">
        <div className="text-center mb-6">
          <h4 className="text-white text-lg font-medium">
            {totalContributions.toLocaleString()} contributions in the last year
          </h4>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="flex mb-2 justify-between px-1">
            {getMonthLabels().map((month, index) => (
              <div key={index} className="text-[10px] text-gray-500">
                {month}
              </div>
            ))}
          </div>

          <div className="grid grid-rows-7 grid-flow-col gap-[3px] w-fit mx-auto">
            {contributions.map((day, index) => (
              <div
                key={index}
                className={`w-[10px] h-[10px] rounded-sm ${getLevelColor(day.level)} transition-all hover:ring-1 hover:ring-white/50 hover:z-10`}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
          <Link 
            href="https://github.com/xhanthis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            View on GitHub
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className={`w-[10px] h-[10px] rounded-sm ${getLevelColor(level)}`} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  )
}

