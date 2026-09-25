"use client"

import { useEffect, useRef, useState } from "react"
import Logo from "./logo"

type Speaker = "you" | "dev" | "test"
type Line = { who: Speaker; text: string; card?: string }
type DiffLine = { kind: "+" | "-" | " " | "@"; text: string }
type Task = {
  name: string
  type: "feat" | "bug" | "chore"
  repo: string
  age: string
  pr: string
  cost: string
  model: string
  files: { path: string; add: number; del: number }[]
  chat: Line[]
  diff: DiffLine[]
}

const TASKS: Task[] = [
  {
    name: "Refund rounds down a rupee",
    type: "bug",
    repo: "nodebackend",
    age: "2m",
    pr: "#612",
    cost: "$0.42",
    model: "Fable 5.1 · high",
    files: [
      { path: "src/payments/refund.ts", add: 2, del: 1 },
      { path: "src/payments/refund.test.ts", add: 6, del: 0 },
    ],
    chat: [
      { who: "you", text: "Refunds are off by a rupee on partial cancels." },
      {
        who: "dev",
        text: "Mode: small (auto). Found it: refund.ts:41 floors paise before the split, so two halves of 101 paise lose one. Switching to round-half-even and adding a test that splits 101.",
      },
      { who: "test", text: "Ran 14 refund cases including 1 paise, 101 paise and a 0 share. Full suite 212 green. Result: PASS." },
      { who: "dev", text: "# ✅ Refund rounding fixed. PR #612 opened, checks passing, ready to merge." },
    ],
    diff: [
      { kind: "@", text: "src/payments/refund.ts" },
      { kind: " ", text: "export function refund(amount: number, share: number) {" },
      { kind: " ", text: "  const paise = amount * 100" },
      { kind: "-", text: "  return Math.floor(paise * share) / 100" },
      { kind: "+", text: "  return roundHalfEven(paise * share) / 100" },
      { kind: " ", text: "}" },
      { kind: "@", text: "src/payments/refund.test.ts" },
      { kind: "+", text: "test('splits 101 paise without losing one', () => {" },
      { kind: "+", text: "  const a = refund(1.01, 0.5)" },
      { kind: "+", text: "  const b = refund(1.01, 0.5)" },
      { kind: "+", text: "  expect(a + b).toBe(1.01)" },
      { kind: "+", text: "})" },
    ],
  },
  {
    name: "CSV export for bookings",
    type: "feat",
    repo: "ssalliance",
    age: "18m",
    pr: "#77",
    cost: "$1.10",
    model: "Fable 5.1 · medium",
    files: [
      { path: "src/bookings/export.ts", add: 14, del: 0 },
      { path: "src/bookings/Toolbar.tsx", add: 3, del: 1 },
    ],
    chat: [
      { who: "you", text: "Add a CSV export to the bookings table, same filters as the list." },
      {
        who: "dev",
        text: "Mode: normal (auto). Reusing listBookings with the current filter, streaming rows, capped at 10,000 with the cap named in the file header.",
        card: "Needs you · run `pnpm add papaparse`? A tiny CSV writer is 12 lines; installing a dependency is your call.",
      },
      { who: "you", text: "Write the 12 lines." },
      { who: "test", text: "10,000 rows in 1.8s. Hindi names survive Excel. Button wraps cleanly at 390px. Result: PASS." },
      { who: "dev", text: "# ✅ Bookings export shipped. PR #77 ready to merge." },
    ],
    diff: [
      { kind: "@", text: "src/bookings/export.ts" },
      { kind: "+", text: "export async function exportBookings(filter: Filter) {" },
      { kind: "+", text: "  const rows = await listBookings({ ...filter, limit: 10_000 })" },
      { kind: "+", text: "  return toCsv(rows, BOOKING_COLUMNS)" },
      { kind: "+", text: "}" },
      { kind: "@", text: "src/bookings/Toolbar.tsx" },
      { kind: "-", text: '<Toolbar actions={["filter"]} />' },
      { kind: "+", text: '<Toolbar actions={["filter", "export"]} />' },
    ],
  },
  {
    name: "Bump axios to 1.9",
    type: "chore",
    repo: "python_apis",
    age: "1h",
    pr: "#690",
    cost: "$0.08",
    model: "Sonnet 5 · low",
    files: [
      { path: "package.json", add: 1, del: 1 },
      { path: "CHANGELOG.md", add: 1, del: 0 },
    ],
    chat: [
      { who: "you", text: "Bump axios, there's a CVE." },
      { who: "dev", text: "Mode: small (auto). Lockfile updated, changelog bullet added under Unreleased." },
      { who: "test", text: "Full suite green, 212 tests. Result: PASS." },
      { who: "dev", text: "# ✅ axios bumped to 1.9. PR #690 ready to merge." },
    ],
    diff: [
      { kind: "@", text: "package.json" },
      { kind: "-", text: '    "axios": "^1.6.2",' },
      { kind: "+", text: '    "axios": "^1.9.0",' },
      { kind: "@", text: "CHANGELOG.md" },
      { kind: "+", text: "- Bump axios to 1.9 (CVE-2026-1183)" },
    ],
  },
]

const SPEAKER: Record<Speaker, string> = { you: "You", dev: "Dev", test: "Test" }
const STEP_MS = 1000

/**
 * A working miniature of the Zokie Agent Board: tasks on the left, the agent chat in the
 * middle, the diff against main on the right. Picking a task replays its run; Replay restarts it.
 * Handles: server render (no timers until mounted), off-screen (the run waits until the window's top
 * edge is on screen, so phones do not replay it before anyone scrolls to it; independent of the
 * window's height, which a ratio threshold was not), prefers-reduced-motion
 * (jumps to the end), no IntersectionObserver (starts at once), unmount mid-run (timer cleared),
 * switching tasks mid-run (run restarts for the new task).
 */
export default function BoardDemo() {
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(0)
  const [run, setRun] = useState(0)
  const reduced = useRef(false)
  const winRef = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  const task = TASKS[active]
  const total = task.chat.length + task.diff.length
  const done = step >= total

  useEffect(() => {
    const el = winRef.current
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced.current) {
      setStep(total)
      return
    }
    setStep(0)
    if (!seen) return
    let n = 0
    const id = window.setInterval(() => {
      n += 1
      setStep(n)
      if (n >= total) window.clearInterval(id)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [active, run, total, seen])

  const chatShown = task.chat.slice(0, Math.min(step, task.chat.length))
  const diffShown = task.diff.slice(0, Math.max(0, step - task.chat.length))
  const last = chatShown.length ? chatShown[chatShown.length - 1].who : "you"
  const typing = !done && chatShown.length < task.chat.length
  const next = task.chat[chatShown.length]?.who ?? "dev"
  const adds = task.files.reduce((n, f) => n + f.add, 0)
  const dels = task.files.reduce((n, f) => n + f.del, 0)
  const speaker = last === "test" || next === "test" ? "Test" : "Dev"

  return (
    <div className="win" ref={winRef} aria-label="Zokie Agent Board demo">
      <div className="win-bar">
        <span className="lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <Logo size={22} className="win-logo" />
        <span className="modes" aria-hidden="true">
          <span className="on">Code</span>
          <span>Data</span>
          <span className="dim">Design</span>
        </span>
        <span className="day">
          <b>Your Day</b> · Zen 82 · $3.40 today
        </span>
      </div>

      <div className="panes">
        <aside className="side">
          <button type="button" className="new" onClick={() => setRun((r) => r + 1)}>
            {done ? "↻ Replay this task" : "+ New"} <kbd>⌘N</kbd>
          </button>
          <div className="side-h">Tasks · 3</div>
          <div role="tablist" aria-label="Tasks" className="tasks">
            {TASKS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                className="task"
                onClick={() => {
                  setActive(i)
                  setRun((r) => r + 1)
                }}
              >
                <span className="task-top">
                  <span className={`chip chip-${t.type}`}>{t.type}</span>
                  <span className="age">{t.age}</span>
                </span>
                <span className="task-name">{t.name}</span>
                <span className="task-meta">
                  {t.repo} ·{" "}
                  {i === active ? (
                    done ? (
                      <em className="ok">PR ready</em>
                    ) : (
                      <em className="run">running</em>
                    )
                  ) : (
                    "queued"
                  )}
                </span>
              </button>
            ))}
          </div>
          <div className="side-h foot">Archived · 12</div>
        </aside>

        <section className="chat" aria-live="polite">
          <div className="chat-h">
            <b>{task.name}</b>
            <span className="repo">⎇ {task.repo}</span>
            <span className="cost">{done ? task.cost : "…"}</span>
          </div>
          <ol className="msgs">
            {chatShown.map((m, i) => (
              <li key={i} className={m.who}>
                <span className="who">{SPEAKER[m.who]}</span>
                <span className="body">
                  <span className="txt">{m.text}</span>
                  {m.card && <span className="card">{m.card}</span>}
                </span>
              </li>
            ))}
            {typing && (
              <li className={next} aria-hidden="true">
                <span className="who">{SPEAKER[next]}</span>
                <span className="body">
                  <span className="dots">
                    <i />
                    <i />
                    <i />
                  </span>
                </span>
              </li>
            )}
          </ol>
          <div className="composer">
            <span className="ph">{done ? "Anything else?" : "Message…"}</span>
            <span className="tools">
              <span className="pill">Send to {speaker}</span>
              <span className="pill">{task.model}</span>
              <span className="send">Send</span>
            </span>
          </div>
        </section>

        <section className="diff">
          <div className="diff-h">
            <span>Changes · {task.files.length}</span>
            <span className="counts">
              <em className="add">+{adds}</em> <em className="del">−{dels}</em>
            </span>
          </div>
          <ul className="files">
            {task.files.map((f) => (
              <li key={f.path}>
                <span>{f.path}</span>
                <span className="counts">
                  <em className="add">+{f.add}</em> <em className="del">−{f.del}</em>
                </span>
              </li>
            ))}
          </ul>
          <pre>
            {diffShown.map((d, i) => (
              <span key={i} className={d.kind === "+" ? "add" : d.kind === "-" ? "del" : d.kind === "@" ? "file" : ""}>
                {d.kind === "@" ? d.text : `${d.kind} ${d.text}`}
                {"\n"}
              </span>
            ))}
          </pre>
          <div className={`pr ${done ? "ready" : ""}`}>
            <span>{done ? `PR ${task.pr} · checks passing` : "Waiting for Test…"}</span>
            <span className="merge">{done ? "Merge" : "Merge"}</span>
          </div>
        </section>
      </div>
    </div>
  )
}
