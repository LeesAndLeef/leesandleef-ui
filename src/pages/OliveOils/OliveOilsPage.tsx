import { useState } from 'react'
import { OilArticleLink } from '../../components/oil/OilArticleLink'
import { OilCultivars } from '../../components/oil/OilCultivars'
import { OilHarvestDay } from '../../components/oil/OilHarvestDay'
import { OilPairings } from '../../components/oil/OilPairings'
import { OilStorage } from '../../components/oil/OilStorage'
import { OilsHero } from '../../components/oil/OilsHero'
import { OilTastingSet } from '../../components/oil/OilTastingSet'
import { OilCard } from '../../components/product/OilCard'
import { DEFAULT_OIL_SIZE, OIL_SIZES } from '../../constants'
import { oilOption } from '../../lib/cart'
import { listedOils } from '../../lib/oil'
import { useCart } from '../../state/cart/useCart'
import type { Oil, OilLevel, OilSize } from '../../types'
import { OIL_LEVELS } from './constants'
import styles from './OliveOilsPage.module.css'

export default function OliveOilsPage() {
  const { add } = useCart()
  const [level, setLevel] = useState<OilLevel | 'All'>('All')
  const [size, setSize] = useState<OilSize>(DEFAULT_OIL_SIZE)
  const [added, setAdded] = useState<Record<string, boolean>>({})
  const shown = listedOils.filter((o) => level === 'All' || o.level === level)

  function addOil(o: Oil) {
    add(o.id, 1, oilOption(size))
    setAdded((a) => ({ ...a, [`${o.id}@${size}`]: true }))
  }

  return (
    <>
      <OilsHero />
      <section id="oils" className="section">
        <div className={`container ${styles.block} stack`} style={{ gap: 32 }}>
          <div className={styles.head}>
            <div className="stack" style={{ gap: 16, maxWidth: 720 }}>
              <span className="mono label-wine">§ 01 — The oils</span>
              <h2 className={`disp ${styles.h2Lg}`}>Seven groves, three intensities.</h2>
              <p className={styles.intro}>
                Pick by how bold you like it. Delicate oils are for fish, baking and salads; robust ones for bread,
                beans, grilled meat and anything that can stand up to pepper.
              </p>
            </div>
            <div className="stack" style={{ gap: 8 }}>
              <span className="mono label-muted">Size</span>
              <div role="group" aria-label="Size" className={styles.sizes}>
                {OIL_SIZES.map((z) => (
                  <button key={z.id} aria-pressed={size === z.id} onClick={() => setSize(z.id)}>
                    {z.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.filter}>
            <div role="group" aria-label="Intensity" className="chip-row">
              {(['All', ...OIL_LEVELS] as const).map((l) => (
                <button key={l} className="chip" aria-pressed={level === l} onClick={() => setLevel(l)}>
                  {l}{' '}
                  <span className="mono">
                    {l === 'All' ? listedOils.length : listedOils.filter((o) => o.level === l).length}
                  </span>
                </button>
              ))}
            </div>
            <span className="mono label-muted" role="status">
              {shown.length} oils
            </span>
          </div>
          <div className={styles.grid}>
            {shown.map((o) => (
              <OilCard key={o.id} oil={o} size={size} added={!!added[`${o.id}@${size}`]} onAdd={() => addOil(o)} />
            ))}
          </div>
        </div>
      </section>
      <OilPairings />
      <OilHarvestDay />
      <OilCultivars />
      <section className="section">
        <div className={styles.split}>
          <OilTastingSet />
          <OilArticleLink />
        </div>
      </section>
      <OilStorage />
    </>
  )
}
