import type { ComponentProps } from 'react'
import styles from './ArticleFigure.module.css'

export function ArticleFigure({ className, ...props }: ComponentProps<'figure'>) {
  return <figure {...props} className={`${styles.root} ${className ?? ''}`} />
}
