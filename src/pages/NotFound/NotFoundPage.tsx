import { Link } from 'react-router-dom'
import { HOME_ROUTE, WINES_ROUTE } from '../../routes'

export default function NotFoundPage() {
  return (
    <section className="section gridbg">
      <div className="container section-pad stack" style={{ gap: 24, alignItems: 'flex-start' }}>
        <span className="mono label-wine">404 — Page not found</span>
        <h1 className="disp h-xl">
          This page doesn't exist<span className="accent">.</span>
        </h1>
        <p className="lede">The link may be out of date, or the address mistyped.</p>
        <div className="btn-row">
          <Link to={HOME_ROUTE} className="btn btn-primary btn-lg">
            Back to home →
          </Link>
          <Link to={WINES_ROUTE} className="btn btn-outline btn-lg">
            Browse the cellar
          </Link>
        </div>
      </div>
    </section>
  )
}
