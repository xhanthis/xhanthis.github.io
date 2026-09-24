import type { Metadata, Viewport } from "next"
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"
import SkillTabs from "@/components/god-skills/skill-tabs"
import RouteDemo from "@/components/god-skills/route-demo"
import CopyCommand from "@/components/god-skills/copy-command"
import {
  IconCheckCircle,
  IconCode,
  IconCompass,
  IconGitHub,
  IconHeart,
  IconLandmark,
  IconList,
  IconNpm,
  IconPen,
  IconPullRequest,
  IconRefresh,
  IconRupee,
  IconScreens,
  IconShield,
  IconTerminal,
  IconUser,
} from "@/components/god-skills/skills"
import "./god-skills.css"

const HOME = "https://xhanthis.github.io/"
const SITE = `${HOME}god-skills/`
const REPO = "https://github.com/xhanthis/god-skills"
const NPM = "https://www.npmjs.com/package/god-skills"
const CHANGELOG = `${REPO}/blob/main/CHANGELOG.md`
const OG_IMAGE = `${HOME}og/god-skills.png`
const UPDATED = "2026-09-24"

const TITLE = "God Skills — Claude Code skills that work like a team"
const DESCRIPTION =
  "Seven open-source Claude Code skills that work like a team: CEO, builder, QA, CFO, PM, writer, ally. Every run ends in a tested, reviewed PR. npx god-skills"

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "God Skills",
    "god-skills",
    "Claude Code skills",
    "Claude Code",
    "Claude Code agents",
    "Claude Code subagents",
    "Claude Code hooks",
    "AI coding agent workflow",
    "AI code review",
    "AI QA testing",
    "god-agents",
    "Codex CLI skills",
    "Gemini CLI skills",
    "Cursor rules",
    "Rahul Kulkarni",
  ],
  authors: [{ name: "Rahul Kulkarni", url: HOME }],
  creator: "Rahul Kulkarni",
  category: "technology",
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    url: SITE,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "God Skills",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "God Skills: seven Claude Code skills, one team" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, creator: "@xhanthis", images: [OG_IMAGE] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
}

const NAV = [
  ["#why", "Why"],
  ["#skills", "The seven"],
  ["#flow", "How it flows"],
  ["#router", "Try it"],
  ["#features", "Features"],
  ["#agents", "Agents"],
  ["#install", "Install"],
  ["#faq", "FAQ"],
]

const FLOW = [
  {
    icon: IconUser,
    title: "You ask, in plain words.",
    text: "“Refunds are off by a rupee.” “Add CSV export.” “Should we build this?” No prompt engineering.",
  },
  {
    icon: IconCompass,
    title: "god-ceo frames it, when the ask is vague or crosses skills.",
    text: "Reads the code, finds the real problem, decides if it is worth doing this week, picks the shortest chain. A clear single ask skips this step.",
  },
  {
    icon: IconCode,
    title: "god-dev plans, then builds.",
    text: "Picks small, normal or deep. Syncs git, checks for a branch already doing it, lists what could go wrong, removes before it adds, and writes to the auto-reviewer’s checklist so the PR passes first time.",
  },
  {
    icon: IconShield,
    title: "god-qa proves it.",
    text: "Runs the tests for real: backend, four screen sizes, keyboard, slow network, security when auth or input is touched. Scores every issue 1 to 5 and fixes up to three rounds. No PASS without proof.",
  },
  {
    icon: IconRupee,
    title: "Specialists check their part.",
    text: "god-cfo recomputes any money a second way. god-cmo writes the PR body so a person can read it.",
  },
  {
    icon: IconPullRequest,
    title: "You get a pull request that is ready to merge.",
    text: "Title with your deploy token. Body with problem, approach, rollback and test evidence. A test-cases doc, a manual guide, a change-log flowchart. The lesson saved for next time. One line from god-ally on your pace.",
  },
]

const FEATURES = [
  {
    icon: IconShield,
    title: "Passes the auto-reviewer first time",
    text: "Sanitized errors, indexed and bounded SQL, no personal data in logs or URLs, no secrets, no XSS. Written to the checklist, never gamed.",
  },
  {
    icon: IconLandmark,
    title: "Indian law by default",
    text: "DPDP Act 2023 and ISO 27001 checks whenever personal data, consent or payments are touched.",
  },
  {
    icon: IconScreens,
    title: "Designed for every screen",
    text: "390, 820, 1512 and 1440 wide, light and dark, keyboard and screen reader, slow network, on every UI change.",
  },
  {
    icon: IconCheckCircle,
    title: "Proof, not claims",
    text: "Tests really run. A test that could not run is UNVERIFIED, never PASS. Two docs ship with every PR.",
  },
  {
    icon: IconRupee,
    title: "Numbers checked twice",
    text: "Revenue, refunds, commissions, GST and splits recomputed a second way before they are trusted.",
  },
  {
    icon: IconCompass,
    title: "Decides before it builds",
    text: "BUILD, SHIP, DEFER or STOP, ranked against the week, with the why written down.",
  },
  {
    icon: IconRefresh,
    title: "Learns from every run",
    text: "Lessons scoped to you, the repo, or everyone. Universal ones become pull requests to the skills themselves.",
  },
  {
    icon: IconPen,
    title: "Reads like you wrote it",
    text: "PR bodies, docs and notes without AI tells, in your voice, with one fixed signature.",
  },
  {
    icon: IconHeart,
    title: "Watches your hours",
    text: "A Zen Score per day and a stop-for-tonight line when it matters.",
  },
  {
    icon: IconTerminal,
    title: "Any CLI",
    text: "Plain Markdown, so Codex, Gemini CLI and Cursor follow the same rules. Hook gates stay Claude Code only.",
  },
]

const FAQ = [
  {
    q: "What is God Skills?",
    a: "God Skills is a free, open-source set of seven skills for Claude Code that work like a small company: god-ceo decides, god-dev builds, god-qa proves, god-cfo counts, god-pm asks why, god-cmo writes and god-ally watches your pace. Each run ends in a tested, reviewed pull request instead of a guess.",
  },
  {
    q: "What is a Claude Code skill?",
    a: "A skill is a Markdown file that Claude Code loads at the start of a session and follows for one kind of job. God Skills ships seven that hand work to each other and share one learning loop.",
  },
  {
    q: "How do I install God Skills?",
    a: "Run npx god-skills, choose global or project, and restart Claude Code. npx god-agents --all adds subagents, the /god command and the hook gates. Node 18 or newer, no other dependencies.",
  },
  {
    q: "Does it work with Codex, Gemini CLI or Cursor?",
    a: "Yes. npx god-skills --codex writes AGENTS.md, --gemini writes GEMINI.md, and --agents-md <file> targets any instruction file. The hook gates are a Claude Code feature and do not port.",
  },
  {
    q: "What does god-qa actually test?",
    a: "It runs the tests itself: backend and logic, the UI at 390, 820, 1512 and 1440 pixels, keyboard and screen reader, slow network, a security pass when the diff touches auth or input, and a DPDP and ISO 27001 pass when it touches personal data. Every issue is scored 1 to 5. A test that could not run is reported UNVERIFIED, never PASS.",
  },
  {
    q: "What leaves my machine?",
    a: "Nothing, except a summarized universal lesson that opens as a pull request to the skills repo, which you can turn off. Lessons, decisions, scorecards and the activity log stay in ~/.claude/god/.",
  },
  {
    q: "Is God Skills free?",
    a: "Yes. MIT licensed, zero dependencies, source on GitHub, packages god-skills and god-agents on npm.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE}#software`,
      name: "God Skills",
      alternateName: ["god-skills", "God Skills for Claude Code"],
      description: DESCRIPTION,
      url: SITE,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows",
      downloadUrl: NPM,
      installUrl: NPM,
      codeRepository: REPO,
      license: "https://opensource.org/licenses/MIT",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": `${HOME}#person` },
      dateModified: UPDATED,
      keywords: "Claude Code, skills, agents, hooks, AI code review, QA",
      featureList: FEATURES.map((f) => f.title),
    },
    {
      "@type": "Person",
      "@id": `${HOME}#person`,
      name: "Rahul Kulkarni",
      url: HOME,
      jobTitle: "Senior Product Manager",
      worksFor: { "@type": "Organization", name: "SaffronStays", url: "https://www.saffronstays.com" },
      sameAs: [
        "https://github.com/xhanthis",
        "https://www.linkedin.com/in/merahulkulkarni",
        "https://twitter.com/xhanthis",
        "https://medium.com/@xhanthis",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${HOME}#website`,
      url: HOME,
      name: "Rahul Kulkarni",
      publisher: { "@id": `${HOME}#person` },
    },
    {
      "@type": "WebPage",
      "@id": SITE,
      url: SITE,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${HOME}#website` },
      about: { "@id": `${SITE}#software` },
      author: { "@id": `${HOME}#person` },
      primaryImageOfPage: OG_IMAGE,
      dateModified: UPDATED,
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Rahul Kulkarni", item: HOME },
        { "@type": "ListItem", position: 2, name: "God Skills", item: SITE },
      ],
    },
    {
      "@type": "HowTo",
      name: "Install God Skills for Claude Code",
      totalTime: "PT1M",
      step: [
        { "@type": "HowToStep", name: "Install", text: "Run npx god-skills in a terminal." },
        { "@type": "HowToStep", name: "Scope", text: "Choose global (~/.claude) or project (./.claude)." },
        { "@type": "HowToStep", name: "Restart", text: "Restart Claude Code. Skills load at session start." },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
}

const Ext = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" className={className}>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <header className="top">
        <span className="mark" aria-hidden="true">
          🥷🏾
        </span>
        <div>
          <h1>God Skills</h1>
          <p className="tag">Seven Claude Code skills. One team.</p>
        </div>
        <ThemeToggle />
      </header>

      <p className="lede">
        God Skills is seven open-source skills for <Ext href="https://claude.com/claude-code">Claude Code</Ext> that work like
        a small company. One decides, one builds, one tests, one checks the money, one asks why, one writes, one watches your
        hours. Every run ends in a pull request that passed review, with the proof attached.
      </p>

      <div className="hero-install">
        <CopyCommand command="npx god-skills" />
        <nav className="links" aria-label="Project links">
          <Ext href={REPO} className="lnk">
            <IconGitHub />
            GitHub
          </Ext>
          <Ext href={NPM} className="lnk">
            <IconNpm />
            npm
          </Ext>
          <Ext href={CHANGELOG} className="lnk">
            <IconList width={16} height={16} />
            Changelog
          </Ext>
        </nav>
        <p className="fine">MIT · zero dependencies · Node 18+</p>
      </div>

      <nav className="toc" aria-label="On this page">
        {NAV.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <section id="why" aria-labelledby="why-h">
        <h2 id="why-h">Why I built God Skills</h2>
        <p>
          I&rsquo;m a senior product manager at <Ext href="https://www.saffronstays.com">SaffronStays</Ext> and I ship code
          across several side projects. Claude Code made me fast, but the speed had a bill. Pull requests kept failing the
          auto-reviewer. Deploys dragged. After a long session I could not say what had actually changed. Deciding what to
          build, or whether to build it at all, was still on me. And the numbers: every revenue figure it touched, I re-checked
          by hand.
        </p>
        <p>
          God Skills is how I fixed that. Each job went to a specialist with its own rules, its own checks, and a memory of
          what went wrong last time.
        </p>
      </section>

      <section id="skills" aria-labelledby="skills-h">
        <h2 id="skills-h">The seven Claude Code skills</h2>
        <p className="sub">Each owns one question and hands work to the next. Pick one.</p>
        <SkillTabs />
      </section>

      <section id="flow" aria-labelledby="flow-h">
        <h2 id="flow-h">How a request flows through God Skills</h2>
        <p className="sub">From a sentence to a production-grade pull request, every time.</p>
        <ol className="flow">
          {FLOW.map((step, i) => {
            const Icon = step.icon
            return (
              <li key={step.title}>
                <span className="num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>
                    <Icon width={18} height={18} /> {step.title}
                  </h3>
                  <p>{step.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
        <p className="loops">
          If god-qa fails it, god-dev fixes from the scored list and god-qa reruns, three times at most. Stuck anywhere,
          god-ceo steps in.
        </p>
      </section>

      <section id="router" aria-labelledby="router-h">
        <h2 id="router-h">Try the router</h2>
        <p className="sub">Type a request. Watch who fires, in what order, and what you get back.</p>
        <RouteDemo />
      </section>

      <section id="features" aria-labelledby="features-h">
        <h2 id="features-h">What you get out of the box</h2>
        <ul className="features">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <li key={f.title}>
                <Icon />
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <section id="agents" aria-labelledby="agents-h">
        <h2 id="agents-h">Agents and hooks</h2>
        <p>
          A skill is knowledge in your session. <Ext href="https://www.npmjs.com/package/god-agents">god-agents</Ext> turns each
          one into a subagent with its own context window, tool allowlist and model, and adds the part a prompt cannot talk its
          way out of: hooks.
        </p>
        <ul className="pts">
          <li>
            <b>Stop.</b> The session cannot end while god-dev&rsquo;s edits lack a god-qa PASS.
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
      </section>

      <section id="install" aria-labelledby="install-h">
        <h2 id="install-h">Install God Skills</h2>
        <Shell
          rows={[
            ["npx god-skills", "every skill, asks global or project"],
            ["npx god-skills list", "see the seven"],
            ["npx god-skills doctor", "verify the install"],
            ["npx god-agents --all", "subagents, /god, and the hook gates"],
          ]}
        />
        <p>Restart Claude Code after installing. Skills load at session start.</p>
        <p>Other CLIs read the same Markdown:</p>
        <Shell
          rows={[
            ["npx god-skills --codex", "./AGENTS.md"],
            ["npx god-skills --gemini", "./GEMINI.md"],
            ["npx god-skills --agents-md .cursor/rules/god.md", "any instruction file"],
          ]}
        />
      </section>

      <section id="faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Frequently asked questions</h2>
        <dl className="faq">
          {FAQ.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <footer>
        <span>
          Built by <Link href="/">Rahul Kulkarni</Link> · 2026
        </span>
        <Ext href={REPO}>source</Ext>
      </footer>
    </main>
  )
}
