import { Link } from 'react-router-dom'
import { QUIZ_ROUTE } from '../../routes'
import { COLORS } from '../../styles/colors'
import { CLUB_STEPS } from './constants'
import styles from './ClubHowItWorks.module.css'

export function ClubHowItWorks() {
  return (
    <section id="how" className="section" style={{ background: COLORS.olive900, color: COLORS.paper }}>
      <div className="container section-pad stack" style={{ gap: 40 }}>
        <span className="mono label-olive">03 — How it works</span>
        <ol className={styles.howSteps}>
          {CLUB_STEPS.map(([t, d], i) => (
            <li key={t}>
              <span className="disp">{i + 1}</span>
              <h3>
                {i === 0 ? (
                  <Link to={QUIZ_ROUTE} className="lnk">
                    {t} →
                  </Link>
                ) : (
                  t
                )}
              </h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
