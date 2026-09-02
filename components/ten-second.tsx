"use client"

import { useEffect, useState } from "react"

// Simplicity, measured. Ten seconds is all it should take.
export default function TenSecond() {
  const [ms, setMs] = useState(0)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = () => {
      const e = performance.now() - start
      setMs(Math.min(e, 10000))
      if (e < 10000) raf = requestAnimationFrame(tick)
      else setTimeout(() => setGone(true), 3500)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const done = ms >= 10000
  return (
    <div
      className={`fixed bottom-4 right-4 z-40 font-mono text-[11px] tabular-nums px-2 py-1 rounded-md border transition-all duration-700
        ${gone ? "opacity-0 translate-y-2" : "opacity-100"}
        ${done ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/5" : "border-gray-800 text-gray-500 bg-[#0d1117]"}`}
    >
      {done ? "✓ got it? good." : `${(ms / 1000).toFixed(1)}s`}
    </div>
  )
}
