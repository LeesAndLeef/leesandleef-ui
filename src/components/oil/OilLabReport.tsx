import { Link } from 'react-router-dom'
import { oilLabResults } from '../../lib/oil'
import { JOURNALS_ROUTE } from '../../routes'
import type { Oil } from '../../types'
import { OIL_ARTICLE_SLUG } from './constants'
import styles from './OilLabReport.module.css'

export function OilLabReport({ oil }: { oil: Pick<Oil, 'acid' | 'poly' | 'detail'> }) {
  return (
    <div className={styles.root}>
      <div className="table-wrap">
        <table className={styles.table}>
          <caption className="sr-only">Lab results for lot {oil.detail.lot}</caption>
          <thead>
            <tr>
              <th scope="col" className="mono mono-sm">
                Measure
              </th>
              <th scope="col" className="mono mono-sm">
                This lot
              </th>
              <th scope="col" className="mono mono-sm">
                Reference
              </th>
            </tr>
          </thead>
          <tbody>
            {oilLabResults(oil).map((r) => (
              <tr key={r.measure}>
                <th scope="row">{r.measure}</th>
                <td className="num">{r.value}</td>
                <td>{r.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="stack" style={{ gap: 16 }}>
        <p className={styles.note}>
          Every lot is tested by an independent lab before we buy it. Low acidity shows healthy fruit pressed fast; high
          polyphenols show freshness and give the bitterness and pepper.
        </p>
        <Link to={`${JOURNALS_ROUTE}/${OIL_ARTICLE_SLUG}`} className={styles.link}>
          How to read these numbers →
        </Link>
      </div>
    </div>
  )
}
