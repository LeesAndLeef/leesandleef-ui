import { Link } from 'react-router-dom'
import oliveTreesNetsLandscape from '../../assets/landscapes/olive-trees-nets.svg'
import { HOME_ROUTE, JOURNALS_ROUTE } from '../../routes'
import { Breadcrumb } from '../ui/Breadcrumb'
import { PROMISES } from './constants'
import styles from './OilsHero.module.css'

export function OilsHero() {
  return (
    <section className={`section gridbg-d ${styles.hero}`}>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <div className="stack" style={{ gap: 24 }}>
            <Breadcrumb variant="onDark" items={[{ label: 'Home', to: HOME_ROUTE }, { label: 'Olive oil' }]} />
            <span className="mono label-olive">Harvest 2025 · Istria &amp; Dalmatia</span>
            <h1 className={`disp ${styles.heroTitle}`}>
              Green, bitter, peppery — <span className="label-olive">and dated by harvest.</span>
            </h1>
            <p className={styles.heroLede}>
              Single-grove extra virgin olive oil from the same families who make our wine. Picked by hand, pressed the
              same day, and labelled with the cultivar, the grove and the date the olives came off the tree.
            </p>
            <div className="btn-row">
              <a href="#oils" className="btn btn-paper btn-lg">
                Shop the oils ↓
              </a>
              <Link to={`${JOURNALS_ROUTE}/olive-oil`} className="btn btn-ghost-light btn-lg">
                How to read a label
              </Link>
            </div>
          </div>
          <ol className={styles.promises}>
            {PROMISES.map(([title, text], i) => (
              <li key={title}>
                <span className="mono label-olive">{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontWeight: 600 }}>{title}</span>
                <span className={styles.promiseText}>{text}</span>
              </li>
            ))}
          </ol>
        </div>
        <figure className={`hatch ${styles.heroFig}`}>
          <img src={oliveTreesNetsLandscape} alt="Illustration: olive trees with harvest nets spread underneath" />
          <div className={`glass ${styles.heroPanel}`}>
            <div>
              <span className="mono">Now shipping</span>
              <span className="disp" style={{ fontSize: 26 }}>
                Olio nuovo 2025
              </span>
            </div>
            <div>
              <span className="mono">Pressed</span>
              <span>Oct – Nov 2025</span>
            </div>
            <div>
              <span className="mono">Best within</span>
              <span>12 months of harvest</span>
            </div>
          </div>
        </figure>
      </div>
    </section>
  )
}
