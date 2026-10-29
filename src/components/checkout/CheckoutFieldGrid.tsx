import type { ComponentProps } from 'react'
import styles from './CheckoutFieldGrid.module.css'

export function CheckoutFieldGrid({ className, ...props }: ComponentProps<'div'>) {
  return <div className={className ? `${styles.fieldGrid} ${className}` : styles.fieldGrid} {...props} />
}
