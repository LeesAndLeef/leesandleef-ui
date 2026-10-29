import { Link } from 'react-router-dom'
import { QUIZ_ROUTE } from '../../routes'
import { COLORS } from '../../styles/colors'
import styles from './ClubCta.module.css'

export function ClubCta({ onJoin }: { onJoin: () => void }) {
  return (
    <section className={`hatch on-dark ${styles.cta}`}>
      <div className={`block ${styles.ctaB}`} />
      <div className={`container ${styles.ctaInner}`}>
        <h2 className="disp">Your first box ships with the autumn release.</h2>
        <div className={`glass ${styles.ctaBtns}`}>
          <Link to={QUIZ_ROUTE} className="btn btn-paper btn-lg">
            Take the taste quiz
          </Link>
          <button className="btn btn-primary btn-lg" onClick={onJoin}>
            Join the Cellar plan →
          </button>
        </div>
        <span className="mono" style={{ color: COLORS.sage }}>
          Gift memberships available · 3, 6 or 12 months
        </span>
      </div>
    </section>
  )
}
