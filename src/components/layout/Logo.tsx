import { Link } from 'react-router-dom'
import { HOME_ROUTE } from '../../routes'
import { LogoMark } from './LogoMark'
import styles from './Logo.module.css'

export function Logo() {
  return (
    <Link to={HOME_ROUTE} className={`${styles.root} lnk`}>
      <LogoMark />
      <span className="disp">Lees &amp; Leaf</span>
    </Link>
  )
}
