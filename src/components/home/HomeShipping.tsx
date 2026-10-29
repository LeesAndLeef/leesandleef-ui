import { COLORS } from '../../styles/colors'
import { SHIPPING } from './constants'
import styles from './HomeShipping.module.css'

export function HomeShipping() {
  return (
    <section id="visit" className="section" style={{ background: COLORS.bone }}>
      <div className={`container stack ${styles.ship}`}>
        <span className="mono label-wine">§ 06 — From cellar to door</span>
        <ol className={`cells ${styles.shipSteps}`}>
          {SHIPPING.map(([title, text], i) => (
            <li key={title}>
              <span className="disp accent">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
