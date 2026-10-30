import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { growers, stockLabel } from '../../lib/growers'
import { site } from '../../lib/site'
import { GROWERS_ROUTE, HOME_ROUTE } from '../../routes'
import { COLORS } from '../../styles/colors'
import { GROWER_REGIONS, GROWER_RULES } from './constants'
import styles from './GrowersPage.module.css'

export default function GrowersPage() {
  const [region, setRegion] = useState('All')
  const shown = growers.filter((g) => region === 'All' || g.region === region)

  return (
    <>
      <section className="section gridbg">
        <div className={`container ${styles.head}`}>
          <Breadcrumb items={[{ label: 'Home', to: HOME_ROUTE }, { label: 'Growers' }]} />
          <div className={styles.intro}>
            <h1 className={`disp ${styles.title}`}>
              The growers<span className="accent">.</span>
            </h1>
            <p>
              Every bottle we sell comes from someone we’ve stood in a vineyard with. Most farm under five hectares;
              some started with a borrowed press. Meet six of the twenty-three — more profiles are added with every
              release.
            </p>
          </div>
          <div role="group" aria-label="Region" className="chip-row">
            {['All', ...GROWER_REGIONS].map((r) => (
              <button key={r} className="chip" aria-pressed={region === r} onClick={() => setRegion(r)}>
                {r}{' '}
                <span className="mono">
                  {r === 'All' ? growers.length : growers.filter((g) => g.region === r).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.list} stack`} style={{ gap: 24 }}>
          <span className="mono label-muted" role="status">
            {shown.length} grower{shown.length === 1 ? '' : 's'}
          </span>
          <div className={styles.grid}>
            {shown.map((g) => (
              <Link key={g.id} to={`${GROWERS_ROUTE}/${g.id}`} className={`lnk ${styles.gcard}`}>
                <span className={`hatch ${styles.gcardImg}`}>
                  {g.portrait && <img src={g.portrait} alt={`Illustrated portrait — ${g.people}`} />}
                  <span className={`glass ${styles.gcardFacts}`}>
                    <span className="mono">{g.ha}</span>
                    <span className="mono">{g.since}</span>
                  </span>
                  <span className={`mono ${styles.gcardRegion}`}>{g.region}</span>
                </span>
                <span className={styles.gcardBody}>
                  <span className="mono label-muted">{g.place}</span>
                  <span className={`disp ${styles.gcardName}`}>{g.name}</span>
                  <span className={styles.gcardQuote}>“{g.quote}”</span>
                  <span className={styles.gcardGrapes}>
                    {g.grapes.map((gr) => (
                      <span key={gr}>{gr}</span>
                    ))}
                  </span>
                  <span className={styles.gcardFoot}>
                    <span className={styles.gcta}>Read the profile →</span>
                    <span className="mono label-muted" style={{ fontSize: 11 }}>
                      {stockLabel(g)}
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`section gridbg-d ${styles.rules}`}>
        <div className="container stack" style={{ gap: 40, paddingTop: 96, paddingBottom: 96 }}>
          <div className={styles.rulesHead}>
            <div className="stack" style={{ gap: 16 }}>
              <span className="mono label-olive">How we choose growers</span>
              <h2 className={`disp ${styles.h2}`}>Six rules. No exceptions.</h2>
            </div>
            <p>
              We visit every grower at least twice a year — once at harvest, once at bottling. A wine only joins the
              cellar when it meets all six.
            </p>
          </div>
          <ol className={styles.ruleList}>
            {GROWER_RULES.map(([title, text], i) => (
              <li key={title}>
                <span className={`disp ${styles.ruleNo}`}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontWeight: 600, fontSize: 17 }}>{title}</span>
                <span className={styles.ruleText}>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`section hatch-w on-dark ${styles.suggest}`}>
        <div className={`block ${styles.suggestB}`} aria-hidden="true" />
        <div className={`container ${styles.suggestInner}`}>
          <div className="stack" style={{ gap: 14 }}>
            <h2 className={`disp ${styles.h2Sm}`}>Know a grower we should meet?</h2>
            <p style={{ color: COLORS.wine100, lineHeight: 1.6 }}>
              Tell us who they are and where they farm. We taste everything people send us, and visit the ones we can’t
              stop thinking about.
            </p>
          </div>
          <div className={`glass ${styles.suggestCard}`}>
            <span className="mono" style={{ color: COLORS.wine200 }}>
              Write to
            </span>
            <a href={`mailto:${site.email}`} className={`disp ${styles.email}`}>
              {site.email}
            </a>
            <span style={{ fontSize: 14, color: COLORS.wine100 }}>
              We reply to every message, usually within a week.
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
