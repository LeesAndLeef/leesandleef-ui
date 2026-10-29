import type { ComponentProps } from 'react'
import styles from './CheckoutForm.module.css'

export function CheckoutForm({ className, ...props }: ComponentProps<'form'>) {
  return <form className={className ? `${styles.stepForm} ${className}` : styles.stepForm} {...props} />
}
