export function timeRemaining(until: number, now: number) {
  const ms = Math.max(0, until - now)
  const min = Math.floor(ms / 60000)
  return { days: Math.floor(min / 1440), hours: Math.floor((min % 1440) / 60), mins: min % 60, closed: ms === 0 }
}

export const twoDigits = (n: number) => String(n).padStart(2, '0')
