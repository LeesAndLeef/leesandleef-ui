import { Link } from 'react-router-dom'
import { articles } from '../../lib/articles'
import { JOURNALS_ROUTE } from '../../routes'
import type { ArticleSlug } from '../../types'
import styles from './ArticleMoreNotes.module.css'

export function ArticleMoreNotes({ currentSlug }: { currentSlug: ArticleSlug }) {
  const more = articles.filter((x) => x.slug !== currentSlug)

  return (
    <section className="section">
      <div className={`container ${styles.block} stack`} style={{ gap: 28 }}>
        <h2 className={`disp ${styles.h2}`}>More field notes</h2>
        <div className={styles.more}>
          {more.map((m) => (
            <Link key={m.slug} to={`${JOURNALS_ROUTE}/${m.slug}`} className={`lnk ${styles.moreCard}`}>
              <span className={styles.moreImg}>
                <img src={m.img} alt="" />
              </span>
              <span className={styles.moreBody}>
                <span className="mono label-muted" style={{ display: 'flex', gap: 14 }}>
                  <span>{m.tag}</span>
                  <span>{m.read}</span>
                </span>
                <span className={styles.moreTitle}>{m.title}</span>
                <span className={styles.moreLede}>{m.lede}</span>
                <span className={`label-wine ${styles.moreCta}`}>Read →</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
