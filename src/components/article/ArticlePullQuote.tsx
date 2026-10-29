import type { ReactNode } from 'react'
import styles from './ArticlePullQuote.module.css'

export function ArticlePullQuote({ children, by }: { children: ReactNode; by: string }) {
  return (
    <figure className={`hatch-w ${styles.root}`}>
      <div className={`block ${styles.b}`} aria-hidden="true" />
      <blockquote className="disp">{children}</blockquote>
      <figcaption className="mono">{by}</figcaption>
    </figure>
  )
}
