"use client"

import { useState } from "react"

// A client-side sketch of the auto-trigger matrix: which skills fire for a
// request, in what order. The real skills read the whole ask; this reads words.
type Step = { skill: string; why: string; rides?: boolean }

const FILE_NAMED = /\S+\.(tsx?|jsx?|py|go|rb|rs|java|kt|swift|sql|md|css|html|sh|ya?ml|json)\b|\/\w+\/\w+/i
const CODE =
  /\b(build|add|implement|fix|bug|refactor|migrat\w*|endpoint|api|route|script|feature|component|page|screen|button|modal|form|crash\w*|error|exception|broken|fail\w*|500|null|undefined|timeout|deploy|rename|typo|css|layout|schema|table|column|index|cron|job|flag|hook|tests?|lint|regression|expired|leak\w*|exposed|bypass|invalid|missing|duplicate|twice|blank|empty|stuck|hangs?|freezes?)\b/i
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

const EXAMPLES = [
  "order total is wrong sometimes",
  "add a refund endpoint",
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
    steps.push({ skill: "god-ceo", why: "Bug-shaped and no file named. Reconstructs the real problem before anyone codes." })
  } else if (owners >= 2) {
    steps.push({ skill: "god-ceo", why: "The ask needs more than one skill. Decides if it is worth doing and picks the minimum chain." })
  } else if (owners === 0 && !money && !ally) {
    steps.push({ skill: "god-ceo", why: "Unclear ask. Finds out what the real problem is before routing it anywhere." })
  }
  if (pm) steps.push({ skill: "god-pm", why: "Decides what to build and why, for whom, with sourced evidence." })
  if (builds) {
    const deep = money || security
    const mode = deep ? "deep" : SMALL.test(text) ? "small" : "normal"
    const modeWhy =
      mode === "deep"
        ? "it touches money, data or auth, so it designs first"
        : mode === "small"
          ? "a few lines, nothing risky"
          : "plans, removes before it adds, self-scores"
    steps.push({ skill: "god-dev", why: `Writes the change in ${mode} mode: ${modeWhy}.` })
    steps.push({
      skill: "god-qa",
      why: security
        ? "Runs the tests itself, plus the security pass. The ask touches auth or user input."
        : "Runs the tests itself. Nothing is done until it returns PASS.",
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

export default function RouteDemo() {
  const [text, setText] = useState("")
  const steps = route(text)

  return (
    <div className="demo">
      <label htmlFor="gs-request">Type a request. See who fires, in what order.</label>
      <input
        id="gs-request"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="add a refund endpoint"
        autoComplete="off"
        spellCheck={false}
        maxLength={200}
      />
      <div className="ex">
        <span>try:</span>
        {EXAMPLES.map((example) => (
          <button key={example} type="button" onClick={() => setText(example)}>
            {example}
          </button>
        ))}
      </div>
      <ol className="chain" aria-live="polite">
        {steps.length === 0 ? (
          <li className="empty">Nobody yet. Type a request, or pick one above.</li>
        ) : (
          steps.map((step) => (
            <li key={step.skill} className={step.rides ? "rides" : undefined}>
              <b>{step.skill}</b>
              <span>{step.why}</span>
            </li>
          ))
        )}
      </ol>
      <p className="note">A sketch of the real auto-trigger rules, matched on words. The skills read the whole request.</p>
    </div>
  )
}
