import type { Metadata } from "next"
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"
import RouteDemo from "@/components/route-demo"
import "./god-skills.css"

const SITE = "https://xhanthis.github.io/god-skills/"
const REPO = "https://github.com/xhanthis/god-skills"
const DESCRIPTION =
  "Seven Claude Code skills that behave like one company: a CEO, a builder, a QA gate, a CFO, a PM, a writer and a wellbeing assistant. They hand work to each other and learn from every run."

export const metadata: Metadata = {
  title: "God Skills",
  description: DESCRIPTION,
  keywords: ["God Skills", "Claude Code", "Claude Code skills", "agent skills", "god-skills", "god-agents", "AI coding agents"],
  alternates: { canonical: SITE },
  openGraph: { type: "website", url: SITE, title: "God Skills", description: DESCRIPTION, siteName: "God Skills" },
  twitter: { card: "summary", title: "God Skills", description: DESCRIPTION, creator: "@xhanthis" },
}

const SEVEN: [string, string][] = [
  ["god-ceo", "What is the real problem, is it worth doing, who does it, and what is the final call?"],
  ["god-dev", "How do we design and implement this correctly, fast, and better than last time?"],
  ["god-qa", "Does it actually work, is it safe, and can we prove it?"],
  ["god-cfo", "Do the numbers reconcile, what should we charge, and what does the data say?"],
  ["god-pm", "What should we build, why, for whom, how does it run, and how is the competitor built?"],
  ["god-cmo", "Is this clear, short, and does it read like a human wrote it?"],
  ["god-ally", "Is this pace sustainable, and should you be working right now?"],
]

const INSTALL: [string, string][] = [
  ["npx god-skills", "every skill, asks global or project"],
  ["npx god-skills list", "see the seven"],
  ["npx god-skills doctor", "verify the install"],
  ["npx god-agents --all", "subagents, /god, and the hook gates"],
]

const OTHER_CLIS: [string, string][] = [
  ["npx god-skills --codex", "./AGENTS.md"],
  ["npx god-skills --gemini", "./GEMINI.md"],
  ["npx god-skills --agents-md .cursor/rules/god.md", "any instruction file"],
]

const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </Link>
)

/**
 * A shell block: one command per line, its comment aligned in a muted column.
 * @param rows - [command, comment] pairs
 */
function Shell({ rows }: { rows: [string, string][] }) {
  const width = Math.max(...rows.map(([cmd]) => cmd.length)) + 4
  return (
    <pre tabIndex={0}>
      <code>
        {rows.map(([cmd, note]) => (
          <span key={cmd}>
            {cmd.padEnd(width)}
            <span className="c">{`# ${note}`}</span>
            {"\n"}
          </span>
        ))}
      </code>
    </pre>
  )
}

export default function GodSkills() {
  return (
    <main className="gs">
      <div className="top">
        <span className="mark" aria-hidden="true">
          🥷🏾
        </span>
        <div>
          <h1>God Skills</h1>
          <span>seven skills, one company</span>
        </div>
        <ThemeToggle />
      </div>

      <p className="lede">
        Seven <Ext href="https://claude.com/claude-code">Claude Code</Ext> skills that behave like one company instead of one
        assistant guessing outside its expertise. A CEO, a builder, a QA gate, a CFO, a PM, a writer and a wellbeing
        assistant. Each owns a domain, hands work to the next, and learns from every run.
      </p>

      <Shell rows={[["npx god-skills", "that is the whole install"]]} />

      <div className="row">
        <Ext href={REPO}>GitHub</Ext>
        <Ext href="https://www.npmjs.com/package/god-skills">npm</Ext>
        <Ext href={`${REPO}/blob/main/CHANGELOG.md`}>changelog</Ext>
        <span>MIT, no dependencies</span>
      </div>

      <h2>Why I built this</h2>
      <p>
        I run product and engineering at a startup, mostly alone. Claude Code made me fast. It did not make me a team.
        One assistant was writing the code, judging the code, pricing the feature and drafting the announcement, and it was
        mediocre at every handoff because there were no handoffs. A company has roles for a reason.
      </p>
      <p>
        AI ships untested code. An assistant says <i>done</i> when it means <i>written</i>: screenshots nobody looked at,
        tests that were described but never run, a pull request that would have failed review on the first line. God
        Skills makes proof the default. Nothing is done until god-qa has run the tests itself and returned PASS. A test that
        could not run is UNVERIFIED, never PASS.
      </p>
      <p>
        Tools should learn from every run. Every correction I gave was gone by the next session. Now each lesson is scoped:
        personal ones stay on my machine for good, repo ones stay with that codebase, and a rule that would hold for a
        stranger at another company becomes a pull request to the skills themselves. The next install already knows.
      </p>

      <h2>Try the router</h2>
      <RouteDemo />

      <h2>The seven</h2>
      <ul className="seven">
        {SEVEN.map(([name, question]) => (
          <li key={name}>
            <b>{name}</b>
            <span>{question}</span>
          </li>
        ))}
      </ul>

      <h2>How a request flows</h2>
      <p className="flow">
        <span>you</span>
        <i>→</i>
        <span>god-ceo</span>
        <i>→</i>
        <span>god-dev</span>
        <i>→</i>
        <span>god-qa</span>
        <i>→</i>
        <span>ship</span>
      </p>
      <ul className="pts">
        <li>
          <b>A vague ask</b> (“order amount is wrong”) goes to god-ceo first. It reads the codebase, reconstructs the real
          problem, says whether it is worth doing this week, and picks the minimum chain. A clear single-skill ask skips
          it.
        </li>
        <li>
          <b>Code</b> goes to god-dev. It picks a mode: small, normal, or deep for anything touching money, data or auth.
          It syncs git, checks for a branch already doing the work, removes before it adds, self-scores on god-qa’s scale,
          then runs god-qa itself.
        </li>
        <li>
          <b>Proof</b> is god-qa’s job. It starts with what could go wrong, writes and runs the tests, checks the UI at
          four viewports, runs the security pass when the diff touches auth or input, scores every issue 1 to 5, fixes and
          retests up to three times, and ends with a verdict and two documents: the test cases, and a manual guide with
          ready-to-run curls.
        </li>
        <li>
          <b>Money in the diff</b> goes to god-cfo, which recomputes it a second way before it is trusted.
        </li>
        <li>
          <b>A decision</b> goes back to god-ceo, which attacks it first and then calls it: BUILD, SHIP, DEFER, DO NOT
          BUILD. The why is written down, so “why does this exist” has an answer later.
        </li>
        <li>
          <b>Every reply</b> ends with god-ally’s line: today’s pace against your own baseline, and when it matters, stop
          for tonight.
        </li>
      </ul>
      <p>
        Loops: qa → dev → qa, three at most. cfo → dev → cfo. Stuck anywhere → god-ceo.
      </p>

      <h2>The learning loop</h2>
      <p>
        One loop, shared by all seven. A lesson is captured when you correct a skill, when another skill fails its work,
        when an outcome turns later (a reverted PR, a wrong call), or from a one-line self-review. It is judged on who it
        is true for, not on how often it repeats.
      </p>
      <table>
        <thead>
          <tr>
            <th>Scope</th>
            <th>Test</th>
            <th>Goes to</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>universal</b>
            </td>
            <td>would hold for a stranger in another repo at another company</td>
            <td>global lessons; may become a PR upstream</td>
          </tr>
          <tr>
            <td>
              <b>repo</b>
            </td>
            <td>true only in that codebase</td>
            <td>that repo’s lessons, local</td>
          </tr>
          <tr>
            <td>
              <b>personal</b>
            </td>
            <td>your taste, tools, style</td>
            <td>your machine, even after 100 sightings</td>
          </tr>
        </tbody>
      </table>
      <p>
        Value is severity × reach × confidence. A universal lesson scoring 18 or more opens a pull request on its first
        sighting: a summarized rule only, never code, paths or names, labelled <code>learning</code>, at most one a day,
        never merged by a machine. CI rejects anything identifying. Nothing else ever leaves your machine.
      </p>

      <h2>Rules every God obeys</h2>
      <ul className="pts">
        <li>
          <b>No fabrication.</b> Numbers come from the repo, your analytics, or a named public source. Unknown impact is
          reported as unknown, plus what to instrument to find out.
        </li>
        <li>
          <b>Proof over claims.</b> Tests that could not run return UNVERIFIED, never PASS. A screenshot that was not looked
          at is not a test.
        </li>
        <li>
          <b>Adversarial before final.</b> god-ceo tries to destroy a plan before it is decided. god-qa’s what-could-go-wrong
          list comes before any PASS.
        </li>
        <li>
          <b>Integrity gate.</b> Before a PASS, god-qa re-runs one test, re-verifies one claim, and greps the final diff for
          what a strict reviewer blocks. Sampling catches most shortcuts.
        </li>
        <li>
          <b>Ship gate.</b> Written to a strict automated reviewer’s checklist, line by line: sanitized errors, indexed and
          bounded SQL, no personal data in logs or URLs, no secrets, no XSS. Met, never gamed. A rule that cannot be met is
          written into the PR body instead.
        </li>
        <li>
          <b>Brevity.</b> Lead with the finding. If the review is longer than the change, the review is wrong.
        </li>
      </ul>

      <h2>Agents and hooks</h2>
      <p>
        A skill is knowledge in your session. <Ext href="https://www.npmjs.com/package/god-agents">god-agents</Ext> turns
        each one into a subagent with its own context window, tool allowlist and model, and adds the part a prompt cannot
        talk its way out of: hooks.
      </p>
      <div className="layers">
        <b>skills</b>
        <i>knowledge</i>
        <span>what good work looks like</span>
        <b>agents</b>
        <i>isolation</i>
        <span>own context, own tools, own model</span>
        <b>hooks</b>
        <i>rules</i>
        <span>a prompt can be ignored; a hook cannot</span>
        <b>runtime</b>
        <i>autonomy</i>
        <span>scheduled runs, cost caps, findings filed</span>
      </div>
      <ul className="pts">
        <li>
          <b>Stop.</b> The session cannot end while god-dev’s edits lack a god-qa PASS.
        </li>
        <li>
          <b>PreToolUse.</b> String-built SQL and reviewer tripwires are blocked before they land.
        </li>
        <li>
          <b>SessionStart, UserPromptSubmit.</b> god-ally logs the moment and warns when a meeting is minutes away or you are
          past your stop time.
        </li>
      </ul>
      <p>Agents are opt-in. By default every skill runs inline, in your session, where you can watch it work.</p>

      <h2>Install</h2>
      <Shell rows={INSTALL} />
      <p>Restart Claude Code after installing. Skills load at session start.</p>
      <p>The skills are plain Markdown, so any agent that reads an instruction file can follow them.</p>
      <Shell rows={OTHER_CLIS} />

      <h2>Proof</h2>
      <p>
        <code>npm test</code> runs over 300 assertions across both packages, with no credentials and no network, and CI
        runs them on every pull request: the installer and its force and retire semantics, every skill’s contract (verdict
        tokens, viewports, modes, memory paths, cores under 150 lines), every hook gate with its fail-open path, the runner
        against real throwaway repos, and god-ally’s scoring down to the day boundary.
      </p>
      <p className="sig">
        Every pull request the skills open ends with the same line: <b>🥷🏾 Authored by God</b>. It links here.
      </p>

      <footer>
        <span>Rahul Kulkarni · 2026</span>
        <div className="links">
          <Link href="/">home</Link>
          <Ext href={REPO}>source</Ext>
        </div>
      </footer>
    </main>
  )
}
