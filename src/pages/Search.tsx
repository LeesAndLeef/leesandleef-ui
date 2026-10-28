import { type FormEvent, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../cart/context'
import { MiniFooter } from '../components/Footer'
import { OilCard } from '../components/OilCard'
import { Breadcrumb, WineCard } from '../components/ui'
import { DEFAULT_OIL_SIZE } from '../data/products'
import { search, searchSuggestions } from '../data/search'
import './Search.css'

export default function Search() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  return <SearchView key={query} query={query} />
}

function SearchView({ query }: { query: string }) {
  const navigate = useNavigate()
  const { add } = useCart()
  const [draft, setDraft] = useState(query)
  const [added, setAdded] = useState<Record<string, boolean>>({})
  const results = useMemo(() => search(query), [query])
  const total = results.wines.length + results.oils.length + results.growers.length

  function submit(e: FormEvent) {
    e.preventDefault()
    const q = draft.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  return (
    <>
      <section className="section gridbg">
        <div className="container search-head">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />
          <h1 className="disp search-title">
            {query ? (
              <>
                “{query}”<span className="accent">.</span>
              </>
            ) : (
              <>
                Search<span className="accent">.</span>
              </>
            )}
          </h1>
          <form role="search" className="search-form" onSubmit={submit}>
            <label htmlFor="search-page-q" className="sr-only">
              Search wine, olive oil and growers
            </label>
            <input
              id="search-page-q"
              className="input"
              type="search"
              placeholder="Wine, oil, grape, grower or region"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button className="btn btn-primary">Search</button>
          </form>
          {query && (
            <p className="mono label-muted" role="status">
              {total
                ? [
                    results.wines.length && `${results.wines.length} wine${results.wines.length === 1 ? '' : 's'}`,
                    results.oils.length && `${results.oils.length} olive oil${results.oils.length === 1 ? '' : 's'}`,
                    results.growers.length &&
                      `${results.growers.length} grower${results.growers.length === 1 ? '' : 's'}`,
                  ]
                    .filter(Boolean)
                    .join(' · ')
                : 'No matches'}
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container search-body">
          {total === 0 && (
            <div className="hatch search-empty">
              <h2 className="disp">{query ? 'Nothing matches.' : 'What are you after?'}</h2>
              <p>Try a grape, a grower, a region — or one of these:</p>
              <div className="chip-row">
                {searchSuggestions.map((s) => (
                  <Link key={s} to={`/search?q=${encodeURIComponent(s)}`} className="chip">
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.wines.length > 0 && (
            <div className="search-group">
              <div className="search-group-head">
                <h2 className="disp">Wine</h2>
                <Link to="/shop">The whole cellar →</Link>
              </div>
              <div className="search-grid">
                {results.wines.map((w) => (
                  <WineCard key={w.id} wine={w} />
                ))}
              </div>
            </div>
          )}

          {results.oils.length > 0 && (
            <div className="search-group">
              <div className="search-group-head">
                <h2 className="disp">Olive oil</h2>
                <Link to="/olive-oil">All oils →</Link>
              </div>
              <div className="search-grid search-grid-oil">
                {results.oils.map((o) => (
                  <OilCard
                    key={o.id}
                    oil={o}
                    size={DEFAULT_OIL_SIZE}
                    added={!!added[o.id]}
                    onAdd={() => {
                      add(o.id)
                      setAdded((a) => ({ ...a, [o.id]: true }))
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {results.growers.length > 0 && (
            <div className="search-group">
              <div className="search-group-head">
                <h2 className="disp">Growers</h2>
                <Link to="/growers">All growers →</Link>
              </div>
              <ul className="search-growers">
                {results.growers.map((g) => (
                  <li key={g.id}>
                    <Link to={`/growers/${g.id}`} className="lnk search-grower">
                      {g.portrait && <img src={g.portrait} alt="" />}
                      <span className="stack" style={{ gap: 4 }}>
                        <span className="mono label-muted">{g.place}</span>
                        <span className="disp" style={{ fontSize: 22 }}>
                          {g.name}
                        </span>
                        <span style={{ fontSize: 14 }}>{g.grapes.join(' · ')}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <MiniFooter />
    </>
  )
}
