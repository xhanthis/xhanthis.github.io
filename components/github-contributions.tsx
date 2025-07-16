"use client"

import { useState, useEffect } from "react"

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface GitHubContributionsProps {
  isSliderMode?: boolean
}

export default function GitHubContributions({ isSliderMode = false }: GitHubContributionsProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGitHubContributions()
  }, [])

  const fetchGitHubContributions = async () => {
    try {
      // Try multiple APIs for better reliability
      let response;
      let data;
      let apiSuccess = false;
      
      try {
        // Primary API
        response = await fetch('https://github-contributions-api.jogruber.de/v4/xhanthis?y=last')
        if (response.ok) {
          data = await response.json()
          console.log('Primary GitHub API response:', data)
          apiSuccess = true
        } else {
          throw new Error('Primary API failed')
        }
      } catch (primaryError) {
        console.log('Primary API failed, trying alternative...')
        try {
          // Alternative API
          response = await fetch('https://api.github.com/users/xhanthis/events?per_page=100', {
            headers: {
              'Accept': 'application/vnd.github.v3+json'
            }
          })
          if (response.ok) {
            const events = await response.json()
            data = processGitHubEvents(events)
            apiSuccess = true
          } else {
            throw new Error('Alternative API also failed')
          }
        } catch (altError) {
          console.log('Both APIs failed, using fallback data')
          apiSuccess = false
        }
      }

      if (apiSuccess && data) {
        // Process the data based on structure
        let total = 0
        let contributionsArray: any[] = []

        if (data && typeof data === 'object') {
          if (typeof data.total === 'number' && Array.isArray(data.contributions)) {
            total = data.total
            contributionsArray = data.contributions
          } else if (Array.isArray(data.years) && data.years.length > 0) {
            const lastYear = data.years[data.years.length - 1]
            total = lastYear.total || 0
            contributionsArray = lastYear.contributions || []
          } else if (Array.isArray(data)) {
            contributionsArray = data
            total = data.reduce((sum: number, contrib: any) => sum + (Number(contrib.count) || 0), 0)
          } else if (data.processedContributions) {
            contributionsArray = data.processedContributions
            total = data.processedTotal || 0
          }

          if (contributionsArray.length > 0) {
            setTotalContributions(total)
            
            const contributionDays: ContributionDay[] = contributionsArray.map((contrib: any) => {
              const count = Number(contrib.count) || 0
              let level = 0
              
              if (count === 0) level = 0
              else if (count <= 3) level = 1
              else if (count <= 6) level = 2
              else if (count <= 9) level = 3
              else level = 4

              return {
                date: contrib.date || new Date().toISOString().split('T')[0],
                count,
                level
              }
            })

            setContributions(contributionDays)
            setError(null)
            return
          }
        }
      }
      
      // If we reach here, either APIs failed or returned invalid data
      throw new Error('API data unavailable')
    } catch (err) {
      console.error('GitHub API error:', err)
      setError('Using realistic sample data')
      generateRealisticData()
    } finally {
      setLoading(false)
    }
  }

  const processGitHubEvents = (events: any[]) => {
    const contributionMap = new Map<string, number>()
    const today = new Date()
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    
    // Initialize all days with 0
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      contributionMap.set(d.toISOString().split('T')[0], 0)
    }
    
    // Count events by date
    events.forEach(event => {
      const eventDate = new Date(event.created_at).toISOString().split('T')[0]
      if (contributionMap.has(eventDate)) {
        contributionMap.set(eventDate, contributionMap.get(eventDate)! + 1)
      }
    })
    
    const processedContributions = Array.from(contributionMap.entries()).map(([date, count]) => ({
      date,
      count
    }))
    
    const processedTotal = processedContributions.reduce((sum, contrib) => sum + contrib.count, 0)
    
    return { processedContributions, processedTotal }
  }

  const generateRealisticData = () => {
    const contributions: ContributionDay[] = []
    const today = new Date()
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    let total = 0

    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      
      let count = 0
      if (isWeekend) {
        count = Math.random() < 0.7 ? 0 : Math.floor(Math.random() * 4)
      } else {
        count = Math.random() < 0.15 ? 0 : Math.floor(Math.random() * 12) + 1
      }

      let level = 0
      if (count === 0) level = 0
      else if (count <= 3) level = 1
      else if (count <= 6) level = 2
      else if (count <= 9) level = 3
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
      "bg-gray-200",      // 0 - light gray for no activity
      "bg-green-200",     // 1 - very light green  
      "bg-green-400",     // 2 - medium green
      "bg-green-600",     // 3 - darker green
      "bg-green-800"      // 4 - darkest green
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

  if (isSliderMode) {
    // Fitness component for slider
    if (loading) {
      return (
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">FITNESS</h3>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-4 w-48"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      )
    }

    return (
      <div className="w-full text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">I like being fit</h3>
        
        <div className="mb-6">
          <p className="text-gray-700 text-sm leading-relaxed">
            I play badminton and love sprinting.
          </p>
        </div>

        <div className="bg-black rounded-2xl p-6 text-white max-w-sm mx-auto">
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2 text-left">Daily Readings</h4>
            <div className="text-xs text-gray-400 text-left">1:41</div>
          </div>

          {/* Mock chart display */}
          <div className="relative h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 300 120">
              {/* Red line (top) */}
              <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                points="0,30 20,25 40,35 60,20 80,40 100,15 120,45 140,25 160,50 180,20 200,35 220,40 240,30 260,45 280,35 300,50"
              />
              {/* Blue line (bottom) */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                points="0,90 20,85 40,95 60,80 80,100 100,75 120,105 140,85 160,110 180,80 200,95 220,100 240,90 260,105 280,95 300,110"
              />
            </svg>
            
            {/* Legend */}
            <div className="absolute bottom-0 left-0 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Resting</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>HRV</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-center">
            <div>
              <div className="text-xl font-bold">46</div>
              <div className="text-xs text-gray-400">bpm</div>
            </div>
            <div>
              <div className="text-xl font-bold">1:32</div>
              <div className="text-xs text-gray-400">bpm</div>
            </div>
          </div>
        </div>

        {error && (
          <p className="text-xs text-gray-500 mt-2">
            {error}
          </p>
        )}
      </div>
    )
  }

  // Regular GitHub contributions component (for outside slider use)
  if (loading) {
    return (
      <div className="mb-12">
        {/* <h2 className="text-lg font-medium mb-4">GitHub Activity</h2> */}
        <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded mb-4 w-48"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-12">
      {/* <h2 className="text-lg font-medium mb-4 text-gray-900">GitHub Activity</h2> */}
      
      <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
        <div className="mb-4">
          <p className="text-gray-900 font-medium">
            {totalContributions.toLocaleString()} contributions in the last year
          </p>
          {!error && (
            <p className="text-xs text-gray-600 mt-1">Live data from GitHub</p>
          )}
        </div>

        {/* Simplified view for better layout */}
        <div className="w-full">
          <div className="flex mb-2">
            {getMonthLabels().map((month, index) => (
              <div key={index} className="flex-1 text-xs text-gray-600 text-center">
                {month}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-53 gap-[2px] max-w-full">
            {contributions.map((day, index) => (
              <div
                key={index}
                className={`aspect-square rounded-sm ${getLevelColor(day.level)} hover:ring-1 hover:ring-gray-400 transition-all cursor-pointer`}
                title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
          <a 
            href="https://github.com/xhanthis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
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
