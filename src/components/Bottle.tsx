const BOTTLE = 'M24 0h12v52l14 18v130H10V70l14-18z'

interface BottleProps {
  glass: string
  cap?: string
  width: number
  height: number
  detail?: 'full' | 'label' | 'silhouette'
  mark?: boolean
  label?: string
}

export function Bottle({ glass, cap, width, height, detail = 'full', mark, label }: BottleProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }
  return (
    <svg width={width} height={height} viewBox="0 0 60 200" {...a11y}>
      <path d={BOTTLE} fill={glass} />
      {detail === 'full' && cap && <rect x="24" y="0" width="12" height="20" fill={cap} />}
      {detail !== 'silhouette' && <rect x="14" y="104" width="32" height="56" fill="#EFECE3" />}
      {detail === 'full' && (
        <>
          <rect x="18" y="112" width="24" height="3" fill={cap} />
          <rect x="18" y="120" width="16" height="2" fill="#3F4622" />
          {mark && <rect x="18" y="146" width="10" height="8" fill="#3F4622" />}
        </>
      )}
    </svg>
  )
}

interface OilTinProps {
  width: number
  height: number
  body?: string
  cap?: string
  label?: string
}

export function OilTin({ width, height, body = '#6B733A', cap = '#1B1D14', label }: OilTinProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }
  return (
    <svg width={width} height={height} viewBox="0 0 120 200" {...a11y}>
      <rect x="10" y="30" width="100" height="170" fill={body} />
      <rect x="42" y="8" width="36" height="22" fill="#1B1D14" />
      <rect x="22" y="78" width="76" height="76" fill="#EFECE3" />
      <rect x="30" y="88" width="50" height="5" fill={cap} />
      <rect x="30" y="100" width="34" height="3" fill="#3F4622" />
      <rect x="30" y="136" width="16" height="10" fill={cap} />
    </svg>
  )
}
