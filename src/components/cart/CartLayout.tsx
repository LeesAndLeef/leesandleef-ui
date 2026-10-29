import type { CartLayoutProps } from './types'
import styles from './CartLayout.module.css'

export function CartLayout({ main, summary, variant = 'cart' }: CartLayoutProps) {
  return (
    <section className={`section ${styles.bodyWrap}`}>
      <div className={styles.body}>
        <div className={`${styles.main} ${variant === 'checkout' ? styles.checkoutMain : ''}`}>{main}</div>
        <aside aria-label="Order summary" className={styles.summary}>
          {summary}
        </aside>
      </div>
    </section>
  )
}
