import type { ReactNode } from 'react'
import styles from './HeaderBar.module.css'

export function HeaderBar({ children, below }: { children: ReactNode; below?: ReactNode }) {
  return (
    <header className={styles.root}>
      <div className={`container ${styles.row}`}>{children}</div>
      {below}
    </header>
  )
}
