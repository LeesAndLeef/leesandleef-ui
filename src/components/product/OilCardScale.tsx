import styles from './OilCardScale.module.css'

export function OilCardScale({ label, value, tone }: { label: string; value: number; tone: 'wine' | 'olive' }) {
  return (
    <div className={styles.root}>
      <span className="mono">{label}</span>
      <span className={styles.dots} role="img" aria-label={`${label} ${value} of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < value ? styles[tone] : undefined} />
        ))}
      </span>
    </div>
  )
}
