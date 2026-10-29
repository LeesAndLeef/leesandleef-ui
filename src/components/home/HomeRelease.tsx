import { Link } from 'react-router-dom'
import { euro } from '../../lib/euro'
import { winePath } from '../../lib/paths'
import { WINES_ROUTE } from '../../routes'
import { useCart } from '../../state/cart/useCart'
import { Bottle } from '../illustrations/Bottle'
import { LISTED_COUNT, RELEASE } from './constants'
import styles from './HomeRelease.module.css'

export function HomeRelease() {
  const { add } = useCart()

  return (
    <section className="section">
      <div className="container section-pad stack" style={{ gap: 40 }}>
        <div className="section-head">
          <div>
            <span className="mono label-wine">§ 01 — The autumn release</span>
            <h2 className="disp h-l">Twelve cuvées. Four we can’t stop opening.</h2>
            <p className="lede">
              Each wine below comes from a single plot and a single grower. Runs are small — when a cuvée is gone, it is
              gone until next vintage.
            </p>
          </div>
          <Link to={WINES_ROUTE} className="btn btn-outline">
            See all {LISTED_COUNT} wines →
          </Link>
        </div>

        <div className={`ledger ${styles.releaseGrid}`}>
          {RELEASE.map((w) => (
            <article key={w.id} className={styles.releaseCard}>
              <Link to={winePath(w)} className={`${styles.releaseCardImg} hatch`} aria-label={w.name}>
                <span className={`mono glass ${styles.releaseCardBadge}`}>{w.badge}</span>
                <Bottle glass={w.glass} cap={w.cap} width={92} height={300} />
              </Link>
              <div className={styles.releaseCardBody}>
                <div className={`mono ${styles.releaseCardMeta}`}>
                  <span>{w.region}</span>
                  <span>{w.type}</span>
                </div>
                <h3>
                  <Link to={winePath(w)} className="lnk">
                    {w.name}
                  </Link>
                </h3>
                <p className="label-muted" style={{ fontSize: 14 }}>
                  {w.growerName}
                </p>
                <p className={styles.releaseCardNote}>{w.homeNote ?? w.note}</p>
                <div className={styles.releaseCardFoot}>
                  <span className="disp">{euro(w.price)}</span>
                  <button className="btn btn-ink btn-sm" onClick={() => add(w.id)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
