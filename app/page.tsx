import Link from "next/link"
import Image from "next/image"
import MediumArticles from "@/components/medium-articles"
import ScrubNumber from "@/components/scrub-number"
import DrawPad from "@/components/draw-pad"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  return (
    <main>
      <div className="top">
        <Image src="/avatar.jpeg" alt="" width={44} height={44} suppressHydrationWarning />
        <div>
          <b>Rahul Kulkarni</b>
          <span>Builder</span>
        </div>
        <ThemeToggle />
      </div>

      <p>I love solving problems and building things.</p>

      <ScrubNumber />

      <p>
        I am <del>happiest</del> <sup className="e">edit</sup>
        <ins>second happiest</ins> when designing and coding. Happiest when spending time with my{" "}
        <del>girlfriend</del> <sup className="e">edit 2</sup>
        <ins>wife</ins>, of course.
      </p>

      <h2>Draw something</h2>
      <DrawPad />

      <h2>Building</h2>
      <ul className="b">
        <li>
          <Link href="https://www.saffronstays.com/app" target="_blank" rel="noopener noreferrer">
            SaffronStays App
          </Link>
          <span className="s">SaffronStays, now mobile — 10× better experiences, everywhere.</span>
        </li>
        <li>
          <Link href="https://host.saffronstays.com/insights-app" target="_blank" rel="noopener noreferrer">
            Insights Studio
          </Link>
          <span className="s">Internal analytics for SaffronStays — 100+ metrics, tracked in realtime.</span>
        </li>
        <li>
          <span className="n">Staff App</span>
          <span className="s">The internal day-to-day app for everyone at SaffronStays.</span>
        </li>
        <li>
          <Link href="https://ownspce.com" target="_blank" rel="noopener noreferrer">
            ownspce.com
          </Link>
          <span className="s">A productivity ecosystem for solos and small teams.</span>
        </li>
        <li>
          <Link href="https://hiredm.com" target="_blank" rel="noopener noreferrer">
            HireDM
          </Link>
          <span className="s">Hiring simplified for founders &amp; startups.</span>
        </li>
      </ul>

      <h2>Writing</h2>
      <MediumArticles showLatest={3} />
      <p style={{ marginTop: "0.7em" }}>
        <Link href="https://medium.com/@xhanthis" target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted)" }}>
          more on Medium
        </Link>
      </p>

      <h2>Elsewhere</h2>
      <div className="row">
        <Link href="https://www.linkedin.com/in/merahulkulkarni" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Link>
        <Link href="https://twitter.com/xhanthis" target="_blank" rel="noopener noreferrer">
          X
        </Link>
        <Link href="https://calendar.app.google/MTFKVZnChMqd8wiv7" target="_blank" rel="noopener noreferrer" className="call">
          Book a call<span className="free">it&rsquo;s free</span>
        </Link>
      </div>

      <footer>
        <span>Rahul Kulkarni · 2026</span>
        <Link href="https://github.com/xhanthis/xhanthis.github.io" target="_blank" rel="noopener noreferrer">
          source
        </Link>
      </footer>
    </main>
  )
}
