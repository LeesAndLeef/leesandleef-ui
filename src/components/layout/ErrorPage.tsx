import { Link } from 'react-router-dom'
import { HOME_ROUTE } from '../../routes'

export function ErrorPage({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="section gridbg">
      <div className="container section-pad stack" style={{ gap: 24, alignItems: 'flex-start' }}>
        <span className="mono label-wine">Something went wrong</span>
        <h1 className="disp h-xl">
          We couldn’t load this page<span className="accent">.</span>
        </h1>
        <p className="lede">The cellar is not answering right now. Check your connection and try again.</p>
        <div className="btn-row">
          <button type="button" className="btn btn-primary btn-lg" onClick={onRetry}>
            Try again
          </button>
          <Link to={HOME_ROUTE} className="btn btn-outline btn-lg">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
