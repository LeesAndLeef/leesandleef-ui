import { useCountdown } from '../../hooks/useCountdown'
import { site } from '../../lib/site'
import styles from './ClubHero.module.css'

export function ClubHero() {
  const countdown = useCountdown(site.nextBoxCloses)

  return (
    <section className={`section hatch-w on-dark ${styles.hero}`}>
      <div className={`block ${styles.heroB1}`} />
      <div className={`block ${styles.heroB2}`} />
      <div className={`container section-pad ${styles.heroInner}`}>
        <div className="stack" style={{ gap: 24 }}>
          <span className="mono label-rose">The Lees &amp; Leaf Club</span>
          <h1 className="disp h-xl">Let the growers pick for you.</h1>
          <p className={styles.heroLede}>
            A seasonal box of natural wine chosen with the people who made it. Every shipment comes with a printed field
            journal, tasting cards and first access to the release.
          </p>
        </div>
        <div className={`glass ${styles.countdown}`}>
          <span className="mono label-rose">{countdown.closed ? 'Box Nº 07 is closed' : 'Next box closes'}</span>
          <div
            className={styles.countdownGrid}
            role="timer"
            aria-label={`${countdown.days} days, ${countdown.hours} hours, ${countdown.mins} minutes left`}
          >
            {['Days', 'Hours', 'Min']
              .map((l, i) => [countdown.cells[i], l])
              .map(([v, l]) => (
                <div key={l}>
                  <span className="disp">{v}</span>
                  <span className="mono label-rose">{l}</span>
                </div>
              ))}
            <div className={styles.isBox}>
              <span className="disp">Nº 07</span>
              <span className="mono label-wine">Box</span>
            </div>
          </div>
          <p>
            This season: three Istrian growers, one Pelješac red from a 420-bottle run, and a pét-nat we only make for
            members.
          </p>
        </div>
      </div>
    </section>
  )
}
