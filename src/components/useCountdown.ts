import { useEffect, useState } from 'react'

function remaining(until: number, now: number) {
  const ms = Math.max(0, until - now)
  const min = Math.floor(ms / 60000)
  return { days: Math.floor(min / 1440), hours: Math.floor((min % 1440) / 60), mins: min % 60, closed: ms === 0 }
}

const pad = (n: number) => String(n).padStart(2, '0')

export function useCountdown(until: string) {
  const target = new Date(until).getTime()
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])
  const r = remaining(target, now)
  return { ...r, cells: [pad(r.days), pad(r.hours), pad(r.mins)] }
}
