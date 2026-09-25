import type { Metadata, Viewport } from "next"
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"
import BoardDemo from "@/components/zokie/board-demo"
import "./zokie.css"

const HOME = "https://xhanthis.github.io/"
const SITE = `${HOME}zokie/`
const REPO = "https://github.com/xhanthis/zokie"
const DOWNLOAD = `${REPO}/releases/latest`
const GOD = `${HOME}god-skills/`
const OG_IMAGE = `${HOME}zokie/icon.png`
const UPDATED = "2026-09-25"

const TITLE = "Zokie — a light agent IDE for macOS. Build Great Things."
const DESCRIPTION =
  "Zokie is a 14 MB native macOS IDE where agents write the code and you review the diff. Run ten Claude Code or Codex agents side by side on one MacBook. Free download."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Zokie",
    "agent IDE",
    "AI IDE for macOS",
    "Claude Code IDE",
    "Codex IDE",
    "parallel coding agents",
    "git worktree IDE",
    "God Skills",
    "Conductor alternative",
    "lightweight IDE",
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
    siteName: "Zokie",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 512, height: 512, alt: "Zokie app icon" }],
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, creator: "@xhanthis", images: [OG_IMAGE] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
}

const FEATURES = [
  {
    id: "review",
    title: "They write. You review.",
    text: "Every task is a chat on the left and a diff on the right. You never scroll a file tree looking for what changed; the change is the screen. Read it, ask for a fix, merge.",
    visual: "diff",
  },
  {
    id: "light",
    title: "Ten agents on one MacBook.",
    text: "Zokie is a 14 MB native app on the system webview, not an Electron editor. Open ten tasks, let ten agents run, and the fan stays quiet. That is the whole reason it exists.",
    visual: "ten",
  },
  {
    id: "branch",
    title: "Every task on its own branch.",
    text: "Your first message names the task, picks feat, bug or chore, and gives each attached repo a git worktree on a fresh branch. Ten agents never touch each other's files.",
    visual: "branch",
  },
  {
    id: "models",
    title: "Claude Code and Codex. Your subscriptions.",
    text: "Pick Opus, Fable, Sonnet or any GPT model with its effort level, per task. Zokie runs the first-party CLIs you already pay for. No relay, no markup, no keys handed over.",
    visual: "models",
  },
  {
    id: "skills",
    title: "A team, not a chatbot.",
    text: "God Skills come built in. Send a task to Dev and it builds; Test proves it; the answer comes back as a pull request with evidence. Questions and permissions land as amber cards you cannot miss.",
    visual: "chain",
  },
]

const ALSO = [
  ["Data mode", "the diff pane becomes a notebook the agents fill in, with Python, pandas and matplotlib ready"],
  ["Your Day", "spend today against a daily cap, plan limits for each CLI, and a 30-day timeline of what shipped"],
  ["PR status and Merge", "checks and the merge button on the board, through gh"],
  ["Terminal and language servers", "one login shell per task; hover and go-to-definition through gopls, pyright and tsserver"],
  ["Attachments", "drop screenshots and files into the chat; the agent gets the paths"],
  ["Local by default", "config in a JSON file, chat in SQLite, worktrees on disk, a log with no message text"],
]

const FAQ = [
  {
    q: "What is Zokie?",
    a: "Zokie is a small native macOS app for working with coding agents. Agents such as Claude Code and Codex write the code inside git worktrees, and you review the diff against main on an Agent Board. It is built in Go with Wails and a React frontend and weighs about 14 MB.",
  },
  {
    q: "How is Zokie different from Conductor or Cursor?",
    a: "Zokie is a review surface, not an editor. It runs the first-party Claude Code and Codex CLIs locally, keeps each task in its own worktree, and stays light enough that ten agents run side by side on a laptop. It ships with God Skills, so every run ends in a tested pull request.",
  },
  {
    q: "What do I need to run it?",
    a: "macOS and Claude Code (npm install -g @anthropic-ai/claude-code). Codex, gh, uv and language servers are optional and add GPT models, PR status, Data mode and hover.",
  },
  {
    q: "Where does my data go?",
    a: "Nowhere. Settings live in ~/.zokie/config.json, tasks and chat in ~/.zokie/zokie.db, worktrees under ~/.zokie/tasks. The log holds no message text. Agents talk to their own providers with your own keys and subscriptions.",
  },
  {
    q: "Is Zokie free?",
    a: "Yes. Download the app from GitHub releases. You bring your own Claude Code or Codex subscription.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE}#software`,
      name: "Zokie",
      description: DESCRIPTION,
      url: SITE,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS",
      downloadUrl: DOWNLOAD,
      codeRepository: REPO,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": `${HOME}#person` },
      dateModified: UPDATED,
      featureList: [...FEATURES.map((f) => f.title), ...ALSO.map((a) => a[0])],
    },
    {
      "@type": "Person",
      "@id": `${HOME}#person`,
      name: "Rahul Kulkarni",
      url: HOME,
      sameAs: ["https://github.com/xhanthis", "https://www.linkedin.com/in/merahulkulkarni", "https://twitter.com/xhanthis"],
    },
    {
      "@type": "WebPage",
      "@id": SITE,
      url: SITE,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${HOME}#website` },
      about: { "@id": `${SITE}#software` },
      dateModified: UPDATED,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Rahul Kulkarni", item: HOME },
        { "@type": "ListItem", position: 2, name: "Zokie", item: SITE },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}

function Ext({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

/**
 * Static illustration for one feature block, built from markup so it follows the theme.
 * @param kind - which of the five visuals to draw
 */
function Visual({ kind }: { kind: string }) {
  if (kind === "diff")
    return (
      <div className="vis vis-diff" aria-hidden="true">
        <div className="vis-h">
          <span>refund.ts</span>
          <span className="counts">
            <em className="add">+2</em> <em className="del">−1</em>
          </span>
        </div>
        <pre>
          {"  const paise = amount * 100\n"}
          <span className="del">{"- return Math.floor(paise * share) / 100\n"}</span>
          <span className="add">{"+ return roundHalfEven(paise * share) / 100\n"}</span>
          {"}"}
        </pre>
        <div className="vis-merge">Merge</div>
      </div>
    )
  if (kind === "ten")
    return (
      <div className="vis vis-ten" aria-hidden="true">
        <ul>
          {["Refund rounding", "CSV export", "Bump axios", "Onboarding copy", "Slow search", "Retry webhooks", "Dark mode", "Invoice PDF", "Rate limits", "Flaky e2e"].map(
            (t) => (
              <li key={t}>
                <i />
                {t}
              </li>
            ),
          )}
        </ul>
        <div className="vis-stat">
          <b>14 MB</b>
          <span>the whole app</span>
        </div>
      </div>
    )
  if (kind === "branch")
    return (
      <div className="vis vis-branch" aria-hidden="true">
        <div className="tree">
          <div className="trunk">main</div>
          <div className="leaf">
            <span>you/feat/csv-export</span>
            <small>~/.zokie/tasks/csv-export/ssalliance</small>
          </div>
          <div className="leaf">
            <span>you/bug/refund-rounding</span>
            <small>~/.zokie/tasks/refund-rounding/nodebackend</small>
          </div>
          <div className="leaf">
            <span>you/chore/bump-axios</span>
            <small>~/.zokie/tasks/bump-axios/python_apis</small>
          </div>
        </div>
      </div>
    )
  if (kind === "models")
    return (
      <div className="vis vis-models" aria-hidden="true">
        <div className="vis-h">
          <span>Model</span>
          <span className="ok">Claude Code ✓ · Codex ✓</span>
        </div>
        <ul>
          <li className="on">
            Fable 5.1 <span>high</span>
          </li>
          <li>
            Opus 5.5 <span>medium</span>
          </li>
          <li>
            Sonnet 5 <span>low</span>
          </li>
          <li>
            GPT-6 Sol <span>high</span>
          </li>
          <li>
            GPT-6 Luna <span>medium</span>
          </li>
        </ul>
      </div>
    )
  return (
    <div className="vis vis-chain" aria-hidden="true">
      <div className="step you">You</div>
      <div className="arrow" />
      <div className="step dev">Dev builds</div>
      <div className="arrow" />
      <div className="step test">Test proves</div>
      <div className="arrow" />
      <div className="step pr">PR ✓</div>
      <div className="amber">Needs you · run pnpm add papaparse?</div>
    </div>
  )
}

export default function ZokiePage() {
  return (
    <main className="zk">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="nav" aria-label="Site">
        <Link href="/" className="home">
          ← Rahul Kulkarni
        </Link>
        <span className="links">
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
          <Ext href={REPO}>GitHub</Ext>
          <ThemeToggle />
        </span>
      </nav>

      <section className="hero" aria-labelledby="hero-h">
        <span className="logo" aria-label="Zokie">
          zokie<span className="dot" />
        </span>
        <h1 id="hero-h">Build Great Things</h1>
        <p className="lede">A light agent IDE for macOS. Agents write the code, you review the diff.</p>
        <div className="cta">
          <Ext href={DOWNLOAD} className="btn primary">
            Download Zokie
          </Ext>
          <span className="fine">macOS · 14 MB · free</span>
        </div>
      </section>

      <section id="demo" className="demo" aria-label="The Agent Board">
        <BoardDemo />
        <p className="cap">The home screen, live. Click a task on the left to replay its run.</p>
      </section>

      <section id="features" aria-labelledby="features-h">
        <h2 id="features-h" className="sr-only">
          Features
        </h2>
        {FEATURES.map((f, i) => (
          <article key={f.id} id={f.id} className={`feat ${i % 2 ? "flip" : ""}`}>
            <div className="feat-text">
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
            <Visual kind={f.visual} />
          </article>
        ))}
        <dl className="also">
          {ALSO.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="why" aria-labelledby="why-h">
        <h2 id="why-h">Why another IDE</h2>
        <p>
          I ship code on the side and did it in VS Code for years. Then agents arrived and the editor became the bottleneck:
          three or four of them would bring my MacBook to a halt. Today you can have ten working for you in parallel; the tools
          were just too heavy to hold it.
        </p>
        <p>
          <Ext href={GOD}>God Skills</Ext> was the first step: every job goes to a specialist agent with its own rules, checks and
          memory. Zokie is the second: a small native app built around those agents, where they write and I review. That is how I
          get from 10x to 100x.
        </p>
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

      <section className="end" aria-label="Download">
        <h2>Be the reviewer, not the typist.</h2>
        <Ext href={DOWNLOAD} className="btn primary">
          Download Zokie
        </Ext>
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
