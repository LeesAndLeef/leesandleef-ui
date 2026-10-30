import { useEffect, useState } from 'react'
import { timeRemaining, twoDigits } from '../lib/countdown'

export function useCountdown(until: string) {
  const target = new Date(until).getTime()
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])
  const r = timeRemaining(target, now)
  return { ...r, cells: [twoDigits(r.days), twoDigits(r.hours), twoDigits(r.mins)] }
}
