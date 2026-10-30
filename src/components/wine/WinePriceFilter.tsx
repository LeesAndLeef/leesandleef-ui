import { formatCurrency } from '../../lib/currency'
import styles from './WinePriceFilter.module.css'

export function WinePriceFilter({
  priceFrom,
  priceTo,
  max,
  onPriceFromChange,
  onPriceToChange,
}: {
  priceFrom: string
  priceTo: string
  max: number
  onPriceFromChange: (value: string) => void
  onPriceToChange: (value: string) => void
}) {
  const from = priceFrom === '' ? 0 : Number(priceFrom)
  const to = priceTo === '' ? Infinity : Number(priceTo)
  const low = Math.min(from, max)
  const high = Math.max(low, Math.min(to, max))
  const lowPct = (low / max) * 100
  const highPct = (high / max) * 100
  const setLow = (v: number) => {
    const next = Math.min(v, high)
    onPriceFromChange(next <= 0 ? '' : String(next))
  }
  const setHigh = (v: number) => {
    const next = Math.max(v, low)
    onPriceToChange(next >= max ? '' : String(next))
  }
  const lowOnTop = low > max / 2

  return (
    <>
      <div className={styles.priceInputs}>
        <label className="fld label-muted">
          From
          <input
            className={`input ${styles.monoInput}`}
            type="number"
            min={0}
            placeholder="0"
            value={priceFrom}
            onChange={(e) => onPriceFromChange(e.target.value)}
          />
        </label>
        <label className="fld label-muted">
          To
          <input
            className={`input ${styles.monoInput}`}
            type="number"
            min={0}
            placeholder={String(max)}
            value={priceTo}
            onChange={(e) => onPriceToChange(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.priceTrack}>
        <div
          className={styles.priceTrackFill}
          style={{
            left: `calc(8px + (100% - 16px) * ${lowPct / 100})`,
            right: `calc(8px + (100% - 16px) * ${1 - highPct / 100})`,
          }}
        />
        <input
          type="range"
          min={0}
          max={max}
          step={1}
          value={low}
          aria-label="Minimum price"
          style={{ zIndex: lowOnTop ? 2 : 1 }}
          aria-valuetext={formatCurrency(low)}
          onChange={(e) => setLow(Number(e.target.value))}
        />
        <input
          type="range"
          min={0}
          max={max}
          step={1}
          value={high}
          aria-label="Maximum price"
          style={{ zIndex: lowOnTop ? 1 : 2 }}
          aria-valuetext={formatCurrency(high)}
          onChange={(e) => setHigh(Number(e.target.value))}
        />
      </div>
    </>
  )
}
