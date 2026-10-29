import type { ReactNode } from 'react'
import styles from './CheckoutStep.module.css'

export function CheckoutStep({
  n,
  title,
  step,
  summary,
  onEdit,
  last,
  children,
}: {
  n: number
  title: string
  step: number
  summary?: string
  onEdit?: () => void
  last?: boolean
  children: ReactNode
}) {
  const open = step === n
  const done = step > n
  return (
    <div className={`${styles.root} ${last ? styles.isLast : ''}`}>
      <div className={styles.head}>
        <h2>
          <span className={`disp ${styles.badge} ${open ? styles.isOpen : done ? styles.isDone : ''}`}>0{n}</span>
          {title}
        </h2>
        {done && onEdit && (
          <button className="text-btn" onClick={onEdit} aria-label={`Edit ${title.toLowerCase()}`}>
            Edit
          </button>
        )}
      </div>
      {done && summary && <p className={styles.summary}>{summary}</p>}
      {open && children}
    </div>
  )
}
