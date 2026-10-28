import { type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../cart/context'
import { Logo } from './Logo'

const links = [
  { to: '/shop', label: 'Shop wine', match: (p: string) => p === '/shop' || p.startsWith('/wine/') },
  { to: '/olive-oil', label: 'Olive oil', match: (p: string) => p === '/olive-oil' || p.startsWith('/olive-oil/') },
  { to: '/growers', label: 'Growers', match: (p: string) => p.startsWith('/growers') },
  { to: '/club', label: 'The Club', match: (p: string) => p === '/club' || p === '/quiz' },
  { to: '/#journal', label: 'Journal', match: (p: string) => p.startsWith('/journal') },
]

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { totals } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
    setSearchOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container site-header-row">
        <Logo />
        <nav className="main-nav" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={l.match(pathname) ? 'active' : undefined}
              aria-current={l.match(pathname) ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
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
            to="/cart"
            className={'cart-btn' + (pathname === '/cart' ? ' is-current' : '')}
            aria-current={pathname === '/cart' ? 'page' : undefined}
            aria-label={`Cart, ${totals.count} item${totals.count === 1 ? '' : 's'}`}
          >
            Cart <span className="mono">{totals.count}</span>
          </Link>
        </div>
      </div>
      {searchOpen && (
        <form id="site-search" role="search" className="container site-search" onSubmit={submit}>
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
      )}
    </header>
  )
}
