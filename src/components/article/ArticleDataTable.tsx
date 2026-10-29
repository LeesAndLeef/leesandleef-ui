import type { ReactNode } from 'react'
import styles from './ArticleDataTable.module.css'

export function ArticleDataTable({ head, rows, caption }: { head: string[]; rows: string[][]; caption: ReactNode }) {
  return (
    <figure className={styles.root}>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h} className="mono">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mono">{caption}</figcaption>
    </figure>
  )
}
