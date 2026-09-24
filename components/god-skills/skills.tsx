import type { ReactNode, SVGProps } from "react"

// The seven skills, their icons, and the small icon set the page uses.
// Icons are inline SVG on currentColor so they follow the theme.
const base = (props: SVGProps<SVGSVGElement>) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
})

export const IconCompass = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m14.8 9.2-1.9 5.6-5.7 1.9 1.9-5.6z" />
  </svg>
)
export const IconCode = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m8 8-4 4 4 4" />
    <path d="m16 8 4 4-4 4" />
    <path d="m14 4-4 16" />
  </svg>
)
export const IconShield = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3 4.5 6v5c0 4.6 3.2 8.4 7.5 10 4.3-1.6 7.5-5.4 7.5-10V6z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </svg>
)
export const IconRupee = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="m6 13 8.5 8" />
    <path d="M6 13h3" />
    <path d="M9 13c6.667 0 6.667-10 0-10" />
  </svg>
)
export const IconBulb = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.6.6-1 1.4-1 2.5H9.5c0-1.1-.4-1.9-1-2.5z" />
  </svg>
)
export const IconPen = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
)
export const IconHeart = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M19.5 12.6 12 20l-7.5-7.4a5 5 0 1 1 7.5-6.3 5 5 0 1 1 7.5 6.3z" />
    <path d="M6 12h3l1.5-2.5 2 5L14 12h4" />
  </svg>
)
export const IconUser = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
)
export const IconPullRequest = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M6 8.5v7" />
    <path d="M18 15.5V10a3 3 0 0 0-3-3h-4" />
    <path d="m13.5 4.5-2.5 2.5 2.5 2.5" />
  </svg>
)
export const IconCheckCircle = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.5 2.5 5-5.5" />
  </svg>
)
export const IconLandmark = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 21h18" />
    <path d="M5 21V10M9.5 21V10M14.5 21V10M19 21V10" />
    <path d="m3 10 9-6 9 6z" />
  </svg>
)
export const IconScreens = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="12" height="9" rx="1.5" />
    <path d="M6 18h6M9 14v4" />
    <rect x="17" y="8" width="4.5" height="10" rx="1.2" />
  </svg>
)
export const IconRefresh = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M20 11a8 8 0 0 0-14.5-4.5L3 9" />
    <path d="M3 4v5h5" />
    <path d="M4 13a8 8 0 0 0 14.5 4.5L21 15" />
    <path d="M21 20v-5h-5" />
  </svg>
)
export const IconTerminal = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m5 7 5 5-5 5" />
    <path d="M12 19h7" />
  </svg>
)
export const IconCopy = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
)
export const IconCheck = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)
export const IconList = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <path d="M4 6h.01M4 12h.01M4 18h.01" />
  </svg>
)
export const IconGitHub = (p: SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
)
export const IconNpm = (p: SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M2 6h20v12H12v2H7v-2H2zm2 2v8h3V9h2v7h3V8zm10 0v8h3v-5h2v5h3V8z" />
  </svg>
)

export type Skill = {
  id: string
  short: string
  role: string
  question: string
  does: string[]
  fires: string
  returns: string
  icon: (p: SVGProps<SVGSVGElement>) => ReactNode
}

export const SKILLS: Skill[] = [
  {
    id: "god-ceo",
    short: "ceo",
    role: "Decides",
    question: "What is the real problem, is it worth doing, who does it, and what is the final call?",
    does: [
      "Reconstructs the real problem before anyone codes, reading the codebase, not the ticket.",
      "Ranks it against this week's priorities and says no to low-value work.",
      "Routes the shortest chain of skills, attacks the plan, then calls it: BUILD, SHIP, DEFER or STOP.",
      "Writes the decision and the why down, so “why does this exist” has an answer later.",
    ],
    fires: "when the ask is vague, spans two or more skills, or any skill is stuck",
    returns: "a one-screen decision memo",
    icon: IconCompass,
  },
  {
    id: "god-dev",
    short: "dev",
    role: "Builds",
    question: "How do we design and implement this correctly, fast, and better than last time?",
    does: [
      "Picks a mode: small, normal, or deep for anything touching money, data or auth, where it designs first.",
      "Syncs git and looks for a branch already doing the work before writing any.",
      "Plans with a what-could-go-wrong list, removes before it adds, then writes to the reviewer's checklist.",
      "Self-scores like god-qa would, runs god-qa itself, and opens the PR with the proof attached.",
    ],
    fires: "every time code is written, changed or refactored",
    returns: "a build report with the PR links, the docs and what needs you",
    icon: IconCode,
  },
  {
    id: "god-qa",
    short: "qa",
    role: "Proves",
    question: "Does it actually work, is it safe, and can we prove it?",
    does: [
      "Starts with what could go wrong, then writes and actually runs the tests.",
      "Checks the UI at four screen sizes, keyboard and screen reader, slow network.",
      "Runs the security pass when the diff touches auth or input, the DPDP pass when it touches personal data.",
      "Scores every issue 1 to 5, fixes and retests up to three rounds. A test that could not run is UNVERIFIED, never PASS.",
    ],
    fires: "after every god-dev change, and whenever you ask to test or review",
    returns: "PASS or FAIL, a test-cases doc and a manual guide with ready-to-run checks",
    icon: IconShield,
  },
  {
    id: "god-cfo",
    short: "cfo",
    role: "Counts",
    question: "Do the numbers reconcile, what should we charge, and what does the data say?",
    does: [
      "Recomputes revenue, refunds, commissions, GST and partner splits a second way before they are trusted.",
      "Pricing: willingness to pay, tiers, discounts, elasticity.",
      "Data: SQL, metric definitions, funnels, cohorts, retention.",
      "Validates money logic in code by deriving the result independently.",
    ],
    fires: "when a diff or a question touches money, SQL, metrics or currency math",
    returns: "a numbers memo with a worked example in real figures",
    icon: IconRupee,
  },
  {
    id: "god-pm",
    short: "pm",
    role: "Asks why",
    question: "What should we build, why, for whom, and how does it run?",
    does: [
      "PRDs, success metrics and delivery plans.",
      "Customer evidence from reviews, tickets, NPS and churn, with sources and dates.",
      "Competitor and market research that cites what it read.",
      "SOPs, SLAs and escalation paths; reverse-engineers an existing product into a rebuild plan.",
    ],
    fires: "when a feature is proposed, a competitor is named, or a process is designed",
    returns: "a product brief: one customer moment, the evidence, the test and the win",
    icon: IconBulb,
  },
  {
    id: "god-cmo",
    short: "cmo",
    role: "Writes",
    question: "Is this clear, short, and does it read like a human wrote it?",
    does: [
      "PR descriptions, docs, memos, release notes, posts.",
      "Makes it clearer and shorter without making it weaker.",
      "Strips AI tells and matches your voice, and learns it over time.",
    ],
    fires: "for any prose a person will read, or when you ask to tighten or humanize text",
    returns: "the rewrite itself, with a four-line edit note",
    icon: IconPen,
  },
  {
    id: "god-ally",
    short: "ally",
    role: "Watches pace",
    question: "Is this pace sustainable, and should you be working right now?",
    does: [
      "Learns your hours, sleep window, focus blocks and meeting load from timestamps only.",
      "Closes every reply with one line: today's Zen Score against your own week.",
      "Speaks up when it matters: stop for tonight, eat, don't start this before the meeting.",
      "Asks before you continue on a strong signal.",
    ],
    fires: "rides every reply; /god-ally on request for the day or the week",
    returns: "one line, or the daily report with a score out of 10",
    icon: IconHeart,
  },
]

export const SKILL_BY_ID = Object.fromEntries(SKILLS.map((s) => [s.id, s])) as Record<string, Skill>
