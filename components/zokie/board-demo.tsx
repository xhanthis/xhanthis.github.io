"use client"

import { useEffect, useRef, useState } from "react"

type Speaker = "you" | "dev" | "test"
type Line = { who: Speaker; text: string }
type Task = {
  name: string
  type: "feat" | "bug" | "chore"
  repo: string
  chat: Line[]
  diff: { kind: "+" | "-" | " "; text: string }[]
  cost: string
}

const TASKS: Task[] = [
  {
    name: "Refund rounds down a rupee",
    type: "bug",
    repo: "nodebackend",
    cost: "$0.42",
    chat: [
      { who: "you", text: "Refunds are off by a rupee on partial cancels." },
      { who: "dev", text: "Mode: small (auto). Found it: refund.ts:41 uses Math.floor on paise. Switching to banker's rounding, adding a test." },
      { who: "test", text: "Ran 14 refund cases, 4 viewports skipped (no UI). Result: PASS." },
      { who: "dev", text: "# ✅ Refund rounding fixed. PR #612 ready to merge." },
    ],
    diff: [
      { kind: " ", text: "const paise = amount * 100" },
      { kind: "-", text: "return Math.floor(paise * share) / 100" },
      { kind: "+", text: "return roundHalfEven(paise * share) / 100" },
      { kind: " ", text: "}" },
      { kind: "+", text: "" },
      { kind: "+", text: "test('splits 101 paise without losing one', () => {" },
      { kind: "+", text: "  expect(refund(1.01, 0.5) + refund(1.01, 0.5)).toBe(1.01)" },
      { kind: "+", text: "})" },
    ],
  },
  {
    name: "CSV export for bookings",
    type: "feat",
    repo: "ssalliance",
    cost: "$1.10",
    chat: [
      { who: "you", text: "Add CSV export to the bookings table." },
      { who: "dev", text: "Mode: normal (auto). Reusing the existing table query, streaming rows, capping at 10k with a note in the file." },
      { who: "test", text: "Export of 10,000 rows in 1.8s. Unicode names survive Excel. 390px: button wraps cleanly. Result: PASS." },
      { who: "dev", text: "# ✅ Bookings export shipped. PR #77 ready to merge." },
    ],
    diff: [
      { kind: "+", text: "export async function exportBookings(filter: Filter) {" },
      { kind: "+", text: "  const rows = await listBookings({ ...filter, limit: 10_000 })" },
      { kind: "+", text: "  return toCsv(rows, BOOKING_COLUMNS)" },
      { kind: "+", text: "}" },
      { kind: " ", text: "" },
      { kind: "-", text: '<Toolbar actions={["filter"]} />' },
      { kind: "+", text: '<Toolbar actions={["filter", "export"]} />' },
    ],
  },
  {
    name: "Bump axios to 1.9",
    type: "chore",
    repo: "python_apis",
    cost: "$0.08",
    chat: [
      { who: "you", text: "Bump axios, there's a CVE." },
      { who: "dev", text: "Mode: small (auto). Lockfile updated, changelog bullet added." },
      { who: "test", text: "Full suite green, 212 tests. Result: PASS." },
      { who: "dev", text: "# ✅ axios bumped. PR #690 ready to merge." },
    ],
    diff: [
      { kind: "-", text: '"axios": "^1.6.2",' },
      { kind: "+", text: '"axios": "^1.9.0",' },
      { kind: " ", text: "" },
      { kind: "+", text: "- Bump axios to 1.9 (CVE-2026-1183)" },
    ],
  },
]

const SPEAKER: Record<Speaker, string> = { you: "You", dev: "Dev", test: "Test" }
const STEP_MS = 900

/**
 * A working miniature of the Zokie Agent Board: tasks on the left, the agent chat in the
 * middle, the diff against main on the right. Picking a task replays its run; Replay restarts it.
 * Handles: server render (no timers until mounted), prefers-reduced-motion (jumps to the end),
 * unmount mid-run (timer cleared), switching tasks mid-run (run restarts for the new task).
 */
export default function BoardDemo() {
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(0)
  const [run, setRun] = useState(0)
  const reduced = useRef(false)
  const task = TASKS[active]
  const total = task.chat.length + task.diff.length
  const done = step >= total

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced.current) {
      setStep(total)
      return
    }
    setStep(0)
    let n = 0
    const id = window.setInterval(() => {
      n += 1
      setStep(n)
      if (n >= total) window.clearInterval(id)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [active, run, total])

  const chatShown = task.chat.slice(0, Math.min(step, task.chat.length))
  const diffShown = task.diff.slice(0, Math.max(0, step - task.chat.length))
  const speaker = chatShown.length ? chatShown[chatShown.length - 1].who : "you"

  return (
    <div className="board" aria-label="Zokie Agent Board demo">
      <div className="board-bar">
        <span className="board-logo">
          zokie<span className="board-dot" />
        </span>
        <span className="board-modes" aria-hidden="true">
          <span className="on">Code</span>
          <span>Data</span>
        </span>
        <span className="board-day">Your Day · Zen 82</span>
      </div>
      <div className="board-panes">
        <div className="pane tasks" role="tablist" aria-label="Tasks">
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
              <span className={`type ${t.type}`}>{t.type}</span>
              <span className="task-name">{t.name}</span>
              <span className="task-meta">
                {t.repo} · {i === active && done ? "PR ready" : i === active ? "running" : "queued"}
              </span>
            </button>
          ))}
          <button type="button" className="task new" onClick={() => setRun((r) => r + 1)}>
            {done ? "↻ Replay" : "⌘N New"}
          </button>
        </div>
        <div className="pane chat" aria-live="polite">
          <div className="chat-head">
            <b>{task.name}</b>
            <span className="cost">{done ? task.cost : "…"}</span>
          </div>
          <ol className="msgs">
            {chatShown.map((m, i) => (
              <li key={i} className={m.who}>
                <span className="who">{SPEAKER[m.who]}</span>
                <span className="txt">{m.text}</span>
              </li>
            ))}
            {!done && chatShown.length < task.chat.length && (
              <li className={speaker === "you" ? "dev" : speaker} aria-hidden="true">
                <span className="who">{speaker === "you" ? "Dev" : SPEAKER[speaker]}</span>
                <span className="txt typing">
                  <i />
                  <i />
                  <i />
                </span>
              </li>
            )}
          </ol>
          <div className="send">
            <span>Send to</span>
            <span className="pill">{speaker === "test" ? "Test" : "Dev"}</span>
            <span className="pill">{task.type === "chore" ? "Sonnet 5" : "Fable 5.1"}</span>
          </div>
        </div>
        <div className="pane diff">
          <div className="diff-head">
            <span>diff against main</span>
            <span className="counts">
              <em className="add">+{task.diff.filter((d) => d.kind === "+").length}</em>{" "}
              <em className="del">−{task.diff.filter((d) => d.kind === "-").length}</em>
            </span>
          </div>
          <pre>
            {diffShown.map((d, i) => (
              <span key={i} className={d.kind === "+" ? "add" : d.kind === "-" ? "del" : ""}>
                {d.kind} {d.text}
                {"\n"}
              </span>
            ))}
          </pre>
          <div className={`pr ${done ? "ready" : ""}`}>{done ? "Merge PR" : "Waiting for Test…"}</div>
        </div>
      </div>
    </div>
  )
}
