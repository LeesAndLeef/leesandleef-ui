import { useParams } from 'react-router-dom'
import { ArticleContent } from '../../components/article/ArticleContent'
import { ArticleHero } from '../../components/article/ArticleHero'
import { ArticleMoreNotes } from '../../components/article/ArticleMoreNotes'
import { ArticleNewsletter } from '../../components/article/ArticleNewsletter'
import { ArticleProducts } from '../../components/article/ArticleProducts'
import { useReadProgress } from '../../hooks/useReadProgress'
import { getArticle } from '../../lib/articles'
import NotFound from '../NotFound/NotFound'
import styles from './Journal.module.css'

export default function Journal() {
  const { slug } = useParams()
  const progress = useReadProgress()
  const article = getArticle(slug)

  if (!article) return <NotFound />

  return (
    <>
      <div className={styles.readBar} aria-hidden="true">
        <div style={{ width: `${progress * 100}%` }} />
      </div>
      <ArticleHero article={article} />
      <ArticleContent article={article} />
      <ArticleProducts article={article} />
      <ArticleMoreNotes currentSlug={article.slug} />
      <ArticleNewsletter inputId={`nl-${article.slug}`} />
    </>
  )
}
