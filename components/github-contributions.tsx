"use client"

import { useState, useEffect } from "react"

interface ContributionDay {
  date: string
  count: number
  level: number
}

export default function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGitHubContributions()
  }, [])

  const fetchGitHubContributions = async () => {
    try {
      const response = await fetch(
        'https://github-contributions-api.jogruber.de/v4/xhanthis?y=last',
        {
          headers: { 'Accept': 'application/json' }
        }
      )

      if (!response.ok) throw new Error(`API request failed: ${response.status}`)

      const data = await response.json()
      console.log('GitHub API response:', data) // Debug log
      
      // Handle different possible response formats
      let total = 0
      let contributionsArray: any[] = []

      if (data && typeof data === 'object') {
        // Try different possible structures
        if (typeof data.total === 'number' && Array.isArray(data.contributions)) {
          total = data.total
          contributionsArray = data.contributions
        } else if (Array.isArray(data.years) && data.years.length > 0) {
          // Alternative format: years array
          const lastYear = data.years[data.years.length - 1]
          total = lastYear.total || 0
          contributionsArray = lastYear.contributions || []
        } else if (Array.isArray(data)) {
          // Direct array format
          contributionsArray = data
          total = data.reduce((sum: number, contrib: any) => sum + (Number(contrib.count) || 0), 0)
        } else {
          throw new Error(`Unexpected response structure: ${JSON.stringify(data).slice(0, 100)}...`)
        }

        if (contributionsArray.length === 0) {
          throw new Error('No contributions data found in response')
        }

        setTotalContributions(total)
        
        const contributionDays: ContributionDay[] = contributionsArray.map((contrib: any) => {
          const count = Number(contrib.count) || 0
          let level = 0
          
          if (count === 0) level = 0
          else if (count <= 2) level = 1
          else if (count <= 4) level = 2
          else if (count <= 6) level = 3
          else level = 4

          return {
            date: contrib.date || new Date().toISOString().split('T')[0],
            count,
            level
          }
        })

        setContributions(contributionDays)
        setError(null) // Clear any previous errors
      } else {
        throw new Error('Invalid response: not an object')
      }
    } catch (err) {
      console.error('GitHub API error:', err)
      setError('Using fallback data')
      generateFallbackData()
    } finally {
      setLoading(false)
    }
  }

  const generateFallbackData = () => {
    const contributions: ContributionDay[] = []
    const today = new Date()
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    let total = 0

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      
      let count = 0
      if (isWeekend) {
        count = Math.random() < 0.6 ? 0 : Math.floor(Math.random() * 3)
      } else {
        count = Math.random() < 0.2 ? 0 : Math.floor(Math.random() * 8) + 1
      }

      let level = 0
      if (count === 0) level = 0
      else if (count <= 2) level = 1
      else if (count <= 4) level = 2
      else if (count <= 6) level = 3
      else level = 4

      total += count
      contributions.push({
        date: d.toISOString().split("T")[0],
        count,
        level,
      })
    }

    setContributions(contributions)
    setTotalContributions(total)
  }

  const getLevelColor = (level: number) => {
    const colors = [
      "bg-gray-800",    // 0
      "bg-green-900",   // 1  
      "bg-green-700",   // 2
      "bg-green-500",   // 3
      "bg-green-400"    // 4
    ]
    return colors[level] || colors[0]
  }

  const getMonthLabels = () => {
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
      <div className="mb-12">
        <h2 className="text-lg font-medium mb-4">GitHub Activity</h2>
        <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-4 w-48"></div>
            <div className="hidden sm:grid grid-cols-53 gap-1">
              {[...Array(371)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-gray-700 rounded-sm"></div>
              ))}
            </div>
            <div className="sm:hidden">
              <div className="h-20 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-12">
      <h2 className="text-lg font-medium mb-4">
        How I'm coding 👀

      </h2>
      
      <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
        <div className="mb-4">
          <p className="text-white font-medium">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>
          {!error && (
            <p className="text-xs text-gray-400 mt-1">Live data from GitHub</p>
          )}
        </div>

        {/* Desktop view */}
        <div className="hidden sm:block w-full">
          <div className="flex mb-2 ml-8">
            {getMonthLabels().map((month, index) => (
              <div key={index} className="flex-1 text-xs text-gray-400 text-center">
                {month}
              </div>
            ))}
          </div>

          <div className="flex">
            <div className="flex flex-col justify-between text-xs text-gray-400 mr-2 h-[91px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            <div className="grid grid-cols-53 gap-1 flex-1">
              {contributions.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-sm ${getLevelColor(day.level)} hover:ring-1 hover:ring-gray-400 transition-all cursor-pointer`}
                  title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile view */}
        <div className="sm:hidden">
          <div className="text-center text-sm text-gray-400 mb-4">
            Contribution activity over the last year
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-26 gap-[2px] max-w-[280px]">
              {contributions.filter((_, index) => index % 2 === 0).map((day, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-sm ${getLevelColor(day.level)}`}
                  title={`${day.count} contributions`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
          <a 
            href="https://github.com/xhanthis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            View on GitHub →
          </a>
          <div className="flex items-center gap-1">
            <span className="hidden sm:inline">Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`} />
              ))}
            </div>
            <span className="hidden sm:inline">More</span>
          </div>
        </div>
      </div>
    </div>
  )
}
