"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface SimpleWorkout {
  title: string
  start_time: string
  end_time: string
  exercises: { title: string }[]
}

interface WorkoutEvent {
  workout: SimpleWorkout
}

interface WorkoutHistoryItem {
  id: string
  title: string
  start_time: string
  end_time: string
  exercises: { title: string }[]
}

export default function FitnessStats() {
  const [totalWorkouts, setTotalWorkouts] = useState<number>(0)
  const [lastWorkout, setLastWorkout] = useState<SimpleWorkout | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [history, setHistory] = useState<WorkoutHistoryItem[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    async function fetchData() {
      try {
        const headers = {
          'accept': 'application/json',
          'api-key': process.env.NEXT_PUBLIC_HEVY_API_KEY || '4b2d409d-b270-4c83-8b86-fd30e3b58e41'
        }

        // 1. Get Total Workouts
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

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const fetchHistory = async () => {
    if (history.length > 0) return
    
    setLoadingHistory(true)
    try {
      const res = await fetch('https://api.hevyapp.com/v1/workouts?page=1&pageSize=10', {
        headers: {
          'accept': 'application/json',
          'api-key': process.env.NEXT_PUBLIC_HEVY_API_KEY || '4b2d409d-b270-4c83-8b86-fd30e3b58e41'
        }
      })
      const data = await res.json()
      if (data.workouts) {
        setHistory(data.workouts)
      }
    } catch (e) {
      console.error("Failed to fetch history", e)
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleCardClick = () => {
    setIsModalOpen(true)
    fetchHistory()
  }

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  const getDuration = (start: string, end: string) => {
    return Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000)
  }

  const durationMinutes = lastWorkout 
    ? getDuration(lastWorkout.start_time, lastWorkout.end_time)
    : 0

  const getTimeAgo = (dateString: string) => {
    const diff = new Date().getTime() - new Date(dateString).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days > 30) return `${Math.floor(days / 30)} months ago`
    return `${days} days ago`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const timeAgo = lastWorkout ? getTimeAgo(lastWorkout.end_time) : ""

  return (
    <>
      <div className="w-full text-center text-white">
        <h3 className="text-xl font-semibold mb-2">& staying fit.</h3>
        <p className="text-gray-400 text-sm mb-8">I hit the gym and enjoy badminton.</p>

        <div className="max-w-sm mx-auto">
          <div 
            onClick={handleCardClick}
            className="bg-[#0d1117]/80 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 group cursor-pointer"
          >
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

      {/* Portal Modal */}
      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex justify-center items-end sm:items-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Content */}
          <div className="relative w-full sm:w-[500px] bg-[#161b22] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl max-h-[85vh] sm:max-h-[600px] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Modal Handle (Mobile) */}
            <div className="w-full flex justify-center pt-3 pb-1 sm:hidden" onClick={() => setIsModalOpen(false)}>
              <div className="w-12 h-1.5 bg-gray-700 rounded-full" />
            </div>

            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center shrink-0">
              <h3 className="text-lg font-bold text-white">My Workouts</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loadingHistory ? (
                <div className="flex justify-center py-12">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              ) : (
                history.map((workout) => (
                  <div key={workout.id} className="bg-[#0d1117] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                         <h4 className="font-semibold text-white">{workout.title}</h4>
                         <p className="text-xs text-gray-500">{formatDate(workout.start_time)}</p>
                       </div>
                       <div className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">
                         {getDuration(workout.start_time, workout.end_time)}m
                       </div>
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-1">
                      {workout.exercises.map(e => e.title).join(", ")}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 border-t border-white/10 shrink-0 text-center">
               <span className="text-xs text-gray-500">Showing last 10 workouts</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
