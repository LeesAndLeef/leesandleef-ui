import { STEP_LABELS } from './constants'
import styles from './CheckoutHeading.module.css'

export function CheckoutHeading({ step, placed }: { step: number; placed: boolean }) {
  return (
    <div className="section gridbg">
      <div className={`container ${styles.head}`}>
        <h1 className="disp" style={{ fontSize: 'clamp(40px, 5.4vw, 80px)' }}>
          {placed ? 'Order placed' : 'Checkout'}
        </h1>
        <ol aria-label="Checkout progress" className={styles.progress}>
          {STEP_LABELS.map((label, i) => {
            const n = i + 1
            const cur = !placed && step === n
            const past = placed || step > n
            return (
              <li
                key={label}
                aria-current={cur ? 'step' : undefined}
                className={cur ? styles.isCurrent : past ? styles.isPast : undefined}
              >
                <span className="mono mono-sm">0{n}</span>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{label}</span>
                <span className={styles.progressBar} aria-hidden="true" />
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
