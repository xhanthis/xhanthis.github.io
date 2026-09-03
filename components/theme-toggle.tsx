"use client"

export default function ThemeToggle() {
  const onClick = () => {
    const root = document.documentElement
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
    root.dataset.theme = isDark ? "light" : "dark"
  }

  return (
    <button type="button" className="tt" aria-label="Toggle theme" title="theme" onClick={onClick}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M8 1.5v13A6.5 6.5 0 0 0 8 1.5z" fill="currentColor" stroke="none" />
      </svg>
    </button>
  )
}
