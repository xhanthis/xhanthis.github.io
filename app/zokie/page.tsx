import type { Metadata, Viewport } from "next"
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"
import BoardDemo from "@/components/zokie/board-demo"
import Logo from "@/components/zokie/logo"
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
  icons: { icon: [{ url: "/zokie/icon.png", type: "image/png" }], apple: [{ url: "/zokie/icon.png" }] },
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

const MORE = [
  {
    id: "data",
    title: "Data mode",
    text: "Swap the diff for a notebook. Ask for a chart or a table and the agent fills the cells in; Python, pandas and matplotlib are ready in a uv env, and the file is a plain .ipynb you can open anywhere.",
  },
  {
    id: "day",
    title: "Your Day",
    text: "One pill at the top right: spend today against a daily cap, each CLI's plan limits and when they reset, and a 30-day timeline of what shipped, with your hours and Zen score beside it.",
  },
  {
    id: "merge",
    title: "PR status and Merge",
    text: "When a task opens a pull request, its checks show on the board. Green means one click to merge, through gh, without leaving the chat.",
  },
  {
    id: "shell",
    title: "Terminal and language servers",
    text: "Every task has its own login shell in its own worktree. Hover and go-to-definition come from gopls, pyright and tsserver, so reviewing a diff feels like reading in an editor.",
  },
  {
    id: "attach",
    title: "Attachments",
    text: "Drop screenshots, PDFs or CSVs into the chat, several at a time. They show as thumbnails and cards; the agent gets the paths and reads them itself.",
  },
  {
    id: "local",
    title: "Local by default",
    text: "Settings in a JSON file you can edit by hand, tasks and chat in SQLite, worktrees on disk, a log with no message text. Agents talk to their providers with your own keys. Nothing else leaves the machine.",
  },
]

const FAQ = [
  {
    q: "What is Zokie?",
    a: "Zokie is a small native macOS app for working with coding agents. Agents such as Claude Code and Codex write the code inside git worktrees, and you review the diff against main on an Agent Board. It is built in Go with Wails and a React frontend, uses the system webview, and weighs about 14 MB.",
  },
  {
    q: "How is Zokie different from Conductor or Cursor?",
    a: "Zokie is a review surface, not an editor. It runs the first-party Claude Code and Codex CLIs locally on your own subscriptions, keeps each task in its own worktree on its own branch, and stays light enough that ten agents run side by side on a laptop. God Skills come built in, so every run ends in a tested pull request rather than a wall of edits.",
  },
  {
    q: "What do I need to run it?",
    a: "macOS and Claude Code (npm install -g @anthropic-ai/claude-code). Codex adds the GPT models, gh adds PR status and Merge, uv adds Data mode, and gopls, pyright or typescript-language-server add hover and go-to-definition. All four are optional.",
  },
  {
    q: "Can I still use my editor?",
    a: "Yes. Every task lives in a normal git worktree under ~/.zokie/tasks, so you can open it in VS Code, Cursor or vim at any time. Zokie is where the agents work and where you review; nothing stops you from editing by hand.",
  },
  {
    q: "Where does my data go?",
    a: "Nowhere. Settings live in ~/.zokie/config.json, tasks and chat in ~/.zokie/zokie.db, worktrees under ~/.zokie/tasks. The log holds no message text. The only network calls are the ones Claude Code and Codex make to their own providers with your keys.",
  },
  {
    q: "What does a task cost?",
    a: "Whatever the agent's provider charges; Zokie adds nothing. It records Claude Code's cost per turn, shows it on the task, and stops to ask before a turn when today's spend reaches your daily cap. Codex reports tokens, so its plan limits show under Your Day instead.",
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
      featureList: [...FEATURES.map((f) => f.title), ...MORE.map((m) => m.title)],
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
  if (kind === "data")
    return (
      <div className="ill ill-data" aria-hidden="true">
        <div className="cell">
          <span className="n">[3]</span>
          <code>df.groupby(&quot;city&quot;).revenue.sum().plot.bar()</code>
        </div>
        <div className="bars">
          <i style={{ height: "42%" }} />
          <i style={{ height: "78%" }} />
          <i style={{ height: "56%" }} />
          <i style={{ height: "100%" }} />
          <i style={{ height: "64%" }} />
        </div>
      </div>
    )
  if (kind === "day")
    return (
      <div className="ill ill-day" aria-hidden="true">
        <div className="row">
          <span>Today</span>
          <b>$3.40 of $8</b>
        </div>
        <div className="meter">
          <i style={{ width: "42%" }} />
        </div>
        <div className="row">
          <span>Zen 82 · 6h 10m</span>
          <span className="ok">Claude 61% · Codex 18%</span>
        </div>
        <div className="days">
          {[3, 5, 2, 6, 4, 7, 3, 5, 6, 2, 4, 5, 7, 3].map((h, i) => (
            <i key={i} style={{ height: `${h * 12}%` }} />
          ))}
        </div>
      </div>
    )
  if (kind === "merge")
    return (
      <div className="ill ill-merge" aria-hidden="true">
        <div className="row">
          <b>PR #612</b>
          <span className="ok">3 checks</span>
        </div>
        <ul>
          <li>
            <i /> build
          </li>
          <li>
            <i /> tests · 212
          </li>
          <li>
            <i /> review
          </li>
        </ul>
        <div className="vis-merge">Merge</div>
      </div>
    )
  if (kind === "shell")
    return (
      <div className="ill ill-shell" aria-hidden="true">
        <pre>
          {"$ make test\n"}
          <span className="ok">{"ok  212 passed  1.8s\n"}</span>
          {"$ "}
          <span className="cursor" />
        </pre>
        <div className="tip">
          <code>func refund(amount, share float64) float64</code>
          <small>payments/refund.go:41</small>
        </div>
      </div>
    )
  if (kind === "attach")
    return (
      <div className="ill ill-attach" aria-hidden="true">
        <div className="thumb a" />
        <div className="thumb b" />
        <div className="file">
          <b>spec.pdf</b>
          <small>412 KB</small>
        </div>
        <div className="file">
          <b>bookings.csv</b>
          <small>10,000 rows</small>
        </div>
      </div>
    )
  if (kind === "local")
    return (
      <div className="ill ill-local" aria-hidden="true">
        <pre>
          {"~/.zokie/\n"}
          {"├─ config.json\n"}
          {"├─ zokie.db\n"}
          {"├─ tasks/\n"}
          {"│  └─ csv-export/ssalliance/\n"}
          {"├─ notebooks/\n"}
          {"└─ logs/zokie.log"}
        </pre>
        <span className="badge">no message text · nothing sent</span>
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
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&text=zokie.&display=swap"
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
        <Logo size={46} className="hero-logo" />
        <h1 id="hero-h">Build Great Things</h1>
        <p className="lede">
          <span className="lede-main">A lightweight agent IDE for remarkable people.</span>
          <span className="lede-tail">Ten agents write the code. You decide what ships.</span>
        </p>
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
        <div className="sec-h">
          <h2 id="features-h">What makes it different</h2>
          <p>Five things Zokie does that an editor with a chat panel does not.</p>
        </div>
        {FEATURES.map((f, i) => (
          <article key={f.id} id={f.id} className={`feat ${i % 2 ? "flip" : ""}`}>
            <div className="feat-text">
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
            <Visual kind={f.visual} />
          </article>
        ))}
      </section>

      <section id="more" aria-labelledby="more-h">
        <div className="sec-h">
          <h2 id="more-h">And the rest of the box</h2>
          <p>Smaller things you will use every day.</p>
        </div>
        <ul className="more">
          {MORE.map((m) => (
            <li key={m.id} id={m.id}>
              <Visual kind={m.id} />
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="why" aria-labelledby="why-h" className="prose">
        <h2 id="why-h">Why another IDE</h2>
        <p>
          I am a product manager who ships code on the side, and for years I did it in VS Code. It was fine. Then agents
          arrived, and the editor became the bottleneck. With three or four of them running at once, VS Code and everything
          around it would bring my MacBook to a halt, fans first, then the cursor.
        </p>
        <p>
          That limit no longer makes sense. Today you can have ten agents working for you in parallel, each on its own
          branch, each waiting for nothing but your review. The work was never the problem. The tools were too heavy to hold
          it.
        </p>
        <p>
          So I fixed it in two steps. <Ext href={GOD}>God Skills</Ext> came first: every job goes to a specialist agent with
          its own rules, its own checks and a memory of what went wrong last time. That alone made me about ten times faster.
        </p>
        <p>
          Zokie is the second step. It is a small native app built around those agents, where they write the code and I read
          the diff. It stays light enough to keep ten of them running side by side, and that is how I get from 10x to 100x.
        </p>
        <p className="sig">
          <Ext href={HOME}>— Rahul</Ext> <span>(Founder)</span>
        </p>
      </section>

      <section id="faq" aria-labelledby="faq-h" className="prose">
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
