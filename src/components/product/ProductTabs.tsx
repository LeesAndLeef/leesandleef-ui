import type { KeyboardEvent } from 'react'
import { tabIndexAfterKey } from '../../lib/tabs'
import styles from './ProductTabs.module.css'

export function ProductTabs<T extends string>({
  label,
  tabs,
  value,
  onChange,
}: {
  label: string
  tabs: { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
}) {
  const moveFocus = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = tabIndexAfterKey(e.key, index, tabs.length)
    if (next === undefined) return
    e.preventDefault()
    onChange(tabs[next].id)
    const buttons = e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    buttons?.[next]?.focus()
  }

  return (
    <div role="tablist" aria-label={label} className={styles.root}>
      {tabs.map((t, i) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          id={`tab-${t.id}`}
          aria-selected={value === t.id}
          aria-controls={`panel-${t.id}`}
          tabIndex={value === t.id ? 0 : -1}
          onClick={() => onChange(t.id)}
          onKeyDown={(e) => moveFocus(e, i)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
