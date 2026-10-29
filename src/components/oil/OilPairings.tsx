import { COLORS } from '../../styles/colors'
import { PAIRINGS } from './constants'
import styles from './OilPairings.module.css'

export function OilPairings() {
  return (
    <section className="section" style={{ background: COLORS.bone }}>
      <div className={`container ${styles.block} stack`} style={{ gap: 32 }}>
        <div className="stack" style={{ gap: 16 }}>
          <span className="mono label-wine">§ 02 — What to cook with which</span>
          <h2 className={`disp ${styles.h2}`}>Match the oil to the plate.</h2>
        </div>
        <div className={styles.pairings}>
          {PAIRINGS.map((p) => (
            <div key={p.level} className={p.level === 'Robust' ? styles.isDark : undefined}>
              <div className={styles.pairingHead}>
                <span className="disp" style={{ fontSize: 32 }}>
                  {p.level}
                </span>
                <span className={styles.pairingDots} aria-hidden="true">
                  {[1, 2, 3].map((n) => (
                    <span key={n} className={n <= p.dots ? styles.isOn : undefined} />
                  ))}
                </span>
              </div>
              <p>{p.text}</p>
              <ul>
                {p.dishes.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
