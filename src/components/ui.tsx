import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart/context'
import { euro, type Wine } from '../data/products'
import { Bottle } from './Bottle'

export function Breadcrumb({ items, className }: { items: { label: string; to?: string }[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={'mono breadcrumb ' + (className ?? '')}>
      {items.map((it, i) => (
        <Fragment key={it.label}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {it.to ? (
            <Link to={it.to} className="lnk">
              {it.label}
            </Link>
          ) : (
            <span aria-current="page">{it.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}

export function QtyStepper({
  value,
  onChange,
  min = 1,
  max = 24,
  size = 'md',
}: {
  value: number
  onChange: (n: number) => void
  min?: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <div role="group" aria-label="Quantity" className={'qty qty-' + size}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  )
}

export function SectionLabel({
  children,
  tone = 'wine',
}: {
  children: ReactNode
  tone?: 'wine' | 'olive' | 'muted' | 'rose'
}) {
  return <span className={'mono label-' + tone}>{children}</span>
}

export function WineCard({ wine, layout = 'grid' }: { wine: Wine; layout?: 'grid' | 'list' }) {
  const { add } = useCart()
  return (
    <article className={'wine-card wine-card-' + layout}>
      <Link to={`/wine/${wine.id}`} className="wine-card-img hatch" aria-label={wine.name}>
        <span className="mono mono-sm glass wine-card-type">{wine.type}</span>
        {wine.left !== undefined && <span className="mono badge wine-card-left">{wine.left} left</span>}
        <Bottle glass={wine.glass} cap={wine.cap} width={74} height={240} />
      </Link>
      <div className="wine-card-body">
        <div className="mono mono-sm wine-card-meta">
          <span>{wine.region}</span>
          <span>{wine.abv}</span>
        </div>
        <h2>
          <Link to={`/wine/${wine.id}`} className="lnk">
            {wine.name}
          </Link>
        </h2>
        <p className="wine-card-grower">
          {wine.growerName} · {wine.grape}
        </p>
        <p className="wine-card-note">{wine.note}</p>
        <div className="wine-card-foot">
          <span className="disp">{euro(wine.price)}</span>
          <button className="icon-btn" aria-label={`Add ${wine.name} to cart`} onClick={() => add(wine.id)}>
            +
          </button>
        </div>
      </div>
    </article>
  )
}
