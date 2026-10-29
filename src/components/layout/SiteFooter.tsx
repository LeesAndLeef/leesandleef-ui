import { useMatch } from 'react-router-dom'
import { HOME_ROUTE } from '../../routes'
import { Footer } from './Footer'
import { LegalFooter } from './LegalFooter'

export function SiteFooter() {
  const isHome = useMatch(HOME_ROUTE) !== null
  return isHome ? <Footer /> : <LegalFooter />
}
