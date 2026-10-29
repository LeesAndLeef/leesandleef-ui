import type { ReactNode } from 'react'
import type { WineLayout } from '../../types'
import styles from './WineGrid.module.css'

export function WineGrid({
  layout = 'grid',
  className,
  children,
}: {
  layout?: WineLayout
  className?: string
  children: ReactNode
}) {
  return <div className={`${className ?? ''} ${styles.root} ${layout === 'list' ? styles.list : ''}`}>{children}</div>
}
