import { Link } from 'react-router-dom'
import { QUIZ_ROUTE, WINES_ROUTE } from '../../routes'
import styles from './CartEmpty.module.css'

export function CartEmpty() {
  return (
    <div className={`hatch ${styles.empty}`}>
      <div className={`block ${styles.emptyB}`} />
      <h2 className="disp">The cart is empty.</h2>
      <p>The cellar isn't. Twelve wines from the autumn release are waiting.</p>
      <div className="btn-row" style={{ position: 'relative' }}>
        <Link to={WINES_ROUTE} className="btn btn-paper btn-lg">
          Browse the cellar →
        </Link>
        <Link to={QUIZ_ROUTE} className="btn btn-ghost-light btn-lg">
          Take the taste quiz
        </Link>
      </div>
    </div>
  )
}
