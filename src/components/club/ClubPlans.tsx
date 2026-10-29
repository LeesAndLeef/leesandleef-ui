import { FREQ_LABEL } from '../../constants'
import { clubPlans } from '../../lib/clubPlans'
import type { Freq } from '../../types'
import styles from './ClubPlans.module.css'

export function ClubPlans({
  freq,
  onFreqChange,
  onJoin,
}: {
  freq: Freq
  onFreqChange: (freq: Freq) => void
  onJoin: (planId: string) => void
}) {
  return (
    <section className="section gridbg">
      <div className="container section-pad stack" style={{ gap: 40 }}>
        <div className="section-head">
          <div>
            <span className="mono label-wine">01 — Choose a plan</span>
            <h2 className="disp h-l">Three sizes. Same care.</h2>
          </div>
          <div role="group" aria-label="Delivery frequency" className={styles.freqToggle}>
            <button aria-pressed={freq === 'season'} onClick={() => onFreqChange('season')}>
              Every season <span className="mono">4× a year</span>
            </button>
            <button aria-pressed={freq === 'month'} onClick={() => onFreqChange('month')}>
              Every month <span className="mono">−8%</span>
            </button>
          </div>
        </div>
        <div className={styles.plans}>
          {clubPlans.map((p) => (
            <article key={p.id} className={`${styles.plan} ${p.featured ? styles.isFeatured : ''}`}>
              <div className={styles.planHead}>
                <div className="stack" style={{ gap: 8 }}>
                  <span className={'mono ' + (p.featured ? 'label-rose' : 'label-wine')}>{p.tag}</span>
                  <h3 className="disp">{p.name}</h3>
                </div>
                <div className={styles.planDots} aria-hidden="true">
                  {Array.from({ length: 12 }, (_, i) => (
                    <span key={i} className={i < p.bottles ? styles.on : undefined} />
                  ))}
                </div>
              </div>
              <p className={styles.planDesc}>{p.desc}</p>
              <div className={styles.planPrice}>
                <span className="disp">€{p.price[freq]}</span>
                <span className="mono mono-sm">{FREQ_LABEL[freq]}</span>
              </div>
              <ul className={`square-list ${styles.planPerks}`}>
                {p.perks.map((k) => (
                  <li key={k}>
                    <span aria-hidden="true">■</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
              <button className={'btn btn-lg ' + (p.featured ? 'btn-paper' : 'btn-ink')} onClick={() => onJoin(p.id)}>
                Start with {p.name}
              </button>
            </article>
          ))}
        </div>
        <p className="mono label-muted" style={{ textAlign: 'center' }}>
          Prices include EU delivery · Skip or pause any box · Cancel online in two clicks
        </p>
      </div>
    </section>
  )
}
