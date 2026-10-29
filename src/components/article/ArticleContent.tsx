import type { Article } from '../../types'
import { ARTICLE_BODIES } from './constants'
import styles from './ArticleContent.module.css'

export function ArticleContent({ article }: { article: Pick<Article, 'slug' | 'toc' | 'short'> }) {
  const Body = ARTICLE_BODIES[article.slug]

  return (
    <section className="section">
      <div className={styles.body}>
        <aside className={styles.aside} aria-label="In this story">
          <div className="stack" style={{ gap: 14 }}>
            <span className="mono label-wine">In this story</span>
            <nav className={styles.toc}>
              {article.toc.map((t, i) => (
                <a key={t.id} href={`#${t.id}`}>
                  <span className="mono label-wine">{String(i + 1).padStart(2, '0')}</span>
                  <span>{t.title}</span>
                </a>
              ))}
            </nav>
          </div>
          <div className={styles.short}>
            <span className="mono label-muted">Short version</span>
            <ul>
              {article.short.map((s) => (
                <li key={s}>
                  <span className="label-wine" aria-hidden="true">
                    ■
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <article className={styles.prose}>
          <div>
            <Body />
          </div>
        </article>
      </div>
    </section>
  )
}
