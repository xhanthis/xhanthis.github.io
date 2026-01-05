"use client"

import { useEffect, useState } from "react"

interface WorkoutEvent {
  workout: {
    title: string
    start_time: string
    end_time: string
    exercises: { title: string }[]
  }
}

export default function FitnessStats() {
  const [totalWorkouts, setTotalWorkouts] = useState<number>(0)
  const [lastWorkout, setLastWorkout] = useState<WorkoutEvent['workout'] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = {
          'accept': 'application/json',
          'api-key': process.env.NEXT_PUBLIC_HEVY_API_KEY || '4b2d409d-b270-4c83-8b86-fd30e3b58e41'
        }

        // 1. Get Total Workouts
        // Using pageSize=1 means page_count will effectively be the total count
        const totalResponse = await fetch('https://api.hevyapp.com/v1/workouts?page=1&pageSize=1', { headers })
        const totalData = await totalResponse.json()
        setTotalWorkouts(totalData.page_count)

        // 2. Get Last Workout
        const lastResponse = await fetch('https://api.hevyapp.com/v1/workouts/events?page=1&pageSize=1&since=1970-01-01T00%3A00%3A00Z', { 
          headers,
          cache: 'no-store' 
        })
        const lastData = await lastResponse.json()
        if (lastData.events && lastData.events.length > 0) {
          setLastWorkout(lastData.events[0].workout)
        }
      } catch (error) {
        console.error("Failed to fetch fitness data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  const durationMinutes = lastWorkout 
    ? Math.round((new Date(lastWorkout.end_time).getTime() - new Date(lastWorkout.start_time).getTime()) / 60000)
    : 0

  const getTimeAgo = (dateString: string) => {
    const diff = new Date().getTime() - new Date(dateString).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days > 30) return `${Math.floor(days / 30)} months ago`
    return `${days} days ago`
  }

  const timeAgo = lastWorkout ? getTimeAgo(lastWorkout.end_time) : ""

  return (
    <div className="w-full text-center text-white">
      <h3 className="text-xl font-semibold mb-2">& staying fit.</h3>
      <p className="text-gray-400 text-sm mb-8">I hit the gym and enjoy badminton.</p>

      <div className="max-w-sm mx-auto">
        <div className="bg-[#0d1117]/80 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 group">
          {/* Header: Context about recency */}
          <div className="px-6 py-4 flex justify-between items-center border-b border-white/5 bg-white/5">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Last Workout</span>
            <span className="text-xs font-semibold text-white bg-white/10 px-2 py-1 rounded-full">
              {timeAgo}
            </span>
          </div>

          {/* Main Content: The Workout */}
          <div className="p-6 relative">
            {lastWorkout ? (
              <>
                <div className="flex flex-col gap-2 mb-4">
                  <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {lastWorkout.title}
                  </h4>
                  <div className="flex items-center justify-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {durationMinutes} mins
                    </span>
                    <span>•</span>
                    <span>{lastWorkout.exercises.length} Exercises</span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 line-clamp-2 leading-relaxed bg-black/20 p-3 rounded-xl border border-white/5">
                  {lastWorkout.exercises.map(e => e.title).join(", ")}
                </div>
              </>
            ) : (
                <div className="py-8 text-gray-500 text-sm">No recent workouts found</div>
            )}
          </div>

          {/* Footer: Lifetime Stat */}
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 border-t border-white/5 grid place-items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-400">{totalWorkouts}</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-1">Total Workouts Logged</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
