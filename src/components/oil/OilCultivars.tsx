import { CULTIVARS } from './constants'
import styles from './OilCultivars.module.css'

export function OilCultivars() {
  return (
    <section className="section">
      <div className={`container ${styles.block} stack`} style={{ gap: 28 }}>
        <div className="stack" style={{ gap: 16 }}>
          <span className="mono label-wine">§ 04 — Know your cultivars</span>
          <h2 className={`disp ${styles.h2}`}>Six olives worth knowing.</h2>
        </div>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                {['Cultivar', 'Where', 'Tastes like', 'Style'].map((h) => (
                  <th key={h} className="mono">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CULTIVARS.map(([name, where, taste, style]) => (
                <tr key={name}>
                  <td style={{ fontWeight: 600 }}>{name}</td>
                  <td>{where}</td>
                  <td>{taste}</td>
                  <td>
                    <span className={`mono ${styles.style} ${styles[style.toLowerCase()]}`}>{style}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
