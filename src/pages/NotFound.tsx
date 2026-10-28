import { Link } from 'react-router-dom'
import { MiniFooter } from '../components/Footer'

export default function NotFound() {
  return (
    <>
      <section className="section gridbg">
        <div className="container section-pad stack" style={{ gap: 24, alignItems: 'flex-start' }}>
          <span className="mono label-wine">404</span>
          <h1 className="disp h-xl">
            This bottle is gone<span className="accent">.</span>
          </h1>
          <p className="lede">Runs are small — when a cuvée is gone, it is gone until next vintage.</p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Browse the cellar →
          </Link>
        </div>
      </section>
      <MiniFooter />
    </>
  )
}
