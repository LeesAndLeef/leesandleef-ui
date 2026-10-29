import { Link } from 'react-router-dom'
import { euro } from '../../lib/euro'
import { oilPrice, oilSize } from '../../lib/oil'
import { oilPath } from '../../lib/paths'
import type { Oil, OilSize } from '../../types'
import { OilTin } from '../illustrations/OilTin'
import { OilCardScale } from './OilCardScale'
import styles from './OilCard.module.css'

export function OilCard({ oil, size, added, onAdd }: { oil: Oil; size: OilSize; added: boolean; onAdd: () => void }) {
  return (
    <article className={styles.root}>
      <Link to={oilPath(oil)} className={`hatch ${styles.img}`} aria-label={oil.name}>
        <span className={`mono glass ${styles.level}`}>{oil.level}</span>
        {oil.limited && <span className={`mono ${styles.limited}`}>Limited</span>}
        <OilTin body={oil.glass} cap={oil.cap} width={120} height={200} />
      </Link>
      <div className={styles.body}>
        <div className={`mono ${styles.meta}`}>
          <span>{oil.origin}</span>
          <span>{oil.harvest}</span>
        </div>
        <h3>
          <Link to={oilPath(oil)} className="lnk">
            {oil.name}
          </Link>
        </h3>
        <p className={styles.by}>{[oil.growerName, oil.cultivar].filter(Boolean).join(' · ')}</p>
        <p className={styles.note}>{oil.note}</p>
        <div className={styles.scales}>
          <OilCardScale label="Bitter" value={oil.bitter} tone="wine" />
          <OilCardScale label="Pepper" value={oil.pepper} tone="wine" />
          <OilCardScale label="Fruit" value={oil.fruit} tone="olive" />
        </div>
        <div className={`mono ${styles.lab}`}>
          <span>Polyphenols {oil.poly}</span>
          <span>Acidity {oil.acid}</span>
        </div>
        <div className={styles.foot}>
          <span className="stack" style={{ gap: 2 }}>
            <span className="disp" style={{ fontSize: 26 }}>
              {euro(oilPrice(oil, size))}
            </span>
            <span className="mono label-muted" style={{ fontSize: 10 }}>
              {oil.set ? oil.set.contents : oilSize(size).name}
            </span>
          </span>
          <button className={`${styles.add} ${added ? styles.isAdded : ''}`} onClick={onAdd}>
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
