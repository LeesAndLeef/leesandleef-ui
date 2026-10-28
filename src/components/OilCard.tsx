import { Link } from 'react-router-dom'
import { euro, type Oil, type OilSize, oilPrice, oilSize, productPath } from '../data/products'
import { OilTin } from './Bottle'
import './OilCard.css'

function Scale({ label, value, tone }: { label: string; value: number; tone: 'wine' | 'olive' }) {
  return (
    <div className="oil-scale">
      <span className="mono">{label}</span>
      <span className="oil-scale-dots" role="img" aria-label={`${label} ${value} of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < value ? 'is-on is-' + tone : undefined} />
        ))}
      </span>
    </div>
  )
}

export function OilCard({ oil, size, added, onAdd }: { oil: Oil; size: OilSize; added: boolean; onAdd: () => void }) {
  return (
    <article className="oil-card">
      <Link to={productPath(oil)} className="hatch oil-card-img" aria-label={oil.name}>
        <span className="mono glass oil-card-level">{oil.level}</span>
        {oil.limited && <span className="mono oil-card-limited">Limited</span>}
        <OilTin body={oil.glass} cap={oil.cap} width={120} height={200} />
      </Link>
      <div className="oil-card-body">
        <div className="mono oil-card-meta">
          <span>{oil.origin}</span>
          <span>{oil.harvest}</span>
        </div>
        <h3>
          <Link to={productPath(oil)} className="lnk">
            {oil.name}
          </Link>
        </h3>
        <p className="oil-card-by">{[oil.growerName, oil.cultivar].filter(Boolean).join(' · ')}</p>
        <p className="oil-card-note">{oil.note}</p>
        <div className="oil-scales">
          <Scale label="Bitter" value={oil.bitter} tone="wine" />
          <Scale label="Pepper" value={oil.pepper} tone="wine" />
          <Scale label="Fruit" value={oil.fruit} tone="olive" />
        </div>
        <div className="mono oil-card-lab">
          <span>Polyphenols {oil.poly}</span>
          <span>Acidity {oil.acid}</span>
        </div>
        <div className="oil-card-foot">
          <span className="stack" style={{ gap: 2 }}>
            <span className="disp" style={{ fontSize: 26 }}>
              {euro(oilPrice(oil, size))}
            </span>
            <span className="mono label-muted" style={{ fontSize: 10 }}>
              {oil.set ? oil.set.contents : oilSize(size).name}
            </span>
          </span>
          <button className={'oil-add' + (added ? ' is-added' : '')} onClick={onAdd}>
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
