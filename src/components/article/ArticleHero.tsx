import { useState } from 'react'
import { HOME_ROUTE } from '../../routes'
import type { Article } from '../../types'
import { Breadcrumb } from '../ui/Breadcrumb'
import styles from './ArticleHero.module.css'

export function ArticleHero({ article: a }: { article: Article }) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="section gridbg">
      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className="stack" style={{ gap: 24 }}>
            <Breadcrumb
              items={[
                { label: 'Home', to: HOME_ROUTE },
                { label: 'Field notes', to: `${HOME_ROUTE}#journal` },
                { label: a.tag },
              ]}
            />
            <div className={`mono ${styles.tags}`}>
              <span className={styles.tagMain}>{a.tag}</span>
              <span>{a.read}</span>
              <span>Field note Nº {a.no}</span>
            </div>
            <h1 className={`disp ${styles.title}`}>{a.title}</h1>
            <p className={styles.dek}>{a.dek}</p>
          </div>
          <div className={styles.byline}>
            <div className={styles.author}>
              <img src={a.authorImg} alt={`Illustrated portrait of ${a.author}`} />
              <span className="stack" style={{ gap: 2 }}>
                <span style={{ fontWeight: 600 }}>{a.author}</span>
                <span className={styles.date}>Field notes · {a.date}</span>
              </span>
            </div>
            <div className={`btn-row ${styles.actions}`} style={{ gap: 8 }}>
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
              <span className={`mono mono-sm label-muted ${styles.status}`} role="status">
                {copied ? 'Link copied' : saved ? 'Saved' : ''}
              </span>
            </div>
          </div>
        </div>
        <figure className={`${a.pattern} ${styles.heroFig}`}>
          <img src={a.img} alt={a.alt} />
          <figcaption className="glass mono">{a.caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}
