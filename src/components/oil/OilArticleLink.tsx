import { Link } from 'react-router-dom'
import { useArticle } from '../../hooks/article/useArticle'
import { JOURNALS_ROUTE } from '../../routes'
import { OIL_ARTICLE_SLUG } from './constants'
import styles from './OilArticleLink.module.css'

export function OilArticleLink() {
  const article = useArticle(OIL_ARTICLE_SLUG)

  if (!article) return null

  return (
    <Link to={`${JOURNALS_ROUTE}/${article.slug}`} className={`lnk ${styles.article}`}>
      <span className={styles.articleImg}>
        <img src={article.img} alt="" />
      </span>
      <span className={styles.articleBody}>
        <span className="mono label-muted" style={{ display: 'flex', gap: 16 }}>
          <span>Field notes · {article.tag}</span>
          <span>{article.read}</span>
        </span>
        <span className={styles.articleTitle}>{article.title}</span>
        <span className={styles.articleLede}>{article.lede}</span>
        <span className="label-wine" style={{ fontWeight: 600, fontSize: 14 }}>
          Read the story →
        </span>
      </span>
    </Link>
  )
}
