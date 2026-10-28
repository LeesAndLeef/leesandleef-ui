import { type ComponentType, type FormEvent, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../cart/context'
import { Bottle, OilTin } from '../components/Bottle'
import { MiniFooter } from '../components/Footer'
import { Breadcrumb } from '../components/ui'
import { type ArticleSlug, type Article as ArticleT, articles, getArticle } from '../data/journal'
import { euro, getProduct, productPath } from '../data/products'
import { OliveOilBody, SkinContactBody, TerroirBody } from './ArticleBodies'
import NotFound from './NotFound'
import './Article.css'

const bodies: Record<ArticleSlug, ComponentType> = {
  terroir: TerroirBody,
  'skin-contact': SkinContactBody,
  'olive-oil': OliveOilBody,
}

export default function Article() {
  const { slug } = useParams()
  const article = getArticle(slug)
  if (!article) return <NotFound />
  return <ArticleView key={article.slug} article={article} />
}

function useReadProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  return progress
}

function ArticleView({ article: a }: { article: ArticleT }) {
  const Body = bodies[a.slug]
  const progress = useReadProgress()
  const { add } = useCart()
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const more = articles.filter((x) => x.slug !== a.slug)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  function subscribe(e: FormEvent) {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <>
      <div className="read-bar" aria-hidden="true">
        <div style={{ width: `${progress * 100}%` }} />
      </div>

      <section className="section gridbg">
        <div className="art-hero">
          <div className="art-hero-copy">
            <div className="stack" style={{ gap: 24 }}>
              <Breadcrumb
                items={[{ label: 'Home', to: '/' }, { label: 'Field notes', to: '/#journal' }, { label: a.tag }]}
              />
              <div className="mono art-tags">
                <span className="art-tag-main">{a.tag}</span>
                <span>{a.read}</span>
                <span>Field note Nº {a.no}</span>
              </div>
              <h1 className="disp art-title">{a.title}</h1>
              <p className="art-dek">{a.dek}</p>
            </div>
            <div className="art-byline">
              <div className="art-author">
                <img src={a.authorImg} alt={`Illustrated portrait of ${a.author}`} />
                <span className="stack" style={{ gap: 2 }}>
                  <span style={{ fontWeight: 600 }}>{a.author}</span>
                  <span className="art-date">Field notes · {a.date}</span>
                </span>
              </div>
              <div className="btn-row" style={{ gap: 8 }}>
                <button className="icon-btn" aria-label={copied ? 'Link copied' : 'Copy link'} onClick={copyLink}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <rect x="3" y="9" width="10" height="10" />
                    <rect x="11" y="5" width="10" height="10" />
                  </svg>
                </button>
                <button
                  className="icon-btn"
                  aria-label="Save for later"
                  aria-pressed={saved}
                  onClick={() => setSaved(!saved)}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={saved ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <path d="M6 3h12v18l-6-5-6 5z" />
                  </svg>
                </button>
                <span className="mono mono-sm label-muted" role="status">
                  {copied ? 'Link copied' : saved ? 'Saved' : ''}
                </span>
              </div>
            </div>
          </div>
          <figure className={a.pattern + ' art-hero-fig'}>
            <img src={a.img} alt={a.alt} />
            <figcaption className="glass mono">{a.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="art-body">
          <aside className="art-aside" aria-label="In this story">
            <div className="stack" style={{ gap: 14 }}>
              <span className="mono label-wine">In this story</span>
              <nav className="art-toc">
                {a.toc.map((t, i) => (
                  <a key={t.id} href={`#${t.id}`}>
                    <span className="mono label-wine">{String(i + 1).padStart(2, '0')}</span>
                    <span>{t.title}</span>
                  </a>
                ))}
              </nav>
            </div>
            <div className="art-short">
              <span className="mono label-muted">Short version</span>
              <ul>
                {a.short.map((s) => (
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
          <article className="art-prose">
            <div>
              <Body />
            </div>
          </article>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bone)' }}>
        <div className="container art-block stack" style={{ gap: 28 }}>
          <div className="section-head">
            <div style={{ gap: 12 }}>
              <span className="mono label-wine">Taste the story</span>
              <h2 className="disp art-h2">{a.productsTitle}</h2>
            </div>
            <Link to={a.slug === 'olive-oil' ? '/olive-oil' : '/shop'} style={{ fontWeight: 600 }}>
              {a.slug === 'olive-oil' ? 'See all oils →' : 'See the whole cellar →'}
            </Link>
          </div>
          <div className="art-products">
            {a.products.map(({ id, note }) => {
              const p = getProduct(id)
              if (!p) return null
              return (
                <div key={id} className="art-product">
                  <Link to={productPath(p)} className="hatch art-product-img" aria-label={p.name}>
                    {p.kind === 'oil' ? (
                      <OilTin body={p.glass} cap={p.cap} width={56} height={100} />
                    ) : (
                      <Bottle glass={p.glass} width={30} height={100} detail="label" />
                    )}
                  </Link>
                  <span className="stack" style={{ gap: 6, flexGrow: 1, minWidth: 0 }}>
                    <span className="mono mono-sm label-muted">{note}</span>
                    <Link to={productPath(p)} className="lnk art-product-name">
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

      <section className="section">
        <div className="container art-block stack" style={{ gap: 28 }}>
          <h2 className="disp art-h2">More field notes</h2>
          <div className="art-more">
            {more.map((m) => (
              <Link key={m.slug} to={`/journal/${m.slug}`} className="lnk art-more-card">
                <span className="art-more-img">
                  <img src={m.img} alt="" />
                </span>
                <span className="art-more-body">
                  <span className="mono label-muted" style={{ display: 'flex', gap: 14 }}>
                    <span>{m.tag}</span>
                    <span>{m.read}</span>
                  </span>
                  <span className="art-more-title">{m.title}</span>
                  <span className="art-more-lede">{m.lede}</span>
                  <span className="label-wine art-more-cta">Read →</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hatch-w on-dark art-news">
        <div className="block art-news-b" aria-hidden="true" />
        <div className="container art-news-inner">
          <div className="stack" style={{ gap: 14 }}>
            <h2 className="disp art-h2">New field notes, once a release.</h2>
            <p style={{ color: 'var(--wine-100)', lineHeight: 1.6 }}>
              Harvest reports, grower interviews and the odd recipe. Unsubscribe in one click.
            </p>
          </div>
          {subscribed ? (
            <p className="glass art-news-form" role="status">
              Thanks — the next field note lands with the winter release.
            </p>
          ) : (
            <form className="glass art-news-form" onSubmit={subscribe}>
              <label htmlFor={`nl-${a.slug}`} className="mono" style={{ color: 'var(--wine-200)' }}>
                Email address
              </label>
              <div className="art-news-row">
                <input id={`nl-${a.slug}`} type="email" required placeholder="you@domain.com" />
                <button type="submit">Subscribe</button>
              </div>
            </form>
          )}
        </div>
      </section>

      <MiniFooter />
    </>
  )
}
