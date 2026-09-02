"use client"

import { useEffect, useState } from "react"

// Sarcasm as a UI pattern: the correction lands a beat late.
export default function Corrections() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const a = setTimeout(() => setStep(1), 1600)
    const b = setTimeout(() => setStep(2), 3400)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [])

  const strike = (on: boolean) =>
    `relative transition-colors duration-500 ${on ? "text-gray-600" : ""} after:absolute after:left-0 after:top-1/2 after:h-px after:bg-red-400 after:transition-all after:duration-500 ${on ? "after:w-full" : "after:w-0"}`
  const fade = (on: boolean) =>
    `transition-all duration-500 ${on ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 absolute pointer-events-none"}`

  return (
    <div className="space-y-4">
      <p>
        I am{" "}
        <span className={strike(step >= 1)}>happiest</span>{" "}
        <span className={`${fade(step >= 1)} text-white`}>second happiest</span>{" "}
        when designing and coding.
      </p>

      <p className={`relative ${fade(step >= 1)}`}>
        <Tag>edit</Tag> Happiest when spending time with my{" "}
        <span className={strike(step >= 2)}>girlfriend</span>{" "}
        <span className={`${fade(step >= 2)} text-white`}>wife</span>, of course.{" "}
        <span className={fade(step >= 2)}><Tag>edit 2</Tag></span>
      </p>

    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block align-middle mr-1 px-1.5 py-0.5 rounded font-mono text-[10px] uppercase tracking-wider bg-gray-800 text-gray-300">
      {children}
    </span>
  )
}
