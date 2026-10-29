export function ClubCompareCell({ v }: { v: string }) {
  if (v === '■') return <span aria-label="Included">■</span>
  if (v === '—') return <span aria-label="Not included">—</span>
  return <>{v}</>
}
