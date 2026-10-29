import type { ReactNode } from 'react'
import styles from './PageLayout.module.css'

export function PageLayout({
  header,
  children,
  footer,
}: {
  header: ReactNode
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className={styles.root}>
      {header}
      <main className={styles.main}>{children}</main>
      {footer}
    </div>
  )
}
