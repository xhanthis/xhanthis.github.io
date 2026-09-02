"use client"

import { useEffect, useRef, useState } from "react"

// Design (undo it with one switch) and sarcasm (a settings menu with one option).
export default function Controls() {
  const [design, setDesign] = useState(true)
  const [open, setOpen] = useState(false)
  const pop = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle("raw", !design)
  }, [design])

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (pop.current && !pop.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener("mousedown", close)
    return () => window.removeEventListener("mousedown", close)
  }, [open])

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-3 font-mono text-[11px] text-gray-500">
      <label className="flex items-center gap-2 cursor-pointer select-none">
        <span>design</span>
        <button
          role="switch"
          aria-checked={design}
          onClick={() => setDesign((d) => !d)}
          className={`relative w-9 h-5 rounded-full transition-colors ${design ? "bg-blue-500" : "bg-gray-700"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${design ? "translate-x-4" : ""}`}
          />
        </button>
      </label>

      <div className="relative" ref={pop}>
        <button
          aria-label="Settings"
          onClick={() => setOpen((o) => !o)}
          className="w-7 h-7 rounded-md border border-gray-800 hover:border-gray-600 grid place-items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-44 p-3 rounded-lg bg-[#0d1117] border border-gray-800 shadow-xl">
            <div className="flex items-center justify-between group relative">
              <span className="text-gray-300">complexity</span>
              <button
                disabled
                aria-checked={false}
                role="switch"
                className="relative w-9 h-5 rounded-full bg-gray-800 cursor-not-allowed opacity-60"
              >
                <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-gray-500" />
              </button>
              <span className="absolute -bottom-7 right-0 px-2 py-1 rounded bg-white text-black text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                sorry.
              </span>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-800 text-[10px] text-gray-600">off · always</div>
          </div>
        )}
      </div>
    </div>
  )
}
