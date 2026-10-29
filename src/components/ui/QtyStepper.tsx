import styles from './QtyStepper.module.css'

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 24,
  size = 'md',
  className,
}: {
  value: number
  onChange: (n: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  return (
    <div role="group" aria-label="Quantity" className={`${styles.root} ${styles[size]} ${className ?? ''}`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  )
}
