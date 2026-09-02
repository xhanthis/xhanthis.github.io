"use client"

import { useEffect, useRef, useState } from "react"

// Product prowess: a button that ships. Idea -> 10x in two seconds.
const STAGES = ["idea", "sketch", "code", "v1.0", "v2.0", "10×"]
const STEP_MS = 320

export default function ShipButton() {
  const [stage, setStage] = useState(-1) // -1 idle, 0..5 running, 6 done
  const [shipped, setShipped] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const running = stage >= 0 && stage < STAGES.length
  const done = stage === STAGES.length

  useEffect(() => {
    if (!running) return
    timer.current = setTimeout(() => setStage((s) => s + 1), STEP_MS)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [stage, running])

  useEffect(() => {
    if (!done) return
    setShipped((n) => n + 1)
    const t = setTimeout(() => setStage(-1), 1600)
    return () => clearTimeout(t)
  }, [done])

  const progress = stage < 0 ? 0 : Math.min(stage / (STAGES.length - 1), 1)

  return (
    <div className="p-4 bg-[#0d1117] border border-gray-800 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => !running && setStage(0)}
          disabled={running}
          className={`relative px-5 py-2 rounded-lg font-semibold text-sm transition-all active:scale-95
            ${done ? "bg-emerald-500 text-black" : "bg-white text-black hover:bg-blue-400"}
            disabled:opacity-80 disabled:cursor-wait`}
        >
          {done ? "Shipped" : running ? "Shipping…" : "Ship it"}
        </button>
        <span className="font-mono text-xs text-gray-500 tabular-nums">
          shipped <span className="text-white">{shipped}</span>
        </span>
      </div>

      {/* pipeline */}
      <div className="relative">
        <div className="absolute left-1.5 right-1.5 top-[5px] h-px bg-gray-800" />
        <div
          className="absolute left-1.5 top-[5px] h-px bg-blue-400 transition-all ease-out"
          style={{ width: `calc(${progress * 100}% - ${progress * 12}px)`, transitionDuration: `${STEP_MS}ms` }}
        />
        <ul className="relative flex justify-between">
          {STAGES.map((s, i) => {
            const hit = stage >= i
            const last = i === STAGES.length - 1
            return (
              <li key={s} className="flex flex-col items-center gap-2 w-8">
                <span
                  className={`block w-[11px] h-[11px] rounded-full border transition-all duration-300
                    ${hit ? (last ? "bg-emerald-400 border-emerald-400 scale-150 shadow-[0_0_16px_rgba(52,211,153,.8)]" : "bg-blue-400 border-blue-400 scale-110") : "bg-[#0d1117] border-gray-700"}`}
                />
                <span className={`font-mono text-[10px] transition-colors ${hit ? "text-gray-300" : "text-gray-600"}`}>{s}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
