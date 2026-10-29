import { Link } from 'react-router-dom'
import { CLUB_ROUTE } from '../../routes'
import { COLORS } from '../../styles/colors'
import styles from './HomeClub.module.css'

export function HomeClub() {
  return (
    <section className={`section hatch-w on-dark ${styles.club}`}>
      <div className={`block ${styles.clubB1}`} />
      <div className={`block ${styles.clubB2}`} />
      <div className={`container section-pad ${styles.clubInner}`}>
        <div className="stack" style={{ gap: 20 }}>
          <span className="mono label-rose">§ 04 — The Club</span>
          <h2 className="disp" style={{ fontSize: 'clamp(40px, 5vw, 76px)' }}>
            Six bottles. Every season. Chosen by people who drank them first.
          </h2>
          <p className="lede" style={{ color: COLORS.wine100, maxWidth: 560 }}>
            Members get first access to every release, cuvées we never list publicly, and a printed field journal with
            each box. Skip, pause or cancel any time from your account.
          </p>
        </div>
        <div className={`glass ${styles.clubCard}`}>
          <div className={styles.clubTiers}>
            <div>
              <span className="mono mono-sm label-rose">Explorer</span>
              <span className="disp">3 btl</span>
            </div>
            <div className={styles.isFeatured}>
              <span className="mono mono-sm label-wine">Cellar ■</span>
              <span className="disp">6 btl</span>
            </div>
            <div>
              <span className="mono mono-sm label-rose">Collector</span>
              <span className="disp">12 btl</span>
            </div>
          </div>
          <ul className="square-list">
            {[
              '48-hour early access to every release',
              'Members-only cuvées and library vintages',
              'Field journal + tasting cards in every box',
              'Free delivery, always',
            ].map((t) => (
              <li key={t}>
                <span aria-hidden="true">■</span>
                {t}
              </li>
            ))}
          </ul>
          <Link to={CLUB_ROUTE} className="btn btn-paper btn-lg">
            Choose a plan →
          </Link>
        </div>
      </div>
    </section>
  )
}
