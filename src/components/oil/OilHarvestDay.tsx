import { HARVEST_DAY } from './constants'
import styles from './OilHarvestDay.module.css'

export function OilHarvestDay() {
  return (
    <section className={`section gridbg-d ${styles.day}`}>
      <div className="container stack" style={{ gap: 40, paddingTop: 96, paddingBottom: 96 }}>
        <div className={styles.dayHead}>
          <div className="stack" style={{ gap: 16 }}>
            <span className="mono label-olive">§ 03 — One harvest day</span>
            <h2 className={`disp ${styles.h2}`}>From tree to tin before dinner.</h2>
          </div>
          <p>
            Olives start to oxidise the moment they’re picked. The shorter the gap between tree and press, the greener
            and more peppery the oil — so every step of the day is about speed.
          </p>
        </div>
        <ol className={styles.steps}>
          {HARVEST_DAY.map(([time, title, text]) => (
            <li key={time}>
              <span className={`disp ${styles.stepTime}`}>{time}</span>
              <span style={{ fontWeight: 600 }}>{title}</span>
              <span className={styles.stepText}>{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
