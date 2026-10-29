import { Link } from 'react-router-dom'
import { euro } from '../../lib/euro'
import { winePath } from '../../lib/paths'
import { GROWERS_ROUTE, WINES_ROUTE } from '../../routes'
import { COLORS } from '../../styles/colors'
import { Bottle } from '../illustrations/Bottle'
import { PRINCIPLES, RELEASE } from './constants'
import styles from './HomeHero.module.css'

export function HomeHero() {
  const hero = RELEASE[0]
  return (
    <section className="section gridbg">
      <div className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className="stack" style={{ gap: 28 }}>
            <div className={`mono ${styles.heroKicker}`}>
              <span>Nº 07 — Autumn release</span>
              <span>Harvest 2025 / Vintage 2023–24</span>
            </div>
            <h1 className={`disp ${styles.heroTitle}`}>
              Wine that tastes of a place, <span className="accent">not a process.</span>
            </h1>
            <p className={styles.heroLede}>
              Low-intervention wine and single-estate olive oil from small growers along the Adriatic coast and its
              hinterland. Hand-picked, wild-fermented, bottled in tiny runs — and shipped with the grower’s own notes in
              every box.
            </p>
            <div className="btn-row">
              <Link to={WINES_ROUTE} className="btn btn-primary btn-lg">
                Shop the release <span aria-hidden="true">→</span>
              </Link>
              <Link to={GROWERS_ROUTE} className="btn btn-outline btn-lg">
                How we choose growers
              </Link>
            </div>
          </div>
          <ol className={styles.principles}>
            {PRINCIPLES.map(([title, text], i) => (
              <li key={title}>
                <span className="mono label-wine">0{i + 1}</span>
                <span className={styles.principlesTitle}>{title}</span>
                <span className={styles.principlesText}>{text}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className={`${styles.heroArt} hatch`}>
          <div className={`block ${styles.heroB1}`} />
          <div className={`block ${styles.heroB2}`} />
          <div className={styles.heroBottle}>
            <Bottle glass={hero.glass} cap={hero.cap} width={150} height={440} mark />
          </div>
          <div className={`glass ${styles.pouring}`}>
            <div className="stack" style={{ gap: 8 }}>
              <span className="mono" style={{ color: COLORS.sage }}>
                Now pouring
              </span>
              <span className="disp" style={{ fontSize: 30 }}>
                {hero.name}
              </span>
              <span style={{ fontSize: 14, color: COLORS.bone }}>Vina Brajko · Istria · 12.5% · 9 days on skins</span>
            </div>
            <div className={styles.pouringBuy}>
              <span className="disp" style={{ fontSize: 32 }}>
                {euro(hero.price)}
              </span>
              <Link to={winePath(hero)} className="btn btn-paper btn-sm">
                View bottle →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
