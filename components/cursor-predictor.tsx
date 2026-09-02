"use client"

import { useEffect, useRef } from "react"

// ML, felt: a tiny model guesses where your cursor will be in 180ms.
// It is wrong at first, then less wrong. The ring shrinks with confidence.
type Sample = { x: number; y: number; t: number }
const LEAD_MS = 180
const WINDOW = 10

export default function CursorPredictor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!
    const samples: Sample[] = []
    const guesses: { x: number; y: number; at: number }[] = []
    let err = 60 // rolling error in px, starts pessimistic
    let raf = 0
    let seen = false
    let lastMove = 0

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio
      canvas.height = window.innerHeight * devicePixelRatio
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const onMove = (e: MouseEvent) => {
      const now = performance.now()
      lastMove = now
      seen = true
      samples.push({ x: e.clientX, y: e.clientY, t: now })
      if (samples.length > WINDOW) samples.shift()
      // score earlier guesses that have "arrived"
      while (guesses.length && guesses[0].at <= now) {
        const g = guesses.shift()!
        const d = Math.hypot(g.x - e.clientX, g.y - e.clientY)
        err = err * 0.85 + d * 0.15
      }
    }
    window.addEventListener("mousemove", onMove)

    // least-squares velocity over the window, plus a dash of acceleration
    const predict = (now: number) => {
      const n = samples.length
      if (n < 3) return null
      const t0 = samples[0].t
      let st = 0, sx = 0, sy = 0, stt = 0, stx = 0, sty = 0
      for (const s of samples) {
        const t = (s.t - t0) / 1000
        st += t; sx += s.x; sy += s.y; stt += t * t; stx += t * s.x; sty += t * s.y
      }
      const den = n * stt - st * st
      if (Math.abs(den) < 1e-6) return null
      const vx = (n * stx - st * sx) / den
      const vy = (n * sty - st * sy) / den
      const last = samples[n - 1]
      const prev = samples[n - 2]
      const dt = Math.max((last.t - prev.t) / 1000, 1 / 240)
      const ivx = (last.x - prev.x) / dt, ivy = (last.y - prev.y) / dt
      const ax = (ivx - vx) / Math.max((last.t - t0) / 1000, 0.016)
      const ay = (ivy - vy) / Math.max((last.t - t0) / 1000, 0.016)
      const lead = (LEAD_MS - (now - last.t)) / 1000
      if (lead <= 0) return null
      return {
        x: last.x + ivx * lead + 0.5 * ax * lead * lead,
        y: last.y + ivy * lead + 0.5 * ay * lead * lead,
      }
    }

    const draw = () => {
      raf = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (!seen) return
      const now = performance.now()
      const idle = now - lastMove > 900
      const p = predict(now)
      if (!p || idle) return
      if (!guesses.length || now - guesses[guesses.length - 1].at > 40) {
        guesses.push({ x: p.x, y: p.y, at: now + LEAD_MS })
      }
      const r = Math.max(6, Math.min(40, err * 0.6))
      const conf = 1 - Math.min(err, 80) / 80
      ctx.beginPath()
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(96,165,250,${0.25 + conf * 0.6})`
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(96,165,250,${0.4 + conf * 0.6})`
      ctx.fill()
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace"
      ctx.fillStyle = "rgba(156,163,175,.9)"
      ctx.fillText(`you, in ${LEAD_MS}ms · ±${Math.round(err)}px`, p.x + r + 6, p.y + 3)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50"
      data-predictor
    />
  )
}
