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

const TESTIMONIALS = [
  {
    quote: "Three agents in VS Code froze my MacBook. Ten in Zokie and the fan doesn't spin.",
    who: "Rahul",
    role: "Product manager, built Zokie",
  },
  {
    quote: "I stopped reading code and started reading diffs. That is the whole job now.",
    who: "Early tester",
    role: "Backend engineer",
  },
  {
    quote: "Every task gets its own worktree without me thinking about it. Branches just appear.",
    who: "Early tester",
    role: "Full-stack developer",
  },
]

const FEATURES = [
  {
    title: "Agent Board, not an editor",
    text: "Tasks on the left, the agent chat in the middle, the diff against main on the right. You review; they write.",
  },
  {
    title: "Ten agents on one MacBook",
    text: "Wails and the system webview keep the whole app around 14 MB. Run a task per agent and stay under the fan.",
  },
  {
    title: "A worktree per task, on its own branch",
    text: "Your first message names the task, picks feat, bug or chore, and gives every attached repository a worktree and branch.",
  },
  {
    title: "Claude Code and Codex, side by side",
    text: "Pick Opus, Fable, Sonnet or any GPT model with its effort level. The picker shows which CLIs are installed and signed in.",
  },
  {
    title: "God Skills built in",
    text: "Send to Dev, Test, CEO, CFO, PM or CMO. The chat follows the handoffs and the board reads their scorecards.",
  },
  {
    title: "Needs-you cards",
    text: "Permission requests and questions land as amber cards. Nothing is denied silently, nothing runs without you.",
  },
  {
    title: "Data mode",
    text: "Swap the diff for a notebook the agents fill in, with a uv Python env, pandas and matplotlib ready.",
  },
  {
    title: "Your Day",
    text: "Zen score against your own week, spend today with a daily cap, plan limits for each CLI and a 30-day timeline.",
  },
  {
    title: "PR status and Merge",
    text: "gh in the loop: see checks, open the PR, merge from the board when the tests are green.",
  },
  {
    title: "Language servers and a terminal",
    text: "Hover and go-to-definition through gopls, pyright and typescript-language-server. One login shell per task.",
  },
  {
    title: "Attachments",
    text: "Drop screenshots and files into the chat. The agent gets the paths, you get thumbnails.",
  },
  {
    title: "Local by default",
    text: "Config in a JSON file, chat in SQLite, worktrees on disk, a JSON log with no message text. Nothing phones home.",
  },
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
      featureList: FEATURES.map((f) => f.title),
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

export default function ZokiePage() {
  return (
    <main className="zk">
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
        <p className="lede">
          A light agent IDE for macOS. Agents write the code, you review the diff. Ten of them, one MacBook, no fan.
        </p>
        <div className="cta">
          <Ext href={DOWNLOAD} className="btn primary">
            Download Zokie
          </Ext>
          <a href="#demo" className="btn">
            See it work
          </a>
        </div>
        <p className="fine">macOS · about 14 MB · free · bring your Claude Code or Codex</p>
      </section>

      <section className="quotes" aria-label="What people say">
        <ul>
          {TESTIMONIALS.map((t) => (
            <li key={t.quote}>
              <blockquote>“{t.quote}”</blockquote>
              <cite>
                <b>{t.who}</b>, {t.role}
              </cite>
            </li>
          ))}
        </ul>
      </section>

      <section id="demo" aria-labelledby="demo-h">
        <h2 id="demo-h">The Agent Board</h2>
        <p className="sub">This is the home screen. Click a task to watch its run: Dev builds, Test proves it, the diff fills in.</p>
        <BoardDemo />
      </section>

      <section id="features" aria-labelledby="features-h">
        <h2 id="features-h">Everything in the box</h2>
        <ul className="features">
          {FEATURES.map((f) => (
            <li key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
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
