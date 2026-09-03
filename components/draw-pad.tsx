"use client"

import { useEffect, useRef, useState } from "react"

// A blank box that recognises what you drew, using the $1 unistroke
// algorithm (Wobbrock, Wilson, Li 2007) running entirely in the browser.
type Point = { x: number; y: number }

const NP = 64
const SQUARE_SIZE = 250
const ORIGIN = { x: 0, y: 0 }
const PHI = 0.5 * (-1 + Math.sqrt(5))

function pathLength(points: Point[]) {
  let d = 0
  for (let i = 1; i < points.length; i++) d += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
  return d
}
function resample(points: Point[], n: number): Point[] {
  const interval = pathLength(points) / (n - 1)
  let d = 0
  const out: Point[] = [points[0]]
  const pts = points.map((p) => ({ ...p }))
  for (let i = 1; i < pts.length; i++) {
    const dist = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y)
    if (d + dist >= interval && dist > 0) {
      const q = {
        x: pts[i - 1].x + ((interval - d) / dist) * (pts[i].x - pts[i - 1].x),
        y: pts[i - 1].y + ((interval - d) / dist) * (pts[i].y - pts[i - 1].y),
      }
      out.push(q)
      pts.splice(i, 0, q)
      d = 0
    } else d += dist
  }
  while (out.length < n) out.push(out[out.length - 1])
  return out
}
function centroid(points: Point[]): Point {
  return {
    x: points.reduce((s, p) => s + p.x, 0) / points.length,
    y: points.reduce((s, p) => s + p.y, 0) / points.length,
  }
}
function rotateBy(points: Point[], theta: number): Point[] {
  const c = centroid(points)
  const cos = Math.cos(theta)
  const sin = Math.sin(theta)
  return points.map((p) => ({
    x: (p.x - c.x) * cos - (p.y - c.y) * sin + c.x,
    y: (p.x - c.x) * sin + (p.y - c.y) * cos + c.y,
  }))
}
function rotateToZero(points: Point[]): Point[] {
  const c = centroid(points)
  return rotateBy(points, -Math.atan2(c.y - points[0].y, c.x - points[0].x))
}
function scaleTo(points: Point[], size: number): Point[] {
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const w = Math.max(...xs) - Math.min(...xs) || 1
  const h = Math.max(...ys) - Math.min(...ys) || 1
  return points.map((p) => ({ x: (p.x * size) / w, y: (p.y * size) / h }))
}
function translateTo(points: Point[], target: Point): Point[] {
  const c = centroid(points)
  return points.map((p) => ({ x: p.x + target.x - c.x, y: p.y + target.y - c.y }))
}
function normalize(points: Point[]): Point[] {
  return translateTo(scaleTo(rotateToZero(resample(points, NP)), SQUARE_SIZE), ORIGIN)
}
function pathDistance(a: Point[], b: Point[]) {
  let d = 0
  for (let i = 0; i < a.length; i++) d += Math.hypot(a[i].x - b[i].x, a[i].y - b[i].y)
  return d / a.length
}
function distanceAtAngle(points: Point[], template: Point[], theta: number) {
  return pathDistance(rotateBy(points, theta), template)
}
function bestDistance(points: Point[], template: Point[]) {
  let a = -Math.PI / 4
  let b = Math.PI / 4
  let x1 = PHI * a + (1 - PHI) * b
  let f1 = distanceAtAngle(points, template, x1)
  let x2 = (1 - PHI) * a + PHI * b
  let f2 = distanceAtAngle(points, template, x2)
  while (Math.abs(b - a) > 0.035) {
    if (f1 < f2) {
      b = x2
      x2 = x1
      f2 = f1
      x1 = PHI * a + (1 - PHI) * b
      f1 = distanceAtAngle(points, template, x1)
    } else {
      a = x1
      x1 = x2
      f1 = f2
      x2 = (1 - PHI) * a + PHI * b
      f2 = distanceAtAngle(points, template, x2)
    }
  }
  return Math.min(f1, f2)
}

function poly(verts: [number, number][], closed: boolean): Point[] {
  const out: Point[] = []
  const vs = closed ? [...verts, verts[0]] : verts
  for (let i = 1; i < vs.length; i++) {
    for (let k = 0; k < 24; k++) {
      const t = k / 24
      out.push({ x: vs[i - 1][0] + (vs[i][0] - vs[i - 1][0]) * t, y: vs[i - 1][1] + (vs[i][1] - vs[i - 1][1]) * t })
    }
  }
  out.push({ x: vs[vs.length - 1][0], y: vs[vs.length - 1][1] })
  return out
}
function param(f: (t: number) => [number, number], n = 96): Point[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const [x, y] = f(i / n)
    return { x, y }
  })
}
function variants(points: Point[], closed: boolean): Point[][] {
  const out: Point[][] = []
  const starts = closed ? [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875] : [0]
  for (const s of starts) {
    const k = Math.floor(s * points.length)
    const rotated = [...points.slice(k), ...points.slice(0, k)]
    out.push(rotated, [...rotated].reverse())
  }
  return out
}

const SHAPES: Record<string, [Point[], boolean]> = {
  circle: [param((t) => [Math.cos(t * 6.283) * 100, Math.sin(t * 6.283) * 100]), true],
  square: [poly([[0, 0], [100, 0], [100, 100], [0, 100]], true), true],
  triangle: [poly([[50, 0], [100, 90], [0, 90]], true), true],
  star: [
    poly(
      [0, 1, 2, 3, 4].map((i): [number, number] => {
        const a = -Math.PI / 2 + (i * 4 * Math.PI) / 5
        return [Math.cos(a) * 100, Math.sin(a) * 100]
      }),
      true,
    ),
    true,
  ],
  heart: [
    param((t) => {
      const a = t * 6.283
      return [16 * Math.sin(a) ** 3, -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))]
    }),
    true,
  ],
  line: [poly([[0, 0], [100, 0]], false), false],
  check: [poly([[0, 50], [35, 100], [100, 0]], false), false],
  arrow: [poly([[0, 50], [100, 50], [70, 20], [100, 50], [70, 80]], false), false],
  zigzag: [poly([[0, 100], [25, 0], [50, 100], [75, 0], [100, 100]], false), false],
  spiral: [param((t) => [Math.cos(t * 12.57) * t * 100, Math.sin(t * 12.57) * t * 100]), false],
}
const SAY: Record<string, string> = {
  circle: "circle.",
  square: "square.",
  triangle: "triangle.",
  star: "a star. okay.",
  heart: "a heart. same.",
  line: "a line. minimalist.",
  check: "a tick. approved.",
  arrow: "an arrow.",
  zigzag: "zigzag. or a chart.",
  spiral: "a spiral.",
}

const TEMPLATES = Object.entries(SHAPES).flatMap(([name, [points, closed]]) =>
  variants(points, closed).map((v) => ({ name, points: normalize(v) })),
)

export default function DrawPad() {
  const padRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const strokesRef = useRef<Point[][]>([])
  const curRef = useRef<Point[] | null>(null)
  const drawingRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [dirty, setDirty] = useState(false)
  const [result, setResult] = useState<{ text: string; score: number } | null>(null)

  const cssVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

  const sizeCanvas = () => {
    const canvas = canvasRef.current
    const pad = padRef.current
    if (!canvas || !pad) return
    const d = window.devicePixelRatio || 1
    canvas.width = pad.clientWidth * d
    canvas.height = pad.clientHeight * d
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.setTransform(d, 0, 0, d, 0, 0)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.lineWidth = 2
    }
  }

  const redrawAll = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = cssVar("--fg")
    for (const stroke of strokesRef.current) {
      ctx.beginPath()
      stroke.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
      ctx.stroke()
    }
  }

  useEffect(() => {
    sizeCanvas()
    const onResize = () => {
      sizeCanvas()
      redrawAll()
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onThemeChange = () => redrawAll()
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    mq.addEventListener?.("change", onThemeChange)
    const observer = new MutationObserver(onThemeChange)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => {
      mq.removeEventListener?.("change", onThemeChange)
      observer.disconnect()
    }
  }, [])

  const at = (e: React.PointerEvent): Point => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }
  const line = (a: Point, b: Point) => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    ctx.strokeStyle = cssVar("--fg")
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
  }

  const guess = () => {
    const pts = strokesRef.current.flat()
    if (pts.length < 8) return
    const p = normalize(pts)
    let best = { d: Infinity, name: "" }
    for (const t of TEMPLATES) {
      const d = bestDistance(p, t.points)
      if (d < best.d) best = { d, name: t.name }
    }
    const score = 1 - best.d / (0.5 * Math.hypot(SQUARE_SIZE, SQUARE_SIZE))
    const text =
      score > 0.72 ? SAY[best.name] : score > 0.6 ? SAY[best.name].replace(/\.$/, "") + ", maybe." : "no idea. modern art?"
    setResult({ text, score: clamp01(score) })
  }
  const clamp01 = (x: number) => Math.min(1, Math.max(0, x))

  const onPointerDown = (e: React.PointerEvent) => {
    drawingRef.current = true
    canvasRef.current?.setPointerCapture(e.pointerId)
    curRef.current = [at(e)]
    setDirty(true)
    clearTimeout(timerRef.current)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawingRef.current || !curRef.current) return
    const p = at(e)
    line(curRef.current[curRef.current.length - 1], p)
    curRef.current.push(p)
  }
  const onPointerUp = () => {
    if (!drawingRef.current) return
    drawingRef.current = false
    if (curRef.current && curRef.current.length > 4) strokesRef.current.push(curRef.current)
    curRef.current = null
    timerRef.current = setTimeout(guess, 350)
  }
  const onClear = () => {
    strokesRef.current = []
    const ctx = canvasRef.current?.getContext("2d")
    if (ctx && canvasRef.current) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setDirty(false)
    setResult(null)
  }

  return (
    <>
      <div className={`pad${dirty ? " dirty" : ""}`} ref={padRef}>
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
        <div className="ph">anything, one stroke is fine</div>
      </div>
      <div className="guess">
        <span>
          {result ? (
            <>
              <b key={result.text} className="pop">
                {result.text}
              </b>{" "}
              <span style={{ color: "var(--faint)" }}>{Math.round(result.score * 100)}%</span>
            </>
          ) : (
            <>&nbsp;</>
          )}
        </span>
        {dirty && (
          <button type="button" onClick={onClear}>
            clear
          </button>
        )}
      </div>
    </>
  )
}
