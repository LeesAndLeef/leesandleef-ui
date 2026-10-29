import { Link } from 'react-router-dom'
import { articles } from '../../lib/articles'
import { JOURNALS_ROUTE } from '../../routes'
import styles from './HomeJournal.module.css'

export function HomeJournal() {
  return (
    <section id="journal" className="section">
      <div className="container section-pad stack" style={{ gap: 40 }}>
        <div className="section-head">
          <div>
            <span className="mono label-wine">§ 05 — Journal</span>
            <h2 className="disp h-l">Field notes</h2>
          </div>
        </div>
        <div className={styles.journalGrid}>
          {articles.map((article) => (
            <article key={article.slug} className={styles.articleItem}>
              <Link
                to={`${JOURNALS_ROUTE}/${article.slug}`}
                className={`${article.pattern} ${styles.articleImg}`}
                tabIndex={-1}
              >
                <img src={article.img} alt={article.alt} className={styles.articlePic} />
              </Link>
              <div className="mono label-muted" style={{ display: 'flex', gap: 16 }}>
                <span>{article.tag}</span>
                <span>{article.read}</span>
              </div>
              <h3>
                <Link to={`${JOURNALS_ROUTE}/${article.slug}`} className="lnk">
                  {article.title}
                </Link>
              </h3>
              <p>{article.lede}</p>
              <Link to={`${JOURNALS_ROUTE}/${article.slug}`} className={styles.articleMore}>
                Read the story →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
