import { Link } from 'react-router-dom'
import { euro } from '../../lib/euro'
import { getProductById } from '../../lib/products'
import { OLIVE_OILS_ROUTE, WINES_ROUTE } from '../../routes'
import { useCart } from '../../state/cart/useCart'
import { COLORS } from '../../styles/colors'
import type { Article } from '../../types'
import { Bottle } from '../illustrations/Bottle'
import { OilTin } from '../illustrations/OilTin'
import styles from './ArticleProducts.module.css'

export function ArticleProducts({ article: a }: { article: Pick<Article, 'slug' | 'productsTitle' | 'products'> }) {
  const { add } = useCart()

  return (
    <section className="section" style={{ background: COLORS.bone }}>
      <div className={`container ${styles.block} stack`} style={{ gap: 28 }}>
        <div className="section-head">
          <div style={{ gap: 12 }}>
            <span className="mono label-wine">Taste the story</span>
            <h2 className={`disp ${styles.h2}`}>{a.productsTitle}</h2>
          </div>
          <Link to={a.slug === 'olive-oil' ? OLIVE_OILS_ROUTE : WINES_ROUTE} style={{ fontWeight: 600 }}>
            {a.slug === 'olive-oil' ? 'See all oils →' : 'See the whole cellar →'}
          </Link>
        </div>
        <div className={styles.products}>
          {a.products.map(({ id, note }) => {
            const p = getProductById(id)
            if (!p) return null
            return (
              <div key={id} className={styles.product}>
                <Link to={p.path} className={`hatch ${styles.productImg}`} aria-label={p.name}>
                  {p.kind === 'oil' ? (
                    <OilTin body={p.glass} cap={p.cap} width={56} height={100} />
                  ) : (
                    <Bottle glass={p.glass} width={30} height={100} detail="label" />
                  )}
                </Link>
                <span className="stack" style={{ gap: 6, flexGrow: 1, minWidth: 0 }}>
                  <span className="mono mono-sm label-muted">{note}</span>
                  <Link to={p.path} className={`lnk ${styles.productName}`}>
                    {p.name}
                  </Link>
                  <span className="disp" style={{ fontSize: 22 }}>
                    {euro(p.price)}
                  </span>
                </span>
                <button className="icon-btn" aria-label={`Add ${p.name} to cart`} onClick={() => add(p.id)}>
                  +
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
