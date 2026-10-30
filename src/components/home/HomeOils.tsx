import { Link } from 'react-router-dom'
import oilPressCellar from '../../assets/cellar/oil-press.svg'
import { formatCurrency } from '../../lib/currency'
import { oilPrice } from '../../lib/oil'
import { oilPath } from '../../lib/paths'
import { useCart } from '../../state/cart/useCart'
import { COLORS } from '../../styles/colors'
import { HOME_OILS } from './constants'
import styles from './HomeOils.module.css'

export function HomeOils() {
  const { add } = useCart()
  return (
    <section className="section gridbg-d">
      <div className={`container section-pad ${styles.oil}`}>
        <div className="stack" style={{ gap: 24 }}>
          <span className="mono label-olive">§ 02 — Liquid gold, but green</span>
          <h2 className="disp h-l">Pressed within four hours of picking.</h2>
          <p className="lede" style={{ color: COLORS.sage, maxWidth: 520 }}>
            Our oils come from old groves of Buža, Oblica and Istarska Bjelica — cold-extracted the same day, unfiltered
            for the first weeks, and dated by harvest, not by bottling. Expect pepper at the back of the throat. That’s
            the polyphenols.
          </p>
          <div className={`${styles.oilArt} hatch-w`}>
            <img
              src={oilPressCellar}
              alt="Illustration: oil tins and a bottle on a stone olive press"
              className={styles.oilPic}
            />
            <div className={`glass mono ${styles.oilCap}`}>Buža · Bjelica · Oblica — harvest 2025</div>
          </div>
        </div>

        <div className={styles.oilList}>
          {HOME_OILS.map((o) => (
            <div key={o.id} className={`glass ${styles.oilItem}`}>
              <div className={styles.oilItemHead}>
                <h3 className="disp">
                  <Link to={oilPath(o)} className="lnk">
                    {o.name}
                  </Link>
                </h3>
                <span className="disp">{formatCurrency(o.price)}</span>
              </div>
              <p>{o.note}</p>
              <dl className={styles.oilFacts}>
                {[
                  ['Cultivar', o.cultivar],
                  ['Polyphenols', o.poly],
                  ['Acidity', o.acid],
                  ['Harvest', o.harvest],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="mono mono-sm label-olive">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="btn-row" style={{ gap: 10 }}>
                <button className="btn btn-paper btn-sm" onClick={() => add(o.id)}>
                  Add 500 ml
                </button>
                <button className="btn btn-ghost-light btn-sm" onClick={() => add(o.id, 1, '3000')}>
                  3 L tin · {formatCurrency(oilPrice(o, '3000'))}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
