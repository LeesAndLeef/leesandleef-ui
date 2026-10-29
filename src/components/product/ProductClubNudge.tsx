import { Link } from 'react-router-dom'
import { CLUB_ROUTE } from '../../routes'
import styles from './ProductClubNudge.module.css'

export function ProductClubNudge() {
  return (
    <div className={styles.root}>
      <div className="hatch-w" aria-hidden="true" />
      <div>
        <span style={{ fontWeight: 600 }}>Club members got this 48 hours early.</span>
        <span className="label-muted">
          Join the Club for first access to every release and members-only cuvées.{' '}
          <Link to={CLUB_ROUTE}>See plans</Link>
        </span>
      </div>
    </div>
  )
}
