"use client"

import { useEffect, useRef, useState } from "react"

// Drag the number, watch the chart follow: product, analytics, sales and the
// bio's own sarcasm ("profitably") all in one interactive sentence.
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x))
const rev = (v: number) => 10 + Math.pow(v - 1, 1.6) * 8
const cost = (v: number) => 30 + (v - 1) * 4

export default function ScrubNumber() {
  const [value, setValue] = useState(10)
  const shownRef = useRef(1)
  const valueRef = useRef(10)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrubRef = useRef<HTMLSpanElement>(null)
  const rafRef = useRef(0)
  const dragRef = useRef<{ x: number; v: number } | null>(null)

  const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const shown = shownRef.current
    const W = canvas.clientWidth
    const H = canvas.clientHeight
    ctx.clearRect(0, 0, W, H)
    const X = (u: number) => 1 + ((u - 1) / 9) * (W - 2)
    const Y = (y: number) => H - 3 - (y / 130) * (H - 8)
    const N = 80
    const pts: [number, number, number][] = []
    for (let i = 0; i <= N; i++) {
      const u = 1 + ((shown - 1) * i) / N
      pts.push([u, rev(u), cost(u)])
    }
    for (const good of [true, false]) {
      ctx.beginPath()
      let on = false
      pts.forEach(([u, r, c]) => {
        const k = good ? r >= c : r < c
        if (k && !on) {
          ctx.moveTo(X(u), Y(c))
          on = true
        }
        if (k) ctx.lineTo(X(u), Y(r))
      })
      if (on) {
        for (let i = pts.length - 1; i >= 0; i--) {
          const [u, r, c] = pts[i]
          if (good ? r >= c : r < c) ctx.lineTo(X(u), Y(c))
        }
        ctx.closePath()
        ctx.globalAlpha = 0.13
        ctx.fillStyle = cssVar(good ? "--ok" : "--bad")
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }
    ctx.lineWidth = 1
    ctx.setLineDash([2, 3])
    ctx.strokeStyle = cssVar("--faint")
    ctx.beginPath()
    pts.forEach(([u, , c], i) => (i ? ctx.lineTo(X(u), Y(c)) : ctx.moveTo(X(u), Y(c))))
    ctx.stroke()
    ctx.setLineDash([])
    ctx.lineWidth = 1.5
    ctx.strokeStyle = cssVar("--fg")
    ctx.beginPath()
    pts.forEach(([u, r], i) => (i ? ctx.lineTo(X(u), Y(r)) : ctx.moveTo(X(u), Y(r))))
    ctx.stroke()
    const [u, r] = pts[N]
    ctx.beginPath()
    ctx.arc(X(u), Y(r), 3, 0, 7)
    ctx.fillStyle = cssVar("--fg")
    ctx.fill()
  }

  const sizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const d = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * d
    canvas.height = rect.height * d
    canvas.getContext("2d")?.setTransform(d, 0, 0, d, 0, 0)
  }

  const tick = () => {
    shownRef.current += (valueRef.current - shownRef.current) * 0.18
    if (Math.abs(valueRef.current - shownRef.current) < 0.005) shownRef.current = valueRef.current
    draw()
    if (shownRef.current !== valueRef.current) rafRef.current = requestAnimationFrame(tick)
  }
  const animateTo = () => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
  }

  const set = (nv: number) => {
    const v = clamp(Math.round(nv * 10) / 10, 1, 10)
    valueRef.current = v
    setValue(v)
    animateTo()
  }

  useEffect(() => {
    sizeCanvas()
    const onResize = () => {
      sizeCanvas()
      draw()
    }
    window.addEventListener("resize", onResize)

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      shownRef.current = 10
      draw()
    } else {
      shownRef.current = 1
      const t0 = performance.now()
      const warm = (t: number) => {
        const k = clamp((t - t0) / 1400, 0, 1)
        shownRef.current = 1 + 9 * (1 - Math.pow(1 - k, 3))
        draw()
        if (k < 1) requestAnimationFrame(warm)
      }
      requestAnimationFrame(warm)
    }
    return () => window.removeEventListener("resize", onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onThemeChange = () => draw()
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    mq.addEventListener?.("change", onThemeChange)
    const observer = new MutationObserver(onThemeChange)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => {
      mq.removeEventListener?.("change", onThemeChange)
      observer.disconnect()
    }
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, v: valueRef.current }
    ;(e.target as Element).setPointerCapture(e.pointerId)
    document.body.classList.add("scrubbing")
    scrubRef.current?.classList.add("on")
    e.preventDefault()
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return
    set(dragRef.current.v + (e.clientX - dragRef.current.x) / 22)
  }
  const endDrag = () => {
    dragRef.current = null
    document.body.classList.remove("scrubbing")
    scrubRef.current?.classList.remove("on")
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    const deltas: Record<string, number> = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1, Home: -99, End: 99 }
    const d = deltas[e.key]
    if (d == null) return
    e.preventDefault()
    set(valueRef.current + d)
  }

  const good = rev(value) >= cost(value)
  const profClass = value <= 1.05 ? "no" : good ? "yes" : ""

  return (
    <>
      <p>
        I&rsquo;m a Senior Product Manager at{" "}
        <a href="https://www.saffronstays.com">SaffronStays</a>, where I scale everything product and tech from 1× to{" "}
        <span
          ref={scrubRef}
          className="scrub"
          role="slider"
          tabIndex={0}
          aria-valuemin={1}
          aria-valuemax={10}
          aria-valuenow={value}
          aria-label="multiplier"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
        >
          {value % 1 ? value.toFixed(1) : value}×
        </span>
        , <span className={`prof ${profClass}`}>profitably</span>.
      </p>
      <canvas ref={canvasRef} className="ch" aria-hidden="true" />
    </>
  )
}
