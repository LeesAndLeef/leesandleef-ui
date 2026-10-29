import { type FormEvent, useMemo } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { OilCard } from '../../components/product/OilCard'
import { WineCard } from '../../components/product/WineCard'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { DEFAULT_OIL_SIZE } from '../../constants'
import { useKeyedState } from '../../hooks/useKeyedState'
import { search } from '../../lib/search'
import { GROWERS_ROUTE, HOME_ROUTE, OLIVE_OILS_ROUTE, SEARCH_ROUTE, WINES_ROUTE } from '../../routes'
import { useCart } from '../../state/cart/useCart'
import { SEARCH_SUGGESTIONS } from './constants'
import styles from './Search.module.css'

export default function Search() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const navigate = useNavigate()
  const { add } = useCart()
  const [draft, setDraft] = useKeyedState(query, query)
  const [added, setAdded] = useKeyedState<Record<string, boolean>>(query, {})
  const results = useMemo(() => search(query), [query])
  const total = results.wines.length + results.oils.length + results.growers.length

  function submit(e: FormEvent) {
    e.preventDefault()
    const q = draft.trim()
    navigate(q ? `${SEARCH_ROUTE}?q=${encodeURIComponent(q)}` : SEARCH_ROUTE)
  }

  return (
    <>
      <section className="section gridbg">
        <div className={`container ${styles.head}`}>
          <Breadcrumb items={[{ label: 'Home', to: HOME_ROUTE }, { label: 'Search' }]} />
          <h1 className={`disp ${styles.title}`}>
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
          <form role="search" className={styles.form} onSubmit={submit}>
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
        <div className={`container ${styles.body}`}>
          {total === 0 && (
            <div className={`hatch ${styles.empty}`}>
              <h2 className="disp">{query ? 'Nothing matches.' : 'What are you after?'}</h2>
              <p>Try a grape, a grower, a region — or one of these:</p>
              <div className="chip-row">
                {SEARCH_SUGGESTIONS.map((s) => (
                  <Link key={s} to={`${SEARCH_ROUTE}?q=${encodeURIComponent(s)}`} className="chip">
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {results.wines.length > 0 && (
            <div className={styles.group}>
              <div className={styles.groupHead}>
                <h2 className="disp">Wine</h2>
                <Link to={WINES_ROUTE}>The whole cellar →</Link>
              </div>
              <div className={styles.grid}>
                {results.wines.map((w) => (
                  <WineCard key={w.id} wine={w} onAdd={() => add(w.id)} />
                ))}
              </div>
            </div>
          )}

          {results.oils.length > 0 && (
            <div className={styles.group}>
              <div className={styles.groupHead}>
                <h2 className="disp">Olive oil</h2>
                <Link to={OLIVE_OILS_ROUTE}>All oils →</Link>
              </div>
              <div className={`${styles.grid} ${styles.gridOil}`}>
                {results.oils.map((o) => (
                  <OilCard
                    key={o.id}
                    oil={o}
                    size={DEFAULT_OIL_SIZE}
                    added={!!added[o.id]}
                    onAdd={() => {
                      add(o.id)
                      setAdded({ ...added, [o.id]: true })
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {results.growers.length > 0 && (
            <div className={styles.group}>
              <div className={styles.groupHead}>
                <h2 className="disp">Growers</h2>
                <Link to={GROWERS_ROUTE}>All growers →</Link>
              </div>
              <ul className={styles.growers}>
                {results.growers.map((g) => (
                  <li key={g.id}>
                    <Link to={`${GROWERS_ROUTE}/${g.id}`} className={`lnk ${styles.grower}`}>
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
    </>
  )
}
