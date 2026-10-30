import { Link } from 'react-router-dom'
import { GROWERS_ROUTE } from '../../routes'
import { COLORS } from '../../styles/colors'
import type { Grower, GrowerQuote } from '../../types'
import { Scene } from '../illustrations/Scene'
import styles from './ProductGrowerQuote.module.css'

export function ProductGrowerQuote({
  quote,
  grower,
  where,
}: {
  quote: GrowerQuote
  grower: Pick<Grower, 'id' | 'name' | 'portrait' | 'profile' | 'tone'>
  where: string
}) {
  return (
    <section className="section gridbg-d">
      <div className={`container section-pad ${styles.root}`}>
        <div className={`hatch ${styles.portrait}`}>
          {grower.portrait ? (
            <img src={grower.portrait} alt={`Illustrated portrait of ${quote.who}`} className={styles.portraitPic} />
          ) : (
            <Scene
              kind="landscape"
              cue={grower.profile?.heroPhoto ?? where}
              tone={grower.tone}
              label={`Illustrated vineyard at ${where}`}
            />
          )}
          <div className={`glass ${styles.portraitCap}`}>
            <span className="mono">{grower.name}</span>
            <span className="mono" style={{ color: COLORS.sage }}>
              {quote.facts}
            </span>
          </div>
        </div>
        <figure className="stack" style={{ gap: 28 }}>
          <span className="mono label-olive">From the grower</span>
          <blockquote className={styles.blockquote}>“{quote.text}”</blockquote>
          <figcaption className="stack" style={{ gap: 4 }}>
            <span style={{ fontWeight: 600 }}>{quote.who}</span>
            <span className="label-olive" style={{ fontSize: 14 }}>
              {quote.role}
            </span>
          </figcaption>
          <Link
            to={`${GROWERS_ROUTE}/${grower.id}`}
            className="btn btn-ghost-light"
            style={{ alignSelf: 'flex-start' }}
          >
            Visit {grower.name}’s page →
          </Link>
        </figure>
      </div>
    </section>
  )
}
