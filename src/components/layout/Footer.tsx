import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../../lib/site'
import { CLUB_ROUTE, GROWERS_ROUTE, HOME_ROUTE, OLIVE_OILS_ROUTE, WINES_ROUTE } from '../../routes'
import styles from './Footer.module.css'

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  function subscribe(e: FormEvent) {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className={styles.root}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <form className={`stack ${styles.newsletter}`} onSubmit={subscribe}>
            <h2 className="disp">Letters from the cellar</h2>
            <p>One email per release. Tasting notes, harvest reports and the occasional recipe. No discounts spam.</p>
            <label htmlFor="nl-email" className="mono label-olive">
              Email address
            </label>
            <div className={styles.newsletterRow}>
              <input id="nl-email" type="email" required placeholder="you@domain.com" />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </div>
            {subscribed && <p role="status">Thanks — the next letter goes out with the release.</p>}
          </form>
          <div className={styles.cols}>
            <div>
              <span className="mono label-olive">Shop</span>
              <Link to={`${WINES_ROUTE}?type=Red`} className="lnk">
                Red
              </Link>
              <Link to={`${WINES_ROUTE}?type=White`} className="lnk">
                White
              </Link>
              <Link to={`${WINES_ROUTE}?type=Orange`} className="lnk">
                Orange
              </Link>
              <Link to={`${WINES_ROUTE}?type=Sparkling`} className="lnk">
                Pét-nat
              </Link>
              <Link to={OLIVE_OILS_ROUTE} className="lnk">
                Olive oil
              </Link>
              <span>Gift cards</span>
            </div>
            <div>
              <span className="mono label-olive">About</span>
              <Link to={GROWERS_ROUTE} className="lnk">
                Our growers
              </Link>
              <span>Selection criteria</span>
              <Link to={`${HOME_ROUTE}#journal`} className="lnk">
                Journal
              </Link>
              <span>Trade &amp; restaurants</span>
            </div>
            <div>
              <span className="mono label-olive">Help</span>
              <span>Shipping</span>
              <span>Returns &amp; corked bottles</span>
              <Link to={`${CLUB_ROUTE}#faq`} className="lnk">
                Club FAQ
              </Link>
              <span>Contact</span>
            </div>
            <div>
              <span className="mono label-olive">Cellar</span>
              <span>{site.street}</span>
              <span>{site.city}</span>
              <span>{site.hours}</span>
            </div>
          </div>
        </div>
        <div className={`disp ${styles.wordmark}`}>Lees &amp; Leaf</div>
        <div className={`mono mono-sm ${styles.legal}`}>
          <span>© 2026 Lees &amp; Leaf — concept project · Fictional producer aliases and composite stories</span>
          <span>Drink with intention. Sale of alcohol to persons over 18 only.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  )
}
