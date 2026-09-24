"use client"

import { useRef, useState } from "react"
import { SKILLS } from "./skills"

// One tab per skill. Arrow keys move between tabs; the panel shows what the
// selected skill does, when it fires, and what it hands back.
export default function SkillTabs() {
  const [index, setIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const skill = SKILLS[index]
  const Icon = skill.icon

  const select = (i: number) => {
    const next = (i + SKILLS.length) % SKILLS.length
    setIndex(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") select(index + 1)
    else if (e.key === "ArrowLeft") select(index - 1)
    else if (e.key === "Home") select(0)
    else if (e.key === "End") select(SKILLS.length - 1)
    else return
    e.preventDefault()
  }

  return (
    <div className="tabs">
      <div role="tablist" aria-label="The seven skills" className="tablist" onKeyDown={onKeyDown}>
        {SKILLS.map((s, i) => {
          const TabIcon = s.icon
          const selected = i === index
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`tab-${s.id}`}
              aria-selected={selected}
              aria-controls={`panel-${s.id}`}
              tabIndex={selected ? 0 : -1}
              className={selected ? "on" : undefined}
              onClick={() => setIndex(i)}
            >
              <TabIcon width={16} height={16} />
              <span>{s.id}</span>
            </button>
          )
        })}
      </div>
      <div role="tabpanel" id={`panel-${skill.id}`} aria-labelledby={`tab-${skill.id}`} className="panel">
        <div className="panel-head">
          <span className="panel-icon">
            <Icon width={22} height={22} />
          </span>
          <div>
            <h3>{skill.id}</h3>
            <p className="role">{skill.role}</p>
          </div>
        </div>
        <p className="q">{skill.question}</p>
        <ul>
          {skill.does.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <dl>
          <dt>Fires</dt>
          <dd>{skill.fires}</dd>
          <dt>Returns</dt>
          <dd>{skill.returns}</dd>
        </dl>
      </div>
    </div>
  )
}
