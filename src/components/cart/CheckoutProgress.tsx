import styles from './CheckoutProgress.module.css'

export function CheckoutProgress({
  current,
  labels = ['Cart', 'Details', 'Delivery', 'Payment'],
}: {
  current: number
  labels?: string[]
}) {
  return (
    <ol aria-label="Checkout steps" className={`mono ${styles.root}`}>
      {labels.map((s, i) => (
        <li key={s} aria-current={i === current ? 'step' : undefined}>
          0{i + 1} {s}
        </li>
      ))}
    </ol>
  )
}
