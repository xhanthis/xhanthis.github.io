"use client"

import { useState, useEffect } from "react"

interface ContributionDay {
  date: string
  count: number
  level: number
}

export default function GitHubContributions() {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalContributions, setTotalContributions] = useState(1326)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Generate mock contribution data based on the screenshot
    const generateContributions = () => {
      const contributions: ContributionDay[] = []
      const today = new Date()
      const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())

      for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay()
        const month = d.getMonth()

        // Create realistic contribution patterns
        let count = 0
        let level = 0

        // Higher activity on weekdays, some weekend activity
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
          count = Math.floor(Math.random() * 8)
        } else {
          count = Math.floor(Math.random() * 4)
        }

        // Determine level based on count
        if (count === 0) level = 0
        else if (count <= 2) level = 1
        else if (count <= 4) level = 2
        else if (count <= 6) level = 3
        else level = 4

        contributions.push({
          date: d.toISOString().split("T")[0],
          count,
          level,
        })
      }

      return contributions
    }

    setContributions(generateContributions())
    setLoading(false)
  }, [])

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-gray-800"
      case 1:
        return "bg-green-900"
      case 2:
        return "bg-green-700"
      case 3:
        return "bg-green-500"
      case 4:
        return "bg-green-400"
      default:
        return "bg-gray-800"
    }
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
        <div className="bg-gray-900/50 rounded-lg p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-4 w-48"></div>
            <div className="grid grid-cols-53 gap-1">
              {[...Array(371)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-gray-700 rounded-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-12">
      <h2 className="text-lg font-medium mb-4">How I'm coding 👀</h2>
      <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-800">
        <div className="mb-4">
          <p className="text-white font-medium">{totalContributions.toLocaleString()} contributions in the last year</p>
        </div>

        <div className="w-full">
          {/* Month labels */}
          <div className="flex mb-2 ml-8">
            {getMonthLabels().map((month, index) => (
              <div key={index} className="flex-1 text-xs text-gray-400 text-center">
                {month}
              </div>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="flex">
            {/* Day labels */}
            <div className="flex flex-col justify-between text-xs text-gray-400 mr-2 h-[91px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-53 gap-1 flex-1">
              {contributions.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded-sm ${getLevelColor(day.level)}`}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
            <span>Learn how we count contributions</span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div key={level} className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
