import { type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CART_ROUTE, SEARCH_ROUTE } from '../../routes'
import { useCart } from '../../state/cart/useCart'
import { NAV_LINKS } from './constants'
import { HeaderBar } from './HeaderBar'
import { Logo } from './Logo'
import styles from './Header.module.css'

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { totals } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `${SEARCH_ROUTE}?q=${encodeURIComponent(q)}` : SEARCH_ROUTE)
    setSearchOpen(false)
  }

  return (
    <HeaderBar
      below={
        searchOpen && (
          <form id="site-search" role="search" className={`container ${styles.search}`} onSubmit={submit}>
            <label htmlFor="q" className="mono label-muted">
              Search wine &amp; olive oil
            </label>
            <input
              id="q"
              className="input"
              type="search"
              autoFocus
              placeholder="Wine, oil, grape, grower or region"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-ink">Search</button>
          </form>
        )
      }
    >
      <Logo />
      <nav className={styles.mainNav} aria-label="Main">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className={l.match(pathname) ? styles.active : undefined}
            aria-current={l.match(pathname) ? 'page' : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className={styles.actions}>
        <button
          className="icon-btn"
          aria-label="Search"
          aria-expanded={searchOpen}
          aria-controls="site-search"
          onClick={() => setSearchOpen((o) => !o)}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="13" height="13" />
            <path d="M16 16l5 5" />
          </svg>
        </button>
        <Link
          to={CART_ROUTE}
          className={`${styles.cartBtn} ${pathname === CART_ROUTE ? styles.isCurrent : ''}`}
          aria-current={pathname === CART_ROUTE ? 'page' : undefined}
          aria-label={`Cart, ${totals.count} item${totals.count === 1 ? '' : 's'}`}
        >
          Cart <span className="mono">{totals.count}</span>
        </Link>
      </div>
    </HeaderBar>
  )
}
