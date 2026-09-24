"use client"

import { useEffect, useState } from "react"
import { IconPullRequest, IconUser, SKILLS, SKILL_BY_ID } from "./skills"

// A client-side sketch of the auto-trigger matrix: which skills fire for a
// request, in what order, and what comes out the other end. The real skills
// read the whole ask; this reads words.
export type Step = { skill: string; why: string; mode?: "small" | "normal" | "deep"; security?: boolean; rides?: boolean }

const FILE_NAMED = /\S+\.(tsx?|jsx?|py|go|rb|rs|java|kt|swift|sql|md|css|html|sh|ya?ml|json)\b|\/\w+\/\w+/i
const CODE =
  /\b(build|add|implement|fix|bug|refactor|migrat\w*|endpoint|api|route|script|feature|component|page|screen|button|modal|form|crash\w*|error|exception|broken|fail\w*|500|null|undefined|timeout|deploy|rename|typo|css|layout|schema|table|column|index|cron|job|flag|hook|tests?|lint|regression|expired|leak\w*|exposed|bypass|invalid|missing|duplicate|twice|blank|empty|stuck|hangs?|freezes?|export)\b/i
const VAGUE = /\b(wrong|weird|sometimes|not working|doesn'?t work|isn'?t working|slow|off by|mismatch|flaky|randomly|broke|stopped)\b/i
const MONEY =
  /\b(revenue|refund\w*|incentive|commission|payout|pric(e|es|ing)|invoice|gst|tax|discount|margin|sql|quer(y|ies)|metric|currency|settlement|ledger|payment|amount|total|balance|cost|charge|fee|ltv|cac|roi|cohort|funnel|retention)\b|[₹$€£]/i
const QUESTION = /\b(should we|worth (it|building|doing)|is it worth|do we need)\b/i
const PM =
  /\b(idea|prd|requirements?|competitor\w*|roadmap|priorit\w*|customers?|users? (want|ask|need)|nps|churn|research|market|sop|process|escalation|sla|reverse.?engineer|rebuild|spec)\b/i
const CMO =
  /\b(write|draft|rewrite|email|memo|blog|tweet|linkedin|release notes?|announcement|changelog entry|pr description|docs?|documentation|readme|humani[sz]e|tighten|shorten|edit this|wording|copy for)\b/i
const SECURITY =
  /\b(auth\w*|log ?in|sign ?in|sign ?up|password|token|session|otp|pii|personal data|phone|email address|upload|cookie|permission|role|admin|payment|card)\b/i
const SMALL = /\b(typo|rename|one.?liner?|label|wording|padding|colou?r|spacing)\b/i
const ALLY = /\b(tired|exhausted|late|break|hours|sleep|burn\w*|how long|pace|midnight|3 ?am|another one|keep going)\b/i

export const EXAMPLES = [
  "add a refund endpoint",
  "order total is wrong sometimes",
  "users can log in with an expired token",
  "should we build a mobile app?",
  "write the release notes for 3.1",
  "fix the typo in the footer",
]

/**
 * Route a request through the seven, the way the auto-trigger card would.
 * @param raw - What the visitor typed
 * @returns Ordered steps; empty when there is nothing to route
 * Handles: blank input, vague bug reports (god-ceo first), asks that need two skills, questions that are not build orders
 */
export function route(raw: string): Step[] {
  const text = raw.trim()
  if (!text) return []
  const question = QUESTION.test(text)
  const vague = VAGUE.test(text) && !FILE_NAMED.test(text)
  const builds = !question && (CODE.test(text) || vague)
  const money = MONEY.test(text)
  const pm = question || PM.test(text)
  const cmo = CMO.test(text)
  const security = SECURITY.test(text)
  const ally = ALLY.test(text)
  const owners = [builds, pm, cmo].filter(Boolean).length
  const steps: Step[] = []

  if (vague) {
    steps.push({ skill: "god-ceo", why: "Bug-shaped and no file named. Reads the code and reconstructs the real problem before anyone builds." })
  } else if (owners >= 2) {
    steps.push({ skill: "god-ceo", why: "The ask needs more than one skill. Decides if it is worth doing and picks the shortest chain." })
  } else if (owners === 0 && !money && !ally) {
    steps.push({ skill: "god-ceo", why: "Unclear ask. Finds out what the real problem is before routing it anywhere." })
  }
  if (pm) steps.push({ skill: "god-pm", why: "Decides what to build and why, for whom, with sourced evidence." })
  if (builds) {
    const deep = money || security
    const mode = deep ? "deep" : SMALL.test(text) ? "small" : "normal"
    const why =
      mode === "deep"
        ? "Touches money, data or auth, so it designs first, then builds to the reviewer's checklist."
        : mode === "small"
          ? "A few lines and nothing risky. Still syncs git, still hands off to god-qa."
          : "Plans with a what-could-go-wrong list, removes before it adds, self-scores, then hands off."
    steps.push({ skill: "god-dev", why, mode })
    steps.push({
      skill: "god-qa",
      why: security
        ? "Runs the tests itself, plus the security pass because the ask touches auth or user input."
        : "Runs the tests itself, four screen sizes if there is UI. Nothing is done until it returns PASS.",
      security,
    })
  }
  if (money) steps.push({ skill: "god-cfo", why: "Recomputes every number a second way before it is trusted." })
  if (cmo) steps.push({ skill: "god-cmo", why: "Makes it clear and short, and strips anything that reads like a machine wrote it." })
  steps.push(
    ally
      ? { skill: "god-ally", why: "Checks your pace against your own baseline and asks before you continue." }
      : { skill: "god-ally", why: "Closes the reply with today’s pace. One line, only when it has something to say.", rides: true },
  )
  return steps
}

/**
 * What comes out the other end of a chain.
 * @param steps - The chain from route()
 * @returns One sentence describing the deliverable
 */
export function outcome(steps: Step[]): string {
  const has = (id: string) => steps.some((s) => s.skill === id)
  if (has("god-dev")) return "A pull request with problem, approach, rollback and test evidence, god-qa’s verdict, a test-cases doc and a manual guide. Signed 🥷🏾 Authored by God."
  if (has("god-pm")) return "A product brief: one customer moment, the evidence with sources, the test and the win."
  if (has("god-cfo")) return "A numbers memo: the definition in plain words, a worked example, every issue with its money effect."
  if (has("god-cmo")) return "The rewrite itself, with a four-line edit note."
  if (has("god-ceo")) return "A decision memo: the call in one sentence, the why, and the chain if it goes ahead."
  return "One line on your pace, and a question before you continue."
}

export default function RouteDemo() {
  const [text, setText] = useState(EXAMPLES[0])
  const [touched, setTouched] = useState(false)
  const steps = route(text)
  const order = new Map(steps.map((s, i) => [s.skill, i + 1]))

  useEffect(() => {
    if (touched) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let i = 0
    const id = window.setInterval(() => {
      i = (i + 1) % EXAMPLES.length
      setText(EXAMPLES[i])
    }, 3800)
    return () => window.clearInterval(id)
  }, [touched])

  const pick = (value: string) => {
    setTouched(true)
    setText(value)
  }

  return (
    <div className="router">
      <label htmlFor="gs-request" className="sr-only">
        Describe what you need
      </label>
      <div className="ask">
        <IconUser width={18} height={18} />
        <input
          id="gs-request"
          type="text"
          value={text}
          onChange={(e) => pick(e.target.value)}
          onFocus={() => setTouched(true)}
          placeholder="Describe what you need"
          autoComplete="off"
          spellCheck={false}
          maxLength={200}
        />
      </div>
      <div className="ex">
        {EXAMPLES.map((example) => (
          <button key={example} type="button" aria-pressed={text === example} onClick={() => pick(example)}>
            {example}
          </button>
        ))}
      </div>

      <ol className="roster" aria-hidden="true">
        {SKILLS.map((s) => {
          const n = order.get(s.id)
          const Icon = s.icon
          return (
            <li key={s.id} className={n ? "on" : undefined}>
              {n ? <span className="n">{n}</span> : null}
              <Icon width={18} height={18} />
              <span>{s.short}</span>
            </li>
          )
        })}
      </ol>

      <ol className="steps" aria-live="polite" aria-label="Who fires, in order">
        {steps.map((step) => {
          const Icon = SKILL_BY_ID[step.skill].icon
          return (
            <li key={step.skill} className={step.rides ? "rides" : undefined}>
              <Icon width={20} height={20} />
              <div>
                <b>{step.skill}</b>
                {step.mode ? <em className="badge">{step.mode} mode</em> : null}
                {step.security ? <em className="badge sec">security pass</em> : null}
                <p>{step.why}</p>
              </div>
            </li>
          )
        })}
        {steps.length ? (
          <li className="out">
            <IconPullRequest width={20} height={20} />
            <div>
              <b>You get</b>
              <p>{outcome(steps)}</p>
            </div>
          </li>
        ) : (
          <li className="rides">
            <IconUser width={20} height={20} />
            <div>
              <b>Nobody yet</b>
              <p>Type a request, or pick one above.</p>
            </div>
          </li>
        )}
      </ol>
      <p className="note">A sketch of the real auto-trigger rules, matched on words. The skills read the whole request.</p>
    </div>
  )
}
