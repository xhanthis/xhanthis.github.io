"use client"

import { useState } from "react"

// Entrepreneurship: the visitor is the funnel. Ends in a booked call.
const CALL_URL = "https://calendar.app.google/MTFKVZnChMqd8wiv7"
type Step = "idle" | "added" | "done"

export default function AddToCart() {
  const [step, setStep] = useState<Step>("idle")

  const next = () => {
    if (step === "idle") return setStep("added")
    if (step === "added") {
      setStep("done")
      window.open(CALL_URL, "_blank", "noopener,noreferrer")
      setTimeout(() => setStep("idle"), 2500)
    }
  }

  return (
    <div className="p-4 bg-[#0d1117] border border-gray-800 rounded-xl flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-white">Rahul</span>
          <span className="font-mono text-xs text-gray-500 line-through">₹∞</span>
          <span className="font-mono text-xs text-emerald-400">free</span>
        </div>
        <div className="font-mono text-[10px] text-gray-500 mt-0.5">
          {step === "done" ? "order placed · see you soon" : "only 1 left in stock"}
        </div>
      </div>

      <button
        onClick={next}
        className={`relative shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95
          ${step === "idle" ? "bg-white text-black hover:bg-blue-400" : ""}
          ${step === "added" ? "bg-blue-500 text-white hover:bg-blue-400" : ""}
          ${step === "done" ? "bg-emerald-500 text-black" : ""}`}
      >
        {step === "idle" && "Add to cart"}
        {step === "added" && "Checkout"}
        {step === "done" && "Done"}
        {step === "added" && (
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-black text-[11px] font-bold grid place-items-center animate-bounce">
            1
          </span>
        )}
      </button>
    </div>
  )
}
