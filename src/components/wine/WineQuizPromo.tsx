import { Link } from 'react-router-dom'
import { QUIZ_ROUTE } from '../../routes'
import { COLORS } from '../../styles/colors'
import styles from './WineQuizPromo.module.css'

export function WineQuizPromo() {
  return (
    <div className={`hatch ${styles.quizPromo}`}>
      <div className={`block ${styles.quizPromoB}`} />
      <div className={`glass ${styles.quizPromoInner}`}>
        <span className="mono" style={{ color: COLORS.sage }}>
          Not sure?
        </span>
        <span className={styles.quizPromoText}>Take the 60-second taste quiz and we’ll build a mixed six.</span>
        <Link to={QUIZ_ROUTE} className={styles.quizPromoLink}>
          Start the quiz →
        </Link>
      </div>
    </div>
  )
}
