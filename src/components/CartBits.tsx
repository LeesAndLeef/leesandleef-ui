import type { PricedLine } from '../cart/pricing'
import { Bottle, OilTin } from './Bottle'

export function CheckoutSteps({
  current,
  labels = ['Cart', 'Details', 'Delivery', 'Payment'],
}: {
  current: number
  labels?: string[]
}) {
  return (
    <ol aria-label="Checkout steps" className="mono cart-steps">
      {labels.map((s, i) => (
        <li key={s} aria-current={i === current ? 'step' : undefined}>
          0{i + 1} {s}
        </li>
      ))}
    </ol>
  )
}

export function ProductThumb({ line, size = 'md' }: { line: PricedLine; size?: 'sm' | 'md' }) {
  if (line.isClub) {
    return (
      <span className={'club-thumb club-thumb-' + size} aria-hidden="true">
        {['#1E0A10', '#A2562A', '#6B733A', '#2A0E16', '#A9AD7A', '#6E1C2B'].map((c) => (
          <span key={c} style={{ background: c }} />
        ))}
      </span>
    )
  }
  const [w, h] = size === 'md' ? [30, 100] : [18, 60]
  if (line.item.kind === 'oil') return <OilTin body={line.glass} cap={line.item.cap} width={w * 1.4} height={h * 0.7} />
  return <Bottle glass={line.glass} width={w} height={h} detail="label" />
}
