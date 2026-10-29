import { Link } from 'react-router-dom'
import { growers } from '../../lib/growers'
import { GROWERS_ROUTE } from '../../routes'
import { Scene } from '../illustrations/Scene'
import styles from './HomeGrowers.module.css'

export function HomeGrowers() {
  return (
    <section id="growers" className="section">
      <div className="container section-pad stack" style={{ gap: 40 }}>
        <div className={styles.growersHead}>
          <div className="stack" style={{ gap: 16 }}>
            <span className="mono label-wine">§ 03 — The people</span>
            <h2 className="disp h-l">Twenty-three growers. No middlemen.</h2>
          </div>
          <p className="lede">
            We visit every grower at least twice a year — once at harvest, once at bottling. Most farm under five
            hectares. Some work vines their great-grandparents planted; some started with a borrowed press and a single
            barrel.
          </p>
        </div>
        <div className={styles.growerCards}>
          {growers.slice(0, 2).map((g) => (
            <Link key={g.id} to={`${GROWERS_ROUTE}/${g.id}`} className={`lnk ${styles.growerCard}`}>
              <div className={`${styles.growerCardImg} hatch`}>
                {g.portrait ? (
                  <img src={g.portrait} alt={`Illustrated portrait — ${g.who}`} className={styles.growerCardPic} />
                ) : (
                  <Scene
                    kind="portrait"
                    cue={g.who}
                    tone={g.tone}
                    label={`Illustrated fictional producer: ${g.name}`}
                  />
                )}
                <div className={`glass ${styles.growerCardFacts}`}>
                  <span className="mono">{g.ha}</span>
                  <span className="mono">{g.since}</span>
                </div>
              </div>
              <div className={styles.growerCardBody}>
                <span className="mono label-muted">{g.place}</span>
                <h3 className="disp">{g.name}</h3>
                <p>“{g.quote}”</p>
                <span className={styles.growerCardMore}>Read the profile →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.growersMore}>
          <span className="mono label-muted">
            {growers.length - 2} more growers in Istria, Dalmatia, Kvarner &amp; Slavonia
          </span>
          <Link to={GROWERS_ROUTE} className="btn btn-primary btn-lg">
            Meet all growers →
          </Link>
        </div>
      </div>
    </section>
  )
}
