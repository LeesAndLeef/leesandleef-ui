import { OIL_TASTING_STEPS } from './constants'
import styles from './OilTastingSteps.module.css'

export function OilTastingSteps() {
  return (
    <div className="stack" style={{ gap: 16 }}>
      <h3 className="mono label-muted">How to taste it</h3>
      <ol className={styles.list}>
        {OIL_TASTING_STEPS.map((step, i) => (
          <li key={step}>
            <span className={`mono label-wine ${styles.number}`}>{String(i + 1).padStart(2, '0')}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
