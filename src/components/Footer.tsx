import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'

export function MiniFooter() {
  return (
    <footer className="mini-footer">
      <div className="container mono mono-sm">
        <span>© 2026 Lees &amp; Leaf — concept project · Fictional producer aliases and composite stories</span>
        <span>Free EU delivery over €120</span>
        <span>Sale of alcohol to persons over 18 only</span>
      </div>
    </footer>
  )
}

export function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  function subscribe(e: FormEvent) {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <div className="site-footer-top">
          <form className="stack newsletter" onSubmit={subscribe}>
            <h2 className="disp">Letters from the cellar</h2>
            <p>One email per release. Tasting notes, harvest reports and the occasional recipe. No discounts spam.</p>
            <label htmlFor="nl-email" className="mono label-olive">
              Email address
            </label>
            <div className="newsletter-row">
              <input id="nl-email" type="email" required placeholder="you@domain.com" />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </div>
            {subscribed && <p role="status">Thanks — the next letter goes out with the release.</p>}
          </form>
          <div className="footer-cols">
            <div>
              <span className="mono label-olive">Shop</span>
              <Link to="/shop?type=Red" className="lnk">
                Red
              </Link>
              <Link to="/shop?type=White" className="lnk">
                White
              </Link>
              <Link to="/shop?type=Orange" className="lnk">
                Orange
              </Link>
              <Link to="/shop?type=Sparkling" className="lnk">
                Pét-nat
              </Link>
              <Link to="/olive-oil" className="lnk">
                Olive oil
              </Link>
              <span>Gift cards</span>
            </div>
            <div>
              <span className="mono label-olive">About</span>
              <Link to="/growers" className="lnk">
                Our growers
              </Link>
              <span>Selection criteria</span>
              <Link to="/#journal" className="lnk">
                Journal
              </Link>
              <span>Trade &amp; restaurants</span>
            </div>
            <div>
              <span className="mono label-olive">Help</span>
              <span>Shipping</span>
              <span>Returns &amp; corked bottles</span>
              <Link to="/club#faq" className="lnk">
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
        <div className="disp footer-wordmark">Lees &amp; Leaf</div>
        <div className="mono mono-sm footer-legal">
          <span>© 2026 Lees &amp; Leaf — concept project · Fictional producer aliases and composite stories</span>
          <span>Drink with intention. Sale of alcohol to persons over 18 only.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  )
}
