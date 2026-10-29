import { ClubCompareCell } from './ClubCompareCell'
import { COMPARE_ROWS } from './constants'
import styles from './ClubCompare.module.css'

export function ClubCompare() {
  return (
    <section className="section">
      <div className="container section-pad stack" style={{ gap: 32 }}>
        <span className="mono label-wine">04 — Compare</span>
        <div className="table-wrap">
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th className="mono mono-sm">Feature</th>
                <th className="mono mono-sm">Explorer</th>
                <th className={`mono mono-sm ${styles.isFeatured}`}>Cellar</th>
                <th className="mono mono-sm">Collector</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(([f, a, b, c]) => (
                <tr key={f}>
                  <th scope="row">{f}</th>
                  <td>
                    <ClubCompareCell v={a} />
                  </td>
                  <td className={styles.isFeatured}>
                    <ClubCompareCell v={b} />
                  </td>
                  <td>
                    <ClubCompareCell v={c} />
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
