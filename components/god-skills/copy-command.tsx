"use client"

import { useRef, useState } from "react"
import { IconCheck, IconCopy } from "./skills"

/**
 * The install command with a copy button.
 * @param command - The shell line to show and copy
 * Handles: clipboard API missing or blocked (falls back to selecting the text)
 */
export default function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      const range = document.createRange()
      if (codeRef.current) {
        range.selectNodeContents(codeRef.current)
        window.getSelection()?.removeAllRanges()
        window.getSelection()?.addRange(range)
      }
    }
  }

  return (
    <div className="cmd">
      <code ref={codeRef}>{command}</code>
      <button type="button" onClick={copy} aria-label={copied ? "Copied" : "Copy command"} title="Copy">
        {copied ? <IconCheck width={16} height={16} /> : <IconCopy width={16} height={16} />}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  )
}
