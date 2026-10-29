import { type FormEvent, useState } from 'react'
import { COLORS } from '../../styles/colors'
import styles from './ArticleNewsletter.module.css'

export function ArticleNewsletter({ inputId }: { inputId: string }) {
  const [subscribed, setSubscribed] = useState(false)

  function subscribe(e: FormEvent) {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <section className={`hatch-w on-dark ${styles.news}`}>
      <div className={`block ${styles.newsB}`} aria-hidden="true" />
      <div className={`container ${styles.newsInner}`}>
        <div className="stack" style={{ gap: 14 }}>
          <h2 className={`disp ${styles.h2}`}>New field notes, once a release.</h2>
          <p style={{ color: COLORS.wine100, lineHeight: 1.6 }}>
            Harvest reports, grower interviews and the odd recipe. Unsubscribe in one click.
          </p>
        </div>
        {subscribed ? (
          <p className={`glass ${styles.newsForm}`} role="status">
            Thanks — the next field note lands with the winter release.
          </p>
        ) : (
          <form className={`glass ${styles.newsForm}`} onSubmit={subscribe}>
            <label htmlFor={inputId} className="mono" style={{ color: COLORS.wine200 }}>
              Email address
            </label>
            <div className={styles.newsRow}>
              <input id={inputId} type="email" required placeholder="you@domain.com" />
              <button type="submit">Subscribe</button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
