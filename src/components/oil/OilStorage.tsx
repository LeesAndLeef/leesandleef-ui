import { COLORS } from '../../styles/colors'
import { STORAGE } from './constants'
import styles from './OilStorage.module.css'

export function OilStorage() {
  return (
    <section className="section" style={{ background: COLORS.bone }}>
      <div className="container stack" style={{ gap: 24, paddingTop: 72, paddingBottom: 72 }}>
        <span className="mono label-wine">§ 05 — Keep it green</span>
        <div className={styles.storage}>
          {STORAGE.map(([title, text]) => (
            <div key={title}>
              <span className="disp label-wine" style={{ fontSize: 28 }}>
                {title}
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
