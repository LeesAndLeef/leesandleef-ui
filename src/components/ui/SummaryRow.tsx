import styles from './SummaryRow.module.css'

export function SummaryRow({ label, value, variant }: { label: string; value: string; variant: 'cart' | 'checkout' }) {
  return (
    <div className={`${styles.root} ${styles[variant]}`}>
      <span>{label}</span>
      <span className="num">{value}</span>
    </div>
  )
}
